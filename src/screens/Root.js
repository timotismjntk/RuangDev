import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// import screens
import Login from '../screens/Login';
import SignUp from '../screens/Signup';

// import stack
import MainStack from '../screens/MainStack';
import SettingStack from '../screens/SettingStack';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import DrawerCustomContent from '../components/DrawerCustomContent';

import Icon from 'react-native-vector-icons/FontAwesome5';

const Root = () => {
  const LoginState = useSelector((state) => state.auth);

  const {isLogin} = LoginState;
  return (
    <NavigationContainer>
      {!isLogin ? (
        <Stack.Navigator>
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
