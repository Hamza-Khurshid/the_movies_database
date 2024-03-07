import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {Header} from '../../components/header';
import {MovieCard} from '../../components/movieCard';
import getTrendingMovies from '../../api/getTrendingMovies';
import getLatestMovies from '../../api/getLatestMovies';
import {useNavigation} from '@react-navigation/core';
import {Movie} from '../../types/index';

const MovieList = () => {
  const navigation = useNavigation();
  const [type, setType] = useState('trending');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loader, setLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchMovies(type, currentPage);
  }, [currentPage, type]);

  const fetchMovies = async (contentType: string, page: number) => {
    try {
      page === 1 ? setLoader(true) : setIsLoadingMore(true);
      const response = await (contentType === 'trending'
        ? getTrendingMovies(currentPage)
        : getLatestMovies(currentPage));
      setTotalPages(response.totalPages);
      page > 1
        ? setMovies(prevMovies => [...prevMovies, ...response.results])
        : setMovies(response.results);
    } catch (error) {
      console.error('Error fetching latest movies:', error);
    } finally {
      setIsRefreshing(false);
      setIsLoadingMore(false);
      setLoader(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoadingMore) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchMovies(type, 1);
  };

  const goMovieDetails = item => {
    navigation.navigate('MovieDetail', {id: item?.id});
  };

  const handleType = (type: string) => {
    setType(type);
    setCurrentPage(1);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Header handleType={handleType} type={type} />
      {loader ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({item}: {item: Movie}) => (
            <TouchableOpacity onPress={() => goMovieDetails(item)}>
              <MovieCard key={item.id} item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          ListFooterComponent={() =>
            isLoadingMore && <ActivityIndicator size="small" color="#0000ff" />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MovieList;
