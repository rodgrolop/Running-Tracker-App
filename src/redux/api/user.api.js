import axios from "axios";

import { setUser, setLoading, setError } from "../actions/user.actions";
import store from "../store";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as RootNavigation from "../../navigation/RootNavigation";

// TODO urls in config file
const apiHost = "https://pucelarun.es/wp-json/jwt-auth/v1/token";

export const userLogin = (loginData) => {
  let formData = new FormData();

  formData.append("username", loginData.username);
  formData.append("password", loginData.password);

  store.dispatch(setLoading(true));

  axios
    .post(apiHost, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((responseJson) => {
      console.log(responseJson);
      AsyncStorage.setItem("user", JSON.stringify(responseJson.data));
      store.dispatch(setUser(responseJson.data));
      RootNavigation.navigate("Home");
    })
    .catch((error) => {
      error.response.data.message &&
        store.dispatch(
          setError(error.response.data.message.replace(/(<([^>]+)>)/gi, ""))
        );
    });
};
