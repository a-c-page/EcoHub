import React, { useState, useEffect } from "react";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    doc,
    getFirestore,
    getDoc,
    setDoc,
    increment,
    updateDoc,
    deleteField,
} from "firebase/firestore";
import { app } from "../firebase";

const Devices = () => {
    //switch
    const [lightSwitch1, setToggle1] = useState(false);
    const [lightSwitch2, setToggle2] = useState(false);
    const [lightSwitch3, setToggle3] = useState(false);
    const [lightSwitch4, setToggle4] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [paused, setPaused] = useState(true);
    const [weekdayOnTime, setWeekdayOnTime] = useState(false);
    const [weekdayOffTime, setWeekdayOffTime] = useState(false);
    const [weekendOnTime, setWeekendOnTime] = useState(false);
    const [weekendOffTime, setWeekendOffTime] = useState(false);
    // const [weekdayOnTemp, setWeekdayOnTemp] = useState();
    // const [weekdayOffTemp, setWeekdayOffTemp] = useState();
    // const [weekendOnTemp, setWeekendOnTemp] = useState();
    // const [weekendOffTemp, setWeekendOffTemp] = useState();
    const [current, setCurrent] = useState();
    const [temp, setTemp] = useState(20);
    const db = getFirestore(app);
    const [which, setWhich] = useState();

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = async (date) => {
        date = new Date(date);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (minutes == 0) {
            minutes = "00";
        }
        let timeString = hours + ":" + minutes;

        console.log(timeString);

        if (which == 1) {
            fetch(server.base + server.weekdayThermostatOn(temp, timeString))
                .then((res) => res.json())
                .then((value) => console.log(value))
                .catch((err) => console.error(err));
            setWeekdayOnTime(timeString);
        } else if (which == 2) {
            fetch(server.base + server.weekdayThermostatOff(temp, timeString))
                .then((res) => res.json())
                .then((value) => console.log(value))
                .catch((err) => console.error(err));
            setWeekdayOffTime(timeString);
        } else if (which == 3) {
            fetch(server.base + server.weekendThermostatOn(temp, timeString))
                .then((res) => res.json())
                .then((value) => console.log(value))
                .catch((err) => console.error(err));
            setWeekendOnTime(timeString);
        } else if (which == 4) {
            fetch(server.base + server.weekendThermostatOff(temp, timeString))
                .then((res) => res.json())
                .then((value) => console.log(value))
                .catch((err) => console.error(err));
            setWeekendOffTime(timeString);
        }

        hideDatePicker();
    };

    const schedulerHandler = () => {
        setPaused(!paused);
        let status = paused ? "on" : "off";

        if (status == "on") {
            fetch(server.base + server.resumeThermo())
                .then((res) => res.json())
                .then((value) => console.log(value))
                .catch((err) => console.error(err));
        } else {
            fetch(server.base + server.pauseThermo())
                .then((res) => res.json())
                .then((value) => console.log(value))
                .catch((err) => console.error(err));
        }
    };

    const tempBtnHandler = () => {
        fetch(server.base + server.setTemp(temp))
            .then((res) => res.json())
            .then((value) => console.log(value))
            .catch((err) => console.error(err));
    };

    useEffect(async () => {
        fetch(server.base + server.getLight("room1"))
            .then((res) => res.json())
            .then((value) => {
                value["status"] == "on" ? setToggle1(true) : setToggle1(false);
            })
            .catch((err) => console.error(err));

        fetch(server.base + server.getLight("room2"))
            .then((res) => res.json())
            .then((value) => {
                value["status"] == "on" ? setToggle2(true) : setToggle2(false);
            })
            .catch((err) => console.error(err));

        fetch(server.base + server.getLight("room3"))
            .then((res) => res.json())
            .then((value) => {
                value["status"] == "on" ? setToggle3(true) : setToggle3(false);
            })
            .catch((err) => console.error(err));

        fetch(server.base + server.getLight("room4"))
            .then((res) => res.json())
            .then((value) => {
                value["status"] == "on" ? setToggle4(true) : setToggle4(false);
            })
            .catch((err) => console.error(err));

        const schedulerRef = doc(db, `scheduler/`, "thermostat");
        const schedulerSnap = await getDoc(schedulerRef);

        let info = schedulerSnap.data();
        console.log(info);
        setWeekdayOnTime(info["weekdayOn"]["time"]);
        setWeekdayOffTime(info["weekdayOff"]["time"]);
        setWeekendOnTime(info["weekendOn"]["time"]);
        setWeekendOffTime(info["weekendOff"]["time"]);

        // setWeekdayOnTemp(info["weekdayOn"]["temp"]);
        // setWeekdayOffTemp(info["weekdayOff"]["temp"]);
        // setWeekendOnTemp(info["weekendOn"]["temp"]);
        // setWeekendOffTemp(info["weekendOff"]["temp"]);

        setPaused(info["paused"]);

        const thermoRef = doc(db, `thermostat/`, "current");
        const thermoSnap = await getDoc(thermoRef);

        let therm_info = thermoSnap.data();
        setTemp(therm_info["temp"]);
    }, []);
    return (
        <ScrollView
            contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
            }}
        >
            <DeviceMenuLight
                lightText={"Room 1"}
                switchValue={lightSwitch1}
                switchValueSet={setToggle1}
                roomNum={"room1"}
            ></DeviceMenuLight>

            <View
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "92%",
                    height: 160,
                    padding: 20,
                    borderRadius: 10,
                    marginTop: 20,
                    backgroundColor: colours.white,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: colours.grey,
                        marginBottom: 10,
                    }}
                >
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

                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <MaterialCommunityIcons
                        name="clock-outline"
                        color={colours.main}
                        size={30}
                        style={{
                            flex: 1,
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 10,
                            marginLeft: -20,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>Weekdays</Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    showDatePicker();
                                    setWhich(1);
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: colours.secondary,
                                    }}
                                >
                                    {weekdayOnTime}
                                </Text>
                            </TouchableOpacity>
                            <Text> - </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    showDatePicker();
                                    setWhich(2);
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: colours.secondary,
                                    }}
                                >
                                    {weekdayOffTime}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 10,
                            marginRight: 10,
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>Weekends</Text>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    showDatePicker();
                                    setWhich(3);
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: colours.secondary,
                                    }}
                                >
                                    {weekendOnTime}
                                </Text>
                            </TouchableOpacity>
                            <Text> - </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    showDatePicker();
                                    setWhich(4);
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: colours.secondary,
                                    }}
                                >
                                    {weekendOffTime}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Switch
                        trackColor={{
                            true: colours.secondary,
                            false: colours.grey,
                        }}
                        value={!paused}
                        onValueChange={schedulerHandler}
                        style={{ flex: 1, marginRight: -18 }}
                    />
                </View>
            </View>

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

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                locale="en_GB"
                date={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </ScrollView>
    );
};

export default Devices;
