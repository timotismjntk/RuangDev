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
        <TouchableOpacity>
          <Text style={styles.grouptext}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Podcasts</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Tags</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Code of Conduct</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>RuangDev Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Sponsors</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.group}>
        <TouchableOpacity>
          <Text style={styles.grouptext}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Term of use</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoSignUp}>
          <Text style={styles.grouptext}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={gotoLogin}>
          <Text style={styles.grouptext}>Login</Text>
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
