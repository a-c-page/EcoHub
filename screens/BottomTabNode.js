import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const BottomTabNode = ({ imagePath, tabText, focused }) => {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
            }}
        >
            <Image
                source={imagePath}
                resizeMode="contain"
                style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#3a7022" : "#5cb236",
                }}
            />
            <Text
                style={{
                    color: { focused } ? "#3a7022" : "#5cb236",
                    fontSize: 10,
                }}
            >
                {tabText}
            </Text>
        </View>
    );
};

export default BottomTabNode;
