import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'

const EnlargeShrink = (props) => {
    const [ sizeImage, setSizeImage ] = useState(sizeImage)
    const [ viewSize ] = useState( new Animated.Value(viewSize))

    useEffect(() => {
        if (props.shouldEnlarge) {
            setSizeImage(80)
          } else {
            setSizeImage(40)
        }
    })    

    useEffect(() => {
        Animated.spring(viewSize,
            {
                toValue: sizeImage,
                tension: 80,
                friction: 20
            }
        ).start()
    })

    return (
        <Animated.View style={{ width: sizeImage, height: sizeImage }}>
            {props.children}
        </Animated.View>
    )
}

export default EnlargeShrink
