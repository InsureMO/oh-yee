import clsx from 'clsx';
import { Plus } from 'lucide-react';
import React, { forwardRef, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '../Button';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import UploadList from './uploaded-list/index';

import useMergedState from '../hooks/useMergedState';
import ax from '../utils/ax';
import folderScanner from '../utils/folder-scanner';
import type { UploadFile, UploadProps } from './interface';
import './style/index.less';

const wrapFile = (file: File): UploadFile => {
  return {
    uid: uuidv4(),
    name: file.name,
    size: file.size,
    type: typeof file?.name === 'string' ? file.name.split('.')[1] : '',
    percent: 0,
    status: 'ready',
    raw: file,
  };
};

const Upload = forwardRef<HTMLDivElement, UploadProps>((baseprops, ref) => {
  const { upload } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, upload);
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
  const [dragState, setDragState] = useState<'dragover' | 'drop' | null>(null);

  const [mergedFileList, setMergedFileList] = useMergedState([], {
    value: propsFileList,
    defaultValue: defaultFileList,
  });

  let acceptDirectory = {};

  if (directory) {
    acceptDirectory = {
      webkitdirectory: '',
      directory: '',
      multiple: '',
    };
  }

  const postFile = (file: UploadFile) => {
    const formData = new FormData();
    formData.append(name, file.raw);

    if (data) {
      const extraData = typeof data === 'function' ? data(file.raw) : data;
      Object.keys(extraData).forEach((key) => {
        formData.append(key, extraData[key]);
      });
    }

    const url = typeof action === 'function' ? action() : action;

    // Use custom upload
    if (customRequest) {
      customRequest({
        file: file.raw,
        onProgress: (percent) => {
          const current = { ...file, status: 'uploading' as const, percent };
          updateFileList(current);
          onChange?.({
            file: current,
            fileList: mergedFileList,
            event: { percent },
          });
        },
        onError: (error) => {
          const current = { ...file, status: 'error' as const, error };
          updateFileList(current);
          onChange?.({
            file: current,
            fileList: mergedFileList,
            event: error,
          });
        },
        onSuccess: (response) => {
          const current = { ...file, status: 'success' as const, response };
          updateFileList(current);
          onChange?.({
            file: current,
            fileList: mergedFileList,
            event: response,
          });
        },
      });
      return;
    }

    // Default upload
    // @ts-ignore
    ax.post(url, formData, {
      withCredentials,
      headers: { ...headers },
      onUploadProgress: (e: any) => {
        const percentage = parseInt((e.loaded / e.total) * 100 + '');
        let current: UploadFile;
        if (percentage < 100) {
          current = { ...file, status: 'uploading' as const, percent: percentage };
        } else {
          current = { ...file, status: 'success' as const, percent: 100 };
        }

        updateFileList(current);

        onChange?.({
          file: current,
          fileList: mergedFileList,
          event: e,
        });
      },
    })
      .then((res: any) => {
        const current = { ...file, status: 'success' as const, response: res };
        updateFileList(current);
        onChange?.({
          file: current,
          fileList: mergedFileList,
          event: res,
        });
      })
      .catch((err: Error) => {
        const current = { ...file, status: 'error' as const, error: err };
        updateFileList(current);

        onChange?.({
          file: current,
          fileList: mergedFileList,
          event: err,
        });
      });
  };

  const updateFileList = (file: UploadFile) => {
    setMergedFileList((state) => {
      return state.map((item) => {
        if (item.uid === file.uid) {
          return file;
        }
        return item;
      });
    });
  };

  const post = (file: UploadFile) => {
    setMergedFileList((state) => [...state, file]);
    postFile(file);
  };

  const isValidFile = (file: File): boolean => {
    // Check file size
    if (maxFileSize && file.size > maxFileSize) {
      console.warn(`File ${file.name} exceeds maximum size limit`);
      return false;
    }

    // Check file count
    if (maxCount && mergedFileList.length >= maxCount) {
      console.warn(`Maximum file count (${maxCount}) exceeded`);
      return false;
    }

    return true;
  };

  const uploadFiles = (files: FileList | File[], e: any) => {
    const postFiles = Array.from(files) as File[];
    postFiles.forEach((file) => {
      if (!isValidFile(file)) {
        return;
      }

      const wrapped = wrapFile(file);
      onChange?.({
        file: wrapped,
        fileList: mergedFileList,
        event: e,
      });

      if (beforeUpload) {
        const res = beforeUpload(file, postFiles);
        if (res && res instanceof Promise) {
          res.then((progress) => {
            if (progress === false) {
              return;
            }
            post(typeof progress === 'object' ? wrapFile(progress) : wrapped);
          });
        } else if (res !== false) {
          post(wrapped);
        }
      } else {
        post(wrapped);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files, e);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setDragState('dragover');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragState(null);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    setDragState('drop');

    const { files, items } = e.dataTransfer;

    if (files.length === 1) {
      const item = items[0].webkitGetAsEntry();
      // Dropped item is a folder
      if (item?.isDirectory) {
        // @ts-ignore
        const folderFiles = await folderScanner(item, []) as File[];
        uploadFiles(folderFiles, e);
      } else if (item?.isFile) {
        uploadFiles(files, e);
      }
    } else if (files.length > 1) {
      uploadFiles(files, e);
    }
  };

  const renderUploadTrigger = () => {
    return (
      <span
        className={clsx(`${prefixCls}-input`, {
          [`${prefixCls}-input-disabled`]: disabled,
        })}
        onClick={handleClick}
      >
        <input
          type="file"
          disabled={disabled}
          {...acceptDirectory}
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          style={{ display: 'none' }}
          ref={inputRef}
        />
        {children ? (
          children
        ) : listType === 'picture-wall' ? (
          <div className={`${prefixCls}-picture-wall-trigger`}>
            <Plus />
          </div>
        ) : (
          <Button disabled={disabled}>Upload</Button>
        )}
      </span>
    );
  };

  const handleRemove = async (file: UploadFile) => {
    const promise = onRemove?.(file);
    const shouldRemove = promise instanceof Promise ? await promise : promise !== false;

    if (shouldRemove !== false) {
      setMergedFileList((state) => state.filter((item) => item.uid !== file.uid));
    }
  };

  const handleReUpload = (file: UploadFile) => {
    const newFile = { ...file, status: 'ready' as const, percent: 0 };
    updateFileList(newFile);
    postFile(newFile);
  };

  const handlePreview = (file: UploadFile) => {
    if (onPreview) {
      onPreview(file);
    } else if (file.raw) {
      // Default preview behavior: open in new window
      const url = URL.createObjectURL(file.raw);
      window.open(url);
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
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
        {...extraProps}
      />
    );
  };

  if (type === 'drag') {
    return (
      <div
        ref={ref}
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
          className={clsx(`${prefixCls}-drag-container`)}
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
        ref={ref}
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
      ref={ref}
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
