import React from 'react'
import { Text } from 'react-native'
import { Header } from 'react-native-elements'
import DefaultPage from '../../components/DefaultPage'
import MenuIcon from '../../components/MenuIcon'

const SceneHome = ({ navigation }) => {
    
    const toggleDrawer = () => {
        navigation.toggleDrawer()
    }

    return (
        <>
            <Header
              leftComponent={<MenuIcon />}
              centerComponent={{ text: 'Tracker', style: { color: '#fff' } }}
              containerStyle={{
                backgroundColor: '#63257F',
                justifyContent: 'space-around',
              }}
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