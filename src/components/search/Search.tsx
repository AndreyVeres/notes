import React from 'react';
import { useInput } from 'hooks/useInput';

interface ISearchProps {
  filter: ReturnType<typeof useInput>;
}

export default function Search({ filter }: ISearchProps) {
  return <input type="search" placeholder="Find note by hash" {...filter} />;
}
