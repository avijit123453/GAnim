import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';

const Input = ({
  placeholder,
  value = '',
  onChangeText,
  keyboardType = 'default',
  error,
  onChange,
}) => {
  const [isFocus, setFocus] = useState(false);

  return (
    <View
      style={{
        width: '90%',
        marginBottom: 10,
        marginTop: 15,
      }}>
      {value !== '' && (
        <Text
          style={{
            fontSize: 12,
            color: 'grey',
            position: 'absolute',
            top: -15,
          }}>
          {placeholder}
        </Text>
      )}
      <TextInput
        style={{
          //   flex: 1,
          color: 'black',
          height: 40,
          width: '100%',
          borderColor:
            error?.field == placeholder && error.error !== ''
              ? 'red'
              : isFocus
              ? 'green'
              : '#dcdcdc',
          borderBottomWidth: 1,
        }}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={'#dcdcdc'}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={onChange}
      />
      {error.field == placeholder && error.error !== '' && (
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            textAlign: 'right',
          }}>
          {error?.error}
        </Text>
      )}
    </View>
  );
};

export default Input;
