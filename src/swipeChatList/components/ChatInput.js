import {
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReplyMessage from './ReplyMessage';

const ChatInput = ({reply, clearReply, onScroll, onSend}) => {
  const [input, setInput] = useState('');

  function onPressScroll() {
    if (onScroll) {
      onScroll();
    }
  }

  function onPress(obj) {
    if (onSend) {
      onSend(obj);
    }
  }

  return (
    <View>
      <ReplyMessage message={reply} clearReply={clearReply} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type Message...."
          value={input}
          onChangeText={setInput}
          placeholderTextColor={'grey'}
          onFocus={() => {
            onPressScroll();
          }}
          onBlur={() => {
            onPressScroll();
          }}
        />

        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();

            if (input !== '') {
              let obj = {};
              obj.sender = 'Bob';
              obj.timestamp = new Date().toISOString();
              obj.message = input;
              obj.id = Math.floor(Math.random() * 100);

              if (reply !== null) {
                obj.reply = reply;
              }

              onPress(obj);
            } else {
              // log
            }
          }}
          style={styles.sendButton}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/9333/9333991.png',
            }}
            style={styles.sendBtn}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderTopColor: '#dcdcdc',
    borderTopWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  input: {
    borderBottomColor: 'grey',
    flex: 1,
  },
  sendButton: {
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtn: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: 'green',
  },
});
