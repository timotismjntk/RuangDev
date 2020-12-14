import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

// import screens
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import LandingScreen from '../screens/LandingScreen';
import ForgotPassword from '../screens/ForgotPassword';
import VerifyResetCode from '../screens/VerifyResetCode';
import ResetPassword from '../screens/ResetPassword';

// import stack
import MainStack from '../screens/MainStack';
import SettingStack from '../screens/SettingStack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// import components
import DrawerCustomContent from '../components/DrawerCustomContent';

// import icon
import Icon from 'react-native-vector-icons/FontAwesome5';

// import actions
import authAction from '../redux/actions/auth';

const Root = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const dispatch = useDispatch();

  const LoginState = useSelector((state) => state.auth);

  const {isLogin} = LoginState;

  const token = useSelector((state) => state.auth.token);

  // check if jwt token is expired, if expired it automaticly navigate to landing screen
  useEffect(() => {
    if (token) {
      dispatch(authAction.checkTokenExpired(token)).catch((e) => {
        console.log(e.message);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  return (
    <NavigationContainer>
      {!isLogin ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="LandingScreen"
            component={LandingScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="VerifyResetCode"
            component={VerifyResetCode}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Drawer.Navigator
          drawerType="back"
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            itemStyle: {marginVertical: 5},
            labelStyle: {color: 'black'},
          }}
          drawerContent={(props) => <DrawerCustomContent {...props} />}>
          <Drawer.Screen
            name="Home"
            component={MainStack}
            initialRouteName="Home"
            drawerContentOptions={{
              activeTintColor: '#e91e63',
            }}
            options={{
              drawerIcon: ({focused, color, size}) => (
                <Icon name="home" size={size} color="#3B49DF" />
              ),
            }}
          />
          <Drawer.Screen
            name="Setting"
            component={SettingStack}
            initialRouteName="Setting"
            drawerContentOptions={{
              activeTintColor: '#e91e63',
            }}
            options={{
              drawerIcon: ({focused, color, size}) => (
                <Icon name="cog" size={size} color="#3B49DF" />
              ),
            }}
          />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Root;
