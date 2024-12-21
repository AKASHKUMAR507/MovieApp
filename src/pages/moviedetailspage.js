import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpandableText from '../components/expandabletext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import fontSizes from '../styles/fonts';
import colors from '../styles/colors';
import { Button } from '../components/buttons';
import { useDispatch } from 'react-redux';
import { favoriteMovie, unfavoriteMovie } from '../feature/movieslice';

const ManuButton = ({ item, title }) => {
    return (
        <View style={styles.manuContainer}>
            <Text style={styles.manuItemText}>{item}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {Array.isArray(title) ? title.map((i, index) => <Text key={index} style={styles.manuTitleText}>{i}</Text>) : <Text style={styles.manuTitleText}>{title}</Text>}
            </View>
        </View>
    )
}

const MovieDetailsPage = (props) => {
    const movie = props.route.params?.movie
    const isFavoriteProps = props.route.params?.isFavorite
    const { title, rating, language, poster, plot, year, genre } = movie;
    const insets = useSafeAreaInsets();
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = React.useState(isFavoriteProps || false);
    

    const handleFavorite = (m) => {
        if (isFavorite) {
            dispatch(unfavoriteMovie(m));
        } else {
            dispatch(favoriteMovie(m));
        }
        setIsFavorite(!isFavorite);
    }

    return (
        <View style={[styles.container]}>
            <ScrollView contentContainerStyle={{ paddingTop: insets.top }} >
                <View style={styles.posterContainer}>
                    <Image source={{ uri: poster }} style={{ width: 200, height: 250 }} resizeMode='contain' />
                </View>
                <Text style={styles.title}>{title}</Text>
                <ExpandableText text={plot} numberOfLines={2} />

                <ManuButton item={"Year of Release"} title={year} />
                <ManuButton item={"Genre"} title={genre} />


            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button label={isFavorite ? "Mark as  Unfavorite" : 'Mark as Favorite'} onPress={() => handleFavorite(movie)} />
            </View>
        </View>
    )
}

export default MovieDetailsPage
export { ManuButton}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingHorizontal: 20
    },

    posterContainer: {
        alignItems: 'center',
        justifyContent: 'center',

        marginBottom: 16
    },

    title: {
        ...fontSizes.heading_medium,
        fontWeight: '600',
        color: colors.Black,
        marginBottom: 8
    },

    manuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingVertical: 4
    },

    manuItemText: {
        ...fontSizes.body,
        color: colors.DarkGray,
    },

    manuTitleText: {
        ...fontSizes.body,
        color: colors.Black,
    },

    buttonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,

        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: colors.White,

        borderTopColor: colors.LightGray,
        borderTopWidth: 1,
    },

})