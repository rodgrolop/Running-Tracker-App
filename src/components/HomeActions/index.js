import React from 'react'

import { StyleSheet, Dimensions } from 'react-native'
import { withTheme, Button } from 'react-native-paper'

import { startBackgroundLocationService, stopBackgroundLocationService } from './../../redux/tasks/tracking.tasks'

const HomeActions = props => {
    
    // State
    
    // Functions
    
    // Map View region handling
    
    // Location service
        
    // Life Cycle
    
    return (
        <>
            <Button
                    loading={false}
                    icon={null} 
                    mode="contained"
                    onPress={
                        () => 
                        startBackgroundLocationService()
                    }
                    style={
                        styles.homeButton
                    }
                    contentStyle={
                        {
                            height: 60,
                        }
                    }
                    labelStyle={
                        {
                            fontSize: 16,
                        }
                    }
                    >
                    Start
                </Button>
                <Button
                    loading={false}
                    icon={null} 
                    mode="contained"
                    onPress={
                        () => 
                        stopBackgroundLocationService()
                    }
                    style={
                        styles.homeButton
                    }
                    contentStyle={
                        {
                            height: 60,
                        }
                    }
                    labelStyle={
                        {
                            fontSize: 16,
                        }
                    }
                    >
                    Stop
                </Button>
        </>
    )
}

export default withTheme(HomeActions)

// Styles

const styles = StyleSheet.create({
    homeButton: {},
})