import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { api } from './services/api';

import './styles/global.scss';
import { useEffect, useState } from 'react';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });    
  }, []);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);    
  }

  
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    
      <SideBar genres={genres} handleClickButton={handleClickButton} selectedGenreId={selectedGenreId} />
      <Content selectedGenreId={selectedGenreId} />
    </div>
  )
}