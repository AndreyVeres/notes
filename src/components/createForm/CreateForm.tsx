import React, { FormEvent } from 'react';
import { useInput } from 'hooks/useInput';

import './createForm.scss';

interface ICreateFormProps {
  noteTitle: ReturnType<typeof useInput>;
  noteText: ReturnType<typeof useInput>;
  createHandler: (e: FormEvent<HTMLFormElement>) => void;
}

export default function CreateForm({ noteText, noteTitle, createHandler }: ICreateFormProps) {
  return (
    <form className="form" onSubmit={(e) => createHandler(e)}>
      <input className="form__input" {...noteTitle} type="text" placeholder="note title" />
      <textarea
        className="form__input"
        {...noteText}
        placeholder="note text"
        name="note-text"
        id="note-text"
      ></textarea>
      <button>Create note</button>
    </form>
  );
}
