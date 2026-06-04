import InternalBreadcrumb from './breadcrumb';
import BreadcrumbItem from './breadcrumb-item';

export type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbSemanticDOM,
} from './interface';

export type InternalType = typeof InternalBreadcrumb & {
  Item: typeof BreadcrumbItem;
};

const Breadcrumb = InternalBreadcrumb as InternalType;
Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
