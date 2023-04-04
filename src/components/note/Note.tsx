import React, { useState } from 'react';
import { INote } from 'App';
import { extractHashtags } from 'utils/extractHashtags';

import './note.scss';

interface INoteProps extends INote {
  deleteHandler: (id: number) => void;
  updateHandler: (updatedNote: INote) => void;
}

export default function Note({ title, id, text, tags, deleteHandler, updateHandler }: INoteProps) {
  const [titleValue, setTitleValue] = useState<string>(title);
  const [textValue, setTextValue] = useState<string>(text);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onUpdateNote = (): void => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      const updatedNote: INote = {
        id,
        title: titleValue,
        text: textValue,
        tags: extractHashtags(textValue),
      };
      updateHandler(updatedNote);
    }
  };

  return (
    <>
      <li className="note">
        <div className="note__controls">
          <button onClick={onUpdateNote}>{!isEditing ? 'Редактировать' : 'Сохранить'}</button>
          <button onClick={() => deleteHandler(id)}>Удалить</button>
        </div>
        <div className="note__info">
          <div className="note__info-item">
            <textarea
              className="note__input"
              disabled={!isEditing}
              value={titleValue}
              onInput={(e) => setTitleValue(e.currentTarget.value)}
            />
            <div className="note__title note__value">{titleValue}</div>
          </div>

          <div className="note__info-item">
            <textarea
              className="note__input"
              onInput={(e) => setTextValue(e.currentTarget.value)}
              disabled={!isEditing}
            >
              {textValue}
            </textarea>
            <p className="note__value note__text">
              {textValue.split(' ').map((w, i) => {
                if (w[0] === '#' && isEditing) {
                  return (
                    <span className="hash" key={i}>
                      {w + ' '}
                    </span>
                  );
                }
                return <span key={i}>{w + ' '}</span>;
              })}
            </p>
          </div>
        </div>

        <div className="note__tags">
          {tags?.map((tag) => (
            <span key={tag} className="note__tag">
              {tag}
            </span>
          ))}
        </div>
      </li>
    </>
  );
}
