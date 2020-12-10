import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
// Test import components
import { Drawer } from 'react-native-paper'


const DrawerContent = ({ user }) => {

return (
  <SafeAreaView>
    <Drawer.Item
    icon="star"
    label="First Item"
    />
  </SafeAreaView>
)
}

const styles = StyleSheet.create({
    
})

DrawerContent.defaultProps = {
  user: {},
}

DrawerContent.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user.user,    
})

export default connect(mapStateToProps)(DrawerContent)