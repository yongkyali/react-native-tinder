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

function Card(props) {
  const photo = props.data;

  return (
    <View style={[styles.cardContainer]}>
      <ImageBackground
        source={{uri: photo.src.portrait}}
        alt={photo.id}
        style={{height: '100%', width: '100%'}}
        imageStyle={{borderRadius: 10}}>
        <Animated.View style={[styles.nopeBadge, {opacity: props.nopeOpacity}]}>
          <Text style={styles.nopeText}>NOPE</Text>
        </Animated.View>
        <Animated.View style={[styles.likeBadge, {opacity: props.likeOpacity}]}>
          <Text style={styles.likeText}>LIKE</Text>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

Card.defaultProps = {
  likeOpacity: 0,
  nopeOpacity: 0,
};

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
