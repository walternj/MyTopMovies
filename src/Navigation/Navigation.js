import React from 'react'
import { Image, StyleSheet} from 'react-native'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
    

import Search from '../components/Search'
import SearchBar from '../components/SearchBar'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites'
import HomePopularList from '../components/HomeTopNewList'
import Vieweds from '../components/ViewedMoviesList'
import Avatar from '../components/Avatar'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            headerTitle: 'Search',
            header: <SearchBar/>,
        }  
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions : {
            title: 'Details Du Film'
        }
    },  
})

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        title: 'Ma Liste Des Films Favoris',
        headerLeft: <Avatar/>,
      },
    
    },
    FilmDetail: {
      screen: FilmDetail,
      navigationOptions : {
        title: 'Details Du Film'
      }
    },
    
    
})

const HomePopularListStackNavigator = createStackNavigator({
    Home: {
        screen: HomePopularList,
        navigationOptions: {
            headerTitle: 'Le Top des Films les Plus Recents',   
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions : {
            title: 'Details Du Film'
        }
    }
})

const ViewedsStackNavigator = createStackNavigator({
    Favorites: {
      screen: Vieweds,
      navigationOptions: {
        title: 'Ma Liste Des Films Déjà Vus',
        headerRight: <Avatar/>
      }
    },
    FilmDetail: {
      screen: FilmDetail,
        navigationOptions : {
            title: 'Details Du Film'
        }
    }
})



const MoviesTabNavigator = createBottomTabNavigator({

    Home: {
        screen: HomePopularListStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <Image style = {styles.icon}
                        source= {require('../Images/Home_Black.png')} 
                    />
                )
            }
        }
    },
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <Image style = {styles.icon}
                        source= {require('../Images/search.png')} 
                    />
                )
            }
        }
    },
    Favorites: {
        screen: FavoritesStackNavigator ,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <Image style = {styles.icon}
                        source= {require('../Images/solid_heart.png')} 
                    />
                )
            }
        }
    },
    Vieweds: {
        screen: ViewedsStackNavigator ,
        navigationOptions: {
            tabBarIcon: () => {
                return (
                    <Image style = {styles.icon}
                        source= {require('../Images/ic_viewed.png')} 
                    />
                )
            }
        }
    }
}, {
    tabBarOptions: {
        showLabel: false,
        showIcon: true,
        activeBackgroundColor: '#DDDDDD',
        inactiveBackgroundColor: '#FFFFFF',
    }
})

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
})


export default createAppContainer(MoviesTabNavigator)
