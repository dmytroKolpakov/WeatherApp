import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants/colors';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    width,
    height,
    margin: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    width,
    height: height * 0.9,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  title: {
    fontWeight: '600',
    fontSize: 24,
    alignSelf: 'center',
    marginBottom: 16,
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 45,
  },
  closeTouch: {
    height: 45,
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.light.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeLabel: {
    fontSize: 21,
    fontWeight: '600',
    color: COLORS.dark.text,
  },
  input: {
    backgroundColor: COLORS.light.background,
    width: '100%',
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 32,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  locationValue: {
    fontSize: 18,
    fontWeight: '500',
  },
  homeIcon: {
    width: 21,
    height: 21,
  },
});

export default styles;
