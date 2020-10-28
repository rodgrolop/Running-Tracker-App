import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import FabButton from '../FabButton'

const DefaultPageAuth = ({ children }) => (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroller}>
            {children}
        </ScrollView>
        <View style={styles.containerAbsolute}>
            <FabButton/>
        </View>
    </View>
)


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    containerAbsolute: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    scroller: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

DefaultPageAuth.propTypes = {
    children: PropTypes.node.isRequired,
}

export default DefaultPageAuth