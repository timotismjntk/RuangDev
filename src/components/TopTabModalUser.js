import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import {useNavigation} from '@react-navigation/native';
import {persistor} from '../redux/store';
import SplashScreen from 'react-native-splash-screen';

// import components
import AlertToasts from '../components/AlertToast';
import LoadingModal from '../components/LoadingModal';

// import actions
import authAction from '../redux/actions/auth';

export default function TopTabModalUser(props) {
  const {open, close} = props;

  const profile = useSelector((state) => state.profile.data.results);
  const navigation = useNavigation();
  const [signoutLoading, setSignoutLoading] = useState(false);
  const [errorToast, setErrorToast] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const navigateToUserProfile = () => {
    close();
    setTimeout(() => {
      navigation.navigate('UserProfile');
    }, 500);
  };

  const navigateToWrite = () => {
    close();
    setTimeout(() => {
      navigation.navigate('CreateNewsArticle');
    }, 250);
  };

  const navigateToEditProfile = () => {
    close();
    setTimeout(() => {
      navigation.navigate('EditProfile');
    }, 250);
  };

  const signOut = async () => {
    setSignoutLoading(true);
    setShow(false);
    try {
      setSignoutLoading(false);
      setErrorToast('Signout now');
      setShow(true);
      SplashScreen.hide();
      setTimeout(async () => {
        SplashScreen.hide();
        setShow(false);
        await persistor.purge();
        await persistor.purge();
        await persistor.flush();
        await dispatch(authAction.logout());
      }, 1000);
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <LoadingModal requestLoading={signoutLoading} />
      <AlertToasts visible={show} message={errorToast} />
      <BottomSheet
        visible={open}
        onBackButtonPress={close}
        onBackdropPress={close}>
        <View style={styles.modal}>
          <View style={styles.topModal}>
            <TouchableOpacity onPress={navigateToUserProfile}>
              <Text style={styles.fullname}>{profile && profile.fullname}</Text>
              <Text style={styles.email}>{profile && profile.email}</Text>
            </TouchableOpacity>
            <View style={styles.lineBorder} />
            <TouchableOpacity style={styles.menuDashBoard}>
              <Text style={styles.menuText}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu} onPress={navigateToWrite}>
              <Text style={styles.menuText}>Write a Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu}>
              <Text style={styles.menuText}>Reading Lists</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu}
              onPress={navigateToEditProfile}>
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <View style={styles.lineBorder} />
            <TouchableOpacity style={styles.signOut} onPress={signOut}>
              <Text style={styles.menuText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modal: {
    backgroundColor: '#F9F9F9',
    width: '95%',
    justifyContent: 'center',
    height: 330,
    borderRadius: 8,
    borderWidth: 3,
    borderBottomWidth: 6,
    borderRightWidth: 5,
    alignItems: 'center',
    padding: 15,
    marginLeft: 9,
    transform: [
      {translateY: -Dimensions.get('window').height * 0.31},
      {translateX: 0},
      {rotateX: '0deg'},
    ],
  },
  topModal: {
    flex: 1,
    borderRadius: 15,
    width: '100%',
  },
  auth: {
    marginTop: 15,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b49df',
  },
  lineBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#B5BDC4',
    height: 2,
    marginLeft: -14,
    marginTop: 15,
    width: '109%',
    backgroundColor: '#EEF0F1',
  },
  fullname: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  email: {
    color: 'grey',
  },
  menuDashBoard: {
    marginBottom: 10,
    marginTop: 15,
  },
  menu: {
    marginTop: 10,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '100',
    color: 'black',
  },
  signOut: {
    marginTop: 20,
  },
});
