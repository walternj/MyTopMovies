import React, { useState, useEffect, Dimensions } from 'react';
import { 
    View,
    StyleSheet,
    Image, 
    TextInput, 
    TouchableOpacity
 } from 'react-native'

import * as Animatable from 'react-native-animatable'

export default function searchBar() {
    
    return(
        <View style={styles.searchBar}>
            <TextInput style={styles.textInput} 
                placeholder="Search a movie..."
                onSubmitEditing= {() =>_searchFilms()}
                onChangeText={(text) => _searchTextInputChanged(text)} 
                autoFocus= {true}
            />
            <TouchableOpacity style={styles.button} 
                onPress={() =>_searchFilms() }>
                <Image style = {styles.icon}
                    source= {require('../Images/search.png')}  />
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#000",
        height: 50,
        marginHorizontal: 5,
        paddingVertical: 0,
        borderWidth: 5,
        borderColor: '#000',

    },
    textInput: {
        flex: 1,
        height: 40,
        paddingLeft: 5,
        fontSize: 20,
        paddingVertical: 0,
        backgroundColor: '#faf5e4',
        color: '#f8b400'
    },
    button: {
        justifyContent: 'center',
        borderRadius: 5,
        height: 50,
        paddingRight: 5
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: '#faf5e4'
    }
})
