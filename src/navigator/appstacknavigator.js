import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AppTabNavigator from "./apptabnavigator";
import Welcome from "../pages/onboarding/welcome";
import Genres from "../pages/onboarding/genres";
import MovieDetailsPage from "../pages/moviedetailspage";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false, animation: 'slide_from_right' }} />
            <Stack.Screen name="Genres" component={Genres} options={{ headerShown: false, animation: 'slide_from_right' }} />
            <Stack.Screen name="App" component={AppTabNavigator} options={{ headerShown: false, animation: 'slide_from_right' }} />
            <Stack.Screen name="MovieDetails" component={MovieDetailsPage} options={{ headerShown: true, title: 'About Movie', animation: 'slide_from_right' }} />
        </Stack.Navigator>
    )
}

export default AppStack;