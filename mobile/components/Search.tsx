import { Ionicons } from "@expo/vector-icons";
import { TextInput, View, StyleSheet} from "react-native";

const Search = ({ value, onSearch }: { value: string, onSearch: (text: string) => void }) => {
    return (
      <View style={styles.container}>
        <TextInput
          accessibilityLabel="Text input field"
          style={styles.input}
          placeholder="Filter lotteries"
          value={value}
          onChangeText={onSearch}
        />
        <Ionicons name="search" size={16} color="#999999" />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#CCCCCC",
      paddingHorizontal: 23,
      width: 300,
    },
    input: {
      flex: 1,
      height: 40,
      fontSize: 16,
      paddingRight: 10,
    },
  });
  
  export default Search;