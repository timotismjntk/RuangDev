import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Footer from '../components/FooterBeforeLogin';
import AlertToasts from '../components/AlertToast';
import LoadingModal from '../components/LoadingModal';

//import actions
import authAction from '../redux/actions/auth';

const VerifyResetCode = (props) => {
  const [shadow, setShadow] = useState('#B5BDC4');
  const [bottom, setBottom] = useState(1);
  let styleCustom = {borderColor: shadow, borderBottomWidth: bottom};
  const [verification, setVerification] = useState('');
  const [error, SetError] = useState(false);
  const [show, setShow] = useState(false);
  const [showVerifyError, setShowVerifyError] = useState(false);
  const [alert, setAlert] = useState('');
  const {reset, email} = props.route.params;

  useEffect(() => {
    if (reset) {
      setAlert(`Masukkan kode berikut: ${reset}`);
      setShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const {isVerify, isErrorVerify, isLoading, alertMsg} = authState;

  const verify = async (value) => {
    console.log(value);
    Keyboard.dismiss();
    try {
      await dispatch(authAction.verifyResetCode(email, value));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (isVerify) {
      setShow(false);
      setAlert('');
      dispatch(authAction.clearMessage());
      props.navigation.navigate('ResetPassword', {email: email});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerify]);

  useEffect(() => {
    if (isErrorVerify) {
      setShowVerifyError(true);
      setTimeout(() => {
        setShowVerifyError(false);
        dispatch(authAction.clearMessage());
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorVerify]);

  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <LoadingModal duration={2500} />
      <LoadingModal
        requestLoading={isLoading && !isErrorVerify ? isLoading : false}
      />
      <AlertToasts visible={show} message={alert} />
      <AlertToasts
        position={250}
        visible={showVerifyError}
        message={alertMsg}
      />
      <View style={styles.container}>
        <View style={styles.parent}>
          <Text style={styles.title}>Enter your verification code</Text>
        </View>
        <Formik
          initialValues={{verification: ''}}
          validationSchema={Yup.object({
            verification: Yup.string().required('Required'),
          })}
          onSubmit={(values, formikActions) => {
            verify(values.verification);
            setTimeout(() => {
              formikActions.setSubmitting(false);
            }, 500);
          }}>
          {(prop) => (
            <KeyboardAvoidingView style={{width: '100%'}}>
              <Text style={styles.verification}>Verification</Text>
              <TextInput
                onChangeText={prop.handleChange('verification')}
                onBlur={() => {
                  prop.handleBlur('verification');
                  setShadow('#B5BDC4');
                  setBottom(1);
                }}
                value={prop.values.verification}
                onFocus={() => {
                  setShadow('#3B49DF');
                  setBottom(4);
                }}
                placeholder="Verification"
                style={[styles.input, styleCustom]}
              />
              {prop.touched.verification && prop.errors.verification ? (
                <Text style={styles.error}>{prop.errors.verification}</Text>
              ) : null}
              <TouchableOpacity
                onPress={prop.handleSubmit}
                disabled={
                  prop.touched.verification && prop.errors.verification
                    ? true
                    : false
                }
                style={[
                  styles.btnsubmit,
                  prop.touched.verification &&
                    prop.errors.verification && {backgroundColor: 'grey'},
                ]}>
                <Text style={styles.textsubmit}>Submit</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </View>
      <Footer />
    </View>
  );
};

export default VerifyResetCode;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // paddingBottom: 0,
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
  verification: {
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
    marginTop: 5,
    fontWeight: 'bold',
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
