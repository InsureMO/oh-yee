import { Markdown } from '@rainbow-oh/yee-x';
import {
  Citations,
  CitationsProvider,
  type CitationSource,
} from '@rainbow-oh/yee-x';
import React from 'react';

const sources: CitationSource[] = [
  {
    id: 'doc-12',
    title: 'Travel Insurance Terms',
    meta: 'example.com · 2024',
    url: 'https://example.com/terms',
    snippet: 'Coverage begins when the trip starts and ends on return.',
    quote: 'Section 3.2: Trip cancellation is covered up to 100% of the paid premium.',
  },
  {
    id: 'doc-31',
    title: 'Claim Guide',
    meta: 'example.com · 2024',
    url: 'https://example.com/claims',
    snippet: 'Submit claims within 30 days of the incident.',
  },
  {
    id: 'doc-44',
    title: 'Premium Table 2024',
    url: 'https://example.com/premiums',
  },
];

const answer =
  'Trip cancellation is covered up to 100% of the paid premium '
  + 'under Section 3.2 [1](#cite-doc-12), and claims must be filed '
  + 'within 30 days [2](#cite-doc-31).';

/** Map `#cite-*` links in the markdown to inline citation chips */
function renderLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  const match = href?.match(/^#cite-(.+)$/);
  if (match) {
    return <Citations.Chip sourceId={match[1]} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function Chip() {
  return (
    <CitationsProvider sources={sources}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 520 }}>
        <Markdown markdown={answer} components={{ a: renderLink as never }} />
        <Citations layout="chip" sources={sources} />
      </div>
    </CitationsProvider>
  );
}
