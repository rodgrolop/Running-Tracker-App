import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, ScrollView, View, Dimensions } from 'react-native'
import FabButton from '../FabButton'

const DefaultPageAuth = ({ children }) => (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroller}>
            {children}
        </ScrollView>
        <FabButton/>
    </View>
)


const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#fff',
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