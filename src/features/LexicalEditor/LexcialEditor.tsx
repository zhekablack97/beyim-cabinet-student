import React from 'react';
import style from './LexicalEditor.module.scss';

type Props = {
    state: string
}

export const LexcialEditor = ({state}: Props) => {
  return (
    <div>LexcialEditor

        <p>{state}</p>
    </div>
  );
};
