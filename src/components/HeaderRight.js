import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, useRef} from 'react-redux';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL} from '@env';
import {useNavigation} from '@react-navigation/native';

// import components
import TopTabModalUser from '../components/TopTabModalUser';

const HeaderRight = (props) => {
  const profile = useSelector((state) => state.profile.data.results);
  const navigation = useNavigation();

  const searchHandler = () => {
    navigation.navigate('SearchNews');
  };

  const [openModal, setOpenModal] = useState(false);

  const modal = () => {
    setOpenModal(!openModal);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={searchHandler}>
        <Icon name="magnify" size={30} color="grey" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={modal}>
        <Thumbnail
          small
          source={
            profile
              ? profile.avatar
                ? {uri: API_URL + profile.avatar}
                : {
                    uri: `https://ui-avatars.com/api/?size=60&name=${
                      profile ? profile.fullname : 'Anon'
                    }`,
                  }
              : {
                  uri: `https://ui-avatars.com/api/?size=60&name=${
                    profile ? profile.fullname : 'Anon'
                  }`,
                }
          }
        />
      </TouchableOpacity>
      <TopTabModalUser open={openModal} close={() => setOpenModal(false)} />
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    marginRight: 15,
  },
});
