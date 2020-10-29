import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { trackingInitialState } from './../../redux/reducers/tracking.reducer'

import MapView, { Polyline } from 'react-native-maps'
import { View, StyleSheet, Dimensions } from 'react-native'
import { withTheme } from 'react-native-paper'

import { updateRegion } from './../../redux/actions/tracking.actions'

const Map = ( 
    {   
        tracking,
        ...props
    }
    ) => {
        
    // Variables
    const { mapStyle } = props.theme
    
    // State
    
    // Functions
    
    // Map View region handling
    
    // Location service
        
    // Life Cycle
    
    return (
        <View 
            style={styles.mapContainerStyle}>
            <MapView 
                region={tracking.region}
                initialRegion={tracking.region}
                loadingEnabled={true}
                loadingIndicatorColor='#63257F'
                mapPadding={{
                    bottom: 30,
                }}
                style={styles.mapStyle}
                showsUserLocation={true}
                style={styles.mapStyle}
                customMapStyle={mapStyle}
            >
                <Polyline
	             	coordinates={tracking.routeCoordinates}
	             	strokeColor='#63257F' // fallback for when `strokeColors` is not supported by the map-provider
	             	strokeWidth={6}
	            />
            </MapView>
        </View>
    )
}

Map.defaultProps = {
    tracking: trackingInitialState,
}

Map.propTypes = {
    tracking: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    tracking: state.tracking,
})

const mapDispatchToProps = dispatch => ({})

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Map))

// Styles

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height 

const styles = StyleSheet.create({
    mapContainerStyle: {
        width: screenWidth,
        height: '55%',
        backgroundColor: '#FFF',
        zIndex: 0,
    },
    mapStyle: {
        width: screenWidth,
        height: '100%',
    },
})