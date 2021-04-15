import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Permissions, {LOCATION} from 'expo-permissions'

import { trackingInitialState } from './../../redux/reducers/tracking.reducer'

import * as Location from 'expo-location'
import MapView, { Polyline } from 'react-native-maps'
import { View, StyleSheet, Dimensions } from 'react-native'
import { withTheme, Button, Paragraph, Dialog, Portal } from 'react-native-paper'
import * as Linking from 'expo-linking'
import { getLastKnownPosition } from './../../redux/utils/tracking.functions'

const Map = ( 
    {   
        tracking,
        ...props
    }
    ) => {
        
    // Variables
    const { mapStyle } = props.theme
    
    // State
    const [visible, setVisible] = useState(false)
    const [visibleService, setVisibleService] = useState(false)
    const [mapVisible, setMapVisible] = useState(false)
    
    // Functions
    const showDialog = () => setVisible(true)
    const showDialogService = () => setVisibleService(true)

    const hideDialog = () => setVisible(false)
    const hideDialogService = () => setVisibleService(false)
    
    const openSettings = () => Linking.openSettings()
    
    const checkLocation = async () => {
        let enabled = await Location.hasServicesEnabledAsync()
        enabled ? checkPermissions() : showDialogService()
    }
    
    const askPermission = async () => {
        hideDialog()
        let { status } = await Location.requestPermissionsAsync()        
        if (status !== 'granted') {
            showDialog()
        } else {
            setMapVisible(true)
            getLastKnownPosition()
        }
    }
    
    // Map View region handling
    
    // Location service
    
    // Permissions
    const checkPermissions = async () => {
        hideDialogService()
        let { status } = await Location.getPermissionsAsync()
        if (status !== 'granted') {
            showDialog()
        } else {
            setMapVisible(true)
            getLastKnownPosition()
        }
    }
        
    // Life Cycle    
    useEffect(() => {
        checkLocation()
    }, [])
    
    return (
        <View 
            style={styles.mapContainerStyle}>
            <Portal>
                <Dialog visible={visible} onDismiss={askPermission}>
                    <Dialog.Title>Permisos Ubicación</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>San Silvestre Valladolid Tracker recoge datos de ubicación para habilitar la función de registrar tu recorrido de la carrera, la velocidad media y el tiempo empleado, para que puedas enviar esos datos a tu perfil de corredor en la web www.sansilvestrevalladolid.es, aunque la aplicación esté cerrada o no se esté usando, estos datos de ubicación no serán compartidos en ningún caso, y sólo los usaremos para determinar el tiempo empleado por el usuario en recorrer la distancia que le corresponda en la San Silvestre Popular Valladolid. A continuación se le solicitarán permisos para acceder a su ubicación, si el diálogo de permisos no le ofrece la opción de "Permitir siempre", puede acceder a los ajustes de la aplicación desde el menú lateral, a continuación, pulse "Permisos", seleccione "Localización", y asegúrese de que está seleccionada la opción "Permitir Siempre".</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={askPermission}>Aceptar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={visibleService} onDismiss={hideDialogService}>
                    <Dialog.Title>GPS Inactivo</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Para utilizar la aplicación y que el servicio de localización sea lo más preciso posible, debe habilitar la localización por gps en su dispositivo.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={checkPermissions}>Aceptar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            { mapVisible ?
            <MapView 
                region={tracking.region}
                initialRegion={tracking.initialRegion}
                loadingEnabled={true}
                loadingIndicatorColor='#63257F'
                mapPadding={{
                    bottom: 30,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                style={styles.mapStyle}
                customMapStyle={mapStyle}
            >
                <Polyline
	             	coordinates={tracking.routeCoordinates}
	             	strokeColor='#63257F' // fallback for when `strokeColors` is not supported by the map-provider
	             	strokeWidth={6}
	            />
            </MapView>
            :
            (<>
                <Paragraph style={styles.permissionsText}>No has concedido permisos de ubicación para esta aplicación, por favor, accede a los ajustes de tu dispositivo para esta aplicación y concede los permisos de ubicación para poder acceder a todas sus funciones correctamente.</Paragraph>
                <Button onPress={openSettings}>Ir a ajustes</Button>
            </>)}
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
        height: '65%',
        backgroundColor: '#FFF',
        zIndex: 0,
    },
    mapStyle: {
        width: screenWidth,
        height: '100%',
    },
    permissionsText: {
        textAlign: 'center', 
        paddingHorizontal: 10,
        paddingTop: 30,
    },
})