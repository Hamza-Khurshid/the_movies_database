import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface Props {
  title: string;
  active: boolean;
  type?: string;
  onPress: () => void;
}

const Index: React.FC<Props> = ({title, active, onPress, type}) => {
  return (
    <TouchableOpacity
      style={[
        active ? styles.container : styles.subContainer,
        type === 'light' && {borderColor: '#fff'},
      ]}
      onPress={onPress}>
      <Text
        style={[
          active ? styles.text : styles.subText,
          type === 'light' && {color: '#fff'},
        ]}>
        {title || 'Watch Latest'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#042541',
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 35,
    borderRadius: 50,
  },
  subContainer: {
    borderColor: '#042541',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 35,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
  subText: {
    color: '#042541',
    fontSize: 12,
  },
});
export default Index;
