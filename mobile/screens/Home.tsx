import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Fab from "../components/Fab";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AddLotteryScreenNavigationProp } from "../types";
import { MaterialIcons } from "@expo/vector-icons";
import LotteryList from "../components/LotteryList";
import useLotteries from "../hooks/useLotteries";
import { useCallback } from "react";

const Home = () => {


    const lotteries = useLotteries();
    const { navigate } = useNavigation<AddLotteryScreenNavigationProp>();

    useFocusEffect(
        useCallback(() => {
            lotteries.fetchLotteries();
        }, [])
    );


    return <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Lotteries</Text>
            <MaterialIcons name="casino" size={36} color="black" />
        </View>
        {lotteries.loading ? <ActivityIndicator size="large" color="#ea5382" /> : (
            <LotteryList
                lotteries={lotteries.data}
            />
        )}
        <Fab onPress={() => navigate('AddLottery')} />
    </View>

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
})

export default Home;