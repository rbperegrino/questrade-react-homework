import { NavigationContainer } from '@react-navigation/native';
import RootStack from './stacks/RootStack';


export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

