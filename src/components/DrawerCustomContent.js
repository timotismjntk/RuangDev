import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const DrawerCustomContent = (props) => {
  //   const navigation = useNavigation();
  const closeDrawer = () => {
    props.navigation.toggleDrawer();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.textLogo}>Ruang Dev Community</Text>
        <TouchableOpacity onPress={closeDrawer}>
          <Icon name="times" size={20} color="rgba(0, 0, 0, 0.6)" />
        </TouchableOpacity>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sign Out"
          icon={({size, color}) => (
            <Icon name="sign-out-alt" size={size} color="red" />
          )}
          onPress={() => console.log('Log out')}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default DrawerCustomContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#eef0f1',
  },
  textLogo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
