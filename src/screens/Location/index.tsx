/* eslint-disable no-alert */
import React, {useState} from 'react';
import {
  Animated,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';

import AnimatedText from '../../components/Text';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {api} from '../../utils/api';
import * as ENDPOINTS from '../../constants/endpoints';
import * as ACTIONS from '../../constants/actions';

import styles from './styles';
import {ISearchHistory} from '../../types/actions';
import {generateKey} from '../../utils/formating';

interface ILocation {
  close: () => void;
  isVisible: boolean;
  textColor: Animated.AnimatedInterpolation<string | number>;
  backgroundColor: Animated.AnimatedInterpolation<string | number>;
}

interface IRenderItem {
  item: ISearchHistory;
  textColor: Animated.AnimatedInterpolation<string | number>;
}

const RenderItem = ({item, textColor}: IRenderItem) => (
  <View style={styles.row}>
    <AnimatedText
      value={item.value}
      styles={styles.locationValue}
      animatedColors={textColor}
    />
    {item.isHome ? (
      <Image
        source={require('../../assets/home_icon.png')}
        style={styles.homeIcon}
      />
    ) : null}
  </View>
);

const Location = ({
  isVisible,
  close,
  backgroundColor,
  textColor,
}: ILocation) => {
  const dispatch = useAppDispatch();
  const [input, _input] = useState<string>('');
  const searchHistory = useAppSelector(state => state.settings.searchHistory);

  const onChangeText = (v: string) => _input(v);

  const setupCity = (isHome: boolean = false) => {
    const searchObject: ISearchHistory = {
      value: input,
      id: generateKey(),
      isHome,
    };
    dispatch(ACTIONS.ADD_TO_HISTORY_ACTION(searchObject));
    dispatch(ACTIONS.SET_CONFIG_LOCATION_ACTION(searchObject.value));
    close();
  };

  const onSubmitEditing = async () => {
    try {
      await api.get(ENDPOINTS.GET_TODAY_WEATHER_ENDPOINT(input));
      Alert.alert('Hey', 'Do you want to save this city as a Home?', [
        {
          text: 'Yes',
          style: 'default',
          onPress: () => setupCity(true),
        },
        {text: 'No', style: 'destructive', onPress: () => setupCity(false)},
      ]);
    } catch (e) {
      console.log(e);
      Alert.alert('Error', 'City was not found.');
    }
  };

  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <Animated.View style={[styles.container, {backgroundColor}]}>
        <AnimatedText
          value="Select Location"
          animatedColors={textColor}
          styles={styles.title}
        />
        <TextInput
          value={input}
          onChangeText={onChangeText}
          placeholder="Amsterdam"
          returnKeyType="done"
          onSubmitEditing={onSubmitEditing}
          style={styles.input}
        />
        <FlatList
          data={searchHistory}
          renderItem={({item}) => (
            <RenderItem item={item} textColor={textColor} />
          )}
        />
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

export default Location;
