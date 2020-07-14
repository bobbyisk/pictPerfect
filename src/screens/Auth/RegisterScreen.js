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
import LoginBG from "../../../assets/images/signup_bg.png";
import DarkOverlay from "../../components/General/DarkOverlay";
import TextUI from "../../components/Text/TextUI";
import TextInputUI from "../../components/Input/TextInputUI";
import Axios from "axios";
import { API_URL } from "../../constants/API";

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
    lineHeight: 40,
  },
  loginText: {
    marginTop: 12,
  },
});

export default (props) => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerBtnHandler = () => {
    Axios.post(`${API_URL}/users`, {
      username,
      fullName,
      email,
      password,
      bio: "No bio yet",
      profilePicture: "empty",
    })
      .then((res) => {
        console.log(res.data.result);
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
            <TextUI style={{ ...styles.welcomeText }}>Create an account</TextUI>
            <TextInputUI
              autoCapitalize="none"
              onChangeText={(text) => setUsername(text)}
              placeholderTextColor="lightgrey"
              containerStyle={{
                marginTop: 58,
              }}
              placeholder="Username"
            />
            <TextInputUI
              autoCapitalize="none"
              onChangeText={(text) => setFullName(text)}
              placeholderTextColor="lightgrey"
              containerStyle={{
                marginTop: 10,
              }}
              placeholder="Full Name"
            />
            <TextInputUI
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="lightgrey"
              containerStyle={{
                marginTop: 10,
              }}
              placeholder="Email"
            />
            <TextInputUI
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor="lightgrey"
              containerStyle={{
                marginTop: 10,
              }}
              placeholder="Password"
              secureTextEntry
            />
            <Button
              onPress={registerBtnHandler}
              containerStyle={{ marginTop: 40 }}
              size="lg"
            >
              SIGN UP
            </Button>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
