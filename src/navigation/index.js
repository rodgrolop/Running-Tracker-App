import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { connect } from 'react-redux'
import { navigationRef } from './RootNavigation'
import PropTypes from 'prop-types'
import SceneSplash from '../scenes/auth/sceneSplash'
import SceneLogin from '../scenes/auth/sceneLogin'
import SceneHome from '../scenes/main/sceneHome'

const Stack = createNativeStackNavigator()

const Navigation = ( 
        {   
            isLoggedIn,
        }
    ) => (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
        {isLoggedIn ? 
            (
            <Stack.Screen 
                name="Home" 
                component={SceneHome} 
                options={{ headerShown: false }} />
            ) : (
            <>
                <Stack.Screen 
                    name="Splash" 
                    component={SceneSplash} 
                    options={{ headerShown: false }} />
                <Stack.Screen 
                    name="Login" 
                    component={SceneLogin} 
                    options={{ headerShown: false }}/>
            </>
            ) 
        }           
        </Stack.Navigator>
    </NavigationContainer>
)

SceneLogin.defaultProps = {
    isLoggedIn: false,
}

SceneLogin.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isLoggedIn: state.user.isLoggedIn,    
})

export default connect(mapStateToProps)(Navigation)