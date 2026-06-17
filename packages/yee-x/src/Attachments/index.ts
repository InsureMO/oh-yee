import InternalAttachments from './attachments';
import FileCard from './file-card';

export type { AttachmentsProps, FileCardProps } from './interface';

type AttachmentsType = typeof InternalAttachments & {
  FileCard: typeof FileCard;
};

const Attachments = InternalAttachments as AttachmentsType;

Attachments.FileCard = FileCard;

export default Attachments;
