import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';

import Card from './Card';

function Matcher() {
  const [isReady, setIsReady] = useState(false);
  const [photos, setPhotos] = useState([]);

  function getPeople() {
    axios
      .get('https://api.pexels.com/v1/search?query=people', {
        headers: {
          Authorization:
            '563492ad6f91700001000001f76390e5f9b54cf782a968062f63ce28',
        },
      })
      .then((res) => {
        setPhotos(res.data.photos);
      });
  }

  useEffect(() => {
    getPeople();
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [photos]);

  return (
    <View style={{height: '100%'}}>
      {isReady === true ? (
        <View style={{position: 'relative'}}>
          {photos.map((data, index) => {
            return <Card key={index} data={data} />;
          })}
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
