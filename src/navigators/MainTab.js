import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import PostDetailScreen from "../screens/PostDetail/PostDetailScreen";
import CreatePostScreen from "../screens/CreatePost/CreatePostScreen";
import HomeStack from "./HomeStack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import Colors from "../constants/Colors";
import { Icon } from "native-base";

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator tabBarOptions={{ 
        activeTintColor: Colors.primaryColor,
        style: {
            backgroundColor: "#20242F",
            borderWidth: 0,
            borderTopWidth: 0,
            paddingTop: 4,
            // alignSelf: "center",
            // borderRadius: 18,
            // position: "absolute",
            // botton: 20,
            // left: 30,
            // right: 30,
            // alighItems: "center"
        }
     }}>
      <Tab.Screen name="Home" component={HomeStack} options={{
        //   tabBarLabel: "Beranda"
        tabBarIcon: ({ color, size }) => <Icon type="Entypo" name="home" style={{ color, fontSize: size }} />
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ 
        tabBarIcon: ({ color, size }) => <Icon type="FontAwesome5" name="user" style={{ color, fontSize: size }} />
       }}/>
    </Tab.Navigator>
  );
};
