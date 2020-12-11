import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// import screens
import UserProfile from '../screens/UserProfile';
import EditProfile from '../screens/EditProfile';

// import header
import HeaderRight from '../components/HeaderRight';
import HeaderLeft from '../components/HeaderLefts';

const SettingStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default SettingStack;
