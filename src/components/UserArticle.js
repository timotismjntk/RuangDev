/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Thumbnail} from 'native-base';

const UserArticle = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>My article</Text>
        <View style={styles.underline} />
        <View style={styles.parent}>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.newstitle}>The missing Docker Cheatheet</Text>
                <View style={styles.textinfo}>
                    <Text style={styles.date}>Feb 18</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.parent}>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.newstitle}>The missing Docker Cheatheet</Text>
                <View style={styles.textinfo}>
                    <Text style={styles.date}>Feb 18</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.parent}>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.newstitle}>The missing Docker Cheatheet</Text>
                <View style={styles.textinfo}>
                    <Text style={styles.date}>Feb 18</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default UserArticle;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
    },
    parent: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        // backgroundColor: '#3B49DF',
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 5,
        height: 60,
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    underline: {
        position: 'relative',
        top: -20,
        borderBottomWidth: 4,
        // borderRightWidth: 3,
        height: 10,
        width: 120,
        borderColor: '#3B49DF',
        marginBottom: 10,
    },
    newstitle: {
        fontSize: 18,
        fontWeight: '900',
    },
    item: {
        // marginLeft: 15,
        flex: 1,
    },
    textinfo: {
        flexDirection: 'row',
    },
    date: {
        color: 'grey',
    },
});
