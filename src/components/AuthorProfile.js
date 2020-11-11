/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Thumbnail} from 'native-base';

const AuthorProfile = () => {
  return (
    <View style={styles.container}>
        <View style={styles.lineBorder} />
        <TouchableOpacity style={styles.imageAuthor}>
            <Thumbnail source={{uri: 'https://ui-avatars.com/api/?size=60&name=timo'}} />
            <Text style={styles.name}>Jonathan Ringeisen</Text>
        </TouchableOpacity>
        <View style={styles.bio}>
            <Text style={styles.biotext}>
        💻 Programming is the best job in the world! 🤟 https://simonholdorf.com
👨‍💻 Coder
👨‍🚀 Maker -- https://thesmartcoder.dev, https://smartgain.cc
🧙 Writer
🏰 Building an Empire
            </Text>
        </View>
        <View style={styles.btnWrap}>
            <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Follow</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.joined}>
            <Text style={styles.joinText}>JOINED</Text>
            <Text style={styles.joinText}>Jul 30, 2019</Text>
        </View>
    </View>
  );
};

export default AuthorProfile;

const styles = StyleSheet.create({
    container: {
        // paddingBottom: 15,
        marginBottom: 20,
    },
    lineBorder: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#B5BDC4',
        height: 30,
        backgroundColor: '#2e577f',
    },
    parent: {
        paddingHorizontal: 20,
        zIndex: 5,
    },
    imageAuthor: {
        paddingHorizontal: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 5,
        top: -17,
    },
    name: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    bio: {
        paddingHorizontal: 10,
    },
    biotext: {
        fontSize: 15,
        color: 'grey',
        lineHeight: 25,
    },
    btnWrap: {
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    btn: {
        backgroundColor: '#3B49DF',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
    joined: {
        paddingHorizontal: 10,
    },
    joinText: {
        color:'grey',
    },
});
