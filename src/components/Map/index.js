import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MapView, { Polyline } from 'react-native-maps'
import { StyleSheet, Dimensions } from 'react-native'
import { withTheme } from 'react-native-paper'

import { updateRegion } from './../../redux/actions/tracking.actions'

const Map = ( 
    {   
        tracking,
        updateRegionChange,
        ...props
    }
    ) => {
    
    // State
    
    // Functions
    
    // Map View region handling
    
    // Location service
        
    // Life Cycle
    
    return (
        <MapView 
            region={tracking.region}
            initialRegion={tracking.region}
            loadingEnabled={true}
            loadingIndicatorColor='#63257F'
            style={styles.mapStyle}
            showsUserLocation={true}
            onRegionChangeComplete={newRegion => updateRegionChange(newRegion)}
        >
            <Polyline
	         	coordinates={tracking.routeCoordinates}
	         	strokeColor='#63257F' // fallback for when `strokeColors` is not supported by the map-provider
	         	strokeWidth={6}
	        />
        </MapView>
    )
}

Map.defaultProps = {
    tracking: {
        region: {
            latitude: 41.6526595,
            longitude: -4.7234255,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        },
        location: {},
        routeCoordinates: [],
    },
}

Map.propTypes = {
    tracking: PropTypes.object.isRequired,
    updateRegionChange: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    tracking: state.tracking,
})

const mapDispatchToProps = dispatch => ({
    updateRegionChange: newRegion => dispatch(updateRegion(newRegion))
})

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Map))

// Styles

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height 

const styles = StyleSheet.create({
    mapStyle: {
        width: screenWidth,
        height: '60%',
    },
})