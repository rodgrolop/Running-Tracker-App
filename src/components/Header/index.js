import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { withTheme, Appbar } from 'react-native-paper'
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

export default withTheme(Header)

const styles = StyleSheet.create({
    appBar: {
        backgroundColor: '#63257F',
        shadowColor: '#000',
        shadowOffset: {
        	width: 0,
        	height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,       
        elevation: 10,
        zIndex: 10,
    },
    image: {
        width: Dimensions.get('window').width / 3,
        height: undefined,
        // figure out your image aspect ratio
        aspectRatio: 8 / 3,
        tintColor: '#fff',  
    },
})