import { View, Text, StyleSheet, FlatList } from "react-native";
import { Lottery } from "../../backend/types";
import Search from "./Search";
import { useState } from "react";

const LotteryList = ({ lotteries }: { lotteries: Array<Lottery> }) => {
    const [search, setSearch] = useState('');
    const filteredLotteries = lotteries.filter((lottery) =>
        lottery.name.includes(search),
    );
    
    const Card = ({ lottery }: { lottery: Lottery }) => {
        return (
            <View style={styles.card} key={lottery.id}>
                <Text style={styles.cardTitle}>{lottery.name}</Text>
                <Text style={styles.cardPrize}>{lottery.prize}</Text>
                <Text style={styles.cardId}>{lottery.id}</Text>
            </View>
        )
    }

    return (
        <View>
            <Search value={search} onSearch={setSearch} />
            {filteredLotteries.length > 0 ? 
            <FlatList
                style={styles.list}
                data={filteredLotteries}
                renderItem={({ item }) => <Card lottery={item} />}
            />
            : <Text style={styles.noLotteriesFound}>No search results for '{search}'</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    noLotteriesFound: {
        fontSize: 16,
        color: '#999999',
        textAlign: 'center',
        marginTop: 20,
    },
    list: {
        width: '100%',
        marginTop: 10,
    },
    card: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardPrize: {
        fontSize: 14,
        color: '#999999',
    },
    cardId: {
        fontSize: 12,
        color: '#999999',
    },
});

export default LotteryList;