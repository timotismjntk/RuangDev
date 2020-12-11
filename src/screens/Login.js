/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, ScrollView, Image, Platform, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CheckBox } from 'react-native-btr';

// import icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Smug from '../assets/smug.png';
import Anonymous from '../assets/anonymous.png';

import loginAction from '../redux/actions/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shadow, setShadow] = useState('#B5BDC4');
  const [bottom, setBottom] = useState(1);
  const [bottom2, setBottom2] = useState(1);
  const [shadow2, setShadow2] = useState('#B5BDC4');
  const [isSelected, setSelection] = useState(false);
  let styleCustom = { borderColor: shadow, borderBottomWidth: bottom };
  let styleCustom2 = { borderColor: shadow2, borderBottomWidth: bottom2, marginBottom: 10 };
  const dispatch = useDispatch();

  const loginHandler = () =>{
    setTimeout(() =>{
      // let data = {
      //   email,
      //   password
      // }
      // navigation.navigate('Home');
        dispatch(loginAction.login(email, password));
    }, 500);
    // console.log(data);
    // props.navigation.navigate('ProductDetail');
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.parent}>
        <Text style={styles.title}>Welcome to <Text style={styles.childTitle}>RuangDev</Text></Text>
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
            <Text style={styles.btnText}>Continue with Twitter</Text>
          </View>
      </TouchableOpacity>
      <View style={styles.confirmationText}>
            <View style={styles.line}/>
            <View>
                <Text style={styles.textlink}>Have a password? Continue with your
                {'\n'}                      email address</Text>
            </View>
            <View style={styles.line}/>
      </View>
      <KeyboardAvoidingView style={{width: '100%'}}>
             <Text style={styles.email}>Email</Text>
             <TextInput
                onChangeText={(text)=>{setEmail(text)}}
                onBlur={()=>{setShadow('#B5BDC4'); setBottom(1);}}
                value={email}
                onFocus={()=>{setShadow('#3B49DF'); setBottom(4);}}
                placeholder="Email"
                style={[styles.input, styleCustom]}
              />
              <Text style={styles.password}>Password</Text>
              <TextInput
                onChangeText={(text)=>{setPassword(text)}}
                onBlur={()=>{setShadow2('#B5BDC4'); setBottom2(1);}}
                value={password}
                onFocus={()=>{setShadow2('#3B49DF'); setBottom2(4);}}
                placeholder="Password"
                style={[styles.input, styleCustom2]}
                // ref={el => emailInput = el}
                secureTextEntry={true}
              />
              <View style={styles.checkbox}>
                <CheckBox
                  checked={isSelected}
                  onPress={() => setSelection(!isSelected)}
                  color="#3B49DF"
                />
                <Text style={styles.checkboxtext}>Remember Me</Text>
              </View>
              <TouchableOpacity
                onPress={loginHandler}
                mode="contained"
                style={styles.btnsubmit}>
                    <Text style={styles.textsubmit}>Continue</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        <TouchableOpacity style={styles.forgotlink}>
            <Text style={styles.textforgot}>I forgot my password</Text>
        </TouchableOpacity>
        <Text>Open Source <Image source={Smug} style={styles.image} />. Free Forever <Icon name="heart" color="red" size={25} /></Text>
        <Text>we strive for transparency <Image source={Anonymous} style={styles.image} /> and don't collect
        {'\n'}                                 excess data.</Text>
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
            <TouchableOpacity>
              <Text style={styles.grouptext}>Sign In/Up</Text>
            </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        // flex: 1,
        // height: '100%',
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
        color: '#3B49DF',
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
    confirmationText: {
        width: '100%',
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    textlink: {
        color: '#4D5760',
        fontWeight: '600',
    },
    line: {
        borderWidth: 0.3,
        width: 30,
        color: 'grey',
    },
    form: {
        width: '100%',
    },
    input: {
        width: '100%',
        // borderColor: '#B5BDC4',
        borderWidth: 1,
        borderTopColor: '#B5BDC4',
        borderLeftColor: '#B5BDC4',
        borderRightColor: '#B5BDC4',
        borderBottomWidth: 2,
        marginTop: 15,
        borderRadius: 10,
    },
    checkbox: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 10,
    },
    checkboxtext: {
      marginLeft: 10,
      fontSize: 15,
    },
    btnsubmit: {
        marginTop: 25,
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
    error: {
        color: '#3B49DF',
    },
    forgotlink: {
        marginTop: 20,
        marginBottom: 20,
    },
    textforgot: {
        color: '#3B49DF',
    },
    image: {
      width: 20,
      height: 20,
      resizeMode: 'contain',
    },
    footer: {
      // backgroundColor: 'grey',
      flexDirection: 'row',
      width: '100%',
      marginTop: 20,
      borderTopWidth: 0.5,
      borderColor: 'grey',
      paddingTop: 20,
    },
    group: {
      flexDirection: 'column',
      marginRight: 60,
    },
    grouptext: {
      color: '#000000',
      marginBottom: 10,
    },
});
