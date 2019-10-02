import React from 'react'
import { StyleSheet, View} from 'react-native'
import { useSelector } from 'react-redux'

import FilmList from './FilmList'

export default function Favorites (props) {
  const favoritesFilm = useSelector(state => state.toggleFavorite.favoritesFilm)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
     
      </View>
      <FilmList
        films={favoritesFilm}
        navigation={props.navigation}
        //favoriteList={true} // Ici on est bien dans le cas de la liste des films favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
        
      />
     </View> 
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  avatarContainer: {
    alignItems: 'center'
  }
})
