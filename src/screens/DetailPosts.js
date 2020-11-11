/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, ScrollView, FlatList, TextInput, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from 'native-base';
import {Thumbnail} from 'native-base';
import Work from '../assets/work.jpeg';
import CommentComponent from '../components/CommentComponent';
import ReadNext from '../components/ReadNext';
import AuthorProfile from '../components/AuthorProfile';
import Footer from '../components/FooterBeforeLogin';


const DetailPosts = () => {
    const [height, setHeight] = useState(30);
    const updateSize = (newheight) => {
        setHeight(newheight);
        console.log(newheight);
    };
    const data = [{
        name: 'timo',
      }];
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                {data.length ? <Image source={Work} style={styles.image} /> : null}
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>Laravel Collection Save The Day!</Text>
                <View style={styles.tag}>
                    <Text style={styles.tagtext}>#laravel</Text>
                    <Text style={styles.tagtext}>#php</Text>
                    <Text style={styles.tagtext}>#mysql</Text>
                </View>
                <View style={styles.authorwrap}>
                    <TouchableOpacity style={styles.imageAuthor}>
                        <Thumbnail small source={{uri: 'https://ui-avatars.com/api/?size=50&name=timo'}} />
                        <Text style={styles.name}>Jonathan Ringeisen</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>Nov 11</Text>
                    <Text style={styles.text}>&middot;</Text>
                    <Text style={styles.text}>2 min read</Text>
                </View>
                <View style={styles.contentarticle}>
                    <Text>
                    If you use Laravel as a framework and you write a lot of tests you have most likely run into this situation.

The Issue
I recently created a test for one of my controllers and it was throwing an error because I was using DATE_FORMAT() which is not a valid function for SQLite. Most of us use SQLite for testing and MySQL for production. Below is the snippet of code I was using to create an array like this ['November => 2]. I need to group the data into months then get a count of the data for each month in order to display on a chart. The function below works great but fails when you create a test and are using SQLite.
                    </Text>
                </View>
            </View>
            <View style={styles.commentSection}>
                <Text style={styles.commentSectionTitle}>Discussion</Text>
                <View style={styles.commentSectionInput}>
                    <View>
                        <TouchableOpacity style={styles.imageAuthor}>
                            <Thumbnail small source={{uri: 'https://ui-avatars.com/api/?size=50&name=timo'}} />
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={styles.placeholder}>Add to the discussion</Text> */}
                    {/* <TextInput
                        placeholder="Add to the discussion"
                        multiLine={true}
                        editable={true}
                        numberOfLines={3}
                        textAlign="left"
                        onSubmitEditing={false}
                        style={[styles.inputComment, {height: height}]}
                        onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
                        /> */}
                        <CommentComponent />
                </View>
            </View>
            <View style={styles.lineBorder} />
            <View style={styles.readNext}>
                <ReadNext />
            </View>
            <View style={styles.lineBorder} />
            <View style={styles.author}>
                <AuthorProfile />
            </View>
            <Footer />
        </ScrollView>
    );
};

export default DetailPosts;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    contentWrapper: {
        padding: 10,
    },
    authorwrap: {
        width: '80%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 180,
        // resizeMode: 'contain',
    },
    tag: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    tagtext: {
        marginRight: 10,
    },
    imageAuthor: {
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        color: 'black',
        fontSize: 15,
        marginHorizontal: 5,
    },
    text: {
        color: 'grey',
        marginRight: 5,
    },
    contentarticle: {
        marginTop: 20,
        paddingBottom: 10,
    },
    commentSection: {
        padding: 10,
    },
    commentSectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    commentSectionInput: {
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
    },
    placeholder: {
        position: 'absolute',
        marginLeft: 50,
        marginTop: 10,
    },
    inputComment: {
        borderWidth: 1,
        borderColor: '#B5BDC4',
        borderRadius: 6,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lineBorder: {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#B5BDC4',
        height: 15,
        backgroundColor: '#EEF0F1',
    },
    readNext: {
        padding: 10,
    },
    footer: {
        backgroundColor: '#d2d6db',
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        borderTopWidth: 0.5,
        borderColor: 'grey',
        paddingTop: 20,
    },
      group: {
        flexDirection: 'column',
        marginRight: 80,
    },
      grouptext: {
        color: '#000000',
        marginBottom: 20,
    },
});
