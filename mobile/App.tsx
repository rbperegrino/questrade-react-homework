import { NavigationContainer } from '@react-navigation/native';
import RootStack from './stacks/RootStack';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
        </ToastProvider>
    </SafeAreaProvider>
 
  );
}

