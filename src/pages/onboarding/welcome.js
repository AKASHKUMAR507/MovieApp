import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FormInputText } from '../../components/form_inputs/inputs'
import { Button } from '../../components/buttons'

import MovieLogo from '../../../assets/icons/Logo.svg'
import colors from '../../styles/colors'
import fontSizes from '../../styles/fonts'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Welcome = () => {
    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState(null);

    const handleNext = async () => {
        if (name.trim() === '') {
            setError('Please enter your name');
            return;
        }

        try {
            await AsyncStorage.setItem('user', JSON.stringify({ name }));
            navigation.replace('Genres');
        } catch (error) {
            throw error;
        }
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.logo}>
                <MovieLogo height={50} width={50} fill={colors.Primary} />
            </View>
            <View style={styles.container}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>Welcome to My Movies</Text>
                    <Text style={styles.subtitle}>Let’s get to know you!</Text>
                </View>
                <FormInputText label="Your Name" placeholder='Ex: Akash Kumar' value={name} onChange={(text) => (setName(text), setError(null))} error={error} />
            </View>
            <View style={styles.button}>
                <Button label="Next" onPress={() => handleNext()} />
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.White,

        alignItems: 'center',

        paddingHorizontal: 20
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        marginTop: -28
    },

    logo: {
        paddingTop: 32
    },

    title: {
        ...fontSizes.heading_large,
        fontWeight: '600',
        color: colors.Black,
        marginBottom: 8,
    },

    subtitle: {
        ...fontSizes.body,
        color: colors.DarkGray,
        marginBottom: 32,
    },

    button: {
        width: '100%',
        paddingVertical: 24
    },
})