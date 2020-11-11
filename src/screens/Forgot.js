/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Forgot = () => {
  const [shadow, setShadow] = useState('#B5BDC4');
  const [bottom, setBottom] = useState(1);
  let styleCustom = { borderColor: shadow, borderBottomWidth: bottom };
  let emailInput = null;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.parent}>
        <Text style={styles.title}>Forgot your password?</Text>
      </View>
      <Formik
          initialValues={{ email: ''}}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid Email')
              .required('Required'),
          })}
          onSubmit={(values, formikActions) => {
            setTimeout(() => {
              formikActions.setSubmitting(false);
            }, 500);
          }}>
          {props => (
            <KeyboardAvoidingView style={{width: '100%'}}>
             <Text style={styles.email}>Email</Text>
             <TextInput
                onChangeText={props.handleChange('email')}
                onBlur={()=>{props.handleBlur('email'); setShadow('#B5BDC4'); setBottom(1);}}
                value={props.values.email}
                onFocus={()=>{setShadow('#3B49DF'); setBottom(4);}}
                placeholder="Email"
                style={[styles.input, styleCustom]}
                onSubmitEditing={() => {
                  emailInput.focus();
                }}
              />
              {props.touched.email && props.errors.email ? (
                <Text style={styles.error}>{props.errors.email}</Text>
              ) : null}
              <TouchableOpacity
                onPress={props.handleSubmit}
                mode="contained"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
                style={styles.btnsubmit}>
                    <Text style={styles.textsubmit}>Send me reset password instructions</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          )}
        </Formik>
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

export default Forgot;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // alignItems: 'center',
        // flex: 1,
        // height: '100%',
        // backgroundColor: 'green',
    },
    parent: {
        marginBottom: 15,
        marginTop: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 15,
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
    footer: {
      // backgroundColor: 'grey',
      flexDirection: 'row',
      width: '100%',
      marginTop: 80,
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
