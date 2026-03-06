import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useLotteriesSortingContext } from "../contexts/LotteriesSortingContext";
import { LotteryListSortingOptions } from "../types";

const LotteriesSortingButton = () => {

    const { selectedSorting, switchSorting } = useLotteriesSortingContext();

  const iconName =
    selectedSorting === LotteryListSortingOptions.Ascending
      ? 'arrow-up'
      : 'arrow-down';

    return (
        <TouchableOpacity
        accessibilityRole="button"
        style={styles.sortingButton}
        onPress={switchSorting}
        >
            <Text style={styles.sortingButtonText}>Prices</Text>
            <AntDesign name={iconName} size={16} color="black" />
        </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    sortingButton: {
        position: 'absolute',
        left: 16,
        top: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    sortingButtonText: {
        fontWeight: 'bold',
        fontSize: 14,
        marginRight: 3,
    },
  })

  export default LotteriesSortingButton;