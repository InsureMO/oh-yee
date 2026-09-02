import clsx from 'clsx';
import { Plus } from 'lucide-react';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import ax from '../utils/ax';
import folderScanner from '../utils/folder-scanner';
import mergeContextToProps from '../utils/mergeContextToProps';
import type {
  UploadFile,
  UploadInstance,
  UploadProps,
  UploadRequestAbort,
} from './interface';
import './style/index.less';
import UploadList from './uploaded-list/index';

type ActiveRequest = {
  token: symbol;
  abort?: () => void;
};

const getFileExtension = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf('.');
  return dotIndex > -1 ? fileName.slice(dotIndex + 1).toLowerCase() : '';
};

const wrapFile = (file: File): UploadFile => {
  return {
    uid: uuidv4(),
    name: file.name,
    size: file.size,
    type: file.type || getFileExtension(file.name),
    percent: 0,
    status: 'ready',
    raw: file,
  };
};

const isSameFile = (left: UploadFile, right: UploadFile) => {
  if (left.uid && right.uid) {
    return left.uid === right.uid;
  }
  return left === right;
};

const matchesAccept = (file: File, accept?: string) => {
  if (!accept) {
    return true;
  }

  const fileName = file.name.toLowerCase();
  const mimeType = file.type.toLowerCase();

  return accept
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .some((rule) => {
      if (rule.startsWith('.')) {
        return fileName.endsWith(rule);
      }
      if (rule.endsWith('/*')) {
        return mimeType.startsWith(rule.slice(0, -1));
      }
      return mimeType === rule;
    });
};

const describeErrorDetail = (detail: unknown) => {
  if (typeof detail === 'string' && detail) {
    return detail;
  }
  try {
    const text = JSON.stringify(detail) ?? '';
    return text.length > 200 ? `${text.slice(0, 200)}…` : text;
  } catch {
    return String(detail);
  }
};

const toError = (error: unknown) => {
  if (error instanceof Error) {
    return error;
  }
  if (typeof error === 'object' && error !== null && 'error' in error) {
    const detail = (error as { error: unknown }).error;
    if (detail instanceof Error) {
      return detail;
    }
    if (detail !== null && detail !== undefined) {
      // e.g. ax rejects { status: 'error', error: xhr.response }
      const message = describeErrorDetail(detail);
      if (message) {
        return new Error(message);
      }
    }
  }
  return new Error(typeof error === 'string' ? error : 'Upload failed');
};

// ax rejects aborts as { status: 'abort', error: event }
const isAbortRejection = (error: unknown) =>
  typeof error === 'object' &&
  error !== null &&
  (error as { status?: unknown }).status === 'abort';

const getAbort = (request?: UploadRequestAbort | void) => {
  if (typeof request === 'function') {
    return request;
  }
  return request?.abort;
};

const Upload = forwardRef<UploadInstance, UploadProps>((baseprops, ref) => {
  const { upload: uploadConfig } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, uploadConfig);
  const {
    prefixCls = 'yee-upload',
    name = 'file',
    action,
    children,
    data,
    headers,
    defaultFileList,
    fileList: propsFileList,
    withCredentials,
    className,
    style,
    disabled,
    listType = 'text',
    type,
    directory,
    multiple,
    accept,
    showUploadList = true,
    progress = true,
    autoUpload = true,
    maxFileSize,
    maxCount,
    customRequest,
    onChange,
    beforeUpload,
    onPreview,
    onRemove,
    itemRender,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const activeRequestsRef = useRef<Map<string, ActiveRequest>>(new Map());
  const pendingPreparationsRef = useRef<Map<string, symbol>>(new Map());
  const mountedRef = useRef(true);
  const [dragState, setDragState] = useState<'dragover' | 'drop' | null>(null);

  const [mergedFileList, setMergedFileList] = useMergedState<UploadFile[]>([], {
    value: propsFileList,
    defaultValue: defaultFileList,
  });
  const fileListRef = useRef(mergedFileList);
  fileListRef.current = mergedFileList;

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      pendingPreparationsRef.current.clear();
      const activeRequests = Array.from(activeRequestsRef.current.values());
      activeRequestsRef.current.clear();
      activeRequests.forEach(({ abort }) => abort?.());
    };
  }, []);

  const setFileList = (nextFileList: UploadFile[]) => {
    fileListRef.current = nextFileList;
    setMergedFileList(nextFileList);
  };

  const emitChange = (
    file: UploadFile,
    nextFileList: UploadFile[],
    event?: any,
  ) => {
    setFileList(nextFileList);
    onChange?.({ file, fileList: nextFileList, event });
  };

  const appendFile = (file: UploadFile, event?: any) => {
    const nextFileList = [...fileListRef.current, file];
    emitChange(file, nextFileList, event);
    return file;
  };

  const replaceFile = (
    target: UploadFile,
    replacement: UploadFile,
    event?: any,
  ) => {
    const index = fileListRef.current.findIndex((item) =>
      isSameFile(item, target),
    );
    if (index < 0) {
      return undefined;
    }

    const nextFileList = [...fileListRef.current];
    nextFileList[index] = replacement;
    emitChange(replacement, nextFileList, event);
    return replacement;
  };

  const updateFile = (
    target: UploadFile,
    patch: Partial<UploadFile>,
    event?: any,
  ) => {
    const current = fileListRef.current.find((item) =>
      isSameFile(item, target),
    );
    if (!current) {
      return undefined;
    }
    return replaceFile(target, { ...current, ...patch }, event);
  };

  const abortRequest = (file: UploadFile) => {
    if (!file.uid) {
      return;
    }
    const activeRequest = activeRequestsRef.current.get(file.uid);
    if (activeRequest) {
      activeRequestsRef.current.delete(file.uid);
      activeRequest.abort?.();
    }
  };

  const postFile = (sourceFile: UploadFile) => {
    let file = sourceFile;
    if (!file.uid) {
      const withUid = { ...file, uid: uuidv4() };
      file = replaceFile(file, withUid) || withUid;
    }

    const requestKey = file.uid as string;
    abortRequest(file);
    const token = Symbol(requestKey);
    activeRequestsRef.current.set(requestKey, { token });

    const isActive = () =>
      activeRequestsRef.current.get(requestKey)?.token === token;
    const finish = () => {
      if (isActive()) {
        activeRequestsRef.current.delete(requestKey);
      }
    };
    const updateIfActive = (patch: Partial<UploadFile>, event?: any) => {
      if (!isActive()) {
        return undefined;
      }
      return updateFile(file, patch, event);
    };
    const fail = (error: unknown) => {
      // Requests aborted outside of remove/retry/unmount (e.g. by the browser)
      // go back to 'ready' instead of showing an error
      if (isAbortRejection(error)) {
        updateIfActive({ status: 'ready', percent: 0 });
        finish();
        return;
      }
      const normalizedError = toError(error);
      updateIfActive({ status: 'error', error: normalizedError }, error);
      finish();
    };

    updateIfActive({ status: 'uploading', percent: 0, error: undefined });

    if (!file.raw) {
      fail(new Error(`File ${file.name} has no source file to upload`));
      return;
    }

    if (customRequest) {
      try {
        const request = customRequest({
          file: file.raw,
          onProgress: (percent) => {
            const normalizedPercent = Math.min(100, Math.max(0, percent));
            updateIfActive(
              { status: 'uploading', percent: normalizedPercent },
              { percent: normalizedPercent },
            );
          },
          onError: fail,
          onSuccess: (response) => {
            updateIfActive(
              {
                status: 'success',
                percent: 100,
                response,
                error: undefined,
              },
              response,
            );
            finish();
          },
        });
        const activeRequest = activeRequestsRef.current.get(requestKey);
        if (activeRequest?.token === token) {
          activeRequest.abort = getAbort(request);
        }
      } catch (error) {
        fail(error);
      }
      return;
    }

    try {
      const url = typeof action === 'function' ? action() : action;
      if (!url) {
        throw new Error(
          'Upload action is required when customRequest is not set',
        );
      }

      const formData = new FormData();
      formData.append(name, file.raw);
      if (data) {
        const extraData = typeof data === 'function' ? data(file.raw) : data;
        Object.keys(extraData).forEach((key) => {
          formData.append(key, extraData[key]);
        });
      }

      const request = (ax as any).post(url, formData, {
        withCredentials,
        headers: { ...headers },
        onUploadProgress: (event: ProgressEvent) => {
          const percentage = event.total
            ? Math.round((event.loaded / event.total) * 100)
            : 0;
          updateIfActive({ status: 'uploading', percent: percentage }, event);
        },
      }) as Promise<any> & { abort?: () => void };

      const activeRequest = activeRequestsRef.current.get(requestKey);
      if (activeRequest?.token === token) {
        activeRequest.abort = request.abort;
      }

      request
        .then((response) => {
          updateIfActive(
            {
              status: 'success',
              percent: 100,
              response,
              error: undefined,
            },
            response,
          );
          finish();
        })
        .catch(fail);
    } catch (error) {
      fail(error);
    }
  };

  const isValidFile = (file: File) => {
    if (maxFileSize && file.size > maxFileSize) {
      console.warn(`File ${file.name} exceeds maximum size limit`);
      return false;
    }
    if (!matchesAccept(file, accept)) {
      console.warn(`File ${file.name} does not match accepted file types`);
      return false;
    }
    return true;
  };

  const prepareFile = async (
    file: File,
    wrapped: UploadFile,
    postFiles: File[],
    preparationToken: symbol,
    event?: any,
  ) => {
    const preparationKey = wrapped.uid as string;
    const isActive = () =>
      mountedRef.current &&
      pendingPreparationsRef.current.get(preparationKey) === preparationToken &&
      fileListRef.current.some((item) => isSameFile(item, wrapped));
    const finish = () => {
      if (
        pendingPreparationsRef.current.get(preparationKey) === preparationToken
      ) {
        pendingPreparationsRef.current.delete(preparationKey);
      }
    };

    try {
      const result = beforeUpload
        ? await Promise.resolve(beforeUpload(file, postFiles))
        : true;
      if (!isActive()) {
        finish();
        return;
      }
      if (result === false) {
        // beforeUpload rejected the file: drop it from the list
        setFileList(
          fileListRef.current.filter((item) => !isSameFile(item, wrapped)),
        );
        finish();
        return;
      }

      let nextFile = wrapped;
      if (result instanceof File) {
        nextFile = { ...wrapFile(result), uid: wrapped.uid };
        if (!replaceFile(wrapped, nextFile, event)) {
          finish();
          return;
        }
      }
      finish();
      postFile(nextFile);
    } catch (error) {
      if (isActive()) {
        updateFile(wrapped, { status: 'error', error: toError(error) }, error);
      }
      finish();
    }
  };

  const uploadFiles = (files: FileList | File[], event?: any) => {
    const selectedFiles = Array.from(files);
    const filesAllowedByMultiple =
      multiple || directory ? selectedFiles : selectedFiles.slice(0, 1);
    const validFiles = filesAllowedByMultiple.filter(isValidFile);
    const remainingCount =
      typeof maxCount === 'number'
        ? Math.max(0, maxCount - fileListRef.current.length)
        : validFiles.length;
    const postFiles = validFiles.slice(0, remainingCount);

    if (postFiles.length < validFiles.length) {
      console.warn(`Maximum file count (${maxCount}) exceeded`);
    }

    postFiles.forEach((file) => {
      const wrapped = appendFile(wrapFile(file), event);

      // Manual mode: files only join the list and wait for upload()
      if (!autoUpload) {
        return;
      }

      const preparationToken = Symbol(wrapped.uid);
      pendingPreparationsRef.current.set(
        wrapped.uid as string,
        preparationToken,
      );
      void prepareFile(file, wrapped, postFiles, preparationToken, event);
    });
  };

  // Instance method: upload files waiting in the list (status 'ready')
  const upload = (file?: UploadFile | UploadFile[]) => {
    const requested =
      file === undefined
        ? fileListRef.current
        : Array.isArray(file)
          ? file
          : [file];
    const readyFiles = requested.filter((item) => item.status === 'ready');

    readyFiles.forEach((item) => {
      let target = item;
      if (!target.uid) {
        target = replaceFile(item, { ...item, uid: uuidv4() }) ?? item;
      }
      if (!target.raw) {
        updateFile(target, {
          status: 'error',
          error: new Error(`File ${target.name} has no source file to upload`),
        });
        return;
      }

      const preparationToken = Symbol(target.uid);
      pendingPreparationsRef.current.set(
        target.uid as string,
        preparationToken,
      );
      void prepareFile(
        target.raw,
        target,
        readyFiles
          .map((ready) => ready.raw)
          .filter((raw): raw is File => raw instanceof File),
        preparationToken,
      );
    });
  };

  // Expose the root element plus the upload() method on the ref
  useImperativeHandle(
    ref,
    () =>
      Object.assign(rootRef.current ?? document.createElement('div'), {
        upload,
      }),
    [upload],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files, event);
    event.target.value = '';
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) {
      setDragState('dragover');
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragState(null);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) {
      return;
    }
    setDragState('drop');

    try {
      const entries = Array.from(event.dataTransfer.items)
        .map((item) => item.webkitGetAsEntry?.())
        .filter(
          (entry): entry is FileSystemEntry =>
            entry !== null && entry !== undefined,
        );

      if (entries.some((entry) => entry.isDirectory)) {
        const nestedFiles = await Promise.all(
          entries.map((entry) => folderScanner(entry, [])),
        );
        uploadFiles(nestedFiles.flat(), event);
      } else {
        uploadFiles(event.dataTransfer.files, event);
      }
    } catch (error) {
      console.warn('Failed to scan dropped files', error);
    } finally {
      setDragState(null);
    }
  };

  const handleRemove = async (file: UploadFile) => {
    if (file.uid) {
      pendingPreparationsRef.current.delete(file.uid);
    }
    try {
      const shouldRemove = onRemove
        ? await Promise.resolve(onRemove(file))
        : true;
      if (shouldRemove === false) {
        return;
      }
      abortRequest(file);
      setFileList(
        fileListRef.current.filter((item) => !isSameFile(item, file)),
      );
    } catch (error) {
      console.warn(`Failed to remove file ${file.name}`, error);
    }
  };

  const handleReUpload = (file: UploadFile) => {
    if (file.uid) {
      pendingPreparationsRef.current.delete(file.uid);
    }
    abortRequest(file);
    const nextFile = updateFile(file, {
      uid: file.uid || uuidv4(),
      status: 'ready',
      percent: 0,
      error: undefined,
      response: undefined,
    });
    if (nextFile) {
      postFile(nextFile);
    }
  };

  const handlePreview = (file: UploadFile) => {
    if (onPreview) {
      onPreview(file);
      return;
    }
    if (file.url) {
      window.open(file.url, '_blank', 'noopener,noreferrer');
      return;
    }
    if (!file.raw) {
      return;
    }

    const url = URL.createObjectURL(file.raw);
    const previewWindow = window.open(url, '_blank');
    if (!previewWindow) {
      URL.revokeObjectURL(url);
      return;
    }
    const cleanup = () => URL.revokeObjectURL(url);
    previewWindow.addEventListener('load', cleanup, { once: true });
    window.setTimeout(cleanup, 60_000);
  };

  const renderUploadTrigger = () => {
    const acceptDirectory = directory
      ? ({ webkitdirectory: '', directory: '' } as Record<string, string>)
      : {};

    return (
      <span
        className={clsx(`${prefixCls}-input`, {
          [`${prefixCls}-input-disabled`]: disabled,
        })}
        onClick={(event) => {
          if (!disabled && event.target !== inputRef.current) {
            inputRef.current?.click();
          }
        }}
      >
        <input
          type="file"
          aria-label="Upload file"
          className={`${prefixCls}-native-input`}
          disabled={disabled}
          {...acceptDirectory}
          multiple={Boolean(multiple || directory)}
          accept={accept}
          onChange={handleChange}
          ref={inputRef}
        />
        {children ? (
          children
        ) : listType === 'picture-wall' ? (
          <span className={`${prefixCls}-picture-wall-trigger`}>
            <Plus />
          </span>
        ) : (
          <Button disabled={disabled}>Upload</Button>
        )}
      </span>
    );
  };

  const renderUploadList = (extraProps?: object) => {
    if (!showUploadList) {
      return null;
    }
    return (
      <UploadList
        prefixCls={prefixCls}
        listType={listType}
        fileList={mergedFileList}
        progress={progress}
        showUploadList={showUploadList}
        itemRender={itemRender}
        onRemove={handleRemove}
        onReUpload={handleReUpload}
        onPreview={handlePreview}
        isPreviewable={(file) => Boolean(onPreview || file.url || file.raw)}
        {...extraProps}
      />
    );
  };

  if (type === 'drag') {
    return (
      <div
        ref={rootRef}
        {...rest}
        className={clsx(
          prefixCls,
          `${prefixCls}-drag`,
          {
            [`${prefixCls}-drag-hover`]: dragState === 'dragover',
            [`${prefixCls}-disabled`]: disabled,
          },
          className,
        )}
        style={style}
      >
        <div
          className={`${prefixCls}-drag-container`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {renderUploadTrigger()}
        </div>
        {listType === 'picture-wall' ? (
          <div className={`${prefixCls}-picture-wall`}>
            {renderUploadList()}
          </div>
        ) : (
          renderUploadList()
        )}
      </div>
    );
  }

  if (listType === 'picture-wall') {
    return (
      <div
        ref={rootRef}
        {...rest}
        className={clsx(prefixCls, `${prefixCls}-picture-wall`, className)}
        style={style}
      >
        {renderUploadList({ renderUploadTrigger })}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      {...rest}
      className={clsx(
        prefixCls,
        {
          [`${prefixCls}-picture-list`]: listType === 'picture-list',
          [`${prefixCls}-disabled`]: disabled,
        },
        className,
      )}
      style={style}
    >
      {renderUploadTrigger()}
      {renderUploadList()}
    </div>
  );
});

Upload.displayName = 'Upload';

export default Upload;
