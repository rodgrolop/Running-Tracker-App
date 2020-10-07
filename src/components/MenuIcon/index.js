import React from 'react'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const MenuIcon = () => {
    
    const navigation = useNavigation()
    
    const toggleDrawer = () => {
        navigation.toggleDrawer()
    }
    
    return (
        <TouchableOpacity onPress={toggleDrawer}>
            <MaterialIcons name="menu" size={30} color="white" />
        </TouchableOpacity>
    )
}

export default MenuIcon