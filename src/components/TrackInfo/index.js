import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TimeFormat from 'hh-mm-ss'

import { AppState, View, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { withTheme, Headline } from 'react-native-paper'
import { getUpdated } from './../../redux/actions/tracking.actions'

const TrackInfo = ( 
    {   
        tracking,
        runStatus,
        currentRunTimeSpent,
        ...props
    }
    ) => {
    
    const { colors } = props.theme
    
    // State
    const appState = useRef(AppState.currentState)
    const [timer, setTimer] = useState(currentRunTimeSpent)
    
    // Functions
    const handleAppStateChange = nextAppState => {
        if (appState.current.match(/inactive|background/) && nextAppState === "active") {
            getUpdated()
        }
        appState.current = nextAppState;
    }
    
    // Map View region handling
    
    // Location service
    
    // Life Cycle
    useEffect(() => {
        let interval = null        
        if (runStatus == 'started') {  
            setTimer(currentRunTimeSpent)          
            interval = setInterval(() => {
                setTimer(timer => timer + 1000)
            }, 1000);
        } else {
            clearInterval(interval)
            setTimer(currentRunTimeSpent)
        }
        return () => clearInterval(interval)
    }, [runStatus])
    
    useEffect(() => {
        setTimer(currentRunTimeSpent)
    }, [currentRunTimeSpent])
    
    useEffect(() => {
        AppState.addEventListener("change", handleAppStateChange)
        return () => AppState.removeEventListener("change", handleAppStateChange)
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
                        {TimeFormat.fromMs(timer, 'hh:mm:ss')}
                    </Headline>
                </View>
        </View>
    )
}

TrackInfo.propTypes = {
    tracking: PropTypes.object.isRequired,
    runStatus: PropTypes.string.isRequired,
    currentRunTimeSpent: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
    tracking: state.tracking,
    runStatus: state.tracking.runStatus,
    currentRunTimeSpent: state.tracking.currentRunTimeSpent,
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