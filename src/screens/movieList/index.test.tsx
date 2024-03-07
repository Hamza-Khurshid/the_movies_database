import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import MovieList from '../MovieList';

jest.mock('../../api/getTrendingMovies');
jest.mock('../../api/getLatestMovies');
jest.mock('@react-navigation/core', () => ({
  useNavigation: jest.fn(() => ({navigate: jest.fn()})),
}));

describe('MovieList component', () => {
  it('renders loading indicator when loader state is true', () => {
    const {getByTestId} = render(<MovieList />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders list of movies when loader state is false', async () => {
    const {getByTestId, queryByTestId} = render(<MovieList />);
    await waitFor(() => expect(queryByTestId('loading-indicator')).toBeNull());
    expect(getByTestId('movie-list')).toBeTruthy();
  });

  it('calls fetchMovies with correct parameters when refreshing', async () => {
    const fetchMoviesMock = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce([false, jest.fn()])
      .mockReturnValueOnce(['', jest.fn()])
      .mockReturnValueOnce([1, jest.fn()])
      .mockReturnValueOnce([fetchMoviesMock, jest.fn()]);

    const {getByTestId} = render(<MovieList />);
    fireEvent(getByTestId('movie-list'), 'refresh');
    await waitFor(() => expect(fetchMoviesMock).toHaveBeenCalledWith('', 1));
  });

  it('calls goMovieDetails when a movie is pressed', async () => {
    const {getByTestId} = render(<MovieList />);
    fireEvent.press(getByTestId('movie-card'));
    await waitFor(() =>
      expect(
        require('@react-navigation/core').useNavigation().navigate,
      ).toHaveBeenCalled(),
    );
  });
});
