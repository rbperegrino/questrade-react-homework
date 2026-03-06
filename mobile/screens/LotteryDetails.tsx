import { useRoute } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Lottery, LotteryDetailsRouteProp } from '../types';
import LotteryDetailsView from '../components/LotteryDetailsView';
import LotteryDetailsDataProvider from '../providers/LotteryDetailsDataProvider';
import { LotteryDetailsError } from '../components/LotteryDetailsError';
import { ErrorBoundary } from '../components/ErrorBoundary';

const fallback = <LotteryDetailsError />;

export const LotteryDetails = () => {
  const route = useRoute<LotteryDetailsRouteProp>();

  return (
    <ErrorBoundary fallback={fallback}>
          <LotteryDetailsDataProvider lotteryId={route.params.id}>
              {(lotteryDetails) => <LotteryDetailsView lottery={lotteryDetails} />}
          </LotteryDetailsDataProvider>
      </ErrorBoundary>
);
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});