import React, { useState, useEffect, useRef } from 'react';
import { Button, View, Text, Alert, Platform, ToastAndroid } from 'react-native';
import axios from 'axios';

import Card from './Card';

function Matcher() {
  const [isReady, setIsReady] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const nextUrl = useRef('https://api.pexels.com/v1/search?query=people')

  function getPeople() {
    console.log(nextUrl.current)
    axios
      .get(nextUrl.current, {
        headers: {
          Authorization:
            '563492ad6f91700001000001f76390e5f9b54cf782a968062f63ce28',
        },
      })
      .then((res) => {
        console.log(res.data.next_page)
        const items = res.data.photos;
        items.forEach(element => {
          element.isSwiped = false;
        });

        nextUrl.current = res.data.next_page
        console.log(profiles.length, profiles)
        console.log(items.length, items)
        setProfiles([...profiles, ...items])
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

  function onDelete(data, index) {
    setProfiles(() => {
      profiles.forEach(element => {
        if (data.id === element.id) {
          element.isSwiped = true
        }
      })

      return profiles
    })

    const sum = profiles.length - index
    if (sum === 5) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('fetching data for you!', ToastAndroid.SHORT)
      } else {
        Alert.alert('fetching data for you!', ToastAndroid.SHORT)
      }

      getPeople()
    }
  }

  return (
    <View style={{ height: '100%' }}>
      {isReady === true ? (
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              borderBottomWidth: 0.5,
            }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Top navigation will be here
            </Text>
          </View>
          <View
            style={{
              position: 'relative',
              flex: 1,
            }}>
            {profiles
              .map((data, index) => {
                if (data.isSwiped === false) {
                  return (
                    <Card
                      key={index}
                      id={data.id}
                      index={index}
                      data={data}
                      onDelete={() => onDelete(data, index)}
                    />
                  );
                }
              })
              .reverse()}
          </View>
          <View
            style={{
              height: 80,
              justifyContent: 'center',
              borderTopWidth: 0.5,
            }}>
            <Text style={{ textAlign: 'center' }}>Bottom action bar here</Text>
            {/* <Button
              title="Check photo check"
              onPress={() => {
              }}
            /> */}
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

export default Matcher;
