import { useEffect } from 'react';
import { api } from '../services/api';
import { Button } from './Button';
import { GenreResponseProps } from '../@types/types';
import { useMoviesContext } from '../contexts/MoviesContext';
import '../styles/sidebar.scss';

export function SideBar() {
  const { selectedGenreId, setSelectedGenreId, genres, setGenres } =
    useMoviesContext();

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
