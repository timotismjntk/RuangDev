/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const FooterBeforeLogin = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.group}>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Podcasts</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Tags</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Code of Conduct</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>RuangDev Shop</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Sponsors</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.group}>
        <TouchableOpacity>
          <Text style={styles.grouptext}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Term of use</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.grouptext}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.grouptext, {fontWeight: 'bold'}]}>Write a post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterBeforeLogin;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#d2d6db',
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 0.5,
    borderColor: 'grey',
    paddingTop: 20,
  },
  group: {
    flexDirection: 'column',
    marginRight: 80,
  },
  grouptext: {
    color: '#000000',
    fontSize: 15,
    marginBottom: 20,
  },
});
