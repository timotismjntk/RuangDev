import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Moment from 'moment';
import {useNavigation} from '@react-navigation/native';

// import actions
import authorArticlesAction from '../redux/actions/author';

const AuthorArticles = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(authorArticlesAction.authorArticles(token, props.id)).catch(
      (e) => {
        console.log(e.message);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listArticle = useSelector((state) => state.author);
  const {data, isLoading} = listArticle;

  const navigation = useNavigation();

  const detailArticle = (itemId) => {
    navigation.navigate('detailArticle', {
      id: Number(itemId),
    });
  };

  const newsItem = ({item, onPress, style}) => (
    <View style={styles.parent}>
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

export default AuthorArticles;

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
