import React, {useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

const CreateNewsArticle = () => {
  const [height, setHeight] = useState(30);
  const updateSize = (heights) => {
    setHeight(heights);
  };
  const [height2, setHeight2] = useState(10);
  const updateSize2 = (heights2) => {
    setHeight2(heights2);
  };

  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Instagram'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const [items, setItems] = useState('');
  const createFormData = (props) => {
    const data = new FormData();
    console.log(props);

    data.append('picture', {
      name: props.fileName,
      type: props.type,
      uri: props.uri,
    });
    console.log(data._parts[0][1]);
    if (props.fileSize > 1000000) {
      Alert.alert('image size is too large, atleast < 1000 Kb');
    } else {
      setItems(data._parts[0][1].uri);
    }
  };
  return (
    <>
      <ScrollView style={styles.container}>
        {items ? (
          <Image source={{uri: items}} style={styles.headerImage} />
        ) : null}
        <KeyboardAvoidingView style={styles.inputSection}>
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
                    //   const source = { uri: response.uri };
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                    //   console.log(source);
                    createFormData(response);
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
                      //   const source = { uri: response.uri };
                      // You can also display the image using data:
                      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                      //   console.log(source);
                      createFormData(response);
                    }
                  });
                }}>
                <Text>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.remove}
                onPress={() => {
                  setItems('');
                }}>
                <Text style={{color: 'red'}}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            multiLine={true}
            maxLength={50}
            placeholder="New post title here..."
            multiline={true}
            numberOfLines={4}
            editable={true}
            style={[styles.title, {height: height}]}
            onContentSizeChange={(e) =>
              updateSize(e.nativeEvent.contentSize.height)
            }
          />
          <TextInput
            multiLine={true}
            // maxLength={50}
            placeholder="Add up to 4 tags..."
            multiline={true}
            numberOfLines={4}
            editable={true}
            style={styles.tags}
          />
        </KeyboardAvoidingView>
        <View style={styles.lineBorder} />
        <KeyboardAvoidingView
          style={[styles.contentInput, {height: 250 + height2}]}>
          <TextInput
            multiLine={true}
            maxLength={50}
            placeholder="Write your post content here..."
            multiline={true}
            numberOfLines={4}
            editable={true}
            style={[styles.contenttext, {height: height2}]}
            onContentSizeChange={(e) =>
              updateSize2(e.nativeEvent.contentSize.height)
            }
          />
        </KeyboardAvoidingView>
        <View style={styles.lineBorder} />
      </ScrollView>
      <View style={styles.btmNav}>
        <TouchableOpacity style={styles.btnsubmit}>
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
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: '#64707d',
    fontWeight: 'bold',
    textAlignVertical: 'top',
  },
  tags: {
    // backgroundColor: 'grey',
    fontSize: 15,
    color: '#64707d',
    height: 40,
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
    // backgroundColor: 'red',
    flex: 1,
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
