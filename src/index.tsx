import { render } from 'react-dom';

import { App } from './App';
import { MoviesContextProvider } from './contexts/MoviesContext';

render(
  <MoviesContextProvider>
    <App />
  </MoviesContextProvider>,
  document.getElementById('root')
);
