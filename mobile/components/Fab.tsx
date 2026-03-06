import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type FabProps = {
    onPress: () => void;
}

const Fab = ({ onPress }: FabProps) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ea5382',
        color: 'white',
        padding: 10,
        borderRadius: 50,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Fab;