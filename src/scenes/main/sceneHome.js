import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'

import { StyleSheet, Dimensions } from 'react-native'
import { withTheme, Portal, Provider } from 'react-native-paper'

import { getLastKnownPosition } from './../../redux/tasks/tracking.tasks'
import Header from './../../components/Header'
import DefaultPageAuth from '../../components/DefaultPageAuth'
import Map from '../../components/Map'
import TrackInfo from '../../components/TrackInfo'

const SceneHome = props => {
    
    // State
    
    // Functions
    
    // Permissions
    const checkPermissions = async () => {
        let { status } = await Location.requestPermissionsAsync()
        if (status === 'granted') {
            getLastKnownPosition()
        }
    }
    
    // Map View region handling
    
    // Location service
    
    // Life Cycle
    useEffect(() => {
        checkPermissions()
    }, [])
    
    return (
        <>
            <Header/>
            <DefaultPageAuth>
            <Map/>
            <TrackInfo/>
            </DefaultPageAuth>
        </>
    )
}

export default withTheme(SceneHome)

// Styles

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height 

const styles = StyleSheet.create({
    
})