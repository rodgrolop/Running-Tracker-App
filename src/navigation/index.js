import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SceneSplash from '../scenes/auth/sceneSplash'
import SceneAppLoading from '../scenes/auth/sceneAppLoading'
import SceneLogin from '../scenes/auth/sceneLogin'
import SceneHome from '../scenes/auth/sceneHome'
import SceneGameHome from '../scenes/main/sceneGameHome'

const Stack = createStackNavigator()

const Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={SceneSplash} options={{ headerShown: false }} />
            <Stack.Screen name="AppLoading" component={SceneAppLoading} />
            <Stack.Screen name="Login" component={SceneLogin} />
            <Stack.Screen name="Home" component={SceneHome} />
            <Stack.Screen name="GameHome" component={SceneGameHome} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigation