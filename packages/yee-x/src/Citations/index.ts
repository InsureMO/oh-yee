import CitationChip from './citation-chip';
import Citations from './citations';

export type {
  CitationChipProps,
  CitationSource,
  CitationsLocale,
  CitationsProps,
  CitationsSemanticType,
} from './interface';
export { CitationsProvider, useCitations } from './context';

export type CitationsType = typeof Citations & {
  Chip: typeof CitationChip;
};

const CitationsWithChip = Citations as CitationsType;

CitationsWithChip.Chip = CitationChip;

export default CitationsWithChip;
