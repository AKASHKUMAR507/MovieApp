import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useContext } from 'react'
import MovieLogo from '../../../assets/icons/Logo.svg'
import colors from '../../styles/colors'
import fontSizes from '../../styles/fonts'
import { Button } from '../../components/buttons'
import { useNavigation } from '@react-navigation/native'
import Pills from '../../components/pills'
import { GenresContext } from '../../context/genrecontext'

const GenresType = {
    Action: 'Action',
    Comedy: 'Comedy',
    Drama: 'Drama',
    Horror: 'Horror',
    Romance: 'Romance',
    SciFi: 'Sci-Fi',
    Mystery: 'Mystery',
}

const Genres = () => {
    const navigation = useNavigation();
    const [selectedGenres, setSelectedGenres] = useState([GenresType.Action]); {/*NOTE: Action is selected by default */ }
    const { setGenre} = useContext(GenresContext)

    const handleSelectGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    }

    const handleNext = () => {
        setGenre(selectedGenres)
        navigation.navigate('App');
    }

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <MovieLogo height={50} width={50} fill={colors.Primary} />
            </View>

            <View style={styles.selector}>
                <Text style={styles.selectionText}>Select Your Favorite Genres</Text>
                <View style={{ alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', marginRight: 10 }}>
                    {Object.values(GenresType).map((genre, index) => (
                        <Pills key={index} label={genre} isSelected={selectedGenres.includes(genre)} onPress={() => handleSelectGenre(genre)} />
                    ))}
                </View>
            </View>

            <View style={styles.button}>
                <Button label='Next' disabled={selectedGenres.length <= 0} onPress={() => handleNext()} />
            </View>
        </View>
    )
}

export default Genres

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'space-between',

        backgroundColor: colors.White,

        paddingHorizontal: 20,
        paddingTop: 20
    },

    logo: {
        paddingTop: 32
    },

    selectionText: {
        ...fontSizes.body_large,
        fontWeight: '600',
        color: colors.Black,
        textAlign: 'center'
    },

    selector: {
        borderWidth: 1,
        borderColor: colors.Gray,
        borderRadius: 8,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',

        gap: 16
    },

    button: {
        width: '100%',
        paddingVertical: 24
    }
})