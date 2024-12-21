import { NavigationContainer } from "@react-navigation/native"
import AppStack from "./appstacknavigator"
import { UserProvider } from "../context/usercontext"
import { SafeAreaView } from "react-native-safe-area-context"
import { GenresProvider } from "../context/genrecontext"

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <UserProvider>
                <GenresProvider>
                    <AppStack />
                </GenresProvider>
            </UserProvider>
        </NavigationContainer>
    )
}

export default RootNavigator