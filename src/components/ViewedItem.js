import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

import { getImageFromApi } from '../API/TMDBApi'
import FadIn from '../Animations/FadeIn'

export default function FilmItem(props){
    const viewedMovies = useSelector(state => state.toggleViewed.viewedMovies)
    const [onLongPress, setOnLongPress] = useState(false)
    const { film, displayDetailForFilm } = props

    _toggleInformations = () => {
        setOnLongPress(!onLongPress)
        console.log(film.title)
    }

    _displayTitleOrDate = () => {
        var titleOrDate
        { onLongPress ? titleOrDate = film.release_date : titleOrDate = film.title }

        return (
            <View style={styles.content_container}>
                    <Text style={styles.title_text} numberOfLines={2}>{titleOrDate}</Text>
                    {console.log(onLongPress)}
                    {console.log(titleOrDate)}
            </View> 
        )
    }

    _displayButtonViewed = () => {
        var buttonText = 'MARQUER COMME VU'
        var bckColorBtn = '#08F'
        
        if (viewedMovies.findIndex(item => item.id === film.id) !== -1) {
                buttonText = 'MARQUER COMME NON VU'
                bckColorBtn = '#666'
        } else {
                buttonText = 'MARQUER COMME VU'
                bckColorBtn = '#08F'
        }
        return(
            <TouchableOpacity style={[styles.button, {backgroundColor: bckColorBtn}]} 
                onPress={() => _toggleViewed()} 
            >
                <Text style={styles.textButton}>
                        {buttonText}
                </Text> 
            </TouchableOpacity>
        )
    }

    return (
        <FadIn >
            <TouchableOpacity style={styles.main_container}
                onPress={() => displayDetailForFilm(film.id)}
                onLongPress = { _toggleInformations } >
                <Image style={styles.image}
                        source={{uri: getImageFromApi(film.poster_path)}}
                />
                    {_displayTitleOrDate(film.id)}
            </TouchableOpacity>
        </FadIn>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderTopWidth : 0.5,
        borderBottomColor: '#AAA',
        borderTopColor: '#AAA',
        paddingBottom: 5,
        paddingTop: 5,
    },
    image: {
        marginLeft: 10,
        width: 60,
        height: 60,
        borderRadius: 50,
        borderColor: 'transparent',
        borderWidth: 0,
        backgroundColor: 'gray',
    },
    content_container: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5,
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#666666',
    },
    description_container: {
        flex: 7,
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1,
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14,
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5,
    }
})
