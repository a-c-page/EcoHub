import { useState } from "react";
import {
    View,
    Switch,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants/index";
import server from "../constants/api";
import GlobalStyles from "../styles/GlobalStyles";
import colours from "../styles/Colours";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DeviceMenuLight = ({
    lightText,
    switchValue,
    switchValueSet,
    roomNum,
}) => {
    const lightSwitchHandler = () => {
        switchValueSet(!switchValue);
        let status = switchValue ? "off" : "on";
        fetch(server.base + server.turnOnLight(roomNum, status))
            .then((res) => res.json())
            .then((value) => console.log(value))
            .catch((err) => console.error(err));
    };
    return (
        <View
            style={{
                width: 350,
                paddingVertical: 25,
                paddingHorizontal: 25,
                borderRadius: 10,
                marginTop: 20,
                backgroundColor: COLORS.white,
            }}
        >
            <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    color={colours.main}
                    size={30}
                    style={{ paddingRight: 30 }}
                />

                <View>
                    <Text style={{ ...FONTS.h2 }}>Light</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                        {lightText}
                    </Text>
                </View>

                <Switch
                    trackColor={{
                        true: colours.secondary,
                        false: colours.grey,
                    }}
                    value={switchValue}
                    onValueChange={lightSwitchHandler}
                    style={{ marginLeft: 150, marginTop: 5 }}
                />
            </View>
        </View>
    );
};

export default DeviceMenuLight;
