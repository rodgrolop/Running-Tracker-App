import React from 'react'

import { View, StyleSheet, Dimensions } from 'react-native'
import { withTheme, Button } from 'react-native-paper'

import { startBackgroundLocationService, stopBackgroundLocationService } from './../../redux/tasks/tracking.tasks'

const TrackInfo = props => {
    
    // State
    
    // Functions
    
    // Map View region handling
    
    // Location service
        
    // Life Cycle
    
    return (
        <View
            style={
                styles.actionsContainer
            }>
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
        </View>
    )
}

export default withTheme(TrackInfo)

// Styles

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height 

const styles = StyleSheet.create({
    actionsContainer: {
        width: screenWidth,
        height: '40%',
    },
})