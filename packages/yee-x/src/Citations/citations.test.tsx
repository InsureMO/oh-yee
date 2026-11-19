import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import Citations from './citations';
import CitationsChip from './citation-chip';
import { CitationsProvider } from './context';
import type { CitationSource } from './interface';

const sources: CitationSource[] = [
  { id: 'a', title: 'Doc A', url: 'https://example.com/a', snippet: 'snippet a' },
  { id: 'b', title: 'Doc B' },
  { id: 'c', title: 'Doc C' },
];

describe('Citations', () => {
  it('renders nothing without sources', () => {
    const { container } = render(<Citations sources={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders source cards with ids and numbers', () => {
    render(<Citations sources={sources} />);

    expect(screen.getByText('Doc A')).toBeInTheDocument();
    expect(screen.getByText('Doc B')).toBeInTheDocument();
    expect(screen.getByText('Doc C')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // index of the last card
  });

  it('folds sources behind a +N chip and expands on click', () => {
    render(<Citations sources={sources} maxVisible={1} />);

    expect(screen.getByText('Doc A')).toBeInTheDocument();
    expect(screen.queryByText('Doc C')).not.toBeInTheDocument();
    expect(screen.getByText('+2 more')).toBeInTheDocument();

    fireEvent.click(screen.getByText('+2 more'));
    expect(screen.getByText('Doc C')).toBeInTheDocument();
  });

  it('opens the url in a new tab by default', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<Citations sources={sources} />);

    fireEvent.click(screen.getByText('Doc A'));
    expect(openSpy).toHaveBeenCalledWith('https://example.com/a', '_blank', 'noopener,noreferrer');
    openSpy.mockRestore();
  });

  it('uses onSourceClick when provided', () => {
    const onSourceClick = vi.fn();
    render(<Citations sources={sources} onSourceClick={onSourceClick} />);

    fireEvent.click(screen.getByText('Doc B'));
    expect(onSourceClick).toHaveBeenCalledWith(sources[1], 1);
  });

  it('falls back to provider sources', () => {
    render(
      <CitationsProvider sources={sources}>
        <Citations />
      </CitationsProvider>,
    );

    expect(screen.getByText('Doc A')).toBeInTheDocument();
  });
});

describe('CitationChip', () => {
  it('resolves a source from the provider by id and shows the 1-based index', () => {
    render(
      <CitationsProvider sources={sources}>
        <CitationsChip sourceId="b" data-testid="chip-b" />
      </CitationsProvider>,
    );

    const chip = screen.getByTestId('chip-b');
    expect(chip).toHaveTextContent('2');
    expect(chip).toHaveAttribute('data-citation-id', 'b');
  });

  it('renders nothing when the id is unknown', () => {
    const { container } = render(
      <CitationsProvider sources={sources}>
        <CitationsChip sourceId="missing" />
      </CitationsProvider>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('works with an explicit source and custom children', () => {
    render(<CitationsChip source={sources[0]} index={7}>§</CitationsChip>);
    expect(screen.getByText('§')).toBeInTheDocument();
  });

  it('reports clicks through onClick', () => {
    const onClick = vi.fn();
    render(
      <CitationsProvider sources={sources}>
        <CitationsChip sourceId="a" onClick={onClick} data-testid="chip-a" />
      </CitationsProvider>,
    );

    fireEvent.click(screen.getByTestId('chip-a'));
    expect(onClick).toHaveBeenCalledWith(sources[0], 1);
  });
});
