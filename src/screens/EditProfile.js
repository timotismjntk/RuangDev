/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {Picker} from 'native-base';
import {Formik} from 'formik';
import {Thumbnail} from 'native-base';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import {API_URL} from '@env';

import Footer from '../components/FooterAfterLogin';

const EditProfile = () => {
  const [selected, setSelected] = useState('');
  const [isSelect, setIsSelect] = useState(false);
  const [shadow, setShadow] = useState('#B5BDC4');
  const [bottom, setBottom] = useState(1);
  const [bottom2, setBottom2] = useState(1);
  const [shadow2, setShadow2] = useState('#B5BDC4');

  let styleCustom = {borderColor: shadow, borderBottomWidth: bottom};
  let styleCustom2 = {
    borderColor: shadow2,
    borderBottomWidth: bottom2,
    marginBottom: 10,
  };

  const options = {
    title: 'Select Avatar',
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
    setItems(data._parts[0][1].uri);
  };

  useEffect(() => {
    if (profile) {
      if (profile.avatar) {
        setItems(API_URL + profile.avatar);
      }
    }
  }, [profile]);
  console.log(items);

  const profile = useSelector((state) => state.profile.data.results);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text style={styles.text}>Settings for</Text>
          <Text style={styles.name}> {profile && profile.fullname}</Text>
        </View>
        <TouchableOpacity
          style={[styles.picker, isSelect && styles.pickerOnclick]}
          onPress={() => setIsSelect(true)}>
          <Picker
            note
            mode="dropdown"
            style={{color: 'black', height: 38}}
            selectedValue={selected}
            onPress={() => setIsSelect(false)}
            onValueChange={(value) => {
              setSelected(value);
              setIsSelect(false);
            }}>
            <Picker.Item label="Profile" value="key0" />
            {/* <Picker.Item label="Notifications" value="key1" /> */}
          </Picker>
        </TouchableOpacity>
      </View>
      <View>
        <Formik
          initialValues={{email: profile.email, fullname: profile.fullname}}
          validationSchema={Yup.object({
            fullname: Yup.string().required('Required'),
            email: Yup.string().email('Invalid Email').required('Required'),
          })}
          onSubmit={(values, formikActions) => {
            setTimeout(() => {
              formikActions.setSubmitting(false);
            }, 500);
          }}>
          {(props) => (
            <KeyboardAvoidingView style={styles.FormArea}>
              <Text style={styles.UserInput}>User</Text>
              <Text style={styles.fullname}>fullname</Text>
              <TextInput
                onChangeText={props.handleChange('fullname')}
                onBlur={() => {
                  props.handleBlur('fullname');
                  setShadow2('#B5BDC4');
                  setBottom2(1);
                }}
                value={props.values.fullname}
                onFocus={() => {
                  setShadow2('#3B49DF');
                  setBottom2(4);
                }}
                placeholder="Fullname"
                style={[styles.input, styleCustom2]}
              />
              {props.touched.fullname && props.errors.fullname ? (
                <Text style={styles.error}>{props.errors.fullname}</Text>
              ) : null}
              <Text style={styles.email}>Email</Text>
              <TextInput
                onChangeText={props.handleChange('email')}
                onBlur={() => {
                  props.handleBlur('email');
                  setShadow('#B5BDC4');
                  setBottom(1);
                }}
                value={props.values.email}
                onFocus={() => {
                  setShadow('#3B49DF');
                  setBottom(4);
                }}
                placeholder="Email"
                style={[styles.input, styleCustom]}
              />
              {props.touched.email && props.errors.email ? (
                <Text style={styles.error}>{props.errors.email}</Text>
              ) : null}
              <View style={{marginVertical: 15}}>
                <Text style={styles.profilepic}>Profile Image</Text>
                <View style={styles.image}>
                  <Thumbnail
                    source={
                      items
                        ? {uri: items}
                        : {
                            uri: `https://ui-avatars.com/api/?size=50&name=${
                              profile ? profile.fullname : 'guest'
                            }`,
                          }
                    }
                  />
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        ImagePicker.showImagePicker(options, (response) => {
                          // console.log('Response = ', response);
                          if (response.didCancel) {
                            console.log('User cancelled image picker');
                          } else if (response.error) {
                            console.log('ImagePicker Error: ', response.error);
                          } else {
                            createFormData(response);
                          }
                        });
                      }}
                      style={styles.chooseimage}>
                      <Text>Choose File</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={[styles.lineBorder, {width: '105%', marginLeft: -8}]}
              />
              <TouchableOpacity
                onPress={props.handleSubmit}
                disabled={props.isSubmitting}
                style={styles.btnsubmit}>
                <Text style={styles.textsubmit}>Save Profile information</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </View>
      <View style={styles.lineBorder} />
      <Footer />
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // paddingTop: 20,
  },
  wrapper: {
    backgroundColor: '#EEF0F1',
    padding: 10,
    paddingBottom: 15,
  },
  title: {
    flexDirection: 'row',
    // padding: 10,
    paddingTop: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  FormArea: {
    backgroundColor: 'white',
    padding: 10,
  },
  UserInput: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    color: '#3B49DF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  fullname: {
    fontSize: 16,
  },
  email: {
    fontSize: 16,
  },
  profilepic: {
    fontSize: 16,
  },
  picker: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderBottomWidth: 3,
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 15,
  },
  pickerOnclick: {
    borderColor: '#3B49DF',
  },
  input: {
    width: '100%',
    fontSize: 15,
    padding: 10,
    borderWidth: 1,
    borderTopColor: '#B5BDC4',
    borderLeftColor: '#B5BDC4',
    borderRightColor: '#B5BDC4',
    borderBottomWidth: 2,
    marginTop: 15,
    borderRadius: 10,
  },
  error: {
    color: '#3B49DF',
  },
  image: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chooseimage: {
    marginHorizontal: 15,
    borderWidth: 1,
    width: 85,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderRadius: 3,
    backgroundColor: '#EEF0F1',
  },
  btnsubmit: {
    marginTop: 25,
    marginBottom: 10,
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B49DF',
  },
  textsubmit: {
    color: 'white',
    fontWeight: 'bold',
  },
  lineBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#B5BDC4',
    height: 15,
    backgroundColor: '#EEF0F1',
  },
});
