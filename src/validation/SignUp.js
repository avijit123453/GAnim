import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import { checkName } from './validation';

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    cPassword: '',
  });

  const [isError, setIsError] = useState([]);

  const [error, setError] = useState({
    field: '',
    error: '',
  });

  function updateState(field, value) {
    setUserInfo(pre => ({
      ...pre,
      [field]: value,
    }));
  }

  const updateError = (field, error) => {
    if (error !== '') {
      const itemIndex = isError.findIndex(item => item.field === field);
      if (itemIndex === -1) {
        isError.push({
          field: field,
          error: error,
        });
        return;
      }

      const updatedItems = isError.map((item, index) =>
        index === itemIndex ? { ...item, error: error } : item,
      );

      setError(updatedItems);
    } else {
      removeError(field);
    }
  };

  const removeError = (field) => {
    const _index = isError.findIndex(item => item?.field === field);
    if (_index !== -1) {
      const updatedItems = [...isError.slice(0, _index), ...isError.slice(_index + 1)];
      setIsError(updatedItems);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.title1}>Register</Text>
      <Text style={styles.title2}>Please enter details to register</Text>
      <Input
        placeholder={'Name'}
        value={userInfo.name}
        onChangeText={v => updateState('name', v)}
        error={error}
        onChange={e => {
          let error = checkName(e.nativeEvent.text);
          console.log('error -- ', error);
          updateError('name', error);
        }}
      />
      <Input
        placeholder={'Email'}
        value={userInfo.email}
        onChangeText={v => updateState('email', v)}
        error={error}
      />
      <Input
        placeholder={'Mobile Number'}
        value={userInfo.number}
        onChangeText={v => updateState('number', v)}
        keyboardType={'numeric'}
        error={error}
      />
      <Input
        placeholder={'Password'}
        value={userInfo.password}
        onChangeText={v => updateState('password', v)}
        error={error}
      />
      <Input
        placeholder={'Confirm Password'}
        value={userInfo.cPassword}
        onChangeText={v => updateState('cPassword', v)}
        error={error}
      />

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.title}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.txt}>
        Already have an account?
        {<Text style={styles.txt2}> Login</Text>}
      </Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: '90%',
    backgroundColor: '#03BEBE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 45,
  },
  title1: {
    fontSize: 24,
    color: '#03BEBE',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 18,
  },
  title2: {
    fontSize: 18,
    color: 'grey',
    fontWeight: '400',
    alignSelf: 'flex-start',
    marginLeft: 18,
    marginBottom: 80,
  },
  title: {
    fontSize: 18,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  txt: {
    fontSize: 16,
    color: 'black',
  },
  txt2: {
    color: '#03BEBE',
    fontWeight: '500',
  },
});
