import React, { useEffect, useState, useContext } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { app } from "../firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { StateContext } from "./StateProvider";

const LoginScreen = ({ navigation }) => {
    const { userID, setUserID } = useContext(StateContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
                console.log("Logged in with UID: " + user.uid);
                navigation.navigate("Start");
            }
        });
    }, []);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email.trim(), password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Registered with:", user.email);
                const accountDocRef = doc(db, "userInfo", user.uid);
                setDoc(accountDocRef, {});
            })
            .catch((error) => alert(error.message));
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email.trim(), password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log("Logged in with: ", user.email);
                navigation.navigate("Start");
            })
            .catch((error) => alert(error.message));
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },

    inputContainer: {
        width: "80%",
        marginTop: 125,
    },

    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },

    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },

    button: {
        backgroundColor: "#228B22",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },

    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#228B22",
        borderWidth: 2,
    },

    buttonOutlineText: {
        color: "#228B22",
        fontWeight: "700",
        fontSize: 16,
    },
});
