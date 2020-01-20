import React, { useState }  from 'react'
import { 
    StyleSheet,
    View,  
    ActivityIndicator,
 } from 'react-native'
import { useSelector } from 'react-redux'

import FilmList from './FilmList'
import { getFilmsFromApiWithSearchText } from '../API/TMDBApi'

export default function Search({ navigation }){
    // le component Search est conecté au Store avec le hook useSelector
    const favoritesFilm = useSelector(state => state.favoritesFilm)

    const [film, setFilm] = useState([])
    const [searchedText, setSearchedText] =  useState('')   
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    _loadFilms = async () =>  {
        if (searchedText.length > 0) {
            setIsLoading(true)
            await getFilmsFromApiWithSearchText(searchedText, page+1).then(data => {
                setPage(data.page)
                setTotalPages(data.total_pages)
                setFilm([...film, ...data.results])
            })
            setIsLoading(false)
        }
    }

    _displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _searchTextInputChanged = (text) => {
        setSearchedText(text)
        //getFilmsFromApiWithSearchText(searchedText).then(data => setFilm(data.results))
    }

    _searchFilms = async () => {
       await (
            setPage(0),
            setTotalPages(0),
            setFilm([])  
        ) 
        _loadFilms()
    }
    
    return (
        <View style={styles.container}>
            {console.log(isLoading)}
                {/* {_searchBar()} */}
            <FilmList 
                films={film}
                navigation={navigation}
                loadFilms={_loadFilms}
                page={page}
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
})