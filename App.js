/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Matcher from './src/components/Matcher';
import Demo from './src/components/Demo';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Matcher />
        {/* <Demo /> */}
      </SafeAreaView>
    </>
  );
};

export default App;
