import { MessageActions } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';

export default function Feedback() {
  const [feedback, setFeedback] = useState<'like' | 'dislike'>();
  const [version, setVersion] = useState(2);

  return (
    <MessageActions
      text="Controlled feedback and version."
      feedback={feedback}
      onFeedbackChange={setFeedback}
      version={version}
      total={4}
      onVersionChange={setVersion}
    />
  );
}
