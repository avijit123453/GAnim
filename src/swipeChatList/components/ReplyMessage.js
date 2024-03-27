import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';

const ReplyMessage = ({clearReply, message}) => {
  const [isOpen, setIsOpen] = useState(false);
  const boxHeight = useSharedValue(0);

  const isUser = message?.sender !== 'Bob';

  const toggleBox = () => {
    setIsOpen(!isOpen);
    boxHeight.value = withTiming(isOpen ? 0 : 65, {duration: 300});
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: boxHeight.value,
      opacity: boxHeight.value === 0 ? 0 : 1,
    };
  });

  const animatedColor = useAnimatedStyle(() => {
    return {
      borderRightColor:
        boxHeight.value === 0 ? 'white' : isUser ? '#2196F3' : 'green',
      opacity: boxHeight.value === 0 ? 0 : 1,
    };
  });

  useEffect(() => {
    if (isOpen == false && message !== null) {
      toggleBox();
    }
  }, [message, isOpen]);

  const animatedImgStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(interpolate(boxHeight.value, [0, 65], [0, 1])),
      width: withTiming(interpolate(boxHeight.value, [0, 65], [0, 20])),
      height: withTiming(interpolate(boxHeight.value, [0, 65], [0, 20])),
      opacity: interpolate(boxHeight.value, [0, 65], [0, 1]),
      transform: [
        {translateX: interpolate(boxHeight.value, [0, 65], [-22, 0])},
        {
          rotateY: withTiming(
            interpolate(boxHeight.value, [0, 65], ['160deg', '0deg']),
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Animated.View style={[styles.replyImageContainer, animatedColor]}>
        <Animated.Image
          style={[
            animatedImgStyle,
            {
              tintColor: isUser ? '#2196F3' : 'green',
            },
          ]}
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/128/6996/6996004.png',
          }}
        />
      </Animated.View>

      <View style={styles.messageContainer}>
        <Text>{message?.message}</Text>
      </View>

      {message?.message && (
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => {
            toggleBox();
            clearReply();
          }}>
          <Image
            style={styles.crossButtonIcon}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1617/1617543.png',
            }}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default ReplyMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.3,
    borderTopColor: 'lightgrey',
    backgroundColor: 'white',
  },
  replyImageContainer: {
    borderRightWidth: 2,
    marginRight: 6,
    height: '80%',
    justifyContent: 'center',
    width: 35,
    alignItems: 'center',
  },
  crossButtonIcon: {
    width: 18,
    height: 18,
  },
  crossButton: {
    padding: 10,
  },
  messageContainer: {
    paddingEnd: 5,
    width: '78%',
  },
});
