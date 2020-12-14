import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import {Formik, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {DatePicker, Radio} from 'native-base';
import Moment from 'moment';

// import icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Smug from '../assets/smug.png';
import Anonymous from '../assets/anonymous.png';

// import components
import Footer from '../components/FooterBeforeLogin';
import LoadingModal from '../components/LoadingModal';
import AlertToasts from '../components/AlertToast';

// import action
import authAction from '../redux/actions/auth';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [shadow, setShadow] = useState('#B5BDC4');
  const [bottom, setBottom] = useState(1);
  const [bottom2, setBottom2] = useState(1);
  const [shadow2, setShadow2] = useState('#B5BDC4');
  const [bottom3, setBottom3] = useState(1);
  const [shadow3, setShadow3] = useState('#B5BDC4');
  const [gender, setGender] = useState('');
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [messageToast, setMessageToast] = useState('');
  const [show, setShow] = useState(false);

  let styleCustom = {borderColor: shadow, borderBottomWidth: bottom};
  let styleCustom2 = {
    borderColor: shadow2,
    borderBottomWidth: bottom2,
    marginBottom: 10,
  };
  let styleCustom3 = {
    borderColor: shadow3,
    borderBottomWidth: bottom3,
    marginBottom: 10,
  };
  const [chosenDate, setDate] = useState(new Date());

  const selectGenderMale = () => {
    setIsMale(!isMale);
    setIsFemale(false);
    setGender('Male');
  };
  const selectGenderFemale = () => {
    setIsFemale(!isFemale);
    setIsMale(false);
    setGender('Female');
  };

  const createAccount = async (values) => {
    const data = {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      birthdate: chosenDate,
      gender: gender,
    };
    try {
      await dispatch(authAction.signUp(data));
    } catch (e) {
      console.log(e.message);
    }
  };

  const authState = useSelector((state) => state.auth);
  const {isLoading, isSuccess, isError, isLogin, alertMsg} = authState;

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setShow(true);
      setMessageToast(alertMsg);
      setTimeout(() => {
        setShow(false);
        dispatch(authAction.clearMessage());
        props.navigation.navigate('Login');
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (isError && !isLoading) {
      setMessageToast(alertMsg);
      setShow(true);
      setTimeout(() => {
        setShow(false);
        dispatch(authAction.clearMessage());
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isError]);

  return (
    <ScrollView>
      <AlertToasts visible={show} message={messageToast} />
      <LoadingModal
        requestLoading={isLoading && !isError ? isLoading : false}
      />
      <View style={styles.container}>
        <View style={styles.parent}>
          <Text style={styles.title}>
            Welcome to <Text style={styles.childTitle}>RuangDev</Text>
          </Text>
          <Text>
            <Text style={styles.childTitle}>RuangDev</Text> is a community of
            awesome Indonesia {'\n'}developers
          </Text>
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
          <View style={styles.line} />
          <View>
            <Text style={styles.textlink}>
              Already have an account?
              {'\n'}
              <TouchableOpacity style={styles.signoptions} disabled={true}>
                <Text style={styles.textsignoptions}>
                  View more sign in options
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View style={styles.line} />
        </View>
        <Formik
          initialValues={{fullname: '', email: '', password: ''}}
          validationSchema={Yup.object({
            fullname: Yup.string().required('Required'),
            email: Yup.string().email('Invalid Email').required('Required'),
            password: Yup.string().required('Required').min(6, 'Too short'),
          })}
          onSubmit={(values, formikActions) => {
            createAccount(values);
            setTimeout(() => {
              formikActions.setSubmitting(false);
            }, 500);
          }}>
          {(prop) => (
            <KeyboardAvoidingView style={{width: '100%'}}>
              <Text style={styles.fullname}>Fullname</Text>
              <TextInput
                onChangeText={prop.handleChange('fullname')}
                onBlur={() => {
                  prop.handleBlur('fullname');
                  setShadow('#B5BDC4');
                  setBottom(1);
                }}
                value={prop.values.fullname}
                onFocus={() => {
                  setShadow('#3B49DF');
                  setBottom(4);
                }}
                placeholder="Fullname"
                style={[styles.input, styleCustom]}
              />
              {prop.touched.fullname && prop.errors.fullname ? (
                <Text style={styles.error}>{prop.errors.fullname}</Text>
              ) : null}
              <Text style={{marginTop: 10}}>BirthDate</Text>
              <View style={styles.inputDate}>
                <DatePicker
                  defaultDate={new Date(2020, 1, 1)}
                  minimumDate={new Date(1800, 1, 1)}
                  maximumDate={new Date(2100, 12, 31)}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="BirthDate"
                  textStyle={{color: 'black'}}
                  placeHolderTextStyle={{fontSize: 15, color: 'grey'}}
                  onDateChange={(date) =>
                    setDate(Moment(date).format('D/MM/YYYY'))
                  }
                  disabled={false}
                />
              </View>
              <Text style={styles.gender}>Gender</Text>
              <View style={styles.radio}>
                <Radio
                  onPress={selectGenderMale}
                  color={'#3B49DF'}
                  selectedColor={'#3B49DF'}
                  selected={isMale}
                />
                <Text style={{marginLeft: 10}}>Male</Text>
                <Radio
                  onPress={selectGenderFemale}
                  color={'#3B49DF'}
                  selectedColor={'#3B49DF'}
                  selected={isFemale}
                  style={{marginLeft: 30}}
                />
                <Text style={{marginLeft: 10}}>Female</Text>
              </View>
              <Text style={styles.email}>Email</Text>
              <TextInput
                onChangeText={prop.handleChange('email')}
                onBlur={() => {
                  prop.handleBlur('email');
                  setShadow2('#B5BDC4');
                  setBottom2(1);
                }}
                value={prop.values.email}
                onFocus={() => {
                  setShadow2('#3B49DF');
                  setBottom2(4);
                }}
                placeholder="Email"
                style={[
                  styles.input,
                  styleCustom2,
                  isError && {borderColor: 'red', borderWidth: 3},
                ]}
              />
              {prop.touched.email && prop.errors.email ? (
                <Text style={styles.error}>{prop.errors.email}</Text>
              ) : null}
              <Text style={styles.password}>Password</Text>
              <TextInput
                onChangeText={prop.handleChange('password')}
                onBlur={() => {
                  prop.handleBlur('password');
                  setShadow3('#B5BDC4');
                  setBottom3(1);
                }}
                value={prop.values.password}
                onFocus={() => {
                  setShadow3('#3B49DF');
                  setBottom3(4);
                }}
                placeholder="Password"
                style={[styles.input, styleCustom3]}
                secureTextEntry={true}
              />
              {prop.touched.password && prop.errors.password ? (
                <Text style={styles.error}>{prop.errors.password}</Text>
              ) : null}
              <TouchableOpacity
                onPress={prop.handleSubmit}
                disabled={
                  prop.touched.fullname &&
                  prop.errors.fullname &&
                  prop.touched.email &&
                  prop.errors.email &&
                  prop.touched.password &&
                  prop.errors.password
                    ? true
                    : false
                }
                style={[
                  styles.btnsubmit,
                  prop.touched.fullname &&
                    prop.errors.fullname &&
                    prop.touched.email &&
                    prop.errors.email &&
                    prop.touched.password &&
                    prop.errors.password && {backgroundColor: 'grey'},
                ]}>
                <Text style={styles.textsubmit}>Signup</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          )}
        </Formik>
        <Text>
          Open Source <Image source={Smug} style={styles.image} />. Free Forever{' '}
          <Icon name="heart" color="red" size={25} />
        </Text>
        <Text style={{textAlign: 'center'}}>
          we strive for transparency{' '}
          <Image source={Anonymous} style={styles.image} /> and don't collect
          {'\n'} excess data.
        </Text>
      </View>
      {/* <Footer /> */}
    </ScrollView>
  );
};

export default SignUp;

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
    alignItems: 'center',
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
  inputDate: {
    width: '100%',
    height: 50,
    borderColor: '#B5BDC4',
    borderWidth: 1,
    borderTopColor: '#B5BDC4',
    borderLeftColor: '#B5BDC4',
    borderRightColor: '#B5BDC4',
    borderBottomWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  birthdate: {
    marginLeft: -10,
  },
  radio: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
  },
  gender: {
    // marginBottom: 10,
  },
  btnsubmit: {
    marginTop: 25,
    marginBottom: 10,
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
  signoptions: {
    marginTop: 20,
    marginBottom: 20,
  },
  textsignoptions: {
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
