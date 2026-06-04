import InternalUpload from './upload';
import Dragger from './dragger';

type UploadType = typeof InternalUpload & {
    Dragger: typeof Dragger
} 

const Upload = InternalUpload as UploadType;

Upload.Dragger = Dragger;

export type { UploadProps } from './interface';

export default Upload;
