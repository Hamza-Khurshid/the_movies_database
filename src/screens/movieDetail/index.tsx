import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import getMoviesDetail from '../../api/getMoviesDetail';
import {styles} from './style';
import Button from '../../components/button';
import {MovieDetails} from '../../types/index';

const MovieDetail = ({route}: any) => {
  const [data, setData] = useState<MovieDetails>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {id} = route.params;

  useEffect(() => {
    fetchMoviesDetail();
  }, []);

  const fetchMoviesDetail = async () => {
    setLoading(true);
    const response = await getMoviesDetail(id);
    setLoading(false);
    setData(response);
  };

  console.log('data to be', data);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {loading ? (
          <View style={styles.ind}>
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : (
          <View>
            <View>
              <ImageBackground
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${data?.backdropPath}`,
                }}
                resizeMode="cover"
                style={styles.image}>
                <View style={styles.button_Container}>
                  <Button title="Watch Now" type="light" />
                  <Button title="Add a Watch List" type="light" />
                </View>
              </ImageBackground>
            </View>
            <View style={styles.sec_container}>
              <View style={styles.text_Container}>
                <View>
                  <Text style={styles.heading}>
                    {data?.originalTitle || data?.title}
                  </Text>
                  <Text style={styles.date}>{data?.releaseDate}</Text>
                </View>
                <View>
                  <Text style={styles.heading}>Vote Count</Text>
                  <Text style={styles.date}>{data?.voteCount}</Text>
                </View>
              </View>
              <View style={styles.story_container}>
                <Text style={styles.heading}>Overview</Text>
                <Text style={styles.detail_text}>{data?.overview}</Text>
              </View>

              <View style={styles.story_containers}>
                <Text style={styles.heading}>Genres</Text>
                <Text style={styles.detail_text}>
                  {data?.genres?.map((item: any) => item.name).join(', ')}
                </Text>
              </View>

              <View style={styles.text_Container}>
                <View>
                  <Text style={styles.heading}>Average Vote</Text>
                  <Text style={styles.date}> {data?.voteAverage}</Text>
                </View>
                <View>
                  <Text style={styles.heading}>Status</Text>
                  <Text style={styles.date}>{data?.status}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetail;
