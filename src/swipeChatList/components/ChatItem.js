import {View, Text, Animated, Image} from 'react-native';
import React, {useState} from 'react';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

const ChatItem = ({updateRowRef, setReplyOnSwipeOpen, ...props}) => {
  function Message({index, item}) {
    return (
      <View
        style={{
          maxWidth: 280,
          backgroundColor: item?.sender == 'Alice' ? '#dcdcdc' : 'green',
          alignSelf: item?.sender == 'Alice' ? 'flex-start' : 'flex-end',
          marginVertical: 8,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: item?.sender !== 'Alice' ? 20 : 0,
          borderTopRightRadius: 20,
          borderBottomRightRadius: item?.sender == 'Alice' ? 20 : 0,
          paddingHorizontal: 15,
          paddingVertical: 8,
          marginHorizontal: 8,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: item?.sender !== 'Alice' ? 'white' : 'black',
          }}>
          {item?.message}
        </Text>

        <Image
          source={require('../../images/frame21.png')}
          style={{
            height: 18,
            width: 18,
            resizeMode: 'contain',
            position: 'absolute',
            alignSelf: item?.sender !== 'Alice' ? 'flex-end' : 'flex-start',
            transform: [
              {scaleX: item?.sender !== 'Alice' ? 1 : -1},
              {rotate: '10deg'},
            ],
            tintColor: item?.sender !== 'Alice' ? '#DCF8C7' : 'white',
            bottom: -7,
            tintColor: item?.sender == 'Alice' ? '#dcdcdc' : 'green',
            right: item?.sender == 'Alice' ? undefined : -12,
            left: item?.sender == 'Alice' ? -12 : undefined,
          }}
        />
      </View>
    );
  }

  const isNextMyMessage = true;

  const renderRightAction = progressAnimatedValue => {
    // Animated.AnimatedInterpolation
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });

    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -12, -20],
    });

    return (
      <Animated.View
        style={[
          {
            width: 40,
          },
          {transform: [{scale: size}, {translateX: trans}]},
          isNextMyMessage
            ? {
                marginBottom: 2,
                marginLeft: 16,
              }
            : {
                marginBottom: 10,
              },
        ]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 26,
              height: 26,
              tintColor: 'red',
            }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/11618/11618177.png',
            }}
          />
        </View>
      </Animated.View>
    );
  };

  const onSwipeOpenAction = () => {
    if (props.item) {
      setReplyOnSwipeOpen({...props.item});
    }
  };

  const renderLeftAction = progressAnimatedValue => {
    // Animated.AnimatedInterpolation
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });

    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -12, -20],
    });

    const rotate = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 150],
      outputRange: ['0deg', '180deg', '0deg'],
    });

    return (
      <Animated.View
        style={[
          {
            width: 40,
          },
          {
            transform: [
              {scale: size},
              {translateX: trans},
              {
                rotateY: rotate,
              },
            ],
          },
          isNextMyMessage
            ? {
                marginBottom: 2,
                marginLeft: 16,
              }
            : {
                marginBottom: 10,
              },
        ]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: 'black',
            }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/6996/6996004.png',
            }}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={updateRowRef}
        friction={2}
        // rightThreshold={40}
        leftThreshold={40}
        // renderRightActions={renderRightAction}
        renderLeftActions={renderLeftAction}
        onSwipeableOpen={onSwipeOpenAction}>
        <Message {...props} />
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export default ChatItem;
