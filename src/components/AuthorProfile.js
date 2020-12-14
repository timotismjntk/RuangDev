import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Thumbnail} from 'native-base';
import {API_URL} from '@env';
import jwt_decode from 'jwt-decode';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import {useNavigation} from '@react-navigation/native';

// import actions
import getDetailArticleAction from '../redux/actions/getDetailArticle';

const AuthorProfile = (props) => {
  const token = useSelector((state) => state.auth.token);
  const {id: userId} = jwt_decode(token);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {data, postId: newsId} = props;

  const viewAuthorProfile = async (authorId) => {
    if (userId === authorId) {
      navigation.navigate('UserProfile');
    } else {
      try {
        await dispatch(getDetailArticleAction.getDetailArticles(token, newsId));
        navigation.navigate('AuthorProfileDetail', {
          id: authorId,
        });
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.lineBorder} />
      <View style={styles.authorWrap}>
        <TouchableOpacity
          style={styles.imageAuthor}
          onPress={() => {
            viewAuthorProfile(data.id);
          }}>
          <Thumbnail
            source={
              data
                ? data.avatar
                  ? {uri: API_URL + data.avatar}
                  : {
                      uri: `https://ui-avatars.com/api/?size=50&name=${
                        data ? data.fullname : 'guest'
                      }`,
                    }
                : {
                    uri: `https://ui-avatars.com/api/?size=50&name=${
                      data ? data.fullname : 'guest'
                    }`,
                  }
            }
          />
        </TouchableOpacity>
        <Text style={styles.name}>{data && data.fullname}</Text>
      </View>
      <View style={styles.bio}>
        <Text style={styles.biotext}>404 Bio not found!</Text>
      </View>
      <View style={styles.joined}>
        <Icon name="cake" size={25} color="grey" />
        <Text style={styles.joinText}>Joined on</Text>
        <Text style={styles.joinText}>
          {data ? Moment(data.createdAt).format('LL') : ''}
        </Text>
        <TouchableOpacity style={styles.github}>
          <Icon name="github" size={25} color="grey" />
        </TouchableOpacity>
      </View>
      {data && userId !== data.id && (
        <View style={styles.btnWrap}>
          <TouchableOpacity style={styles.btn} disabled={true}>
            <Text style={styles.btnText}>Follow</Text>
          </TouchableOpacity>
        </View>
      )}
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
    height: 40,
    backgroundColor: '#2e577f',
  },
  parent: {
    paddingHorizontal: 20,
    zIndex: 5,
  },
  authorWrap: {
    flexDirection: 'row',
  },
  imageAuthor: {
    paddingHorizontal: 10,
    position: 'relative',
    zIndex: 5,
    top: -15,
  },
  name: {
    marginLeft: 5,
    marginTop: 15,
    fontSize: 25,
    fontWeight: 'bold',
    top: -15,
  },
  bio: {
    paddingHorizontal: 10,
  },
  biotext: {
    fontSize: 15,
    color: 'black',
    lineHeight: 25,
  },
  joined: {
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinText: {
    color: 'grey',
    marginLeft: 10,
  },
  github: {
    marginLeft: 10,
  },
  btnWrap: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  btn: {
    opacity: 1,
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
});
