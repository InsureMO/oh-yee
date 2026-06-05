import Dragger from './dragger';
import InternalUpload from './upload';

type UploadType = typeof InternalUpload & {
  Dragger: typeof Dragger;
};

const Upload = InternalUpload as UploadType;

Upload.Dragger = Dragger;

export type { UploadProps } from './interface';

export default Upload;
