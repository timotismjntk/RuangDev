import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal, View} from 'react-native';
import {Spinner} from 'native-base';

const LoadingModal = (props) => {
  const {requestLoading, duration} = props;
  const [loading, setLoading] = useState(true);

  const durationLoading = 1000 + duration;

  useEffect(() => {
    if (requestLoading) {
      setLoading(true);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, durationLoading);
    }
  }, [requestLoading, durationLoading]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={loading}
      style={styles.loadingmodal}>
      <View style={styles.loadingScreen}>
        <View style={styles.loadingWrap}>
          <Spinner color="#3B49DF" size={45} />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  loadingWrap: {
    width: 130,
    height: 130,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
