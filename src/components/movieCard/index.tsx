import React from 'react';
import {View, Image, Text, StyleSheet, ImageSourcePropType} from 'react-native';
import moment from 'moment';
import {Movie} from '../../types';
interface MovieCardProps {
  item: Movie;
}
export const MovieCard = ({item}: MovieCardProps) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{uri: `https://image.tmdb.org/t/p/w500/${item?.posterPath}`}}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item?.title}</Text>
        <Text style={styles.desc}>{item?.overview}</Text>
        <Text style={styles.age}>
          {moment(new Date(item?.releaseDate)).format('MMM DD, YYYY')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 450,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    objectFit: 'cover',
  },
  textContainer: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  age: {
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'right',
    paddingTop: 10,
  },
  desc: {
    fontSize: 12,
    color: '#888',
    textAlign: 'left',
    paddingTop: 10,
  },
});
