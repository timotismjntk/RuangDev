import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';

// import components
import LoadingModal from '../components/LoadingModal';
import AlertToasts from '../components/AlertToast';

// import actions
import postNewsAction from '../redux/actions/postArticle';
import articleAction from '../redux/actions/getArticles';

const CreateNewsArticle = (props) => {
  const [height, setHeight] = useState(30);
  const updateSize = (heights) => {
    setHeight(heights);
  };
  const [height2, setHeight2] = useState(10);
  const updateSize2 = (heights2) => {
    setHeight2(heights2);
  };
  const dispatch = useDispatch();

  const [tag, setTag] = useState('');
  const [data, setData] = useState(new FormData());
  const [dataTag, setDataTag] = useState(new FormData());
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [items, setItems] = useState('');
  const [messageToast, setMessageToast] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tag.length > 0) {
      if (tag.match(/\s/g) !== null) {
        data.append('tags', tag.trim());
        dataTag.append('tag', tag.trim());
        setTimeout(() => {
          setTag('');
        }, 10);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  const clearDataTag = () => {
    setDataTag(new FormData());
    data._parts.forEach((el, index) => {
      console.log(el[0]);
      if (el[0] === 'tags') {
        delete el[0];
        delete el[1];
        console.log('hapus tags');
      }
    });
  };

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const createFormDataImage = (props) => {
    data.append('picture', {
      name: props.fileName,
      type: props.type,
      uri: props.uri,
    });
    if (props.fileSize > 1000000) {
      Alert.alert('image size is too large, atleast < 1000 Kb');
    } else {
      setItems(props.uri);
    }
  };

  const removeImage = () => {
    data._parts.forEach((el, index) => {
      console.log(el[0]);
      if (el[0] === 'picture') {
        delete el[0];
        delete el[1];
        console.log('hapus');
      }
    });
    setItems('');
  };

  const token = useSelector((state) => state.auth.token);

  const createNews = () => {
    data.append('title', title);
    data.append('content', content);
    data._parts.map((el, index) => {
      if (el[0] === undefined) {
        delete data._parts[index]; //untuk menghapus array yang empty/kosong
      }
    });
    console.log(data);
    dispatch(postNewsAction.postArticle(token, data)).catch((e) => {
      console.log(e.message);
    });
  };
  const postArticleState = useSelector((state) => state.postArticle);
  const {isLoading, isError, isSuccess, alertMsg} = postArticleState;

  useEffect(() => {
    if (isError && !isLoading) {
      setMessageToast(alertMsg);
      setLoading(true);
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(postNewsAction.clearMessage());
        setLoading(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setShow(true);
      setLoading(true);
      setMessageToast(alertMsg);
      setTimeout(() => {
        setShow(false);
        dispatch(postNewsAction.clearMessage());
        dispatch(articleAction.getArticles(token)).catch((e) => {
          console.log(e.message);
        });
        setLoading(false);
        props.navigation.navigate('Home');
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (content.length > 2000) {
      setShow(true);
      setMessageToast(
        'Sorry you have reached to 2000, content must be less or equal 2000',
      );
    } else {
      setShow(false);
      setMessageToast('');
    }
  }, [content]);

  return (
    <>
      <ScrollView style={styles.container}>
        <LoadingModal duration={250} />
        <LoadingModal requestLoading={loading} />
        <AlertToasts visible={show} message={messageToast} />
        {items ? (
          <Image source={{uri: items}} style={styles.headerImage} />
        ) : null}
        <View style={styles.inputSection}>
          {!items ? (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                ImagePicker.showImagePicker(options, (response) => {
                  // console.log('Response = ', response);
                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log(
                      'User tapped custom button: ',
                      response.customButton,
                    );
                  } else {
                    createFormDataImage(response);
                  }
                });
              }}>
              <Text>Add a cover image</Text>
            </TouchableOpacity>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={[styles.btn, {width: 100}]}
                onPress={() => {
                  ImagePicker.showImagePicker(options, (response) => {
                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                      console.log(
                        'User tapped custom button: ',
                        response.customButton,
                      );
                    } else {
                      createFormDataImage(response);
                    }
                  });
                }}>
                <Text>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.remove} onPress={removeImage}>
                <Text style={{color: 'red'}}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            maxLength={100}
            placeholder="New post title here..."
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setTitle(text)}
            editable={true}
            style={[styles.title, {height: height}]}
            onContentSizeChange={(e) =>
              updateSize(e.nativeEvent.contentSize.height)
            }
          />
          <View style={styles.tagsItem}>
            {dataTag._parts &&
              dataTag._parts.length > 0 &&
              dataTag._parts.map((el, index) => {
                return (
                  <Text style={styles.tags} key={index.toString()}>
                    #{el[1]}
                  </Text>
                );
              })}
            {dataTag._parts.length > 0 && (
              <TouchableOpacity onPress={clearDataTag} style={styles.btnClear}>
                <Icon name="times" size={15} color="rgba(0, 0, 0, 0.5)" />
              </TouchableOpacity>
            )}
          </View>
          {dataTag._parts.length >= 4 ? null : (
            <TextInput
              value={tag}
              placeholder="Add up to 4 tags..."
              onChangeText={(text) => setTag(text)}
              numberOfLines={4}
              editable={dataTag._parts.length >= 4 ? false : true}
              style={styles.tagsInput}
            />
          )}
        </View>
        <View style={styles.lineBorder} />
        <KeyboardAvoidingView
          style={[
            styles.contentInput,
            {height: 250 + height2, maxHeight: 500},
          ]}>
          <TextInput
            placeholder="Write your post content here..."
            multiline={true}
            numberOfLines={20}
            maxLength={2000}
            onChangeText={(text) => setContent(text)}
            editable={true}
            style={[styles.contenttext]}
            onContentSizeChange={(e) =>
              updateSize2(e.nativeEvent.contentSize.height)
            }
          />
        </KeyboardAvoidingView>
        <View style={styles.lineBorder} />
      </ScrollView>
      <View style={styles.btmNav}>
        <TouchableOpacity
          style={[
            styles.btnsubmit,
            !(
              dataTag._parts.length > 0 &&
              title.length > 0 &&
              content.length > 50
            ) && {backgroundColor: 'grey'},
          ]}
          disabled={
            dataTag._parts.length > 0 && title.length > 0 && content.length > 50
              ? false
              : true
          }
          onPress={createNews}>
          <Text style={styles.submittext}>Publish</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CreateNewsArticle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  btmNav: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#eef0f1',
    height: 50,
  },
  btn: {
    borderWidth: 2,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#b5bdc4',
  },
  headerImage: {
    width: '100%',
    height: 200,
    flex: 1,
  },
  remove: {
    // backgroundColor: 'red',
    width: 60,
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  inputSection: {
    padding: 10,
    // flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#64707d',
    fontWeight: 'bold',
    textAlignVertical: 'top',
  },
  tagsInput: {
    // backgroundColor: 'grey',
    fontSize: 15,
    color: '#64707d',
    height: 40,
  },
  tags: {
    fontSize: 18,
    color: '#3B49DF',
    marginRight: 8,
  },
  tagsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  btnClear: {
    marginTop: 5,
  },
  lineBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#B5BDC4',
    height: 5,
    backgroundColor: '#EEF0F1',
  },
  contentInput: {
    padding: 10,
    // backgroundColor: 'tomato',
  },
  contenttext: {
    fontSize: 18,
    color: '#64707d',
    textAlignVertical: 'top',
    // flex: 1,
  },
  btnsubmit: {
    backgroundColor: '#3B49DF',
    width: 80,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submittext: {
    color: 'white',
  },
});
