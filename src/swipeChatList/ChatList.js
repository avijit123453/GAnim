import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {messages} from './data/messages';
import ChatItem from './components/ChatItem';
import ChatInput from './components/ChatInput';
import Animated from 'react-native-reanimated';

const ChatList = () => {
  const [messagesList, setMessagesList] = useState(messages);
  const messageRef = useRef();
  const swipeableRowRef = useRef(null);
  const [replyMessage, setReplyMessage] = useState(null);

  const clearReplyMessage = () => setReplyMessage(null);

  const updateRowRef = useCallback(
    ref => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.item?.id === replyMessage.id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage],
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  function renderItem(props) {
    return (
      <ChatItem
        {...props}
        updateRowRef={updateRowRef}
        setReplyOnSwipeOpen={setReplyMessage}
      />
    );
  }

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      scrollToEnd();
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage, swipeableRowRef]);

  function scrollToEnd() {
    setTimeout(() => messageRef?.current?.scrollToEnd(true), 800);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <SafeAreaView style={styles.mainContainer}>
        <Animated.FlatList
          ref={messageRef}
          data={messagesList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingTop: 65,
          }}
          style={{flex: 1}}
        />

        <ChatInput
          reply={replyMessage}
          clearReply={clearReplyMessage}
          onScroll={() => scrollToEnd()}
          onSend={_message => console.log('MMMM ->> ',_message)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
