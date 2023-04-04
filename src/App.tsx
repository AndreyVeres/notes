import CreateForm from 'components/createForm/CreateForm';
import Note from 'components/note/Note';
import Search from 'components/search/Search';
import { useInput } from 'hooks/useInput';
import React, { FC, FormEvent, useEffect, useMemo, useState } from 'react';
import { extractHashtags } from 'utils/extractHashtags';

import './App.scss';

export interface INote {
  title: string;
  text: string;
  tags?: string[];
  id: number;
}

export const App: FC = (): JSX.Element => {
  const [notes, setNotes] = useState<INote[]>(
    JSON.parse(localStorage.getItem('notes') as string) ?? []
  );
  const noteTitle = useInput('');
  const noteText = useInput('');
  const filter = useInput('');

  const filteredNotes = useMemo(() => {
    if (filter.value) {
      return notes.filter((note) => note.tags?.join('').includes(filter.value));
    }
    return notes;
  }, [filter.value, notes]);

  const createHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newNote: INote = {
      title: noteTitle.value,
      text: noteText.value,
      id: Date.now(),
      tags: extractHashtags(noteText.value),
    };

    setNotes((prev) => [...prev, newNote]);
  };

  const deleteHandler = (id: number): void => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const updateHandler = (updatedNote: INote): void => {
    setNotes(
      notes.map((note) => {
        if (note.id === updatedNote.id) {
          return updatedNote;
        }
        return note;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <div className="main">
        <CreateForm noteTitle={noteTitle} noteText={noteText} createHandler={createHandler} />
        <Search filter={filter} />
        <ul className="note__list">
          {filteredNotes.map((note) => (
            <Note
              {...note}
              key={note.id}
              deleteHandler={deleteHandler}
              updateHandler={updateHandler}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
