import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, Dimensions } from 'react-native'
import { withTheme, FAB } from 'react-native-paper'

import { trackingInitialState } from './../../redux/reducers/tracking.reducer'

import { startBackgroundLocationService, pauseBackgroundLocationService, stopBackgroundLocationService } from './../../redux/utils/tracking.functions'

const FabButton = ( 
  {   
      tracking,
      ...props
  }
  ) => {
    
    const { colors } = props.theme
    
    // State
    
    // Functions
    
    // Map View region handling
    
    // Location service
        
    // Life Cycle
    
    return (
        <View style={styles.fabContainer}>
            <FAB
                style={styles.fabStyle}
                fabStyle={styles.fabStyleParent}
                animated={true}
                icon={
                  tracking.runStatus != 'started' ? 
                  'play' : 
                  'pause'
                }
                onPress={
                  () => tracking.runStatus != 'started' ? 
                  startBackgroundLocationService() : 
                  pauseBackgroundLocationService()
                }
              />
              { tracking.runStatus != 'stopped' && 
                  <FAB
                      style={styles.fabStyle}
                      fabStyle={styles.fabStyleParent}
                      animated={true}
                      icon='stop'
                      onPress={
                        () =>
                        stopBackgroundLocationService()
                      }
                    />
              }          
          </View>
    )
}

FabButton.defaultProps = {
  tracking: trackingInitialState,
}

FabButton.propTypes = {
  tracking: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  tracking: state.tracking,
})

const mapDispatchToProps = dispatch => ({})

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(FabButton))

// Styles

const styles = StyleSheet.create({
    fabContainer: {
        width: Dimensions.get('window').width,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabStyle: {
        margin: 16,        
    },
    fabStyleParent: {
        backgroundColor: '#63257F',
    },    
})