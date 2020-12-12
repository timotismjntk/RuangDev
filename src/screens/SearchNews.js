import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// import components
import SearchResults from '../components/SearchResults';
import LoadingModal from '../components/LoadingModal';

const SearchNews = () => {
  const [focus, setFocus] = useState(false);
  const [blur, setBlur] = useState(false);
  const [search, setSearch] = useState('');
  const [requestSearch, setRequestSearch] = useState(false);

  const listArticle = useSelector((state) => state.searchArticles);
  const {isLoading, isError} = listArticle;

  const makeSearch = () => {
    setRequestSearch(true);
    setTimeout(() => {
      setRequestSearch(false);
    }, 200);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{flex: 1}}>
        <LoadingModal duration={300} />
        <View style={styles.parent}>
          <TextInput
            onSubmitEditing={makeSearch}
            onChangeText={(text) => setSearch(text)}
            onBlur={() => {
              setBlur(true);
              setFocus(false);
            }}
            value={search}
            onFocus={() => {
              setFocus(true);
              setBlur(false);
            }}
            placeholder="Search..."
            style={[styles.input, focus && styles.focus, blur && styles.blur]}
          />
          <Text style={styles.titleSearch}>
            Search results:{' '}
            <Text style={[styles.titleSearch, {color: '#3B49DF'}]}>
              {search}
            </Text>
          </Text>
        </View>
        <SearchResults search={search} request={requestSearch} />
        <LoadingModal
          requestLoading={isLoading && !isError ? isLoading : false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchNews;

const styles = StyleSheet.create({
  parent: {
    padding: 15,
    backgroundColor: '#eef0f1',
  },
  focus: {
    borderColor: '#3B49DF',
    borderBottomWidth: 4,
    marginBottom: 10,
  },
  blur: {
    borderColor: '#B5BDC4',
    borderBottomWidth: 1,
  },
  input: {
    width: '100%',
    fontSize: 17,
    padding: 5,
    borderWidth: 1,
    borderTopColor: '#B5BDC4',
    borderLeftColor: '#B5BDC4',
    borderRightColor: '#B5BDC4',
    borderBottomWidth: 2,
    marginVertical: 15,
    borderRadius: 5,
  },
  titleSearch: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
