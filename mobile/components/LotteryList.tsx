import { View, Text, StyleSheet, FlatList, Pressable, Animated } from "react-native";
import { Lottery } from "../../backend/types";
import Search from "./Search";
import { useMemo, useState } from "react";

type LotteryListProps = {
    lotteries: Array<Lottery>;
    selectedLotteries: Array<string>;
    onPress: (lotteryId: string) => void;
    registeredLotteries: Array<string>;
    scrollY: Animated.Value;
}   

const LotteryList = ({ lotteries, selectedLotteries, onPress, registeredLotteries, scrollY }: LotteryListProps) => {
    const [search, setSearch] = useState('');
    const filteredLotteries = useMemo(() => {
        return lotteries.filter((lottery) =>
            lottery.name.includes(search),
        );
    }, [lotteries, search]);
    
    const Card = ({ lottery }: { lottery: Lottery }) => {
        const isSelected = selectedLotteries.includes(lottery.id);
        const isRegistered = registeredLotteries?.includes(lottery.id);
        return (
            <Pressable 
            onPress={() => onPress(lottery.id)}
            accessibilityLabel={`Select lottery ${lottery.name}`}
            disabled={isRegistered}
            style={[styles.card, isSelected && styles.selectedCard, isRegistered && styles.registeredCard]}
            >
                <View>
                    <Text style={styles.cardTitle}>{lottery.name}</Text>
                    <Text style={styles.cardPrize}>{lottery.prize}</Text>
                    <Text style={styles.cardId}>{lottery.id}</Text>
                </View>
            </Pressable>
        )
    }

    return (
        <View>
            <Search value={search} onSearch={setSearch} />
            {filteredLotteries.length > 0 ? 
            <Animated.FlatList
                style={styles.list}
                data={filteredLotteries}
                renderItem={({ item }) => <Card lottery={item} />}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                  )}
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
    selectedCard: {
        borderColor: '#84a9e0',
    },
    registeredCard: {
        backgroundColor: '#CCCCCC',
    },
});

export default LotteryList;