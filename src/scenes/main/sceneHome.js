import React from 'react'
import { Text } from 'react-native'
import { Header } from 'react-native-elements';
import DefaultPage from '../../components/DefaultPage'

const SceneHome = props => {
    
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer()
    }

    return (
        <>
            <Header
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
            />
            <DefaultPage>        
                <Text>
                    Home
                </Text>
            </DefaultPage>
        </>
    )
}

export default SceneHome