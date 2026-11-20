import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import PromptLibrary from './prompt-library';
import type { PromptTemplate } from './interface';

const templates: Array<PromptTemplate> = [
  {
    id: 'letter',
    title: 'Claim response letter',
    description: 'Draft a reply for a specific claim',
    template:
      'Write a formal response for claim {{claimId}} about {{topic}}, tone {{tone}}.',
  },
  {
    id: 'plain',
    title: 'Translate to formal English',
    template: 'Rewrite the following text in formal English.',
  },
];

describe('PromptLibrary', () => {
  it('renders the template list and selects by default', () => {
    render(<PromptLibrary templates={templates} onUse={() => {}} />);

    expect(screen.getByText('Claim response letter')).toBeInTheDocument();
    expect(screen.getByText('Translate to formal English')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Claim response letter/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    // variables of the first template turn into inline inputs
    expect(screen.getByLabelText('claimId')).toBeInTheDocument();
    expect(screen.getByLabelText('topic')).toBeInTheDocument();
    expect(screen.getByLabelText('tone')).toBeInTheDocument();
  });

  it('assembles the prompt live from typed values', () => {
    render(<PromptLibrary templates={templates} onUse={() => {}} />);

    fireEvent.change(screen.getByLabelText('claimId'), { target: { value: 'C-1042' } });
    fireEvent.change(screen.getByLabelText('topic'), { target: { value: 'water damage' } });
    fireEvent.change(screen.getByLabelText('tone'), { target: { value: 'empathetic' } });

    expect(
      screen.getByText(
        'Write a formal response for claim C-1042 about water damage, tone empathetic.',
      ),
    ).toBeInTheDocument();
  });

  it('disables use until every variable is filled', () => {
    const onUse = vi.fn();
    render(<PromptLibrary templates={templates} onUse={onUse} />);

    const useBtn = screen.getByRole('button', { name: 'Use prompt' });
    expect(useBtn).toBeDisabled();

    fireEvent.change(screen.getByLabelText('claimId'), { target: { value: 'C-1' } });
    fireEvent.change(screen.getByLabelText('topic'), { target: { value: 'fire' } });
    fireEvent.change(screen.getByLabelText('tone'), { target: { value: 'neutral' } });

    expect(useBtn).toBeEnabled();
    fireEvent.click(useBtn);
    expect(onUse).toHaveBeenCalledWith(
      'Write a formal response for claim C-1 about fire, tone neutral.',
      expect.objectContaining({ id: 'letter' }),
    );
  });

  it('treats whitespace-only values as unfilled', () => {
    const onUse = vi.fn();
    render(
      <PromptLibrary
        templates={templates}
        defaultValues={{ claimId: 'C-1', topic: 'fire', tone: '  ' }}
        onUse={onUse}
      />,
    );
    expect(screen.getByRole('button', { name: 'Use prompt' })).toBeDisabled();
  });

  it('switching templates resets uncontrolled values', () => {
    const onSelect = vi.fn();
    render(<PromptLibrary templates={templates} onSelect={onSelect} onUse={() => {}} />);

    fireEvent.change(screen.getByLabelText('claimId'), { target: { value: 'C-1' } });
    fireEvent.click(screen.getByRole('option', { name: /Translate to formal English/ }));

    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'plain' }));
    // plain template has no variables — use is immediately enabled
    expect(screen.getByRole('button', { name: 'Use prompt' })).toBeEnabled();
  });

  it('supports single-template mode without the list', () => {
    render(<PromptLibrary templates={[templates[0]]} showList={false} onUse={() => {}} />);

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.getByLabelText('claimId')).toBeInTheDocument();
  });

  it('omits the preview with showPreview=false', () => {
    render(<PromptLibrary templates={[templates[0]]} showPreview={false} onUse={() => {}} />);
    expect(screen.queryByText('Assembled prompt')).not.toBeInTheDocument();
  });

  it('reports value changes', () => {
    const onValuesChange = vi.fn();
    render(<PromptLibrary templates={templates} onValuesChange={onValuesChange} />);

    fireEvent.change(screen.getByLabelText('claimId'), { target: { value: 'C-9' } });
    expect(onValuesChange).toHaveBeenCalledWith(
      expect.objectContaining({ claimId: 'C-9' }),
      expect.objectContaining({ id: 'letter' }),
    );
  });
});

describe('PromptLibrary template swaps', () => {
  it('does not leak values when the controlled template changes to one with colliding variables', () => {
    const b: PromptTemplate = {
      id: 'b',
      title: 'Template B',
      template: 'Topic is {{topic}}, extra {{detail}}.',
    };
    const { rerender } = render(
      <PromptLibrary
        templates={[templates[0], b]}
        value="letter"
        defaultValues={{ topic: 'fire' }}
      />,
    );
    expect(screen.getByLabelText('topic')).toHaveValue('fire');

    rerender(
      <PromptLibrary
        templates={[templates[0], b]}
        value="b"
        defaultValues={{ topic: 'fire' }}
      />,
    );
    // variable names collide, but the value must not leak across templates
    expect(screen.getByLabelText('topic')).toHaveValue('');
  });
});

describe('PromptLibrary async templates', () => {
  it('adopts the first template when templates arrive async', () => {
    const { rerender } = render(<PromptLibrary templates={[]} onUse={() => {}} />);

    // nothing but the root renders — no stray use button
    expect(screen.queryByRole('button', { name: 'Use prompt' })).not.toBeInTheDocument();

    rerender(<PromptLibrary templates={templates} onUse={() => {}} />);
    expect(screen.getByLabelText('claimId')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Claim response letter/ })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('ignores re-selecting the active template (values preserved, no callback)', () => {
    const onSelect = vi.fn();
    const onValuesChange = vi.fn();
    render(
      <PromptLibrary templates={templates} onSelect={onSelect} onValuesChange={onValuesChange} />,
    );

    fireEvent.change(screen.getByLabelText('claimId'), { target: { value: 'C-1' } });
    onValuesChange.mockClear();

    fireEvent.click(screen.getByRole('option', { name: /Claim response letter/ }));
    expect(onSelect).not.toHaveBeenCalled();
    expect(onValuesChange).not.toHaveBeenCalled();
    expect(screen.getByLabelText('claimId')).toHaveValue('C-1');
  });
});
