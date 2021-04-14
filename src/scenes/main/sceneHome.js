import React, { useEffect } from "react";
import * as Updates from "expo-updates";

import { Alert } from "react-native";

import { withTheme } from "react-native-paper";

// import { getLastKnownPosition } from './../../redux/utils/tracking.functions'
import Header from "./../../components/Header";
import DefaultPageAuth from "../../components/DefaultPageAuth";
import Map from "../../components/Map";
import TrackInfo from "../../components/TrackInfo";

const SceneHome = (props) => {
  // State

  // Functions
  const handleUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        Alert.alert(
          "Actualización descargada",
          "Hemos descargado una actualización de la aplicación para que puedas disfrutar de los últimos cambios, la aplicación se reiniciará para aplicarlos.",
          [{ text: "Aceptar", onPress: () => reloadApp() }],
          { cancelable: false }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const reloadApp = async () => await Updates.reloadAsync();

  // Life Cycle
  useEffect(() => {
    handleUpdates();
  }, []);

  return (
    <>
      <Header />
      <DefaultPageAuth>
        <Map />
        <TrackInfo />
      </DefaultPageAuth>
    </>
  );
};

export default withTheme(SceneHome);
