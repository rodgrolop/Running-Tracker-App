import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { trackingInitialState } from './../../redux/reducers/tracking.reducer'

import TimeFormat from 'hh-mm-ss'

import { View, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme, Headline } from 'react-native-paper'

const TrackInfo = ( 
    {   
        tracking,
        ...props
    }
    ) => {
    
    const { colors } = props.theme
    
    // State
    const [timer, setTimer] = useState(0)
    
    // Functions
    const startTimer = () => {
        setInterval(function(){ 
            setTimer(timer => timer + 1000)
        }, 1000)
    }
    
    // Map View region handling
    
    // Location service
    
    // Life Cycle
    useEffect(() => {
        // startTimer()
    }, [])
    
    return (
        <View 
            style={
                styles.actionsContainer
            }>
                <View style={styles.actionsItemLeft}>
                    <Icon 
                        name='speedometer'
                        size={28} 
                        color={colors.primary} />
                    <Headline style={styles.actionsText}>
                        {parseFloat(tracking.currentRunInstantSpeed).toFixed(1)}
                    </Headline>
                </View>
                <View style={styles.actionsItemMid}>
                     <Icon 
                        name='timer' 
                        size={46} 
                        color={colors.primary} />
                </View>
                <View style={styles.actionsItemRight}>
                    <Icon 
                        name='arrow-left-right' 
                        size={28} 
                        color={colors.primary} />
                    <Headline style={styles.actionsText}>
                        { parseFloat(tracking.currentRunDistance).toFixed(0) } m
                    </Headline>
                </View>
                <View style={styles.actionsItemFull}>
                    <Headline style={styles.actionsTextTime} color={colors.text}>
                        {TimeFormat.fromMs(tracking.currentRunTimeSpent, 'hh:mm:ss')}
                        {/* {TimeFormat.fromMs(timer, 'hh:mm:ss')} */}
                    </Headline>
                </View>
        </View>
    )
}

TrackInfo.defaultProps = {
    tracking: trackingInitialState,
}

TrackInfo.propTypes = {
    tracking: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    tracking: state.tracking,
})

const mapDispatchToProps = dispatch => ({})

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(TrackInfo))

// Styles

const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    actionsContainer: {
        width: screenWidth,
        height: '35%',
        paddingVertical: 20,
        paddingBottom: 60,
        marginTop: -10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
        	width: 0,
        	height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,       
        elevation: 10,
        zIndex: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    actionsItemLeft: {
        width: '33%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionsItemMid: {
        width: '33%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    actionsItemRight: {
        width: '33%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionsItemFull: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    actionsText: {   
        fontSize: 32,
        lineHeight: 36,  
        fontWeight: 'bold'
    },
    actionsTextTime: {
        fontSize: 44,
        lineHeight: 48,
        fontWeight: 'bold'
    }
})