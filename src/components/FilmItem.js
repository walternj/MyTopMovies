import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

import { getImageFromApi } from '../API/TMDBApi'
import FadIn from '../Animations/FadeIn'

export default function FilmItem(props){
    
    const { film, displayDetailForFilm,} = props

    _displayFavoriteImage = () => {
      if (props.isFilmFavorite) {
        // Si la prop isFilmFavorite  vaut true, on affiche le 🖤
        return (
          <Image style = {styles.favorite_image}
          source= {require('../Images/solid_heart.png')}
          />
          )
      }
  }
    return (
      <FadIn>
        <TouchableOpacity style={styles.main_container}
          onPress={() => displayDetailForFilm(film.id)} >
            <Image style={styles.image}
                source={{uri: getImageFromApi(film.poster_path)}}
            />
            <View style={styles.content_container}>
                <View style={styles.header_container}>
                    { _displayFavoriteImage()}
                    <Text style={styles.title_text} numberOfLines={2}>{film.title}</Text>
                    <Text style={styles.vote_text}>{film.vote_average}</Text>
                </View>
                <View style={styles.description_container}>
                    <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
                </View>
                <View style={styles.date_container}>
                    <Text style={styles.date_text}>{film.release_date}</Text>
                </View>
            </View>
        </TouchableOpacity>
      </FadIn>
    )
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#888'
  },
  image: {
    width: 120,
    height: 180,
    marginVertical: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})
