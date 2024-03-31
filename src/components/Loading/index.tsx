import React from 'react';
import {View, ActivityIndicator} from 'react-native';

import {COLORS} from '../../constants/colors';
import styles from './styles';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.light.text} />
  </View>
);

export default Loading;
