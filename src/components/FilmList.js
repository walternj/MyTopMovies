import React from 'react'
import { StyleSheet, FlatList,  } from 'react-native'
import { useSelector } from 'react-redux'

import FilmItem from './FilmItem'

export default function FilmList(props){
    const favoritesFilm = useSelector(state => state.toggleFavorite.favoritesFilm)
   
    _displayDetailForFilm = (idFilm) => {
        props.navigation.navigate('FilmDetail', {idFilm: idFilm})
    }

    return (
        <FlatList style = { styles.list }
            data={props.films}
            extraData={props.favoritesFilm}
            onEndReachedThreshold={0.5}
                onEndReached={() =>{
                    if (props.page < props.totalPages) {
                        props.loadFilms()
                    }
                }}
            keyExtractor = {(item) => item.id.toString()}
            renderItem = {({item}) => (
                <FilmItem 
                    film={item}
                    isFilmFavorite = {favoritesFilm.findIndex(film => 
                        film.id === item.id) !== -1 ? true : false}
                    displayDetailForFilm = {_displayDetailForFilm}  
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: '#faf5e4'
    }
})
  