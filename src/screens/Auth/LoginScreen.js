import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import Button from "../../components/Button/Button";
import LoginBG from "../../../assets/images/login_bg.png";
import DarkOverlay from "../../components/General/DarkOverlay";
import TextUI from "../../components/Text/TextUI";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
  },
  contentContainer: {
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontFamily: "AvenirNextLTPro-Heavy",
    fontSize: 34,
    height: 34,
  },
  loginText: {
    marginTop: 12,
  },
});

export default (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);

  const loginBtnHandler = () => {
    Axios.get(`${API_URL}/users/login`, {
      params: {
        username,
        password,
      },
    })
      .then((res) => {
        const {
          bio,
          fullName,
          email,
          username,
          profilePicture,
          id,
        } = res.data.result;

        AsyncStorage.setItem(
          "userData",
          JSON.stringify({
            bio,
            fullName,
            email,
            username,
            profilePicture,
            id,
          })
        )
          .then(() => {
            dispatch({
              type: "USER_LOGIN",
              payload: { bio, fullName, email, username, profilePicture, id },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ImageBackground source={LoginBG} style={{ ...styles.bgImage }}>
      <DarkOverlay />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{ justifyContent: "center", flex: 1 }}
        >
          <View style={{ ...styles.contentContainer }}>
            <TextUI style={{ ...styles.welcomeText }}>
              Welcome Back {userSelector.username}
            </TextUI>
            <TextUI style={{ ...styles.loginText }}>
              Login to your account
            </TextUI>
            <View
              style={{
                borderRadius: 22,
                paddingVertical: 11,
                paddingHorizontal: 20,
                justifyContent: "center",
                marginTop: 58,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  opacity: 0.2,
                  borderRadius: 22,
                  ...StyleSheet.absoluteFillObject,
                }}
              />
              <TextInput
                autoCapitalize="none"
                placeholderTextColor="lightgrey"
                style={{
                  fontFamily: "AvenirNextLTPro-Regular",
                  fontSize: 17,
                  color: "white",
                  lineHeight: 19,
                }}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View
              style={{
                borderRadius: 22,
                paddingVertical: 11,
                paddingHorizontal: 20,
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  opacity: 0.2,
                  borderRadius: 22,
                  ...StyleSheet.absoluteFillObject,
                }}
              />
              <TextInput
                secureTextEntry
                autoCapitalize="none"
                placeholderTextColor="lightgrey"
                style={{
                  fontFamily: "AvenirNextLTPro-Regular",
                  fontSize: 17,
                  color: "white",
                  lineHeight: 19,
                }}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <Button
              onPress={loginBtnHandler}
              containerStyle={{ marginTop: 40 }}
              size="lg"
            >
              LOGIN
            </Button>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
