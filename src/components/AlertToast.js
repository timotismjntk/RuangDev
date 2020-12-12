import React, {useState, useEffect} from 'react';
import Toast from 'react-native-root-toast';

const AlertToasts = (props) => {
  const {visible, message, position} = props;
  const [positionToast, setPositionToast] = useState(40);

  useEffect(() => {
    if (position > positionToast) {
      setPositionToast(position);
    }
  }, [positionToast, position]);

  return (
    <Toast
      visible={visible}
      position={positionToast}
      shadow={true}
      animation={true}
      hideOnPress={true}>
      {message}
    </Toast>
  );
};

export default AlertToasts;
