import React, { useState ,useEffect } from 'react'
import { View, Text, Animated, Dimensions } from 'react-native'

const FadeIn = (props) => {
    const [positionLeft] = useState(new Animated.Value(Dimensions.get('window').width- 50))

    _animation = () => {
        useEffect(()=> {
          Animated.spring(
            positionLeft,
            {
              toValue: 0,
              bounciness: 25,
            }
          ).start()
        })
    } 
    
    _animation()
    return (
        <Animated.View style={{left: positionLeft}}>
            {props.children}
        </Animated.View>
    )
}

export default FadeIn
