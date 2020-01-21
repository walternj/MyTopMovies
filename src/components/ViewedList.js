import React from 'react'
import { StyleSheet, FlatList, } from 'react-native'
import { useSelector } from 'react-redux'

import ViewedItem from './ViewedItem'

export default function FilmList(props){
    const viewedMovies = useSelector(state => state.toggleViewed.viewedMovies)
   
    _displayDetailForFilm = (idFilm) => {
        props.navigation.navigate('FilmDetail', {idFilm: idFilm})
    }

   
    return (
        <FlatList style = { styles.list }
            data={props.films}
            extraData={props.viewedMovies}
            onEndReachedThreshold={0.5}
                onEndReached={() =>{
                    if (props.page < props.totalPages) {
                        props.loadFilms()
                    }
                }}
            keyExtractor = {(item) => item.id.toString()}
            renderItem = {({item}) => (
                <ViewedItem 
                    film={item}
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
  