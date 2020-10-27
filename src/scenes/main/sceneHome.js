import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'

import { StyleSheet, Dimensions } from 'react-native'
import { withTheme } from 'react-native-paper'

import { getLastKnownPosition } from './../../redux/tasks/tracking.tasks'
import Header from './../../components/Header'
import DefaultPage from '../../components/DefaultPage'
import Map from '../../components/Map'
import HomeActions from '../../components/HomeActions'

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
            <DefaultPage>
            <Map/>
            <HomeActions/>
            </DefaultPage>
        </>
    )
}

export default withTheme(SceneHome)

// Styles

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height 

const styles = StyleSheet.create({
    
})