import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, TouchableOpacity, Text, View, Modal} from 'react-native';

// import actions
import dropdownActions from '../redux/actions/dropDown';
import articleAction from '../redux/actions/getArticles';

const DropDownPicker = (props) => {
  const {open, close} = props;
  const [modalVisible, setModalVisible] = useState(open);
  const dispatch = useDispatch();
  useEffect(() => {
    if (open === true) {
      setModalVisible(open);
    } else if (open === false) {
      setModalVisible(open);
    }
  }, [open]);

  const dropDownState = useSelector((state) => state.dropDown);
  const {sortby} = dropDownState;

  const token = useSelector((state) => state.auth.token);

  const sortByNew = () => {
    setModalVisible(close);
    dispatch(dropdownActions.dropDown('Newest'));
    dispatch(articleAction.getArticles(token, 'createdAt')).catch((e) => {
      console.log(e.message);
    });
  };
  const sortByCategory = () => {
    setModalVisible(close);
    dispatch(dropdownActions.dropDown('Category'));
    dispatch(articleAction.getArticles(token, 'categoryId')).catch((e) => {
      console.log(e.message);
    });
  };

  return (
    <Modal
      animationType="fade"
      statusBarTranslucent={false}
      transparent={true}
      onBackdropPress={() => setModalVisible(close)}
      onRequestClose={() => setModalVisible(close)}
      visible={modalVisible}>
      <TouchableOpacity
        onPress={() => setModalVisible(close)}
        activeOpacity={1}
        style={{flex: 1}}>
        <View style={styles.modal}>
          <TouchableOpacity
            style={[
              styles.modalContent,
              styles.sortByNew,
              sortby === 'Newest' && {backgroundColor: 'green'},
            ]}
            onPress={sortByNew}>
            <Text
              style={[
                styles.textModal,
                sortby === 'Newest' && {color: 'white'},
              ]}>
              Newest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={sortByCategory}
            style={[
              styles.modalContent,
              sortby === 'Category' && {backgroundColor: 'green'},
            ]}>
            <Text
              style={[
                styles.textModal,
                sortby === 'Category' && {color: 'white'},
              ]}>
              Category
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DropDownPicker;

const styles = StyleSheet.create({
  modal: {
    width: 105,
    height: 100,
    right: 20,
    top: 111,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 1.8,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  textModal: {
    marginLeft: 10,
    fontSize: 16,
    fontStyle: 'italic',
  },
  sortByNew: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
});
