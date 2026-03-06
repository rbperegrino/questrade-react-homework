import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackList } from '../types';
import Home from '../screens/Home';
import AddLottery from '../screens/AddLottery';
import Register from '../screens/Register';
import { LotteryDetails } from '../screens/LotteryDetails';

const Stack = createNativeStackNavigator<StackList>();

const RootStack = () => { 
   return  (
    <Stack.Navigator>
        <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddLottery" component={AddLottery} />
            <Stack.Screen
                    name="LotteryDetails"
                    component={LotteryDetails}
                    
                    />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Register" component={Register} />
        </Stack.Group>
    </Stack.Navigator>
    )
}

export default RootStack;