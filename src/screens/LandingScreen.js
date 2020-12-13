import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

// import logo
import landing from '../assets/landingBlue.png';

const LandingScreen = (props) => {
  const gotoLogin = () => {
    props.navigation.navigate('Login');
  };
  const gotoSignup = () => {
    props.navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <Text style={styles.header}>
          Welcome to <Text style={styles.childTitle}>RuangDev.</Text>
        </Text>
        <Text style={styles.title}>
          <Text style={styles.childTitle}>RuangDev </Text>
          is a community of awesome Indonesia {'\n'}developers
        </Text>
      </View>
      <Image source={landing} />
      <TouchableOpacity style={styles.signupBtn} onPress={gotoSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={gotoLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 20,
  },
  parent: {
    // backgroundColor: '#54545899',
    // borderRadius: 10,
    // borderColor: 'grey',
    // borderWidth: 1,
    position: 'absolute',
    top: 0,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  childTitle: {
    color: '#3B49DF',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  signupBtn: {
    borderRadius: 3,
    backgroundColor: 'green',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 70,
  },
  signupText: {
    color: 'white',
    fontSize: 20,
  },
  loginBtn: {
    borderRadius: 3,
    backgroundColor: '#3B49DF',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
    bottom: 10,
  },
  loginText: {
    color: 'white',
    fontSize: 20,
  },
});
