/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
  View,
  Image,
  Easing,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

import AnimatedText from '../../components/Text';
import WeatherList from '../../components/WeatherList';
import Loading from '../../components/Loading';
import Settings from '../Settings';
import Location from '../Location';

import * as ACTIONS from '../../constants/actions';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {temp} from '../../utils/formating';

import {COLORS} from '../../constants/colors';
import {windIconXml} from '../../constants/icons';
import styles from './styles';

const HomeScreen = () => {
  const aV = useRef(new Animated.Value(0)).current; // 0 - light theme, 1 - dark theme;
  const dispatch = useAppDispatch();

  const [isLightTheme, _isLightTheme] = useState(true);
  const [isSettingsVisible, _isSettingsVisible] = useState(false);
  const [isLocationVisible, _isLocationVisible] = useState(false);

  const minCelsius = useAppSelector(state => state.settings.minCelsius);
  const currentWeather = useAppSelector(state => state.weather.current);
  const settings = useAppSelector(state => state.settings);

  useEffect(() => {
    if (settings.location) {
      dispatch(ACTIONS.GET_WEATHER_FULL_INFO_ACTION(settings.location));
    }
  }, [dispatch, settings.location]);

  useEffect(() => {
    if (currentWeather && currentWeather?.main.temp <= minCelsius) {
      switchToDark();
    } else {
      switchToLight();
    }
  }, [minCelsius, currentWeather]);

  const backgroundColor = aV.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.light.background, COLORS.dark.background],
  });

  const textColor = aV.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.light.text, COLORS.dark.text],
  });

  const subBackgroundColor = aV.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.light.subBackground, COLORS.dark.subBackground],
  });

  const switchToDark = () => {
    Animated.timing(aV, {
      toValue: 1,
      duration: 750,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => _isLightTheme(false));
  };

  const switchToLight = () => {
    Animated.timing(aV, {
      toValue: 0,
      duration: 750,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => _isLightTheme(true));
  };

  const iconColor = useMemo(() => {
    return COLORS[isLightTheme ? 'light' : 'dark'].text;
  }, [isLightTheme]);

  const toggleSettings = () => _isSettingsVisible(v => !v);
  const toggleLocation = () => _isLocationVisible(v => !v);

  if (!currentWeather) {
    return <Loading />;
  }

  return (
    <Animated.View style={[styles.container, {backgroundColor}]}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={[styles.row, styles.spacebetween]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleLocation}
            style={styles.settingButton}>
            <Image
              source={require('../../assets/location_icon.png')}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
          <AnimatedText
            styles={styles.screenTitle}
            value="Current location"
            animatedColors={textColor}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleSettings}
            style={styles.settingButton}>
            <Image
              source={require('../../assets/settings_icon.png')}
              style={styles.settingsIcon}
            />
          </TouchableOpacity>
        </View>
        <AnimatedText
          styles={styles.subTitleCity}
          value={currentWeather.name}
          animatedColors={textColor}
        />
        <AnimatedText
          styles={styles.currentTemp}
          value={temp(currentWeather.main.temp)}
          animatedColors={textColor}
        />
        <View style={styles.row}>
          <View style={[styles.rowItem, styles.noMargin]}>
            <SvgXml xml={windIconXml(27, 27, iconColor)} />
            <AnimatedText
              value={`${currentWeather.wind.speed} m/s`}
              animatedColors={textColor}
              styles={styles.rowTextItem}
            />
          </View>
        </View>
        {currentWeather.weather?.[0] ? (
          <AnimatedText
            styles={styles.subText}
            value={`${currentWeather.weather[0].main}, ${currentWeather.weather[0].description}`}
            animatedColors={textColor}
          />
        ) : null}
        <AnimatedText
          styles={styles.subText}
          value={`Max.: ${temp(currentWeather.main.temp_max)}, min.: ${temp(
            currentWeather.main.temp_min,
          )}`}
          animatedColors={textColor}
        />
        <TouchableOpacity onPress={switchToLight}>
          <AnimatedText value="Switch to light" animatedColors={textColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={switchToDark}>
          <AnimatedText value="Switch to dark" animatedColors={textColor} />
        </TouchableOpacity>
        <WeatherList
          subBackgroundColor={subBackgroundColor}
          textColor={textColor}
        />
      </ScrollView>
      <Settings
        close={toggleSettings}
        iconColor={iconColor}
        textColor={textColor}
        minCelsius={minCelsius}
        isVisible={isSettingsVisible}
        backgroundColor={backgroundColor}
      />
      <Location
        close={toggleLocation}
        isVisible={isLocationVisible}
        textColor={textColor}
        backgroundColor={backgroundColor}
      />
    </Animated.View>
  );
};

export default HomeScreen;
