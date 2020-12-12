import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Moment from 'moment';
import {useNavigation} from '@react-navigation/native';

// import actions
import myArticleAction from '../redux/actions/myArticle';

const UserArticle = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(myArticleAction.myArticles(token)).catch((e) => {
      console.log(e.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listArticle = useSelector((state) => state.myArticles);
  const {data, isLoading} = listArticle;

  const navigation = useNavigation();

  const detailArticle = (itemId) => {
    navigation.navigate('detailArticle', {
      id: Number(itemId),
    });
  };

  const newsItem = ({item, onPress, style}) => (
    <View style={styles.parent}>
      <Text style={styles.title}>My article</Text>
      <View style={styles.underline} />
      <View style={styles.wrap}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => detailArticle(item.id)}>
          <Text style={styles.newstitle}>{item.title}</Text>
          <View style={styles.textinfo}>
            <Text style={styles.date}>
              {Moment(item.createdAt).format('LL')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {data && !isLoading && (
        <FlatList
          data={data}
          renderItem={newsItem}
          keyExtractor={(item) => item && item.id.toString()}
          ListHeaderComponent={props.header}
          ListFooterComponent={props.footer}
        />
      )}
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
    paddingHorizontal: 10,
  },
  wrap: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    height: 80,
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
    padding: 5,
  },
  textinfo: {
    flexDirection: 'row',
  },
  date: {
    color: 'grey',
  },
});
