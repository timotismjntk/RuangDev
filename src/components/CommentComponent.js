/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {
    Keyboard,
    KeyboardAvoidingView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const MultiLineTextInput = (props) => {
    const [shadow, setShadow] = useState('#B5BDC4');
    const [bottom, setBottom] = useState(2);
    let styleCustom = { borderColor: shadow, borderBottomWidth: bottom, borderRightWidth: 7 };

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        // cleanup function
        return () => {
          Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
          Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
      }, []);

      const _keyboardDidShow = () => {
        setShadow('#3B49DF');
        setBottom(4);
      };
      const _keyboardDidHide = () => {
        setShadow('#B5BDC4');
        setBottom(1);
      };

    return (
      <TextInput
        {...props}
        onFocus={()=>{setShadow('#3B49DF'); setBottom(4);}}
        onBlur={()=>{setShadow('#B5BDC4'); setBottom(1);}}
        multiline={true}
        numberOfLines={4}
        editable={true}
        // maxLength={40}
        placeholder="Add to the discussion"
        style={[styleCustom, styles.input]}
      />
    );
};

const SendComment = () => {
    const [valueText, setValueText] = useState('');
    const [isLength, setIsLength] = useState(true);
    const [height, setHeight] = useState(10);
    const updateSize = (heights) => {
        setHeight(heights);
    };
    useEffect(() => {
         if (valueText.length > 0) {
             setIsLength(false);
         }
         else {
             setIsLength(true);
         }
    },[valueText, isLength]);
    return (
    <View style={{flexDirection: 'column', flex: 1}}>
        <KeyboardAvoidingView
            style={styles.parent}>
            <MultiLineTextInput
                style={{height: height}}
                onChangeText={(text) => setValueText(text)}
                value={valueText}
                onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
            />
        </KeyboardAvoidingView>
        <View style={{width: 80}}>
            <TouchableOpacity disabled={isLength} style={[styles.submit, isLength ? {opacity: 0.5} : {opacity : 1}]}>
                <Text style={styles.txtbtn}>Submit</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
};

export default SendComment;

const styles = StyleSheet.create({
    parent: {
        borderWidth: 1,
        borderColor: '#B5BDC4',
        borderRadius: 10,
        flex: 1,
    },
    input: {
        textAlignVertical: 'top',
        fontSize: 15,
        borderRadius: 10,
        borderWidth: 0.3,
    },
    submit: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B49DF',
        height: 40,
        borderRadius: 5,
        marginTop: 10,
    },
    txtbtn: {
        color: 'white',
    },
});
