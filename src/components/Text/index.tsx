import React from 'react';
import {Animated, TextStyle} from 'react-native';

interface IAnimatedText {
  value: string;
  styles?: TextStyle | null;
  animatedColors: Animated.AnimatedInterpolation<string | number>;
}

const AnimatedText = ({
  value,
  styles = null,
  animatedColors,
}: IAnimatedText) => (
  <Animated.Text style={[styles, {color: animatedColors}]}>
    {value}
  </Animated.Text>
);

export default AnimatedText;
