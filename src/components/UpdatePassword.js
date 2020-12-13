import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import LoadingModal from './LoadingModal';

// import action
import profileAction from '../redux/actions/profile';

const UpdatePassword = () => {
  const dispatch = useDispatch();

  const [shadow, setShadow] = useState('#B5BDC4');
  const [bottom, setBottom] = useState(1);
  const [bottom2, setBottom2] = useState(1);
  const [shadow2, setShadow2] = useState('#B5BDC4');

  let styleCustom = {borderColor: shadow, borderBottomWidth: bottom};
  let styleCustom2 = {
    borderColor: shadow2,
    borderBottomWidth: bottom2,
    marginBottom: 10,
  };

  const token = useSelector((state) => state.auth.token);
  const profileState = useSelector((state) => state.profile);
  const {isLoading, isError, updated} = profileState;

  const updatePassword = (value) => {
    const data = {
      password: value.newPassword,
    };
    dispatch(profileAction.updatePassword(token, data)).catch((e) => {
      console.log(e.message);
    });
  };

  useEffect(() => {
    if (updated && !isLoading) {
      setTimeout(() => {
        dispatch(profileAction.removeMessage());
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated && isLoading]);

  return (
    <View>
      <LoadingModal
        requestLoading={isLoading && !isError ? isLoading : false}
      />
      <Formik
        initialValues={{newPassword: '', repeatPassword: ''}}
        onSubmit={(values, formikActions) => {
          updatePassword(values);
          setTimeout(() => {
            formikActions.setSubmitting(false);
            formikActions.resetForm({});
          }, 2000);
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
        {(props) => (
          <KeyboardAvoidingView style={styles.FormArea}>
            <Text style={styles.UserInput}>Change password</Text>
            <Text style={styles.password}>Password</Text>
            <TextInput
              onChangeText={props.handleChange('newPassword')}
              onBlur={() => {
                props.handleBlur('newPassword');
                setShadow2('#B5BDC4');
                setBottom2(1);
              }}
              value={props.values.newPassword}
              onFocus={() => {
                setShadow2('#3B49DF');
                setBottom2(4);
              }}
              secureTextEntry={true}
              placeholder="Password"
              style={[styles.input, styleCustom2]}
            />
            {props.touched.newPassword && props.errors.newPassword ? (
              <Text style={styles.error}>{props.errors.newPassword}</Text>
            ) : null}
            <Text style={styles.repeatPassword}>Confirm new password</Text>
            <TextInput
              onChangeText={props.handleChange('repeatPassword')}
              onBlur={() => {
                props.handleBlur('repeatPassword');
                setShadow('#B5BDC4');
                setBottom(1);
              }}
              secureTextEntry={true}
              value={props.values.repeatPassword}
              onFocus={() => {
                setShadow('#3B49DF');
                setBottom(4);
              }}
              placeholder="Confirm Password"
              style={[styles.input, styleCustom]}
            />
            {props.touched.repeatPassword && props.errors.repeatPassword ? (
              <Text style={styles.error}>{props.errors.repeatPassword}</Text>
            ) : null}
            <View style={{alignItems: 'flex-start'}}>
              <TouchableOpacity
                onPress={props.handleSubmit}
                disabled={props.isSubmitting}
                style={styles.btnsubmit}>
                <Text style={styles.textsubmit}>Set New Password</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </View>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  FormArea: {
    backgroundColor: 'white',
    padding: 10,
  },
  UserInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  password: {
    fontSize: 16,
  },
  repeatPassword: {
    fontSize: 16,
  },
  profilepic: {
    fontSize: 16,
  },
  input: {
    width: '100%',
    fontSize: 15,
    padding: 10,
    borderWidth: 1,
    borderTopColor: '#B5BDC4',
    borderLeftColor: '#B5BDC4',
    borderRightColor: '#B5BDC4',
    borderBottomWidth: 2,
    marginTop: 15,
    borderRadius: 10,
  },
  error: {
    color: '#3B49DF',
  },
  image: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chooseimage: {
    marginHorizontal: 15,
    borderWidth: 1,
    width: 85,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderRadius: 3,
    backgroundColor: '#EEF0F1',
  },
  btnsubmit: {
    marginTop: 25,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B49DF',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  textsubmit: {
    color: 'white',
    fontWeight: 'bold',
  },
  lineBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#B5BDC4',
    height: 15,
    backgroundColor: '#EEF0F1',
  },
});
