import { useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Lottery, LotteryDetailsRouteProp } from '../types';
import LotteryDetailsView from '../components/LotteryDetailsView';
import LotteryDetailsDataProvider from '../providers/LotteryDetailsDataProvider';

export const LotteryDetails = () => {
  const route = useRoute<LotteryDetailsRouteProp>();

  return (
    <LotteryDetailsDataProvider lotteryId={route.params.id}>
        {(lotteryDetails: Lottery) => <LotteryDetailsView lottery={lotteryDetails} />}
    </LotteryDetailsDataProvider>
);
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});