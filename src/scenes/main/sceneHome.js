import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'

import { withTheme } from 'react-native-paper'

// import { getLastKnownPosition } from './../../redux/utils/tracking.functions'
import Header from './../../components/Header'
import DefaultPageAuth from '../../components/DefaultPageAuth'
import Map from '../../components/Map'
import TrackInfo from '../../components/TrackInfo'

const SceneHome = props => {
    
    // State
    
    // Functions
    
    // Permissions
    
    // Map View region handling
    
    // Location service
    
    // Life Cycle
    
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