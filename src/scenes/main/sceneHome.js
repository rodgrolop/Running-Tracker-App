import React, { useState } from 'react'
import MapView, { Polyline } from 'react-native-maps'
import { Text, StyleSheet, Dimensions } from 'react-native'
import Header from './../../components/Header'
import DefaultPage from '../../components/DefaultPage'

const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

const SceneHome = () => {
    
    const [region, setRegion] = useState(initialRegion)
    
    const onRegionChange = region => setRegion(region)
    
    return (
        <>
            <Header/>
            <DefaultPage>
            <MapView 
                region={region}
                onRegionChange={onRegionChange}
                style={styles.mapStyle}
            />
            </DefaultPage>
        </>
    )
}

export default SceneHome

// Styles

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height 

const styles = StyleSheet.create({
    mapStyle: {
        width: screenWidth,
        height: screenHeight / 2,
    },
})