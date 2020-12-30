import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from 'axios'

import * as Permissions from 'expo-permissions'
import * as Linking from 'expo-linking'

import { ActivityIndicator, StyleSheet, View, Dimensions, Alert } from 'react-native'
import { withTheme, Button, FAB, Paragraph, Dialog, Portal } from 'react-native-paper'

import { notified } from './../../redux/actions/tracking.actions'

import store from './../../redux/store'

import { trackingInitialState } from './../../redux/reducers/tracking.reducer'

import { startBackgroundLocationService, stopBackgroundLocationService,  } from './../../redux/utils/tracking.functions'

const FabButton = ( 
  {   
      tracking,
      user,
      ...props
  }
  ) => {
    
    // State
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleBackGround, setVisibleBackGround] = useState(false)
    const [error, setError] = useState(false)
    const [dialogText, setDialogText] = useState('')
    
    // Functions
    const showDialog = () => setVisible(true)
    const showDialogBackGround = () => setVisibleBackGround(true)

    const hideDialog = () => setVisible(false)
    const hideDialogBackGround = () => setVisibleBackGround(false)
    
    const goToSettings = () => Linking.openSettings()
    
    const handleUploadButton = () => {
      (tracking.currentRunDistance < user.distance) ? setDialogText('Su distancia no se ha completado y no contará para los resultados. ¿Está seguro de que quiere publicarla? Puede volver a correr más tarde si así lo desea.') : setDialogText('Has completado tu distancia, enhorabuena. ¿Quiere publicarla?')
      showDialog()   
    }
    
    const handleStopButton = () => {
      if (tracking.currentRunDistance < user.distance){
        Alert.alert(
        "No ha terminado su recorrido",
        "Si detiene su carrera antes de terminar el recorrido, al comenzar de nuevo se reiniciará el recorrido desde cero, ¿Está seguro/a de querer detener el tracking?",
        [
          { text: "Cancelar", onPress: () => console.log("Cancelado") },
          { text: "Detener", onPress: () => stopBackgroundLocationService() },
        ],
        { cancelable: true }
      )
      } else {
        stopBackgroundLocationService()
      }  
    }
    
    const checkPermissions = async () => {
        let { status } = await Permissions.getAsync(Permissions.LOCATION)
        if (status !== 'granted') {
          showDialogBackGround()
      } else {
          startBackgroundLocationService()
      }
    }
    
    const alertEndRun = () => {
      Alert.alert(
        "Enhorabuena, ha terminado su recorrido",
        "Hemos detenido el tracking porque ha terminado usted su recorrido, ya puede publicar su marca.",
        [
          { text: "Aceptar", onPress: () => store.dispatch(notified()) },
        ],
        {
          onDismiss: () => store.dispatch(notified())
        }
      )
    }
    
    const uploadTrackInfo = () => {    
      setLoading(true)
      let ajaxurl = 'https://www.sansilvestrevalladolid.es/wp-admin/admin-ajax.php'  
      let completed = tracking.currentRunDistance >= user.distance
      let form_data = new FormData
      console.log(user)
      form_data.append('action', 'upload_time')
      form_data.append('id', user.user.user_id)
      form_data.append('timeStamp', tracking.currentRunTimeSpent) 
      form_data.append('completed', completed)
      form_data.append('distance', user.distance) 
      form_data.append('distanceRun', tracking.currentRunDistance)
      form_data.append('coordinates', JSON.stringify(tracking.routeCoordinates))
    
      axios.post( ajaxurl, form_data ).then(responseJson => {
        console.log(responseJson)
          //Hide Loader
          setLoading(false)
          // If server response message same as Data Matched
          if (responseJson.status == 200) {
            console.log(responseJson.data)
            if (responseJson.data.success) {
              setError(false)
              setLoading(false)
              setDialogText('Marca publicada correctamente')
            } else {
              setError(false)
              setLoading(false)
              setDialogText('Marca publicada correctamente')
            }          
          } else {
            setError(true)
            setLoading(false)
            setDialogText('Hubo un Error en la subida')
          }
        })
        .catch(error => {
          //Hide Loader
          setError(true)
          setLoading(false)
          setDialogText('Hubo un Error en la subida')
          console.log(error)
        })
    }
    
    // Map View region handling
    
    // Location service
        
    // Life Cycle
    
    useEffect(() => {
      if (tracking.ended && !tracking.endNotified){
        alertEndRun()
      }
    }, [tracking.ended])
    
    return (
        <View style={styles.fabContainer}>
          <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Publicar marca</Dialog.Title>
                    {loading ? 
                    <ActivityIndicator
                      animating={true}
                      color="#63257F"
                      size="large"
                      style={styles.activityIndicator}
                    />:
                    (<Dialog.Content>
                        <Paragraph>{dialogText}</Paragraph>
                    </Dialog.Content>)
                    }
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Cerrar</Button>
                        <Button onPress={uploadTrackInfo}>{error ? 'Reintentar' : 'Publicar'}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={visibleBackGround} onDismiss={hideDialogBackGround}>
                    <Dialog.Title>Permisos de ubicación en segundo plano</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Asegúrese de que concede permisos de ubicación en segundo plano a esta aplicación, para ello, diríjase a ajustes de la aplicación y cambie los permisos de ubicación a la opción "Permitir Siempre", así podrá registrar su posición si bloquea o minimiza la aplicación.</Paragraph>
                    </Dialog.Content>                    
                    <Dialog.Actions>
                        <Button onPress={goToSettings}>Ir a Ajustes</Button>
                        <Button onPress={hideDialogBackGround}>Cerrar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <FAB
                style={styles.fabStyle}
                fabStyle={styles.fabStyleParent}
                animated={true}
                icon={
                  tracking.runStatus != 'started' ? 
                  'run-fast' : 
                  'stop'
                }
                label={
                  tracking.runStatus != 'started' ? 
                  'Correr' : 
                  'Parar'
                }
                onPress={
                  () => tracking.runStatus != 'started' ? 
                  checkPermissions() : 
                  handleStopButton()
                }
              />
              <FAB
                style={styles.fabStyle}
                fabStyle={styles.fabStyleParent}
                animated={true}
                icon='upload'
                label='Publicar'
                onPress={
                  () =>
                  handleUploadButton()
                }
              />        
          </View>
    )
}

FabButton.defaultProps = {
  tracking: trackingInitialState,
  user: {},
}

FabButton.propTypes = {
  tracking: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  tracking: state.tracking,
  user: state.user, 
})

const mapDispatchToProps = dispatch => ({})

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(FabButton))

// Styles

const styles = StyleSheet.create({
    fabContainer: {
        width: Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabStyle: {
        margin: 16,        
    },
    fabStyleParent: {
        backgroundColor: '#63257F',
    },    
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
})