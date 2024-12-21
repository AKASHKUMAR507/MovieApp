import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomePage from "../pages/bottomnavpages/home";
import FavoritePage from "../pages/bottomnavpages/favorite";
import BottomBar from "../components/bottombar";

const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
    return (
        <Tab.Navigator tabBar={(props) => <BottomBar {...props} />}>
            <Tab.Screen name="Home" component={HomePage} options={{ tabBarLabel: 'Home', title: 'My Movies' }} />
            <Tab.Screen name="Favorite" component={FavoritePage} options={{ tabBarLabel: 'Favorite', title: 'Favorite Movies' }} />
        </Tab.Navigator>
    )
}

export default AppTabNavigator;