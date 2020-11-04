import React, {useEffect, ReactDOM} from 'react';
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
  useEffect(() => {
    console.log(props);
  }, []);

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
          onSwipe('like');
        } else {
          // Maybe a misclick / not fully commited
          console.log('more power!');
          springMovement();
        }
      } else {
        // Calculate if the user fully commited to the swiping act
        if (translationX >= width / 3) {
          console.log('you just completed me!');
          onSwipe('nope');
        } else {
          // Maybe a misclick / not fully commited
          console.log('more power!');
          springMovement();
        }
      }
    }
  }

  function onSwipe(action) {
    if (action === 'like') {
      Animated.spring(translationX, {
        toValue: -600,
        duration: 50,
        useNativeDriver: true,
      }).start(() => {
        props.onDelete(props.id);
      });
    } else {
      Animated.spring(translationX, {
        toValue: 600,
        duration: 50,
        useNativeDriver: true,
      }).start(() => {
        props.onDelete(props.id);
      });
    }
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onPanGestureMovement}>
        <Animated.View style={[cardStyle, {zIndex: 1000}]}>
          <View style={[styles.cardContainer]}>
            <ImageBackground
              source={{uri: photo.src.portrait}}
              alt={photo.id}
              style={{height: '100%', width: '100%'}}
              imageStyle={{borderRadius: 10}}>
              <Animated.View style={[styles.nopeBadge, {opacity: nopeOpacity}]}>
                <Text style={styles.nopeText}>NOPE</Text>
              </Animated.View>
              <Animated.View style={[styles.likeBadge, {opacity: likeOpacity}]}>
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>
            </ImageBackground>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  likeBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
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
    left: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: '#ec5288',
  },
  nopeText: {
    fontSize: 24,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: '#ec5288',
  },
});

export default Card;
