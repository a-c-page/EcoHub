import React, { useState } from "react";
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
import DeviceMenuLight from "../components/DeviceMenuLight";
import colours from "../styles/Colours";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Devices = () => {
    //switch
    const [lightSwitch1, setToggle1] = useState(false);
    const [lightSwitch2, setToggle2] = useState(false);
    const [lightSwitch3, setToggle3] = useState(false);
    const [lightSwitch4, setToggle4] = useState(false);
    const [temp, setTemp] = useState(20);
    const tempBtnHandler = () => {
        fetch(server.base + server.setTemp(temp))
            .then((res) => res.json())
            .then((value) => console.log(value))
            .catch((err) => console.error(err));
    };
    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: -20,
            }}
        >
            <DeviceMenuLight
                lightText={"Room 1"}
                switchValue={lightSwitch1}
                switchValueSet={setToggle1}
                roomNum={"room1"}
            ></DeviceMenuLight>

            {/* <View
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
                    <View style={{ flex: 1 }}>
                        <MaterialCommunityIcons
                            name="thermometer-lines"
                            color={colours.main}
                            size={30}
                        />
                    </View>

                    <View>
                        <Text style={{ ...FONTS.h2 }}>Thermostat</Text>
                        <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                            Room 1
                        </Text>
                    </View>
                    <TextInput
                        keyboardType="numeric"
                        returnKeyType="done"
                        maxLength={4}
                        style={{
                            fontSize: 14,
                            marginLeft: 25,
                            marginTop: 5,
                            paddingRight: 10,
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 100,
                        }}
                        placeholder="Temp °C"
                        placeholderTextColor={colours.darkGrey}
                        value={temp}
                        onChangeText={(text) => setTemp(text)}
                    />
                    <TouchableOpacity
                        style={{
                            backgroundColor: colours.secondary,
                            marginTop: 5,
                            width: 40,
                            height: 30,
                            borderRadius: 6,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={tempBtnHandler}
                    >
                        <Text style={{ color: "white" }}>Set</Text>
                    </TouchableOpacity>
                </View>
            </View> */}

            <DeviceMenuLight
                lightText={"Room 2"}
                switchValue={lightSwitch2}
                switchValueSet={setToggle2}
                roomNum={"room2"}
            ></DeviceMenuLight>

            <DeviceMenuLight
                lightText={"Room 3"}
                switchValue={lightSwitch3}
                switchValueSet={setToggle3}
                roomNum={"room3"}
            ></DeviceMenuLight>

            <DeviceMenuLight
                lightText={"Room 4"}
                switchValue={lightSwitch4}
                switchValueSet={setToggle4}
                roomNum={"room4"}
            ></DeviceMenuLight>
        </ScrollView>
    );
};

export default Devices;
