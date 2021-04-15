import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Linking from "expo-linking";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, Alert, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogout } from "../../redux/actions/user.actions";
import store from "../../redux/store";

import { Button } from "react-native-paper";

const DrawerContent = ({ user, ...props }) => {
  const openSettings = () => Linking.openSettings();

  const openPrivacy = () =>
    Linking.openURL(
      "https://www.sansilvestrevalladolid.es/politica-de-privacidad-san-silvestre-valladolid-tracker/"
    );

  const handleLogout = () => {
    Alert.alert(
      "Desconectar",
      "¿Está seguro de que quiere cerrar su sesión?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Confirmar",
          onPress: () => {
            AsyncStorage.clear();
            store.dispatch(userLogout());
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={stylesSidebar.safeArea}>
      <View style={stylesSidebar.sideMenuContainer}>
        <View style={stylesSidebar.profileHeader}>
          <View style={stylesSidebar.profileHeaderPicCircle}>
            {user.user.data.avatar ? (
              <Image
                style={stylesSidebar.stretch}
                source={{
                  uri: user.user.data.avatar,
                }}
              />
            ) : (
              <Text style={{ fontSize: 25, color: "#307ecc" }}>
                {user.user.user_display_name &&
                  user.user.user_display_name.charAt(0)}
              </Text>
            )}
          </View>
          <Text style={stylesSidebar.profileHeaderText}>
            {user.user.user_display_name && user.user.user_display_name}
          </Text>
        </View>
        <View style={stylesSidebar.userDataHolder}></View>
        <View style={stylesSidebar.logout}>
          <Button onPress={openSettings} style={stylesSidebar.logoutButton}>
            Ir a Ajustes
          </Button>
        </View>
        <View style={stylesSidebar.logout}>
          <Button onPress={openPrivacy} style={stylesSidebar.logoutButton}>
            Política de Privacidad
          </Button>
        </View>
        <View style={stylesSidebar.logout}>
          <Button onPress={handleLogout} style={stylesSidebar.logoutButton}>
            Desconectar
          </Button>
        </View>
        <View style={stylesSidebar.version}>
          <Text style={stylesSidebar.versionText}>0.0.1</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const stylesSidebar = StyleSheet.create({
  safeArea: {
    backgroundColor: "#63257F",
  },
  userDataHolder: {
    flexDirection: "column",
    width: "100%",
    paddingLeft: 15,
    flexGrow: 1,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  userDataTitle: {
    color: "black",
    fontSize: 21,
    paddingTop: 15,
  },
  userData: {
    color: "#63257F",
    fontSize: 21,
    paddingTop: 5,
    fontWeight: "700",
  },
  logout: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  version: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#63257F",
  },
  versionText: {
    color: "#fff",
    fontSize: 21,
    paddingVertical: 5,
    textAlign: "center",
  },
  logoutButton: {
    color: "#63257F",
    fontSize: 21,
    paddingVertical: 5,
    textAlign: "center",
  },
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    color: "white",
  },
  profileHeader: {
    flexDirection: "row",
    backgroundColor: "#63257F",
    textAlign: "center",
    paddingTop: 60,
    paddingBottom: 60,
    paddingLeft: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "white",
    alignSelf: "center",
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  stretch: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    resizeMode: "stretch",
  },
});

DrawerContent.defaultProps = {
  user: {},
};

DrawerContent.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(DrawerContent);
