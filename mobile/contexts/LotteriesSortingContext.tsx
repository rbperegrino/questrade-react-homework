import { createContext, JSX, useContext, useReducer } from "react";
import { LotteryListSortingOptions, LotteriesSortingContextValue } from "../types";


const LotteriesSortingContext = createContext<LotteriesSortingContextValue | undefined>(undefined);

interface LotteriesSortingContextProviderProps {
    children: React.ReactNode;
}


const sortingReducer = (state: LotteryListSortingOptions) => {
return state === LotteryListSortingOptions.Ascending
    ? LotteryListSortingOptions.Descending
    : LotteryListSortingOptions.Ascending;
};


export const useLotteriesSortingContext = () => {
    const context = useContext(LotteriesSortingContext);

    if (context === undefined) {
        throw new Error(
        'useLotteriesSortingContext must be used within a LotteriesSortingContextProvider',
        );
    }

    return context;
};

  
  export const LotteriesSortingContextProvider = ({children}: LotteriesSortingContextProviderProps) => {
    const [selectedSorting, switchSorting] = useReducer(
        sortingReducer,
        LotteryListSortingOptions.Ascending,
      );
    
      const value: LotteriesSortingContextValue = {
        selectedSorting,
        switchSorting,
      };
    
      return (
        <LotteriesSortingContext.Provider value={value}>
          {children}
        </LotteriesSortingContext.Provider>
      );
  }