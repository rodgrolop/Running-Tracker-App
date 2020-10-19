import React from 'react'
import { Appbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import MenuIcon from '../MenuIcon'

const Header = () => {

    return (
        <>
            <Appbar.Header style={styles.appBar}>
            <MenuIcon/>   
            </Appbar.Header>
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    appBar: {}
})