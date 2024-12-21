import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import shadows from '../styles/shadows';
import colors from '../styles/colors';
import fontSizes from '../styles/fonts';

const NotFoundCard = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>Sorry, no movies found.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 100,
        width: 300,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.White,
        borderRadius: 8,

        ...shadows.shadowLight
    },
    text: {
        ...fontSizes.body,
        color: colors.Black,
        textAlign: 'center',
    },
});

export default NotFoundCard