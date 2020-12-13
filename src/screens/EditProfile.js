import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Picker} from 'native-base';
import AlertToasts from '../components/AlertToast';

// import components
import LoadingModal from '../components/LoadingModal';
import Footer from '../components/FooterAfterLogin';
import EditingProfile from '../components/EditProfile';
import UpdatePassword from '../components/UpdatePassword';

// import action
import profileAction from '../redux/actions/profile';

const EditProfile = () => {
  const [selected, setSelected] = useState('Profile');
  const [isSelect, setIsSelect] = useState(false);
  const dispatch = useDispatch();
  const [messageToast, setMessageToast] = useState('');
  const [show, setShow] = useState(false);

  const profile = useSelector((state) => state.profile.data.results);
  const profileState = useSelector((state) => state.profile);
  const {isLoading, isError, updated, alertMsg} = profileState;

  useEffect(() => {
    if (updated && !isLoading) {
      setShow(true);
      setMessageToast(alertMsg);
      setTimeout(() => {
        setShow(false);
        dispatch(profileAction.removeMessage());
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, updated]);

  useEffect(() => {
    if (isError && !isLoading) {
      setMessageToast(alertMsg);
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(profileAction.removeMessage());
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);
  return (
    <ScrollView style={styles.container}>
      <LoadingModal duration={450} />
      <AlertToasts visible={show} message={messageToast} />
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
            onValueChange={(value) => {
              setSelected(value);
              setIsSelect(false);
            }}>
            <Picker.Item label="Profile" value="Profile" />
            <Picker.Item label="Account" value="Account" />
          </Picker>
        </TouchableOpacity>
      </View>
      {selected === 'Profile' && <EditingProfile />}
      {selected === 'Account' && <UpdatePassword />}
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
  name: {
    color: '#3B49DF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  picker: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderBottomWidth: 3,
    borderColor: 'grey',
    borderRadius: 5,
    marginTop: 15,
    flex: 1,
  },
  pickerOnclick: {
    borderColor: '#3B49DF',
  },
  error: {
    color: '#3B49DF',
  },
  lineBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#B5BDC4',
    height: 15,
    backgroundColor: '#EEF0F1',
  },
});
