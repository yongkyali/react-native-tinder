import React, {useRef, useEffect} from 'react';
import {Button, View, Text, StyleSheet, Animated} from 'react-native';

function Demo() {
  const xPosition = useRef(new Animated.Value(0)).current;
  const fadeValue = xPosition.interpolate({
    inputRange: [0, 200],
    outputRange: [0.5, 1],
  });

  useEffect(() => {
    reanimate();
  });

  function reanimate() {
    Animated.spring(xPosition, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  function reset() {
    Animated.spring(xPosition, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to reanimated!</Text>
        <Animated.View
          style={[
            styles.boxStyle,
            {
              transform: [{translateX: xPosition}],
              opacity: fadeValue,
            },
          ]}
        />
        <View style={{marginTop: 15}}>
          <Button title="Reanimate!" onPress={() => reanimate()} />
          <Button
            title="Check your rotation!"
            onPress={() => {
              reset();
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 15,
  },
  boxStyle: {
    width: 100,
    height: 100,
    backgroundColor: '#3f3f3f',
    borderRadius: 10,
  },
});

export default Demo;
