import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';
import { GenreResponseProps, MovieProps } from '../@types/types';

interface MoviesContextData {
  selectedGenreId: number;
  setSelectedGenreId: Dispatch<SetStateAction<number>>;
  genres: GenreResponseProps[];
  setGenres: Dispatch<SetStateAction<GenreResponseProps[]>>;
  movies: MovieProps[];
  setMovies: Dispatch<SetStateAction<MovieProps[]>>;
  selectedGenre: GenreResponseProps;
  setSelectedGenre: Dispatch<SetStateAction<GenreResponseProps>>;
  handleClickButton: (id: number) => void;
}

interface Props {
  children: ReactNode;
}

const MoviesContext = createContext({} as MoviesContextData);

export const MoviesContextProvider = ({ children }: Props) => {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then(response => {
        setMovies(response.data);
      });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MoviesContext.Provider
      value={{
        selectedGenreId,
        setSelectedGenreId,
        genres,
        setGenres,
        movies,
        setMovies,
        selectedGenre,
        setSelectedGenre,
        handleClickButton,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export function useMoviesContext() {
  const context = useContext(MoviesContext);

  if (!context)
    throw new Error(
      'useMoviesContext must be used within a MoviesContextProvider'
    );

  return context;
}
