import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { use, useContext, useEffect, useState } from 'react'
import { Movies } from '../../network/models/movies';
import shadows from '../../styles/shadows';
import colors from '../../styles/colors';
import inputStyles from '../../components/form_inputs/inputStyles';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import SearchMovie from '../../utilities/search';
import Loading from '../../components/loading';
import NotFoundCard from '../../components/notfound';
import { GenresContext } from '../../context/genrecontext'
import filterMoviesByGenre from '../../utilities/filtermovies';
import { UserContext } from '../../context/usercontext';

// NOTE: The Search Input is an additional code written here
const SearchInput = ({
    value = null,
    onChange = () => { },
}) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput placeholder='Search' value={value} onChangeText={(text) => onChange(text)} placeholderTextColor={colors.Black} style={[inputStyles.inputWrapper, { paddingVertical: 8, paddingHorizontal: 24 }]} cursorColor={colors.Primary40} selectionColor={colors.Primary40} />
        </View>
    )
}

const MoviesCard = ({ item }) => {
    // NOTE: Extracting properties
    const { title, rating, language, poster } = item;

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('MovieDetails', { movie: item })}>
            <Image source={{ uri: poster }} style={{ width: 100, height: 150 }} resizeMode='contain' />
            <View style={styles.cardTitle}>
                <Text>{title}</Text>
                <Text>Rating {rating}</Text>
                <Text>{language}</Text>
            </View>
        </TouchableOpacity>
    )
}


const HomePage = (props) => {
    const [movies, setMovies] = React.useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const { genre } = useContext(GenresContext);

    useEffect(() => {
        getMovies();
        setSearchText('');
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            let filtered = SearchMovie(movies, searchText);
            setFilteredMovies(filtered);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchText, genre])

    const getMovies = async () => {
        try {
            const response = await Movies();
            if (genre?.length > 0) {
                const filtered = filterMoviesByGenre(response, genre);
                setMovies(filtered);
            } else {
                setMovies(response);
            }
        } catch (error) {
            console.error('Error fetching movies:', error.message);
        }
    }

    return (
        <View style={styles.container}>
            <SearchInput value={searchText} onChange={(text) => setSearchText(text)} />

            {
                movies.length > 0 ?
                    <FlashList
                        data={filteredMovies.length > 0 ? filteredMovies : movies}
                        renderItem={({ item }) => <MoviesCard item={item} />}
                        numColumns={2}
                        estimatedItemSize={100}
                        contentContainerStyle={styles.list}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                        ListHeaderComponent={() => <View style={{ height: 10 }} />}
                        showsVerticalScrollIndicator={false}
                    /> : <Loading />
            }
        </View>
    )
}

export default HomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: colors.White,
    },

    searchContainer: {
        backgroundColor: colors.White,

        ...shadows.shadowExtraLight,
    },

    list: {
        paddingHorizontal: 16,
        paddingVertical: 16
    },

    card: {
        paddingHorizontal: 24,
        paddingVertical: 16,

        backgroundColor: colors.White,

        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: 8,

        ...shadows.shadowExtraLight,
        marginLeft: '4%', // Adjusted to fix the extra space on the right side
    },

    notfound: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})