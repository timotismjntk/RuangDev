/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from 'native-base';
import {Thumbnail} from 'native-base';
import Work from '../assets/work.jpeg';

const Home = () => {
  const [selected, setSelected] = useState('');
  // const [s]
  const newsItem = ({ item, onPress, style }) => (
    <View>
      <View style={styles.imageContainer}>
        <Thumbnail small source={{uri: 'https://ui-avatars.com/api/?size=50&name=timo'}} />
      </View>
    </View>
  );
  const data = [{
    name: 'timo',
  }];
  console.log(data.length);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.nav}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity>
              <Icon name="database" size={35} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Posts</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.btnSort}>
              <View style={{backgroundColor: 'white', borderRadius: 5}}>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 98, color: 'black', height: 38 }}
                  selectedValue={selected}
                  onValueChange={(value)=>{setSelected(value);}}
                >
                  <Picker.Item label="New" value="key0" />
                  <Picker.Item label="Favorites" value="key1" />
                </Picker>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="lightning-bolt-outline" size={35} color="white" />
            </TouchableOpacity>
          </View>
      </View>
      <View>
        {/* <FlatList
          // data={info}
          renderItem={newsItem}
          // keyExtractor={(item) => item.id}
          // extraData={selectedId}
        /> */}
      <View>
      <TouchableOpacity style={styles.articleItem}>
        {data.length ? <Image source={Work} style={styles.image} /> : null}
        <View style={styles.articlewrap}>
          <TouchableOpacity style={styles.imageContainer}>
            <Thumbnail small source={{uri: 'https://ui-avatars.com/api/?size=50&name=timo'}} />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text>Douglas Parsons</Text>
            <Text>Nov 10</Text>
            <Text style={styles.contenttitle}>Write better code and be a better programmer by NEVER USING ELSE statements</Text>
            <Text>#webdev #go #javascript #beginners</Text>
            <View style={styles.likecomment}>
              <TouchableOpacity style={styles.btnlikecomment}>
                <Icon name="heart-outline" size={20} style={{marginRight: 10}} />
                <Text>40</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Icon name="comment-outline" size={20} style={{marginRight: 10}} />
                <Text>10</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.articleItem}>
        {data.length ? <Image source={Work} style={styles.image} /> : null}
        <View style={styles.articlewrap}>
          <TouchableOpacity style={styles.imageContainer}>
            <Thumbnail small source={{uri: 'https://ui-avatars.com/api/?size=50&name=timo'}} />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text>Douglas Parsons</Text>
            <Text>Nov 10</Text>
            <Text style={styles.contenttitle}>Write better code and be a better programmer by NEVER USING ELSE statements</Text>
            <Text>#webdev #go #javascript #beginners</Text>
            <View style={styles.likecomment}>
              <TouchableOpacity style={styles.btnlikecomment}>
                <Icon name="heart-outline" color="#ff2052" size={20} style={{marginRight: 10}} />
                <Text>40</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Icon name="comment-outline" size={20} style={{marginRight: 10}} />
                <Text>10</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        // padding: 20,
    },
    nav: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#08090A',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      marginLeft: 10,
      fontSize: 20,
      color: 'white',
    },
    btnSort: {
      borderRadius: 8,
      borderWidth: 1,
      borderBottomWidth: 4.5,
      borderRightWidth: 4.5,
      borderColor: '#B5BDC4',
      marginRight: 10,
    },
    articleItem: {
      borderBottomWidth: 1,
      borderColor: 'grey',
      // paddingTop: 10,
      paddingBottom: 10,
    },
    articlewrap: {
      flexDirection: 'row',
      width: '100%',
      padding: 10,
    },
    image: {
      width: '100%',
      height: 180,
      // resizeMode: 'contain',
    },
    content: {
      width: '90%',
      marginLeft: 10,
    },
    contenttitle: {
      fontSize: 20,
      fontWeight: 'bold',
  },
  likecomment: {
    flexDirection: 'row',
    marginTop: 10,
  },
  btnlikecomment: {
    flexDirection: 'row',
    marginRight: 25,
  },
});
