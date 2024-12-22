import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/store/store';
import colors from './src/styles/colors';
import { StatusBar } from 'react-native';
import { UserContext, UserProvider } from './src/context/usercontext';
import { GenresProvider } from './src/context/genrecontext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStackNavigator, { AppStack, WelcomeAppStack } from './src/navigator/appstacknavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    GetUser();
  }, [])

  const GetUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const parseUser = JSON.parse(user);
      if (parseUser) setAuthenticated(true);
    } catch (error) {
      throw error;
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar backgroundColor={colors.White} barStyle="dark-content" />
        <Provider store={store}>
          <UserProvider>
            <GenresProvider>
              <NavigationContainer>
                  <AppStackNavigator authenticated={authenticated} />
              </NavigationContainer>
            </GenresProvider>
          </UserProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
