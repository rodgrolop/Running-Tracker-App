import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Appbar } from 'react-native-paper'
import { Image, StyleSheet, Dimensions } from 'react-native'

const Header = () => {
    
    const navigation = useNavigation()
    
    const toggleDrawer = () => {
        navigation.toggleDrawer()
    }

    return (
        <Appbar.Header style={styles.appBar}>
             <Appbar.Action icon='menu' size={36} onPress={toggleDrawer} />
             <Image
                    source={require('../../image/logo.png')}
                    style={styles.image}
                    resizeMode='contain'
                />
        </Appbar.Header>
    )
}

export default Header

const styles = StyleSheet.create({
    appBar: {
        elevation: 6,
    },
    image: {
        width: Dimensions.get('window').width / 3,
        height: undefined,
        // figure out your image aspect ratio
        aspectRatio: 8 / 3,
        tintColor: '#fff',  
    },
})