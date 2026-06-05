import InternalCard from './card';
import CardGroup from './card-group';

export type { CardGroupProps, CardProps } from './interface';

type CardType = typeof InternalCard & {
  Group: typeof CardGroup;
};

const Card = InternalCard as CardType;

Card.Group = CardGroup;

export default Card;
