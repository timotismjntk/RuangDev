import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Thumbnail} from 'native-base';
import {API_URL} from '@env';
import jwt_decode from 'jwt-decode';

const AuthorProfile = (props) => {
  const token = useSelector((state) => state.auth.token);
  const {id: userId} = jwt_decode(token);

  const {data} = props;
  return (
    <View style={styles.container}>
      <View style={styles.lineBorder} />
      <TouchableOpacity style={styles.imageAuthor}>
        <Thumbnail
          source={
            data
              ? data
                ? {uri: API_URL + data.avatar}
                : {
                    uri: `https://ui-avatars.com/api/?size=50&name=${
                      data ? data.fullname : 'guest'
                    }`,
                  }
              : {
                  uri: `https://ui-avatars.com/api/?size=50&name=${
                    data ? data.fullname : 'guest'
                  }`,
                }
          }
        />
        <Text style={styles.name}>{data && data.fullname}</Text>
      </TouchableOpacity>
      <View style={styles.bio}>
        <Text style={styles.biotext}>404 Bio not found!</Text>
      </View>
      {data && userId !== data.id && (
        <View style={styles.btnWrap}>
          <TouchableOpacity style={styles.btn} disabled={true}>
            <Text style={styles.btnText}>Follow</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.joined}>
        <Text style={styles.joinText}>JOINED</Text>
        <Text style={styles.joinText}>Jul 30, 2019</Text>
      </View>
    </View>
  );
};

export default AuthorProfile;

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 15,
    marginBottom: 20,
  },
  lineBorder: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#B5BDC4',
    height: 40,
    backgroundColor: '#2e577f',
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
    top: -15,
  },
  name: {
    marginLeft: 10,
    marginTop: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  bio: {
    paddingHorizontal: 10,
  },
  biotext: {
    fontSize: 15,
    color: 'grey',
    lineHeight: 25,
  },
  btnWrap: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  btn: {
    opacity: 1,
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
    paddingHorizontal: 10,
  },
  joinText: {
    color: 'grey',
  },
});
