import React, { useState } from 'react'

import { FloatingAction } from 'react-native-floating-action'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet } from 'react-native'
import { withTheme, FAB, Portal } from 'react-native-paper'

import { startBackgroundLocationService, stopBackgroundLocationService } from './../../redux/utils/tracking.functions'

const FabButton = props => {
    
    const { colors } = props.theme
    
    const actions = [
  {
    text: 'Accessibility',
    icon: <Icon name='speedometer' size={40} color={colors.primary} />,
    name: 'bt_accessibility',
    position: 2
  },
  {
    text: 'Language',
    icon: <Icon name='speedometer' size={40} color={colors.primary} />,
    name: 'bt_language',
    position: 1
  },
  {
    text: 'Location',
    icon: <Icon name='speedometer' size={40} color={colors.primary} />,
    name: 'bt_room',
    position: 3
  },
  {
    text: 'Video',
    icon: <Icon name='speedometer' size={40} color={colors.primary} />,
    name: 'bt_videocam',
    position: 4
  }
]
    
    // State
    const [state, setState] = useState({ open: false })
    
    // Functions
    
    // Map View region handling
    
    // Location service
        
    // Life Cycle
    
    return (
        <FloatingAction
            actions={actions}
            distanceToEdge={15}
            floatingIcon={<Icon name='play' size={30} color={colors.surface} />}
            onPressItem={
                name => {
                    console.log(`selected button: ${name}`)
                }
            }
            color={colors.primary}
            overlayColor={colors.transparent}
            position='center'
        />
    )
}

export default withTheme(FabButton)

// Styles

const styles = StyleSheet.create({
    fabStyle: {
        backgroundColor: '#63257F',
    },
    secondaryIcon: {
        backgroundColor: '#63257F',
    },
})