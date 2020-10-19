import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import DefaultPage from '../../components/DefaultPage'

const SceneSplash = ({ navigation }) => {
    
    //State for ActivityIndicator animation
    let [animating, setAnimating] = useState(true)
    
    useEffect(() => {
        setTimeout(() => {
            setAnimating(false)
            navigation.navigate('Login')
        }, 2000)
    }, [])
    return (
        <DefaultPage>
            <Image
                source={require('../../image/Pucela-Run.png')}
                style={styles.image}
            />
            <ActivityIndicator
                animating={animating}
                color="#63257F"
                size="large"
            />
        </DefaultPage>
    )
}

SceneSplash.propTypes = {
    navigation: PropTypes.object.isRequired,
}

export default SceneSplash

const styles = StyleSheet.create({
    image: {
        width: Dimensions.get('window').width / 4,
        height: Dimensions.get('window').width / 4,
        margin: Dimensions.get('window').width / 10,
        resizeMode: 'contain',
    },
})