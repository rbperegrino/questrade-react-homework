import { NavigationContainer } from '@react-navigation/native';
import RootStack from './stacks/RootStack';
import { ToastProvider } from 'react-native-toast-notifications';


export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
          <RootStack />
        </NavigationContainer>
    </ToastProvider>
  );
}

