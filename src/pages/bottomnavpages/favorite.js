import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { FlashList } from '@shopify/flash-list'
import colors from '../../styles/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import fontSizes from '../../styles/fonts'
import { Button } from '../../components/buttons'
import { useNavigation } from '@react-navigation/native'
import NotFoundCard from '../../components/notfound'

const NotFound = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <NotFoundCard />
    </View>
  )
}

const FavoriteCard = ({ item }) => {
  const { title, poster, plot, year, genre } = item
  const navigation = useNavigation();

  const handleFavorite = () => {
    navigation.navigate('MovieDetails', { movie: item, isFavorite: true })
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.image}>
        <Image source={{ uri: poster }} style={{ width: '100%', height: '100%', borderRadius: 8 }} resizeMode='contain' />
      </View>

      <View style={{ flex: 1, alignItems: "baseline" }}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.genreContainer}>
          {genre.map((g, index) => <View key={index} style={styles.genre}><Text style={styles.genreText}>{g}</Text></View>)}
          <Text style={styles.year}>| {year}</Text>
        </View>
        <Text style={styles.plot} numberOfLines={3}>{plot}</Text>

        <Button label="View Details" onPress={() => handleFavorite(item)} />
      </View>
    </View>
  )
}

const FavoriteCardContainer = ({ item }) => {
  const insets = useSafeAreaInsets();

  return (
    (item.length <= 0) ? <NotFound /> :
      <FlashList
        data={item}
        renderItem={({ item }) => <FavoriteCard item={item} />}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top - 20 }}
      />
  )
}

const FavoritePage = () => {
  const favorites = useSelector(state => state.movies.favorites)

  return (
    <View style={styles.container}>
      <FavoriteCardContainer item={favorites} />
    </View>
  )
}

export default FavoritePage

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,

    backgroundColor: colors.White,
  },

  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,

    marginBottom: 16
  },

  image: {
    width: 110,
    height: 200,

    borderRadius: 8,
  },

  title: {
    ...fontSizes.heading_medium,
    fontWeight: '600',
    color: colors.Black,
    paddingVertical: 4
  },

  year: {
    ...fontSizes.body_small,
    color: colors.DarkGray
  },

  plot: {
    ...fontSizes.body,
    color: colors.DarkGray
  },

  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,

    paddingVertical: 2
  },

  genre: {
    flexDirection: 'row',
    alignItems: 'center',

  },

  genreText: {
    ...fontSizes.body_small,
    color: colors.DarkGray
  }
})