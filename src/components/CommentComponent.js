/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Keyboard,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Thumbnail} from 'native-base';
import {API_URL} from '@env';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';

// import actions
import commentsActions from '../redux/actions/comments';

const MultiLineTextInput = (props) => {
  const [shadow, setShadow] = useState('#B5BDC4');
  const [bottom, setBottom] = useState(2);
  let styleCustom = {
    borderColor: shadow,
    borderBottomWidth: bottom,
    borderRightWidth: 7,
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setShadow('#3B49DF');
    setBottom(4);
  };
  const _keyboardDidHide = () => {
    setShadow('#B5BDC4');
    setBottom(1);
  };

  return (
    <TextInput
      {...props}
      onFocus={() => {
        setShadow('#3B49DF');
        setBottom(4);
      }}
      onBlur={() => {
        setShadow('#B5BDC4');
        setBottom(1);
      }}
      multiline={true}
      numberOfLines={4}
      editable={true}
      // maxLength={40}
      placeholder="Add to the discussion"
      style={[styleCustom, styles.input]}
    />
  );
};

const SendComment = () => {
  const [valueText, setValueText] = useState('');
  const [isLength, setIsLength] = useState(true);
  const [height, setHeight] = useState(10);
  const dispatch = useDispatch();

  const updateSize = (heights) => {
    setHeight(heights);
  };
  useEffect(() => {
    if (valueText.length > 0) {
      setIsLength(false);
    } else {
      setIsLength(true);
    }
  }, [valueText, isLength]);

  const profile = useSelector((state) => state.profile.data.results);
  const token = useSelector((state) => state.auth.token);
  const article = useSelector((state) => state.getDetailArticle);
  const {id} = article.data;

  useEffect(() => {
    if (id) {
      dispatch(commentsActions.getComments(token, id));
    }
  }, [id]);

  const commentList = useSelector((state) => state.comments.data);

  const postComment = () => {
    const data = {
      postId: id,
      comment: valueText,
    };
    setValueText('');
    console.log(data);
    dispatch(commentsActions.postComment(token, data));
  };

  const commentState = useSelector((state) => state.comments);
  const {isError, isSuccess, isLoading, alertMsg} = commentState;

  useEffect(() => {
    if (isSuccess && !isLoading) {
      dispatch(commentsActions.getComments(token, id));
      setTimeout(() => {
        dispatch(commentsActions.clearMessage());
      }, 500);
    }
  }, [isSuccess, isLoading]);

  return (
    <View style={styles.commentSection}>
      <Text style={styles.commentSectionTitle}>Discussion</Text>
      <View style={styles.commentSectionInput}>
        <View>
          <TouchableOpacity style={styles.imageUser}>
            <Thumbnail
              small
              source={
                profile.avatar
                  ? {uri: API_URL + profile.avatar}
                  : {
                      uri: `https://ui-avatars.com/api/?size=50&name=${profile.fullname}`,
                    }
              }
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', flex: 1}}>
          <KeyboardAvoidingView style={styles.parent}>
            <MultiLineTextInput
              style={{height: height}}
              onChangeText={(text) => setValueText(text)}
              value={valueText}
              onContentSizeChange={(e) =>
                updateSize(e.nativeEvent.contentSize.height)
              }
            />
          </KeyboardAvoidingView>
          <View style={{width: 80}}>
            <TouchableOpacity
              disabled={isLength}
              onPress={postComment}
              style={[styles.submit, isLength ? {opacity: 0.5} : {opacity: 1}]}>
              <Text style={styles.txtbtn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {commentList &&
        commentList.map((item, index) => {
          return (
            <View style={styles.commentSectionList} key={index.toString()}>
              <View style={styles.commentUserAvatar}>
                <TouchableOpacity style={styles.imageUser}>
                  {item.authorComment ? (
                    <Thumbnail
                      small
                      source={
                        item.authorComment
                          ? item.authorComment.avatar
                            ? {uri: API_URL + item.authorComment.avatar}
                            : {
                                uri: `https://ui-avatars.com/api/?size=50&name=${item.authorComment.fullname}`,
                              }
                          : {
                              uri:
                                'https://ui-avatars.com/api/?size=50&name=anonim',
                            }
                      }
                    />
                  ) : (
                    <Thumbnail
                      small
                      source={
                        item.readerComment
                          ? item.readerComment.avatar
                            ? {uri: API_URL + item.readerComment.avatar}
                            : {
                                uri: `https://ui-avatars.com/api/?size=50&name=${item.readerComment.fullname}`,
                              }
                          : {
                              uri:
                                'https://ui-avatars.com/api/?size=50&name=anonim',
                            }
                      }
                    />
                  )}
                </TouchableOpacity>
                <Icon
                  name="expand-arrows-alt"
                  size={18}
                  color="rgba(0, 0, 0, 0.2)"
                />
              </View>
              <View style={styles.commentItem}>
                <View style={styles.commentItemTopWrap}>
                  <View style={styles.commentItemTop}>
                    {item.authorComment ? (
                      <Text style={styles.commentUserName}>
                        {item.authorComment && item.authorComment.fullname}
                      </Text>
                    ) : (
                      <Text style={styles.commentUserName}>
                        {item.readerComment && item.readerComment.fullname}
                      </Text>
                    )}
                    <Text style={styles.middot}>&middot;</Text>
                    <Text style={styles.commentDate}>
                      {Moment(item.createdAt).format('LL')}
                    </Text>
                  </View>
                  <Icon
                    style={styles.ellipsis}
                    name="ellipsis-h"
                    size={20}
                    color="rgba(0, 0, 0, 0.4)"
                  />
                </View>
                <View>
                  <Text>{item.comment}</Text>
                </View>
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default SendComment;

const styles = StyleSheet.create({
  parent: {
    borderWidth: 1,
    borderColor: '#B5BDC4',
    borderRadius: 10,
    flex: 1,
  },
  input: {
    textAlignVertical: 'top',
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 0.3,
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B49DF',
    height: 40,
    borderRadius: 5,
    marginTop: 10,
  },
  txtbtn: {
    color: 'white',
  },
  imageUser: {
    marginRight: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  commentSectionList: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
  },
  commentItem: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5,
    flex: 1,
    padding: 10,
    paddingTop: 0,
  },
  commentItemTopWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentItemTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentUserAvatar: {
    alignItems: 'center',
  },
  commentUserName: {
    color: '#64707D',
    marginRight: 10,
  },
  middot: {
    color: '#64707D',
    fontSize: 30,
    marginRight: 10,
  },
  ellipsis: {
    marginTop: 5,
  },
  commentDate: {
    color: '#64707D',
  },
});
