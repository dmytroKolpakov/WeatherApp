import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '85%',
    marginTop: 32,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  renderItem: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayText: {
    width: 50,
    fontSize: 14,
  },
  tempRow: {
    paddingLeft: 12,
  },
});

export default styles;
