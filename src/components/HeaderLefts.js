import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import Logo from '../assets/headerLeft.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

// import actions
import articleAction from '../redux/actions/getArticles';

const HeaderLefts = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToHome = () => {
    dispatch(articleAction.getArticles());
    navigation.navigate('Home');
  };

  const openDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="bars" color="rgba(0, 0, 0, 0.7)" size={25} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogo} onPress={navigateToHome}>
        <Image source={Logo} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLefts;

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnLogo: {
    marginLeft: 20,
  },
  image: {
    height: 50,
    width: 50,
  },
});
