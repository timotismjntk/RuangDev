/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Thumbnail} from 'native-base';

const ReadNext = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Read next</Text>
        <View style={styles.parent}>
            <TouchableOpacity style={styles.imageAuthor}>
                <Thumbnail source={{uri: 'https://ui-avatars.com/api/?size=50&name=Jonathan'}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.newstitle}>The missing Docker Cheatheet</Text>
                <View style={styles.textinfo}>
                    <Text style={styles.name}>Jonathan Ringeisen</Text>
                    <Text style={styles.date}>  -  </Text>
                    <Text style={styles.date}>Feb 18</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.parent}>
            <TouchableOpacity style={styles.imageAuthor}>
                <Thumbnail source={{uri: 'https://ui-avatars.com/api/?size=50&name=jsmanifest'}} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.newstitle}>12 VSCode Shortcuts and Tactics to Ease Development</Text>
                <View style={styles.textinfo}>
                    <Text style={styles.name}>jsmanifest</Text>
                    <Text style={styles.date}>  -  </Text>
                    <Text style={styles.date}>Feb 18</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ReadNext;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
    },
    parent: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    newstitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    item: {
        marginLeft: 15,
        flex: 1,
    },
    textinfo: {
        flexDirection: 'row',
    },
    name: {
        color: 'grey',
    },
    date: {
        color: 'grey',
    },
});
