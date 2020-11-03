import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import axios from 'axios';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import Card from './Card';

function Matcher() {
  const [isReady, setIsReady] = useState(false);
  const [profiles, setProfiles] = useState([]);

  function getPeople() {
    axios
      .get('https://api.pexels.com/v1/search?query=people', {
        headers: {
          Authorization:
            '563492ad6f91700001000001f76390e5f9b54cf782a968062f63ce28',
        },
      })
      .then((res) => {
        setProfiles(res.data.photos);
      });
  }

  useEffect(() => {
    getPeople();
  }, []);

  useEffect(() => {
    if (profiles.length > 0) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [profiles]);

  const translationX = new Animated.Value(0);
  const translationY = new Animated.Value(0);
  const width = Dimensions.get('window').width;
  const rotationZ = translationX.interpolate({
    inputRange: [-width / 2, width / 2],
    outputRange: ['15deg', '-15deg'],
    extrapolate: 'clamp',
  });
  const likeOpacity = translationX.interpolate({
    inputRange: [-214 / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const nopeOpacity = translationX.interpolate({
    inputRange: [0, 214 / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const springMovement = () => {
    Animated.spring(translationX, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.spring(translationY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const cardStyle = {
    height: '100%',
    transform: [
      {translateX: translationX},
      {translateY: translationY},
      {rotateZ: rotationZ},
    ],
  };

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translationX,
          translationY: translationY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  function onPanGestureMovement(event) {
    if (event.nativeEvent.state === State.END) {
      const {translationX} = event.nativeEvent;
      let direction;
      if (translationX < 0) {
        // If user swipe to the left
        direction = 'left';
      } else {
        // If user swipe to the right
        direction = 'right';
      }
      if (direction === 'left') {
        // Calculate if the user fully commited to the swiping act
        if (width / 3 <= translationX * -1) {
          // Fully commited, run the act
          console.log('you just completed me!');
          swiped('like', profiles[0]);
        } else {
          // Maybe a misclick / not fully commited
          console.log('more power!');
          springMovement();
        }
      } else {
        // Calculate if the user fully commited to the swiping act
        if (translationX >= width / 3) {
          console.log('you just completed me!');
          swiped('nope', profiles[0]);
        } else {
          // Maybe a misclick / not fully commited
          console.log('more power!');
          springMovement();
        }
      }
    }
  }

  function swiped(action, profile) {
    console.log(action, profile);
    if (action === 'like') {
      Animated.spring(translationX, {
        toValue: -600,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translationX, {
        toValue: 600,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }

    setTimeout(() => {
      setProfiles(() => {
        const newState = [...profiles];
        return newState.slice(1);
      });
    }, 300);
  }

  return (
    <View style={{height: '100%'}}>
      {isReady === true ? (
        <View style={{flex: 1}}>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              borderBottomWidth: 0.5,
            }}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              Top navigation will be here
            </Text>
          </View>
          <View
            style={{
              position: 'relative',
              flex: 1,
            }}>
            {(() => {
              let _profiles = [...profiles].reverse();
              let arr = [];
              _profiles.map((data, index) => {
                if (index < _profiles.length - 1) {
                  arr.push(<Card key={index} data={data} />);
                }
              });
              return arr;
            })()}

            <PanGestureHandler
              onGestureEvent={onGestureEvent}
              onHandlerStateChange={onPanGestureMovement}>
              <Animated.View style={[cardStyle, {zIndex: 1000}]}>
                <Card data={profiles[0]} {...{likeOpacity, nopeOpacity}} />
              </Animated.View>
            </PanGestureHandler>
          </View>
          <View
            style={{
              height: 80,
              justifyContent: 'center',
              borderTopWidth: 0.5,
            }}>
            {/* <Text style={{textAlign: 'center'}}>Actions will be put here</Text> */}
            <Button
              title="Check photo check"
              onPress={() => {
                // console.log(translationX);
              }}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text>Loading data...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

export default Matcher;
