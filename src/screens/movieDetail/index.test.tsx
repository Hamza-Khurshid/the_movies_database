import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import MovieDetail from '../MovieDetail';

jest.mock('../../api/getMoviesDetail');

describe('MovieDetail component', () => {
  it('renders loading indicator when loading is true', () => {
    const {getByTestId} = render(<MovieDetail route={{params: {id: 123}}} />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders movie details when loading is false', async () => {
    const {getByTestId, queryByTestId} = render(
      <MovieDetail route={{params: {id: 123}}} />,
    );
    await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());
    expect(getByTestId('movie-details')).toBeTruthy();
  });

  it('fetches movie details on mount', async () => {
    const {getByTestId} = render(<MovieDetail route={{params: {id: 123}}} />);
    await waitFor(() => expect(getByTestId('movie-details')).toBeTruthy());
  });
});
