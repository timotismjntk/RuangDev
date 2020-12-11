/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { BottomSheet, RadioButton  } from 'react-native-btr';

export default function TopTabModal() {
    const [isActive, setIsActive] = useState(false);
    const toggleModal = () => {
        setIsActive(!isActive);
    };
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={toggleModal}>
            <Text>Open</Text>
        </TouchableOpacity>
      <BottomSheet
        visible={isActive}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}>
        <View style={styles.modalColor}>
            {/* <View style={styles.line}><Image source={Line} /></View> */}
            <View style={styles.bottomModalColor}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 20, color: 'black'}}><Text style={{color: '#3b49df', fontSize: 20}}>RuangDev</Text> is a comunity of awesome indonesia developers</Text>
                </View>
                <Text style={{color: 'grey'}}>We'are a place where coders share, stay up-to-date and grow thir career</Text>
                <TouchableOpacity style={styles.auth}>
                    <Text style={{color: 'white'}}>Create new account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.auth, {backgroundColor: '#fffff9'}]}>
                    <Text style={{color: '#3b49df'}}>Log in</Text>
                </TouchableOpacity>
                <View style={styles.lineBorder} />
                <Text style={{marginTop: 15, color: 'grey'}}>About RuangDev</Text>
                <Text style={{marginTop: 15, color: 'grey'}}>Learn More</Text>
            </View>
        </View>
        </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalColor: {
    backgroundColor: '#F9F9F9',
    width: '95%',
    justifyContent: 'center',
    height: 350,
    borderRadius: 5,
    borderWidth: 3,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    alignItems: 'center',
    padding: 20,
    marginLeft: 9,
    transform: [
        {translateY: -Dimensions.get('window').height * 0.24},
        {translateX: 0},
        {'rotateX': '0deg'},
    ],
  },
  bottomModalColor: {
    flex: 1,
    borderRadius: 15,
    // flexDirection: 'row',
    width: '100%',
    // justifyContent: 'space-around',
    // flexWrap: 'wrap',
    marginTop: 25,
    // backgroundColor: 'red',
    // justifyContent: 'center',
  },
  auth: {
      marginTop: 15,
      height: 35,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3b49df',
    },
    lineBorder: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#B5BDC4',
        height: 2,
        marginLeft: -18,
        marginTop: 15,
        width: '112%',
        backgroundColor: '#EEF0F1',
    },
});
