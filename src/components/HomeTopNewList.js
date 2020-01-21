import React, { useState, useEffect }  from 'react'
import { 
    StyleSheet,
    View,
    ActivityIndicator,
 } from 'react-native'
import { useSelector } from 'react-redux'


import { getLatestFilmsFromApi } from '../API/TMDBApi'
import FilmList from './FilmList'

export default function HomeTopList ({ navigation }) {
    const favoritesFilm = useSelector(state => state.favoritesFilm)

    const [film, setFilm] = useState([])  
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        // Update the listTopMovies using the browser API
        _loadFilms()
      },[page]);

    _loadFilms = async () =>  {
        setIsLoading(true)
        await getLatestFilmsFromApi(page+1).then(data => {
            setPage(data.page)
            setTotalPages(data.total_pages)
            setFilm([...film, ...data.results])

        })
        setIsLoading(false)
    }

    _displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color='#0E4' />
                </View>
            )
        }
    }

    _displayDetailForFilm = (idFilm) => {
        //console.log('Display film with id: '+ idFilm)
        navigation.navigate('FilmDetail', { idFilm: idFilm })
    }
    
    return (
        <View style={styles.container}>
        
            <FilmList 
                films={film}
                navigation={navigation}
                loadFilms={_loadFilms}
                //page={page}
                totalPages={totalPages}
            />
            {_displayLoading()}  
            
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginHorizontal: 5,
        backgroundColor: '#faf5e4'
    },
    button: {
        justifyContent: 'center',
        borderRadius: 5,
        height: 50,
        paddingRight: 5
    },
    loadingContainer: {
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        width: 30,
        height: 30,
    }
})
