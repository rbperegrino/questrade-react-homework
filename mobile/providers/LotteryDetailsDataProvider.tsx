import { ReactElement, useEffect } from "react";
import { useLotteryDetails } from "../hooks/useLotteryDetails";
import { Lottery } from "../types";
import { ActivityIndicator } from "react-native";

interface LotteryDetailsDataProviderProps {
    children: (lotteryDetails: Lottery) => ReactElement;
    lotteryId: string;
  }
  
const LotteryDetailsDataProvider = ({
children,
lotteryId,
}: LotteryDetailsDataProviderProps) => {


    const { data, loading } = useLotteryDetails(lotteryId);

    if (loading) return <ActivityIndicator size="large" color="#ea5382" />;
    return data ? children(data) : null;
};    

export default LotteryDetailsDataProvider;