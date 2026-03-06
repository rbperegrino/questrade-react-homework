import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Animated } from "react-native";
import Fab from "../components/Fab";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AddLotteryScreenNavigationProp } from "../types";
import { MaterialIcons } from "@expo/vector-icons";
import LotteryList from "../components/LotteryList";
import useLotteries from "../hooks/useLotteries";
import { useCallback, useRef, useState } from "react";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { LotteriesSortingContextProvider } from "../contexts/LotteriesSortingContext";
import { HomeHeader } from "../components/HomeHeader";

const Home = () => {

    const [selectedLotteries, setSelectedLotteries] = useState<Array<string>>([]);
    const lotteries = useLotteries();
    const { navigate } = useNavigation<AddLotteryScreenNavigationProp>();
    const { storedData, getStoredData } = useAsyncStorage();
    const registeredLotteries = storedData || [];

    const scrollY = useRef(new Animated.Value(0)).current;
   
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

    const height = scrollY.interpolate({  
        inputRange: [0, 200],
        outputRange: [100, 50],
        extrapolate: 'clamp', 
    });

    const opacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const scale = scrollY.interpolate({  
        inputRange: [0, 200],
        outputRange: [1, 0.5],
        extrapolate: 'clamp', 
    });


    return (
    <LotteriesSortingContextProvider>
        <View style={styles.container}>
            <HomeHeader selectedLotteries={selectedLotteries} />
            <Animated.View 
            style={[
            
                height,
                opacity,
                { transform: [{ scale }] }
            ]}>
            <View style={ styles.titleContainer }>
                <Text style={styles.title}>Lotteries</Text>
                <MaterialIcons name="casino" size={36} color="black" />
            </View>
            </Animated.View>
            {lotteries.loading ? <ActivityIndicator size="large" color="#ea5382" /> : (
                <LotteryList
                    lotteries={lotteries.data}
                    selectedLotteries={selectedLotteries}
                    onPress={handleSelect}
                    registeredLotteries={registeredLotteries}
                    scrollY={scrollY}
                />
            )}
            <Fab onPress={() => navigate('AddLottery')} />
        </View>
        </LotteriesSortingContextProvider>
        )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        position: 'relative',
        width: '100%',
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