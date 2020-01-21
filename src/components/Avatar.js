import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import ImagePicker from 'react-native-image-picker'

export default function Avatar() {
  const avatar = useSelector(state => state.setAvatar.avatar)
  const action = useDispatch()

_avatarPressed = () => {
    ImagePicker.showImagePicker({}, (response) => {
        if(response.didCancel) {
            console.log('L\'utilisateur a annulé')
        }
        else if(response.error) {
          console.log('Erreur: ', response.error)
        }
        else {
          console.log('Photo: ', response.uri)
          let requireSource = { uri: response.uri }
          action({ type: "SET_AVATAR", value: requireSource })
        }
    })
}

  return (
    <TouchableOpacity style={styles.touchableOpacity}
        onPress={_avatarPressed}>
        <Image style={styles.avatar} 
            source={avatar}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    touchableOpacity: {
      margin: 5,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50,
      borderColor: '#D6A204',
      borderWidth: 2,
    },
  })
  