import React, {useState, useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import axios from 'axios';

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
        const _profiles = res.data.photos.map((item) => {
          item.isSwiped = false;
          return item;
        });

        setProfiles(_profiles);
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

  function onDelete(id) {
    const _newState = profiles.map((item) => {
      // console.log(item);
      if (item.id === id) {
        // console.log(item);
        item.isSwiped = true;
        console.log(item);
      }

      return item;
    });
    setProfiles(_newState);
    // const _newState = profiles.filter((item, index) => {
    //   console.log(index);
    //   if (item.id !== id) {
    //     return index;
    //   }
    // });
    // console.log(_newState);

    // console.log(event);
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
            {profiles
              .map((data, index) => {
                console.log(data);
                if (data.isSwiped === false) {
                  return (
                    <Card
                      key={index}
                      id={data.id}
                      data={data}
                      onDelete={onDelete}
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

export default Matcher;
