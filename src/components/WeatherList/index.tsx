import React from 'react';
import {View, FlatList, Animated} from 'react-native';
import dayjs from 'dayjs';

import AnimatedText from '../Text';
import Separator from '../Separator';

import {useAppSelector} from '../../hooks/hooks';
import {daysOfWeek} from '../../constants/constants';
import {IForecastListItem} from '../../types/actions';
import {temp} from '../../utils/formating';

import styles from './styles';

interface IWeatherList {
  subBackgroundColor: Animated.AnimatedInterpolation<string | number>;
  textColor: Animated.AnimatedInterpolation<string | number>;
}

interface IRenderItem {
  item: IForecastListItem;
  textColor: Animated.AnimatedInterpolation<string | number>;
}

const RenderItem = ({item, textColor}: IRenderItem) => {
  if (!item) {
    return null;
  }
  return (
    <View style={styles.renderItem}>
      <AnimatedText
        animatedColors={textColor}
        value={!item?.dt_txt ? 'Today' : daysOfWeek[dayjs(item.dt_txt).day()]}
        styles={styles.dayText}
      />
      <AnimatedText animatedColors={textColor} value="|" />
      <AnimatedText
        animatedColors={textColor}
        value={`${temp(item.main.temp)}`}
        styles={styles.tempRow}
      />
      <AnimatedText
        animatedColors={textColor}
        value={item.weather[0].main}
        styles={styles.tempRow}
      />
    </View>
  );
};

const WeatherList = ({subBackgroundColor, textColor}: IWeatherList) => {
  const weatherList = useAppSelector(state => state.weather.weatherList);

  return (
    <Animated.View
      style={[styles.container, {backgroundColor: subBackgroundColor}]}>
      <AnimatedText
        value="Forecast for the next 6 days"
        animatedColors={textColor}
        styles={styles.sectionTitle}
      />
      <FlatList
        scrollEnabled={false}
        data={weatherList}
        //@ts-ignore
        ItemSeparatorComponent={<Separator bgColor={textColor} />}
        renderItem={({item}) => (
          <RenderItem item={item} textColor={textColor} />
        )}
      />
    </Animated.View>
  );
};

export default WeatherList;
