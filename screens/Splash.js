import React, { useEffect, useState, useContext } from "react";
import {
    ImageBackground,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import { app } from "../firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { StateContext } from "./StateProvider";

const LoginScreen = ({ navigation }) => {
    const { userID, setUserID } = useContext(StateContext);
    const auth = getAuth(app);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
                console.log("Logged in with UID: " + user.uid);
                navigation.navigate("Start");
            } else {
                navigation.navigate("Login");
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require(".././assets/EcoHub.png")}
            />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
    },
    image: {
        height: 200,
        width: 200,
    },
});
