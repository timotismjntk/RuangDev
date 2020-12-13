import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FooterBeforeLogin = () => {
  const navigation = useNavigation();

  const gotoSignUp = () => {
    navigation.navigate('SignUp');
  };
  const gotoLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.footer}>
      <View style={styles.group}>
        <TouchableOpacity disabled={true}>
          <Text style={styles.grouptext}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={true}>
          <Text style={styles.grouptext}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={true}>
          <Text style={styles.grouptext}>Term of use</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={true}>
          <Text style={styles.grouptext}>Contact</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.group}>
        <TouchableOpacity onPress={gotoSignUp}>
          <Text style={[styles.grouptext, {fontWeight: 'bold'}]}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoLogin}>
          <Text style={[styles.grouptext, {fontWeight: 'bold'}]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterBeforeLogin;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#d2d6db',
    padding: 10,
    paddingHorizontal: 20,
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
    fontSize: 15,
    marginBottom: 20,
  },
});
