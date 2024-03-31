import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../constants/colors';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.75,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 24,
    paddingHorizontal: 32,
    // paddingRight: 32,
  },
  modal: {
    margin: 0,
    padding: 0,
    width,
    height,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  label: {
    fontSize: 21,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tempTouch: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
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
});

export default styles;
