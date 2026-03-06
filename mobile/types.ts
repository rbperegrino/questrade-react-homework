import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
  AddLottery: undefined;
  Register: { selectedLotteries: Array<string> };
};

export type AddLotteryScreenNavigationProp = NativeStackNavigationProp<
    StackList,
    "AddLottery"
>;