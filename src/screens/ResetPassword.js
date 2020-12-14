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
import resetPasswordAction from '../redux/actions/profile';

const ResetPassword = (props) => {
  const [shadow, setShadow] = useState('#B5BDC4');
  const [bottom, setBottom] = useState(1);
  let styleCustom = {borderColor: shadow, borderBottomWidth: bottom};
  const [showVerifyError, setShowVerifyError] = useState(false);
  const {email} = props.route.params;

  const dispatch = useDispatch();

  const profileState = useSelector((state) => state.profile);
  const {isLoadingReset, isErrorReset, isReset, alertMsgReset} = profileState;

  const resetPassword = (value) => {
    const data = {
      email: email,
      newPassword: value.newPassword,
    };
    dispatch(resetPasswordAction.resetPassword(data)).catch((e) => {
      console.log(e.message);
    });
  };

  useEffect(() => {
    if (isReset) {
      props.navigation.navigate('Login');
      setTimeout(() => {
        dispatch(resetPasswordAction.removeMessage());
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReset]);

  useEffect(() => {
    if (isErrorReset) {
      setShowVerifyError(true);
      setTimeout(() => {
        setShowVerifyError(false);
        dispatch(resetPasswordAction.removeMessage());
      }, 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isErrorReset]);

  return (
    <View style={{justifyContent: 'space-between', flex: 1}}>
      <LoadingModal duration={1500} />
      <LoadingModal
        requestLoading={
          isLoadingReset && !isErrorReset ? isLoadingReset : false
        }
      />
      <AlertToasts visible={showVerifyError} message={alertMsgReset} />
      <View style={styles.container}>
        <View style={styles.parent}>
          <Text style={styles.title}>Enter your new password</Text>
        </View>
        <Formik
          initialValues={{newPassword: '', repeatPassword: ''}}
          onSubmit={(values, formikActions) => {
            resetPassword(values);
            setTimeout(() => {
              formikActions.setSubmitting(false);
              formikActions.resetForm({});
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            newPassword: Yup.string()
              .min(5, 'Too Short!')
              .required('New password must fill'),
            repeatPassword: Yup.string()
              .min(5, 'Too Short!')
              .required('Repeat password must fill')
              .test(
                'confirm-password-test',
                'Password and Repeat password should match',
                function (value) {
                  return value === this.parent.newPassword;
                },
              ),
          })}>
          {(prop) => (
            <KeyboardAvoidingView style={{width: '100%'}}>
              <Text style={styles.verification}>New Password</Text>
              <TextInput
                onChangeText={prop.handleChange('newPassword')}
                onBlur={() => {
                  prop.handleBlur('newPassword');
                  setShadow('#B5BDC4');
                  setBottom(1);
                }}
                value={prop.values.newPassword}
                onFocus={() => {
                  setShadow('#3B49DF');
                  setBottom(4);
                }}
                placeholder="New password"
                style={[styles.input, styleCustom]}
              />
              {prop.touched.newPassword && prop.errors.newPassword ? (
                <Text style={styles.error}>{prop.errors.newPassword}</Text>
              ) : null}
              <Text style={styles.verification}>Repeat Password</Text>
              <TextInput
                onChangeText={prop.handleChange('repeatPassword')}
                onBlur={() => {
                  prop.handleBlur('repeatPassword');
                  setShadow('#B5BDC4');
                  setBottom(1);
                }}
                value={prop.values.repeatPassword}
                onFocus={() => {
                  setShadow('#3B49DF');
                  setBottom(4);
                }}
                placeholder="Verification"
                style={[styles.input, styleCustom]}
              />
              {prop.touched.repeatPassword && prop.errors.repeatPassword ? (
                <Text style={styles.error}>{prop.errors.repeatPassword}</Text>
              ) : null}
              <TouchableOpacity
                onPress={prop.handleSubmit}
                disabled={
                  prop.touched.newPassword &&
                  prop.errors.newPassword &&
                  prop.touched.repeatPassword &&
                  prop.errors.repeatPassword
                    ? true
                    : false
                }
                style={[
                  styles.btnsubmit,
                  prop.touched.newPassword &&
                    prop.errors.newPassword &&
                    prop.touched.repeatPassword &&
                    prop.errors.repeatPassword && {backgroundColor: 'grey'},
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

export default ResetPassword;

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
