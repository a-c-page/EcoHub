import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";

const HomeMenuItem = ({ imagePath, itemText, click, navigation }) => {
    return (
        <TouchableOpacity
            style={GlobalStyles.menuItemTouchableOpacity}
            onPress={() => navigation.navigate(click)}
        >
            <View style={GlobalStyles.menuItemMainView}>
                <Text style={GlobalStyles.menuItemText}>{itemText}</Text>
                <View style={GlobalStyles.menuItemImageView}>
                    <Image
                        style={GlobalStyles.menuItemImage}
                        source={imagePath}
                    ></Image>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default HomeMenuItem;
