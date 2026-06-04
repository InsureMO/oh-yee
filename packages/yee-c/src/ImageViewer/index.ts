import InternalImageViewer from './image-viewer';
import Popup from './popup';

export type { ImageViewerProps, ImageViewerPopupProps } from './interface';

type ImageViewerType = typeof InternalImageViewer & {
  Popup: typeof Popup;
};

const ImageViewer = InternalImageViewer as ImageViewerType;
ImageViewer.Popup = Popup;

export default ImageViewer;
