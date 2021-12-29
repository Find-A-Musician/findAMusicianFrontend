import React from 'react';

export default function Test({ text }: { text: string }): JSX.Element {
  return (
    <div>
      <p>{text}</p>
    </div>
  );
}
