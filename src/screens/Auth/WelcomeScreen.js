import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import WelcomeBG from "../../../assets/images/welcome_bg.png";
import H1 from "../../components/Text/H1";
import TextUI from "../../components/Text/TextUI";
import Button from "../../components/Button/Button";
import DarkOverlay from "../../components/General/DarkOverlay";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    marginTop: height * (314 / 812),
  },
  bgImage: {
    flex: 1,
  },
});

export default ({ navigation }) => {
  return (
    <ImageBackground style={{ ...styles.bgImage }} source={WelcomeBG}>
      <DarkOverlay />
      <View style={styles.container}>
        <H1 style={{ fontSize: 44, lineHeight: 50 }} bold>
          Find new friends nearby
        </H1>
        <TextUI style={{ marginTop: 14 }}>
          With milions of users all over the world, we gives you the ability to
          connect with people no matter where you are.
        </TextUI>
        <Button
          onPress={() => navigation.navigate("Login")}
          size="lg"
          type="secondary"
          containerStyle={{ marginTop: 44, marginBottom: 10 }}
        >
          Log In
        </Button>
        <Button onPress={() => navigation.navigate("Register")} size="lg">
          Sign Up
        </Button>
      </View>
    </ImageBackground>
  );
};

// 1. pull
// 2. npm install
// 3. react-native link
