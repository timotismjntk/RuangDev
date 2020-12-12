import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Thumbnail} from 'native-base';
import Moment from 'moment';

// import component
import DropDownPicker from '../components/DropDownPicker';
import LoadingModal from '../components/LoadingModal';

// import actions
import articleAction from '../redux/actions/getArticles';
import profileAction from '../redux/actions/profile';
import loginAction from '../redux/actions/auth';

import {API_URL} from '@env';

const Home = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [storeData, setStoreData] = useState([]);
  const [select, setSelect] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const detailItems = (itemId) => {
    setSelect(true);
    setTimeout(() => {
      props.navigation.navigate('detailArticle', {
        id: Number(itemId),
      });
      setSelect(false);
      setSelectedId(null);
    }, 1000);
  };

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(articleAction.getArticles(token));
    dispatch(profileAction.getProfile(token));
    dispatch(loginAction.clearMessage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listArticle = useSelector((state) => state.getArticle);
  const {data, pageInfo, isLoading, isError} = listArticle;

  const dropDownState = useSelector((state) => state.dropDown);
  const {sortby} = dropDownState;

  useEffect(() => {
    if (data) {
      setStoreData(data);
    }
  }, [data]);

  const refreshArticle = () => {
    dispatch(articleAction.getArticles(token)).catch((e) => {
      console.log(e.message);
    });
  };

  const moreArticle = () => {
    if (pageInfo.nextLink) {
      const nextPage = pageInfo.currentPage + 1;
      if (sortby === 'Category') {
        dispatch(
          articleAction.getArticles(token, 'categoryId', nextPage),
        ).catch((e) => {
          console.log(e.message);
        });
      }
      if (sortby === 'Newest') {
        dispatch(articleAction.getArticles(token, 'createdAt', nextPage)).catch(
          (e) => {
            console.log(e.message);
          },
        );
      }
    }
  };

  useEffect(() => {
    if (pageInfo.currentPage > 1) {
      const newData = storeData.concat(...data);
      setStoreData(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo]);
  console.log(storeData);

  const newsItem = ({item, onPress, style}) => (
    <TouchableOpacity
      style={[
        styles.articleItem,
        selectedId === item.id && styles.articleSelect,
      ]}
      onPress={() => {
        detailItems(item.id);
        setSelectedId(item.id);
      }}>
      {item.newsimage ? (
        <Image source={{uri: API_URL + item.newsimage}} style={styles.image} />
      ) : null}
      <View style={styles.articlewrap}>
        <TouchableOpacity style={styles.imageContainer}>
          <Thumbnail
            small
            source={
              !item.Authors.avatar
                ? {
                    uri: `https://ui-avatars.com/api/?size=50&name=${item.Authors.fullname}`,
                  }
                : {uri: API_URL + item.Authors.avatar}
            }
          />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.authorName}>{item.Authors.fullname}</Text>
          <Text style={styles.createdAt}>
            {Moment(item.createdAt).format('LL')}
          </Text>
          <Text style={styles.contenttitle}>{item.title}</Text>
          <View style={styles.tagsWrap}>
            {item.Tags.map((el) => {
              return (
                <Text style={styles.tags} key={el.id.toString()}>
                  #{el.name}
                </Text>
              );
            })}
          </View>
          <View style={styles.bottomArticle}>
            <View style={styles.likecomment}>
              <TouchableOpacity style={styles.btnlikecomment}>
                <Icon
                  name="heart-outline"
                  color="#ff2052"
                  size={20}
                  style={{marginRight: 10}}
                />
                <Text>{item.Likes[0] ? item.Likes[0].likesCount : 0}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Icon
                  name="comment-outline"
                  size={20}
                  style={{marginRight: 10}}
                />
                <Text>
                  {item.Comments[0] ? item.Comments[0].commentsCount : 0}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.estimatedWrap}>
              <Text style={styles.estimatedRead}>
                {item.readEstimated} min read
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const header = () => {
    return (
      <View style={styles.nav}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity>
            <Icon name="database" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Posts</Text>
        </View>
        <TouchableOpacity
          onPress={() => setOpenModal(true)}
          style={[styles.dropDownModal, openModal && styles.modalActive]}>
          <Text style={{color: 'black'}}>{sortby}</Text>
          <Icon name="menu-down" size={32} />
          <DropDownPicker open={openModal} close={() => setOpenModal(false)} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    data && (
      <View>
        <LoadingModal
          requestLoading={isLoading && !isError ? isLoading : false}
        />
        <FlatList
          data={storeData ? storeData : []}
          contentContainerStyle={styles.separator}
          refreshing={isLoading}
          onRefresh={refreshArticle}
          onEndReached={moreArticle}
          onEndReachedThreshold={0.5}
          renderItem={newsItem}
          ListHeaderComponent={header}
          keyExtractor={(item) => item && item.id.toString()}
        />
      </View>
    )
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'orange',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    color: 'white',
  },
  dropDownModal: {
    height: 45,
    width: 105,
    paddingLeft: 10,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: '#B5BDC4',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  modalActive: {
    borderColor: '#3B49DF',
    borderBottomWidth: 4,
    borderRightWidth: 3,
  },
  articleItem: {
    borderBottomWidth: 10,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  articleSelect: {
    borderColor: '#3B49DF',
    borderWidth: 3,
  },
  articlewrap: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    width: '90%',
    marginLeft: 10,
  },
  authorName: {
    fontSize: 15,
  },
  createdAt: {
    color: 'grey',
  },
  contenttitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bottomArticle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagsWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginBottom: 10,
  },
  tags: {
    color: 'grey',
  },
  likecomment: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 0,
  },
  btnlikecomment: {
    flexDirection: 'row',
    marginRight: 25,
  },
  estimatedWrap: {
    marginTop: 10,
    paddingRight: 10,
  },
  estimatedRead: {
    color: 'grey',
  },
  separator: {},
});
