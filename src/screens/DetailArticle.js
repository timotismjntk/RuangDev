/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from 'native-base';
import {Thumbnail} from 'native-base';
import Work from '../assets/work.jpeg';
import CommentComponent from '../components/CommentComponent';
import ReadNext from '../components/ReadNext';
import AuthorProfile from '../components/AuthorProfile';
import Footer from '../components/FooterAfterLogin';
import {API_URL} from '@env';
import Moment from 'moment';
import jwt_decode from 'jwt-decode';

// import actions
import getDetailArticleAction from '../redux/actions/getDetailArticle';
import likesAction from '../redux/actions/likes';

// import components
import LoadingModal from '../components/LoadingModal';

const DetailArticle = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(30);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const updateSize = (newheight) => {
    setHeight(newheight);
    console.log(newheight);
  };
  const {id} = route.params;
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch(getDetailArticleAction.getDetailArticles(token, Number(id)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const article = useSelector((state) => state.getDetailArticle);
  const {data, isLoading, isError} = article;

  const profile = useSelector((state) => state.profile.data.results);

  const postLikes = () => {
    dispatch(likesAction.postLikes(token, {postId: id}));
  };
  const likesState = useSelector((state) => state.likes);
  const {isLoading: isLoadingLike, isSuccess: isSuccessLike} = likesState;

  useEffect(() => {
    if (isSuccessLike && !isLoadingLike) {
      dispatch(getDetailArticleAction.getDetailArticles(token, id)).catch(
        (e) => {
          console.log(e.message);
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessLike, isLoadingLike]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <LoadingModal
          duration={100}
          requestLoading={isLoading && !isError ? isLoading : false}
        />
        <View>
          {data && data.newsimage && (
            <Image
              source={{uri: API_URL + data.newsimage}}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{data && data.title}</Text>
          <View style={styles.tagger}>
            {data.Tags
              ? data.Tags.map((el, index) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.tags,
                        index === 0 && {
                          backgroundColor: 'red',
                          marginBottom: 5,
                        },
                        index === 1 && {
                          backgroundColor: 'green',
                          marginBottom: 5,
                        },
                        index === 2 && {
                          backgroundColor: '#3B49DF',
                          marginBottom: 5,
                        },
                        index === 3 && {
                          marginBottom: 5,
                        },
                      ]}
                      key={el.id.toString()}>
                      <Text
                        style={[
                          index === 0 && {
                            color: 'white',
                          },
                          index === 1 && {
                            color: 'white',
                          },
                          index === 2 && {
                            color: 'white',
                          },
                          index === 3 && {
                            color: 'grey',
                          },
                        ]}
                        key={el.id.toString()}>
                        <Text style={{color: 'grey'}}>#</Text>
                        {el.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
          <View style={styles.authorwrap}>
            <TouchableOpacity style={styles.imageAuthor}>
              <Thumbnail
                small
                source={
                  data
                    ? data.Authors
                      ? data.Authors.avatar
                        ? {uri: API_URL + data.Authors.avatar}
                        : {
                            uri: `https://ui-avatars.com/api/?size=50&name=${
                              data ? data.Authors.fullname : 'guest'
                            }`,
                          }
                      : {
                          uri: `https://ui-avatars.com/api/?size=50&name=${
                            data && data.Authors
                              ? data.Authors.fullname
                              : 'guest'
                          }`,
                        }
                    : {
                        uri: `https://ui-avatars.com/api/?size=50&name=${
                          data && data.Authors ? data.Authors.fullname : 'guest'
                        }`,
                      }
                }
              />
              <Text style={styles.name}>
                {data && data.Authors ? data.Authors.fullname : ''}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.text}>
                {Moment(data.createdAt).format('LL')}
              </Text>
              <Text style={[styles.text, styles.middot]}>&middot;</Text>
              <Text style={styles.text}>
                {Math.floor(data.readEstimated)} min read
              </Text>
              <Text style={[styles.text, styles.middot]}>&middot;</Text>
              <Text style={styles.text}>{data.readCount}x views</Text>
            </View>
          </View>
          <View style={styles.contentarticle}>
            <Text style={{fontSize: 20}}>{data.content}</Text>
          </View>
        </View>
        <CommentComponent />
        <View style={styles.lineBorder} />
        {/* <View style={styles.readNext}>
          <ReadNext />
        </View> */}
        <View style={styles.lineBorder} />
        <View style={styles.author}>
          <AuthorProfile data={data.Authors} postId={data.id} />
        </View>
        <Footer />
      </ScrollView>
      <View style={styles.btmNav}>
        <TouchableOpacity style={styles.btn} onPress={() => postLikes()}>
          <Icon
            name={data.isLiked !== null ? 'heart' : 'heart-outline'}
            size={25}
            color="red"
          />
          <Text style={styles.likesCount}>
            {data.likesCount > 0 ? data.likesCount : 0}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setBookmark(!bookmark)}>
          <Icon
            name={bookmark ? 'bookmark' : 'bookmark-outline'}
            size={25}
            color="rgba(0, 0, 0, 0.8)"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="dots-horizontal" size={25} color="rgba(0, 0, 0, 0.8)" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailArticle;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  contentWrapper: {
    padding: 10,
  },
  authorwrap: {
    paddingHorizontal: 5,
    justifyContent: 'space-between',
    // flexDirection: 'row',
    // alignItems: 'center',
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
  tagger: {
    flexDirection: 'row',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  tags: {
    marginRight: 10,
    padding: 4,
    borderRadius: 5,
    alignItems: 'center',
  },
  imageAuthor: {
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageUser: {
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
  middot: {
    fontSize: 30,
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
  btmNav: {
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#eef0f1',
    height: 50,
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 10,
  },
});
