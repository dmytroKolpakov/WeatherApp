import React from 'react';
import {Animated} from 'react-native';

import styles from './styles';

interface ISeparator {
  bgColor: Animated.AnimatedInterpolation<string | number>;
}

const Separator = ({bgColor}: ISeparator) => (
  <Animated.View style={[styles.line, {backgroundColor: bgColor}]} />
);

export default Separator;
