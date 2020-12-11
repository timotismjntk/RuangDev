import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserArticle from '../components/UserArticle';
import Footer from '../components/FooterAfterLogin';
import Moment from 'moment';
import {API_URL} from '@env';

// import components
import LoadingModal from '../components/LoadingModal';

const UserProfile = (props) => {
  const profile = useSelector((state) => state.profile.data.results);

  const navigateToEditProfile = () => {
    props.navigation.navigate('EditProfile');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LoadingModal duration={450} />
      <View style={styles.lineBorder} />
      <TouchableOpacity style={styles.imageAuthor}>
        <Thumbnail
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
        <Text style={styles.name}>{profile ? profile.fullname : 'Anon'}</Text>
      </TouchableOpacity>
      <View style={styles.bio}>
        <Text style={styles.biotext}>404 bio not found</Text>
      </View>
      <View style={styles.joined}>
        <Icon name="cake" size={25} color="grey" />
        <Text style={styles.joinText}>Joined on</Text>
        <Text style={styles.joinText}>
          {profile ? Moment(profile.createdAt).format('MM DD, YYYY') : ''}
        </Text>
        <TouchableOpacity style={styles.github}>
          <Icon name="github" size={25} color="grey" />
        </TouchableOpacity>
      </View>
      <View style={styles.btnWrap}>
        <TouchableOpacity style={styles.btn} onPress={navigateToEditProfile}>
          <Text style={styles.btnText}>Edit profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lineBorder2} />
      <View style={styles.article}>
        <UserArticle />
      </View>
      <Footer />
    </ScrollView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  lineBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#B5BDC4',
    height: 30,
    backgroundColor: '#2e577f',
  },
  lineBorder2: {
    borderWidth: 0.8,
    borderColor: '#B5BDC4',
  },
  parent: {
    paddingHorizontal: 20,
    zIndex: 5,
  },
  imageAuthor: {
    paddingHorizontal: 10,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
    top: -17,
  },
  name: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  bio: {
    paddingHorizontal: 10,
  },
  biotext: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
  },
  btnWrap: {
    marginVertical: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  btn: {
    backgroundColor: '#3B49DF',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  joined: {
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinText: {
    color: 'grey',
    marginLeft: 10,
  },
  github: {
    marginLeft: 10,
  },
  article: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
