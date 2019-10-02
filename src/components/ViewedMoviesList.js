import React from 'react'
import { StyleSheet, View} from 'react-native'
import { useSelector } from 'react-redux'

import ViewedList from './ViewedList'

export default function ViewedMoviesList (props) {
  const viewedMovies = useSelector(state => state.toggleViewed.viewedMovies)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
      </View>
      <ViewedList
        films={viewedMovies}
        navigation={props.navigation}
      />
     </View> 
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  avatarContainer: {
    alignItems: 'center'
  }
})