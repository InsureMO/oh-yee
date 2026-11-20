import { Space } from '@rainbow-oh/yee-c';
import { PromptLibrary, type PromptTemplate } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';

const templates: Array<PromptTemplate> = [
  {
    id: 'claim-letter',
    title: 'Claim response letter',
    description: 'Draft a reply for a specific claim',
    template:
      'Write a formal response letter for claim {{claimId}} about {{topic}}. Keep the tone {{tone}} and address the customer as {{customerName}}.',
  },
  {
    id: 'policy-summary',
    title: 'Policy summary',
    description: 'Summarize a policy document for a customer',
    template: 'Summarize policy {{policyId}} in at most {{wordCount}} words, highlighting exclusions.',
  },
  {
    id: 'no-vars',
    title: 'Translate to formal English',
    template: 'Rewrite the following text in formal English, preserving meaning and tone.',
  },
];

export default function Basic() {
  const [lastUsed, setLastUsed] = useState('');

  return (
    <Space direction="vertical" style={{ width: 560 }}>
      <PromptLibrary
        templates={templates}
        onUse={(prompt: string) => setLastUsed(prompt)}
      />
      {lastUsed && (
        <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
          last used: {lastUsed}
        </span>
      )}
    </Space>
  );
}
