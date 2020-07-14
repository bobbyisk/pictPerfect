import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Permissions, Constants } from "react-native-unimodules";
import H1 from "../../components/Text/H1";
import TextUI from "../../components/Text/TextUI";
import Tagline from "../../components/Text/Tagline";
import Colors from "../../constants/Colors";
import { Icon } from "native-base";
import Header from "../../components/General/Header";
import Image from "react-native-scalable-image";
import PlaceholderImg from "../../../assets/images/login_bg.png";
import Axios from "axios";
import Button from "../../components/Button/Button";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "../../constants/API";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 18,
    alignItems: "center",
  },
  commentContainer: {
    paddingHorizontal: 30,
    marginTop: 12,
  },
});

export default (props) => {
  const userSelector = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    ImagePicker.launchImageLibraryAsync()
      .then((result) => {
        console.log(result);
        const localUri = result.uri;
        const filename = localUri.split("/").pop();
        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename);
        const types = match ? `image/${match[1]}` : `image`;
        setSelectedImage({ uri: localUri, name: filename, type: types });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const askPermission = async () => {
    try {
      if (Platform.OS == "ios") {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderImage = () => {
    if(selectedImage) {
      return <Image source={{ uri: selectedImage.uri }} width={120} />
    }

    return (
      <View style={{ borderColor: "gray", borderWidth: 1, height: 120, width: 120 }}/>
    )
  }
  useEffect(() => {
    askPermission();
  }, []);

  const uploadHandler = () => {
    let formData = new FormData();
    formData.append("photo", selectedImage);
    formData.append(
      "data", 
      JSON.stringify({ 
        caption: "(BOBBY) CIMB Niaga", 
        UserId: userSelector.id, 
        location: "Home" 
      })
    );

    Axios.post(`${API_URL}/posts`, formData)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundColor,
      }}
    >
      <SafeAreaView />
      <Header {...props} title="Create Post" />
      {renderImage()}
      <Button containerStyle={{ marginTop: 20 }} onPress={openImagePicker}>Pick Image</Button>
      <Button containerStyle={{ marginTop: 12 }} type="secondary" onPress={uploadHandler}>Upload Post</Button>
    </View>
  );
};
