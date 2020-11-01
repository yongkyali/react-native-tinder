import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Animated,
  Button,
} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

function Card(props) {
  const photo = props.data;
  const translationX = new Animated.Value(0);
  const translationY = new Animated.Value(0);
  const width = Dimensions.get('window').width;
  const lastOffset = {x: 0, y: 0};
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
    transform: [
      {translateX: translationX},
      {translateY: translationY},
      {rotateZ: rotationZ},
    ],
  };
  const styles = StyleSheet.create({
    cardContainer: {
      position: 'relative',
      flexDirection: 'row',
      height: 600,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 10,
    },
    likeBadge: {
      position: 'absolute',
      top: 20,
      left: 20,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderWidth: 4,
      borderRadius: 10,
      borderColor: '#6ee3b4',
    },
    likeText: {
      fontSize: 24,
      letterSpacing: 1,
      fontWeight: 'bold',
      color: '#6ee3b4',
    },
    nopeBadge: {
      position: 'absolute',
      top: 20,
      right: 20,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderWidth: 4,
      borderRadius: 10,
      borderColor: '#ec5288',
      // opacity: nopeOpacity,
    },
    nopeText: {
      fontSize: 24,
      letterSpacing: 1,
      fontWeight: 'bold',
      color: '#ec5288',
    },
  });

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
      springMovement();
    }
  }

  return (
    <View style={{position: 'absolute'}}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onPanGestureMovement}>
        <Animated.View style={cardStyle}>
          <View style={styles.cardContainer}>
            <ImageBackground
              source={{uri: photo.src.portrait}}
              alt={photo.id}
              style={{height: '100%', width: '100%'}}
              imageStyle={{borderRadius: 10}}>
              <Animated.View style={[styles.likeBadge, {opacity: likeOpacity}]}>
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>
              <Animated.View style={[styles.nopeBadge, {opacity: nopeOpacity}]}>
                <Text style={styles.nopeText}>NOPE</Text>
              </Animated.View>
            </ImageBackground>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

export default Card;
