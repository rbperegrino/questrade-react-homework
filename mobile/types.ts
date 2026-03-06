import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DispatchWithoutAction } from "react";

export type Status = 'running' | 'finished';

export interface Lottery {
  id: string;
  name: string;
  prize: string;
  type: string;
  status: Status;
}

export type StackList = {
  Home: undefined;
  LotteryDetails: { id: string };
  AddLottery: undefined;
  Register: { selectedLotteries: Array<string> };
};

export type AddLotteryScreenNavigationProp = NativeStackNavigationProp<
    StackList,
    "AddLottery"
>;

export type RegisterScreenRouteProp = RouteProp<StackList, 'Register'>;

export type LotteryDetailsRouteProp = RouteProp<StackList, 'LotteryDetails'>;

export type LotteryDetailsNavigationProp = NativeStackNavigationProp<
  StackList,
  'LotteryDetails'
>;

export enum LotteryListSortingOptions {
  Ascending,
  Descending,
}

export interface LotteriesSortingContextValue {
  selectedSorting: LotteryListSortingOptions;
  switchSorting: DispatchWithoutAction;
}