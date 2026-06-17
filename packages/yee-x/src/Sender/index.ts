import Footer from './footer';
import Header from './header';
import InternalSender from './sender';

export type { SenderHeaderProps, SenderProps } from './interface';

type SenderType = typeof InternalSender & {
  Header: typeof Header;
  Footer: typeof Footer;
};

const Sender = InternalSender as SenderType;

Sender.Header = Header;
Sender.Footer = Footer;

export default Sender;
