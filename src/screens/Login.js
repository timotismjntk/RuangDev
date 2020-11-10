/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

// import icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.parent}>
        <Text style={styles.title}>Welcome to RuangDev</Text>
        <Text><Text style={styles.childTitle}>RuangDev</Text> is a community of awesome Indonesia {'\n'}developers</Text>
      </View>
      <TouchableOpacity style={styles.btnGit}>
          <View style={styles.btnWrap}>
            <Icon name="github" size={25} color="white" />
            <Text style={styles.btnText}>Continue with Github</Text>
          </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnTweet}>
          <View style={styles.btnWrap}>
            <Icon name="twitter" size={25} color="white" />
            <Text style={styles.btnText}>Continue with Github</Text>
          </View>
      </TouchableOpacity>
      <View style={styles.forgotlink}>
            <View style={styles.line}/>
            <View>
                <Text style={styles.textlink}>Have a password? Continue with your
                {'\n'}                      email address</Text>
            </View>
            <View style={styles.line}/>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        flex: 1,
        // backgroundColor: 'green',
    },
    parent: {
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    childTitle: {
        color: 'red',
    },
    btnGit: {
        width: '100%',
        height: 50,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 15,
    },
    btnTweet: {
        width: '100%',
        height: 50,
        backgroundColor: '#1DA1F2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    btnWrap: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    forgotlink: {
        width: '100%',
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    textlink: {
        color: 'grey',
    },
    line: {
        borderWidth: 0.3,
        width: 30,
        color: 'grey',
    },
});
