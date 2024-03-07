import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../components/button';

export const Header = ({handleType, type}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginTop: 20,
      }}>
      <CustomButton
        title="Trending"
        onPress={() => handleType('trending')}
        active={type === 'trending'}
      />
      <CustomButton
        title="Popular"
        onPress={() => handleType('popular')}
        active={type === 'popular'}
      />
    </View>
  );
};
