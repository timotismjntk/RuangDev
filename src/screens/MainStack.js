import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// import screens
import Home from '../screens/Home';
import DetailArticle from '../screens/DetailArticle';
import UserProfile from '../screens/UserProfile';
import EditProfile from '../screens/EditProfile';
import CreateNewsArticle from '../screens/CreateNewsArticle';
import SearchNews from '../screens/SearchNews';

// import header
import HeaderRight from '../components/HeaderRight';
import HeaderLeft from '../components/HeaderLefts';
import HeaderRightClose from '../components/HeaderRightClose';

const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            shadowOpacity: 0,
          },
          headerRight: () => <HeaderRight />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="detailArticle"
        component={DetailArticle}
        options={{
          headerStyle: {
            shadowOpacity: 0,
          },
          headerRight: () => <HeaderRight />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerStyle: {
            shadowOpacity: 0,
          },
          headerRight: () => <HeaderRight />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerStyle: {
            shadowOpacity: 0,
          },
          headerRight: () => <HeaderRight />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="CreateNewsArticle"
        component={CreateNewsArticle}
        options={{
          headerStyle: {
            shadowOpacity: 0,
            backgroundColor: '#eef0f1',
          },
          headerLeft: '',
          headerTitle: '',
          headerRight: () => <HeaderRightClose />,
        }}
      />
      <Stack.Screen
        name="SearchNews"
        component={SearchNews}
        options={{
          headerStyle: {
            shadowOpacity: 0,
          },
          headerRight: () => <HeaderRight />,
          headerLeft: () => <HeaderLeft />,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
