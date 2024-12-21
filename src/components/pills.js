import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../styles/colors'
import fontSizes from '../styles/fonts'

const Pills = ({ label = 'Pills', onPress = () => { }, isSelected = false }) => {
    return (
        <TouchableOpacity style={[styles.pill, isSelected ? styles.selectedPill : '']} onPress={onPress} activeOpacity={0.8}>
            <Text style={[styles.pillText, isSelected ? styles.selectedPillText : '']}>{label}</Text>
        </TouchableOpacity>
    )
}

export default Pills

const styles = StyleSheet.create({
    pill: {
        backgroundColor: colors.DarkGray20,
        paddingHorizontal: 16,
        paddingVertical: 8,

        borderRadius: 24,

        alignItems: 'center',

        marginVertical: 4,
        marginRight: 8,

        borderWidth: 1,
        borderColor: colors.DarkGray20,
    },
    pillText: {
        color: colors.Black,
        ...fontSizes.button_small
    },
    selectedPill: {
        backgroundColor: colors.Primary,
        borderColor: colors.Primary,
    },
    selectedPillText: {
        color: colors.White,
    },
})