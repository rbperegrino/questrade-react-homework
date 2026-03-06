import { View, Text } from "react-native";
import Fab from "../components/Fab";
import { useNavigation } from "@react-navigation/native";
import { AddLotteryScreenNavigationProp } from "../types";

const Home = () => {

    const { navigate } = useNavigation<AddLotteryScreenNavigationProp>();


    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home</Text>
        <Fab onPress={() => navigate('AddLottery')} />
    </View>

};

export default Home;