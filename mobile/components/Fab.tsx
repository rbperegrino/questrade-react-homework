import { TouchableOpacity, Text, StyleSheet } from "react-native";

type FabProps = {
    onPress: () => void;
}

const Fab = ({ onPress }: FabProps) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <Text>Add Lottery</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'green',
        color: 'white',
        padding: 10,
        borderRadius: 10,
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Fab;