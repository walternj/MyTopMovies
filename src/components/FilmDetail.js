import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    View, 
    Text, 
    ScrollView, 
    ActivityIndicator, 
    Image, 
    TouchableOpacity,
    Share,
    Platform, 
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'

import { getFilmDetailFromApi } from '../API/TMDBApi'
import { getImageFromApi } from '../API/TMDBApi'
import EnlargeShrink from '../Animations/EnlargeShrink'

export default function FilmDetail ({ navigation }) {
    const favoritesFilm = useSelector(state => state.toggleFavorite.favoritesFilm)
    const viewedMovies = useSelector(state => state.toggleViewed.viewedMovies)
    const action = useDispatch()

    const [film, setFilm] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    const idFilm = navigation.state.params.idFilm

    navigationOptions = ({ navigation }) => {
        const { params } = navigation.state 
        if (params.film != undefined /*&& Platform.OS === 'android'*/) {
            return {
                headerRight: 
                    <TouchableOpacity style = { styles.share_touchable_floating_button}
                        onPress= {() => params._shareFilm()}>
                        <Image style={styles.shareImage} 
                            source = {require('../Images/ic_share.png')}
                        />
                    </TouchableOpacity>
            }  
        }
    }
    
    useEffect(() => {
        console.log('didMounted')
        getFilmDetailFromApi(idFilm).then(data => {
            setFilm(data)
            setIsLoading(false)
           
        })
    }, [isLoading])

    _displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _toggleFavorite = () => {
        action({ type: 'TOGGLE_FAVORITE', value: film })
        //console.log(favoritesFilm)
    }

    _toggleViewed = () =>{ 
        action({ type: 'TOGGLE_VIEWED', value: film })
    }

    _shareFilm = () => {  
        Share.share({ title: film.title, message: film.overview })
    }
    
    _displayFavoriteImage = () => {
        var sourceImage = require('../Images/regular_heart.png')
        var shouldEnlarge = false
        if (favoritesFilm.findIndex(item => item.id === film.id) !== -1) {
            sourceImage = require('../Images/solid_heart.png')
            shouldEnlarge = true
        }
        return (
            <EnlargeShrink shouldEnlarge = {shouldEnlarge}>
                <Image style = {styles.favorite_image}
                    source= {sourceImage}
                />
            </EnlargeShrink>
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

    _displayFilm = () => {
        if (film != undefined) {
            return (
                <ScrollView style={styles.ScrollViewContainer}>
                    <Image style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <TouchableOpacity style= { styles.favorite_container} 
                        onPress={() => _toggleFavorite()}>
                        {_displayFavoriteImage()}          
                    </TouchableOpacity>        
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                        return genre.name;
                        }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Langue d'origine: {film.original_language} </Text>
                    <Text style={styles.default_text}>Titre d'origine: {film.original_title} </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                        return company.name;
                        }).join(" / ")}
                    </Text>
                    {_displayButtonViewed()}
                </ScrollView>
            )
        }
    }

    _displayFloatingActionButton = () => {
     
        if ( film != undefined && Platform.OS === 'android' ) {
            return (
                <TouchableOpacity style={styles.share_touchable_floating_button} 
                    onPress = {() => _shareFilm()}>
                    <Image style={styles.shareImage} 
                        source = {require('../Images/ic_share.png')}
                    />
                </TouchableOpacity>
            )
        }
        if ( film != undefined && Platform.OS === 'ios' ) {
            return (
                <TouchableOpacity style={styles.share_touchable_floating_button} 
                    onPress = {() => _shareFilm()}>
                    <Image style={styles.shareImage} 
                        source = {require('../Images/ic_share.png')}
                    />
                </TouchableOpacity>
            )
        }    
    }

    return (
        <View style={styles.main_container}>
            {console.log(favoritesFilm)}
            { _displayFilm() }
            { _displayLoading() } 
            { _displayFloatingActionButton() } 
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        
    },
    loading_container: {
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    scrollview_container: {
        flex: 1,
    },
    image: {
        height: 170,
        margin: 5
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container: {
        alignItems: 'center'
    }, 
    favorite_image: {
        flex: 1,
        width: null,
        height: null,
    },
    share_touchable_floating_button: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#E91E63',
        opacity: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    shareImage: {
        width: 30,
        height: 30
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginHorizontal: 2
    },
    textButton: {
        fontWeight: 'bold',
        color: '#FFF'
    }

})