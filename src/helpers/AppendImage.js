/* eslint-disable prettier/prettier */
import {Platform} from 'react-native';

const createFormData = (props) => {
    const {
        photo,
    } = props;
  const data = new FormData();
  console.log(props)

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

//   Object.keys(body).forEach((key) => {
//     data.append(key, body[key]);
//   });

  console.log(data);
};

export default createFormData;
