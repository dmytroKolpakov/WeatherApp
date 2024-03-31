import React, {useState, useRef, RefObject} from 'react';
import {View, Animated, TextInput, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';

import AnimatedText from '../../components/Text';

import {useAppDispatch} from '../../hooks/hooks';
import * as ACTIONS from '../../constants/actions';
import styles from './styles';

interface ISettings {
  close: () => void;
  isVisible: boolean;
  minCelsius: number;
  iconColor: string;
  textColor: Animated.AnimatedInterpolation<string | number>;
  backgroundColor: Animated.AnimatedInterpolation<string | number>;
}

const Settings = ({
  close,
  isVisible,
  minCelsius,
  textColor,
  iconColor,
  backgroundColor,
}: ISettings) => {
  const inputRef = useRef<RefObject<TextInput>>(null);
  const [isEditable, _isEditable] = useState(false);
  const [value, _value] = useState(String(minCelsius));
  const dispatch = useAppDispatch();

  const onPressTemp = () => {
    _isEditable(v => !v);
    setTimeout(() => {
      if (inputRef?.current) {
        //@ts-ignore
        inputRef?.current?.focus();
      }
    });
  };

  const onChangeText = (t: string) => _value(t);

  const onSubmitEditing = () => {
    dispatch(ACTIONS.SET_CONFIG_MIN_CELSIUS_VALUE_ACTION(value ? +value : 0));
    _isEditable(false);
    if (!value) {
      _value('0');
    }
  };

  const renderRightPart = () => {
    if (isEditable) {
      return (
        <TextInput
          //@ts-ignore
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="done"
          returnKeyLabel="OK"
          keyboardType="number-pad"
          onSubmitEditing={onSubmitEditing}
          style={[styles.label, {color: iconColor}]}
        />
      );
    }

    return (
      <TouchableOpacity onPress={onPressTemp} style={styles.tempTouch}>
        <AnimatedText
          animatedColors={textColor}
          value={`${minCelsius}°`}
          styles={styles.label}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <Animated.View style={[styles.container, {backgroundColor}]}>
        <View style={styles.row}>
          <AnimatedText
            animatedColors={textColor}
            value="Min. temp for dark theme: "
            styles={styles.label}
          />
          {renderRightPart()}
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={close}
            style={styles.closeTouch}>
            <Text style={styles.closeLabel}>Close</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default Settings;
