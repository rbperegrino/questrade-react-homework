import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackList } from '../types';
import Home from '../screens/Home';
import AddLottery from '../screens/AddLottery';

const Stack = createNativeStackNavigator<StackList>();

const RootStack = () => { 
   return  (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddLottery" component={AddLottery} />
    </Stack.Navigator>
    )
}

export default RootStack;