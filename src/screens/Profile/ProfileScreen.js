import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import TextUI from "../../components/Text/TextUI";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import Button from "../../components/Button/Button";
import AsyncStorage from "@react-native-community/async-storage";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal: 30
    }
});

export default ({ navigation }) => {
    const [postCount, setPostCount] = useState(0);
    const userSelector = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        Axios.get(`${API_URL}/posts`, {
            params: {
                UserId: userSelector.id
            }
        })
        .then(res => {
            setPostCount(res.data.result.length);
        })
        .catch(err => {
            console.log(err);
        })
    })

    const logoutHandler = () => {
        AsyncStorage.removeItem("userData")
        .then(res => {
            dispatch({
                type: "USER_LOGOUT"
            });
            console.log("Logout");
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <View style={{ ...styles.container }}>
            <TextUI size="lg" accent bold>
                {userSelector.username}
            </TextUI>
            <TextUI size="lg" accent bold>
                {userSelector.email}
            </TextUI>
            <TextUI size="lg" accent bold>
                {userSelector.fullName}
            </TextUI>
            <TextUI size="lg" accent bold>
                {userSelector.bio}
            </TextUI>
            <TextUI size="lg" accent bold>
                {postCount} posts
            </TextUI>
            <Button 
                type="secondary" 
                size="md" 
                onPress={() => logoutHandler()}
            >
                LOGOUT
            </Button>
        </View>
    );
};
