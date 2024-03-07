import {SafeAreaView, View} from 'react-native';
import React from 'react';
import {StackNavigation} from './src/navigation/stackNavigation';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StackNavigation />
    </SafeAreaView>
  );
};

export default App;
