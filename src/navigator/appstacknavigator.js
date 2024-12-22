import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/onboarding/welcome';
import Genres from '../pages/onboarding/genres';
import AppTabNavigator from './apptabnavigator';
import MovieDetailsPage from '../pages/moviedetailspage';

const Stack = createNativeStackNavigator();

const AppStackNavigator = ({ authenticated }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name='Genres' component={Genres} options={{ headerShown: false }} />
            <Stack.Screen name='App' component={AppTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name='MovieDetails' component={MovieDetailsPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}


export default AppStackNavigator;