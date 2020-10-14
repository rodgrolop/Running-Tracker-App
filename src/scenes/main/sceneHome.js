import React from 'react'
import { Text } from 'react-native'
import { Appbar } from 'react-native-paper'
import DefaultPage from '../../components/DefaultPage'
import { StyleSheet } from 'react-native'
import MenuIcon from '../../components/MenuIcon'

const SceneHome = () => {

    return (
        <>
            <Appbar.Header>
            <MenuIcon/>   
            </Appbar.Header>
            <DefaultPage>        
                <Text>
                    Home
                </Text>
            </DefaultPage>
        </>
    )
}

export default SceneHome

const styles = StyleSheet.create({
    bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
  });