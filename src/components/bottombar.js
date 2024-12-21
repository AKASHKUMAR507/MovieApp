import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../styles/colors';
import shadows from '../styles/shadows';
import fontSizes from '../styles/fonts';

import Home from '../../assets/icons/home.svg';
import Favorite from '../../assets/icons/heart.svg';

function BottomBar({ state, descriptors, navigation }) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 2 }]}>
        { 
            state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined ? options.tabBarLabel : 
                    options.title !== undefined ? options.title : route.name;

                const isFocused = state.index === index;

                const icon = () => {
                    switch (label) {
                        case 'Home':
                            return isFocused ? <Home height={24} width={24} fill={colors.Primary} /> : <Home height={24} width={24} fill={colors.DarkGray} />;
                        case 'Favorite':
                            return isFocused ? <Favorite height={24} width={24} fill={colors.Primary} /> : <Favorite height={24} width={24} fill={colors.DarkGray} />;
                        default:
                            return <Home />;
                    }
                }

                const onPress = () => {

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.button}
                        key={index}
                        activeOpacity={0.8}
                    >
                        {icon()}
                        <Text style={[styles.bottomBarText, { color: isFocused ? colors.Primary : colors.DarkGray }]}>{label}</Text>
                    </TouchableOpacity>
                )
            })
        }
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        paddingVertical: 8,
        paddingHorizontal: 55,

        backgroundColor: colors.White,

        ...shadows.shadowHeavy,
    },

    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomBarIcon: {
        width: 28,
        height: 28,
    },

    bottomBarText: {
        ...fontSizes.button_xsmall,
        marginTop: 4,
    },
});

export default BottomBar;