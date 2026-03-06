import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AddLotteryScreenNavigationProp } from '../types';
import LotteriesSortingButton from './LotteriesSortingButton';

interface HomeHeaderProps {
  selectedLotteries: string[];
}

export const HomeHeader = ({ selectedLotteries }: HomeHeaderProps) => {
  const navigation = useNavigation<AddLotteryScreenNavigationProp>();

  const backgroundColor =
      selectedLotteries.length === 0 ? '#CCCCCC' : '#fff';

  return (
    <View style={styles.header}>
      <LotteriesSortingButton />
      <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigation.navigate('Register', { selectedLotteries })}
          style={[styles.button, { backgroundColor }]}
          disabled={selectedLotteries.length === 0}
      >
          <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    height: 40,
    top: 0,
    left: 0,
  },
  button: {
      position: 'absolute',
      right: 16,
      top: 8,
      borderRadius: 4,
      paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 4,
  },
  text: {
      color: '#1976d2',
  },
});