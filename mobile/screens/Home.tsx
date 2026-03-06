import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import Fab from "../components/Fab";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AddLotteryScreenNavigationProp } from "../types";
import { MaterialIcons } from "@expo/vector-icons";
import LotteryList from "../components/LotteryList";
import useLotteries from "../hooks/useLotteries";
import { useCallback, useState } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";

const Home = () => {

    const [selectedLotteries, setSelectedLotteries] = useState<Array<string>>([]);
    const lotteries = useLotteries();
    const { navigate } = useNavigation<AddLotteryScreenNavigationProp>();
    const { storedData, getStoredData } = useAsyncStorage();
    const registeredLotteries = storedData || [];
   
    useFocusEffect(
        useCallback(() => {
            lotteries.fetchLotteries();
            setSelectedLotteries([]);
            getStoredData();
        }, [])
    );

    const handleSelect = (lotteryId: string) => {
        setSelectedLotteries((selectedLotteries) => {
            if (selectedLotteries.includes(lotteryId)) {
                return selectedLotteries.filter((id) => id !== lotteryId);
            }
            return [...selectedLotteries, lotteryId];
        });
    }

    const registerBackgroundColor = selectedLotteries.length > 0 ? '#84a9e0' : '#CCCCCC';


    return <View style={styles.container}>
        <TouchableOpacity
        accessibilityRole="button"
        onPress={() => navigate('Register', { selectedLotteries })}
        style={[styles.registerButton, { backgroundColor: registerBackgroundColor }]}
        disabled={selectedLotteries.length === 0}
      >
        <Text>Register</Text>
      </TouchableOpacity>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Lotteries</Text>
            <MaterialIcons name="casino" size={36} color="black" />
        </View>
        {lotteries.loading ? <ActivityIndicator size="large" color="#ea5382" /> : (
            <LotteryList
                lotteries={lotteries.data}
                selectedLotteries={selectedLotteries}
                onPress={handleSelect}
                registeredLotteries={registeredLotteries}
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
    registerButton: {
        position: 'absolute',
        right: 16,
        top: 8,
        borderRadius: 4,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
      },
})

export default Home;