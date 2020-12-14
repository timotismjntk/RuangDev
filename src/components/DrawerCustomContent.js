import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {persistor} from '../redux/store';
import SplashScreen from 'react-native-splash-screen';

// import actions
import authAction from '../redux/actions/auth';

import Icon from 'react-native-vector-icons/FontAwesome5';

// import components
import AlertToasts from '../components/AlertToast';
import LoadingModal from '../components/LoadingModal';

const DrawerCustomContent = (props) => {
  //   const navigation = useNavigation();
  const closeDrawer = () => {
    props.navigation.toggleDrawer();
  };
  const [signoutLoading, setSignoutLoading] = useState(false);
  const [errorToast, setErrorToast] = useState('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const signOut = async () => {
    setSignoutLoading(true);
    try {
      setSignoutLoading(false);
      setErrorToast('Signout now');
      setShow(true);
      SplashScreen.hide();
      setTimeout(async () => {
        setShow(false);
        await persistor.purge();
        await persistor.purge();
        await persistor.flush();
        await dispatch(authAction.logout());
        SplashScreen.hide();
      }, 1000);
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal requestLoading={signoutLoading} />
      <AlertToasts visible={show} message={errorToast} />
      <View style={styles.top}>
        <Text style={styles.textLogo}>Ruang Dev Community</Text>
        <TouchableOpacity onPress={closeDrawer}>
          <Icon name="times" size={20} color="rgba(0, 0, 0, 0.6)" />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Write A Post"
          labelStyle={{color: 'black'}}
          icon={({size, color}) => (
            <Icon name="newspaper" size={size} color="#3B49DF" />
          )}
          onPress={() => props.navigation.navigate('CreateNewsArticle')}
        />
        <DrawerItem
          label="Sign Out"
          icon={({size, color}) => (
            <Icon name="sign-out-alt" size={size} color="red" />
          )}
          onPress={signOut}
        />
      </DrawerContentScrollView>
      <View style={styles.versions}>
        <Text style={styles.versionsText}>Version 1.0</Text>
      </View>
    </SafeAreaView>
  );
};

export default DrawerCustomContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#eef0f1',
  },
  textLogo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  versions: {
    alignItems: 'center',
    marginBottom: 5,
  },
  versionsText: {
    color: 'grey',
  },
});
