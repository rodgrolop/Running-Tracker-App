import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { navigationRef } from './RootNavigation'
import SceneSplash from '../scenes/auth/sceneSplash'
import SceneLogin from '../scenes/auth/sceneLogin'
import SceneHome from '../scenes/main/sceneHome'

const Drawer = createDrawerNavigator()

const DrawerNavigation = () => (
    <NavigationContainer ref={navigationRef}>
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Splash" component={SceneSplash} options={{  gestureEnabled: false }} />
            <Drawer.Screen name="Login" component={SceneLogin} options={{ headerShown: false }}/>
            <Drawer.Screen name="Home" component={SceneHome} options={{ headerShown: false }}/>
        </Drawer.Navigator>
    </NavigationContainer>
)

export default DrawerNavigation