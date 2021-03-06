import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Footer from '../components/FooterBeforeLogin';
import AlertToasts from '../components/AlertToast';
import LoadingModal from '../components/LoadingModal';

// import action
import loginAction from '../redux/actions/auth';

const ForgotPassword = (props) => {
  const [shadow, setShadow] = useState('#B5BDC4');
  const [bottom, setBottom] = useState(1);
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [alertMessage, setAlertMessage] = useState('');
  const [show, setShow] = useState(false);
  let styleCustom = {borderColor: shadow, borderBottomWidth: bottom};

  const sendResetCode = async (value) => {
    try {
      setEmail(value);
      await dispatch(loginAction.getResetCode(value)).catch((e) => {
        console.log(e.message);
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const authState = useSelector((state) => state.auth);
  const {
    resetCodeData,
    isMatch,
    isErrorResetCode,
    alertMsg,
    isLoading,
  } = authState;

  useEffect(() => {
    if (isMatch) {
      props.navigation.navigate('VerifyResetCode', {
        reset: resetCodeData,
        email: email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMatch]);

  useEffect(() => {
    if (isErrorResetCode && !isLoading) {
      if (!isLoading) {
        setTimeout(() => {
          setAlertMessage(alertMsg);
          setShow(true);
        }, 1500);
        setTimeout(() => {
          setAlertMessage('');
          setShow(false);
          dispatch(loginAction.clearMessage());
        }, 3500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorResetCode, isLoading]);

  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <LoadingModal requestLoading={isLoading} />
      <AlertToasts visible={show} message={alertMessage} />
      <View style={styles.container}>
        <View style={styles.parent}>
          <Text style={styles.title}>Forgot your password?</Text>
        </View>
        <Formik
          initialValues={{email: ''}}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid Email').required('Required'),
          })}
          onSubmit={(values, formikActions) => {
            sendResetCode(values.email);
            setTimeout(() => {
              formikActions.setSubmitting(false);
            }, 100);
          }}>
          {(prop) => (
            <KeyboardAvoidingView style={{width: '100%'}}>
              <Text style={styles.email}>Email</Text>
              <TextInput
                onChangeText={prop.handleChange('email')}
                onBlur={() => {
                  prop.handleBlur('email');
                  setShadow('#B5BDC4');
                  setBottom(1);
                }}
                value={prop.values.email}
                onFocus={() => {
                  setShadow('#3B49DF');
                  setBottom(4);
                }}
                placeholder="Email"
                style={[styles.input, styleCustom]}
              />
              {prop.touched.email && prop.errors.email ? (
                <Text style={styles.error}>{prop.errors.email}</Text>
              ) : null}
              <TouchableOpacity
                onPress={prop.handleSubmit}
                disabled={
                  prop.touched.email && prop.errors.email ? true : false
                }
                style={[
                  styles.btnsubmit,
                  prop.touched.email &&
                    prop.errors.email && {backgroundColor: 'grey'},
                ]}>
                <Text style={styles.textsubmit}>Send me reset code</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </View>
      <Footer />
    </View>
  );
};

export default ForgotPassword;

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
