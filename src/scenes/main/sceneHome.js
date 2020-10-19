import React from 'react'
import { Text } from 'react-native'
import { StyleSheet } from 'react-native'
import Header from './../../components/Header'
import DefaultPage from '../../components/DefaultPage'

const SceneHome = () => {

    return (
        <>
            <Header/>
            <DefaultPage>        
                <Text>
                    Home
                </Text>
            </DefaultPage>
        </>
    )
}

export default SceneHome