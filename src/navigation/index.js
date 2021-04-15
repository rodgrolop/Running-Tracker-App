import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { connect } from "react-redux";
import { navigationRef } from "./RootNavigation";
import PropTypes from "prop-types";
import DrawerContent from "./../components/DrawerContent";
import SceneLogin from "../scenes/auth/sceneLogin";
import SceneHome from "../scenes/main/sceneHome";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const MainDrawer = () => (
  <Drawer.Navigator drawerContent={() => <DrawerContent />}>
    <Drawer.Screen name="Home" component={SceneHome} />
    <Drawer.Screen name="Login" component={SceneLogin} />
  </Drawer.Navigator>
);

const Navigation = ({ isLoggedIn }) => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen
          name="Home"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={SceneLogin}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  </NavigationContainer>
);

Navigation.defaultProps = {
  isLoggedIn: false,
};

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Navigation);
