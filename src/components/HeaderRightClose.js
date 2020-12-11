import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const HeaderRightClose = (props) => {
  const navigation = useNavigation();

  const navigateTo = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.btnClose} onPress={navigateTo}>
      <Icon name="times" size={20} color="rgba(0, 0, 0, 0.6)" />
    </TouchableOpacity>
  );
};

export default HeaderRightClose;

const styles = StyleSheet.create({
  btnClose: {
    marginRight: 10,
  },
});
