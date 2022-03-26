import React, { PureComponent, useEffect, useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Button,
} from "react-native";
import { app } from "../firebase";
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getFirestore,
    query,
    where,
    getDocs,
} from "firebase/firestore";

// Helper function to get the current date
const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
};

const Suggestions = ({ navigation }) => {
    useEffect(async () => {
        // Pass
    }, []);

    return (
        <>
            <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
                <TouchableOpacity
                    style={{
                        color: "white",
                        width: 200,
                        marginBottom: 20,
                        backgroundColor: "green",
                        padding: 10,
                        borderRadius: 10,
                    }}
                ></TouchableOpacity>
            </View>
        </>
    );
};

export default Suggestions;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#228B22",
        width: 200,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },

    title: {
        marginTop: 18,
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
        marginBottom: 20,
    },

    floatingActionButton: {
        backgroundColor: "green",
        width: 55,
        height: 55,
        position: "absolute",
        bottom: 25,
        right: 10,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    tableList: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
    },

    wrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        borderBottomWidth: 1,
    },

    row1: {
        width: "100%",
        flex: 1,
        fontSize: 15,
        paddingHorizontal: 2,
        paddingVertical: 10,
        alignItems: "center",
        fontWeight: "bold",
    },

    row2: {
        width: "100%",
        flex: 1,
        fontSize: 15,
        paddingHorizontal: 2,
        paddingVertical: 10,
        alignItems: "center",
    },

    row3: {
        width: "100%",
        flex: 1,
        fontSize: 15,
        paddingHorizontal: 2,
        paddingVertical: 10,
        marginLeft: 70,
        alignItems: "center",
    },
});
