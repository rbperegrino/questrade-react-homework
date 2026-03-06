import { View, StyleSheet, Text } from "react-native";
import { Lottery } from "../types";
import { ReactElement } from "react";

interface LotteryDetailsViewProps {
    lottery: Lottery;
}

const renderTextRow = (title: string, value: string): ReactElement => {
    const prefix = `${title}: `;
    return (
        <View style={styles.textRow}>
            <Text>
                {prefix}
                <Text style={styles.boldText}>{value}</Text>
            </Text>
        </View>
    );
  };
  
const LotteryDetailsView = ({ lottery }: LotteryDetailsViewProps) => {
    const { id, name, prize, status, type } = lottery;
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            {renderTextRow('ID', id)}
            {renderTextRow('Price', prize)}
            {renderTextRow('Status', status)}
            {renderTextRow('Type', type)}
        </View>
    );
};    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    name: {
        fontSize: 24,
        marginBottom: 10,
    },
    prize: {
        fontSize: 16,
        marginBottom: 10,
    },
    id: {
        fontSize: 12,   
        marginBottom: 10,
    },  
    type: {
        fontSize: 16,
        marginBottom: 10,
    },
    status: {
        fontSize: 16,   
        marginBottom: 10,
    },
    textRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default LotteryDetailsView;
