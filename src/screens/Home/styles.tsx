import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingTop: 75,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '600',
  },
  subTitleCity: {
    fontSize: 21,
    fontWeight: '500',
  },
  currentTemp: {
    fontSize: 100,
    marginRight: -35,
    fontWeight: '400',
  },
  subText: {
    fontSize: 18,
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  spacebetween: {
    width: '100%',
    justifyContent: 'space-between',
  },
  rowItem: {
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noMargin: {
    marginLeft: 0,
  },
  rowTextItem: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 6,
  },
  settingsIcon: {
    width: 30,
    height: 30,
  },
  settingButton: {
    width: 45,
    height: 45,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.light.background,
  },
});

export default styles;
