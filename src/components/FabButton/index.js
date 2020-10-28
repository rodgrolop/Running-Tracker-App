import React, { useState } from 'react'

import { StyleSheet } from 'react-native'
import { withTheme, FAB, Portal } from 'react-native-paper'

import { startBackgroundLocationService, stopBackgroundLocationService } from './../../redux/tasks/tracking.tasks'

const FabButton = props => {
    
    const { colors } = props.theme
    
    // State
    const [state, setState] = useState({ open: false })
    // Functions
    const onStateChange = ({ open }) => setState({ open })
    const { open } = state
    // Map View region handling
    
    // Location service
        
    // Life Cycle
    
    return (
            <Portal>
                <FAB.Group
                    open={open}
                    icon={open ? 'calendar-today' : 'plus'}
                    color={colors.surface}
                    fabStyle={styles.fabStyle}
                    actions={[
                      { icon: 'plus', onPress: () => console.log('Pressed add') },
                      {
                        icon: 'star',
                        label: 'Star',
                        onPress: () => console.log('Pressed star'),
                      },
                      {
                        icon: 'email',
                        label: 'Email',
                        onPress: () => console.log('Pressed email'),
                      },
                      {
                        icon: 'bell',
                        label: 'Remind',
                        onPress: () => console.log('Pressed notifications'),
                      },
                    ]}
                    onStateChange={onStateChange}
                    onPress={() => {
                      if (open) {
                        // do something if the speed dial is open
                      }
                    }}
                />
            </Portal>
    )
}

export default withTheme(FabButton)

// Styles

const styles = StyleSheet.create({
    fabStyle: {
        backgroundColor: '#63257F',
    },
})