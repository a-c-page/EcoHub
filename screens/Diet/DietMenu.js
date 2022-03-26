import { useEffect, useContext, useState } from "react";
import {
    VictoryChart,
    VictoryGroup,
    VictoryBar,
    VictoryLegend,
} from "victory-native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { app } from "../../firebase";
import {
    collection,
    doc,
    getFirestore,
    getDoc,
    setDoc,
    getDocs,
} from "firebase/firestore";
import { StateContext } from "../StateProvider";
import { SwipeablePanel } from "rn-swipeable-panel";

const getDateString = (date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var year = date.getFullYear();

    return year + "-" + month + "-" + day;
};

const DietMenu = ({ navigation }) => {
    const { userID } = useContext(StateContext);
    const [graphData, setGraphData] = useState();
    const [show, setShow] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currDate, setCurrDate] = useState(new Date());
    const [items, setItems] = useState([]);
    const [dateString, setDateString] = useState();
    const db = getFirestore(app);
    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: false,
        onlySmall: true,
        showCloseButton: true,
        smallPanelHeight: 600,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
    });
    const [isPanelActive, setIsPanelActive] = useState(false);

    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = async (date) => {
        var conversion = getDateString(date);
        setDateString(conversion);
        const dayDocRef = doc(db, `userInfo/${userID}/dietTotals`, conversion);
        const dayDocSnap = await getDoc(dayDocRef);

        // SEE IF DATE IS IN DB
        if (!dayDocSnap.exists()) {
            await setDoc(dayDocRef, { total: 0 });
        }

        // var docRef = db
        //     .collection("totals")
        //     .doc(userID)
        //     .collection("data")
        //     .doc(result);
        // docRef
        //     .get()
        //     .then((doc) => {
        //         if (doc.exists) {
        //             let arr = doc.data();
        //             let test = [
        //                 ["Breakfast", "-"],
        //                 ["Lunch", "-"],
        //                 ["Dinner", "-"],
        //             ];
        //             var result = Object.keys(arr).map((key) => {
        //                 if (key.substring(5) === "Breakfast") {
        //                     test[0][1] = arr[key] == 0 ? "-" : arr[key];
        //                 } else if (key.substring(5) === "Lunch") {
        //                     test[1][1] = arr[key] == 0 ? "-" : arr[key];
        //                 } else if (key.substring(5) === "Dinner") {
        //                     test[2][1] = arr[key] == 0 ? "-" : arr[key];
        //                 }
        //             });
        //             setItems(test);
        //         } else {
        //             let test = [
        //                 ["Breakfast", "-"],
        //                 ["Lunch", "-"],
        //                 ["Dinner", "-"],
        //             ];
        //             setItems(test);
        //         }
        //     })
        //     .catch((error) => {
        //         console.log("Error getting document:", error);
        //     });

        setCurrDate(date);
        hideDatePicker();
    };

    useEffect(async () => {
        const todayDate = getDateString(currDate);
        setDateString(todayDate);
        const accountDocRef = doc(db, "userInfo", userID);
        const accountDocSnap = await getDoc(accountDocRef);

        // SEE IF ACCOUNT EXISTS IN DB
        if (!accountDocSnap.exists()) {
            await setDoc(accountDocRef, {});
        }

        const dayDocRef = doc(db, `userInfo/${userID}/dietTotals`, todayDate);
        const dayDocSnap = await getDoc(dayDocRef);

        // SEE IF TODAY IS IN DB
        if (!dayDocSnap.exists()) {
            await setDoc(dayDocRef, { total: 0 });
        }

        // POPULATING GRAPH
        const querySnapshot = await getDocs(
            collection(db, `userInfo/${userID}`, "dietTotals")
        );
        let data = [];
        querySnapshot.forEach((doc) => {
            let docData = doc.data();
            let docObject = {
                x: doc.id,
                y: parseInt(docData["total"] ? docData["total"] : 0),
            };
            data.push(docObject);
        });
        setGraphData(data);
        setShow(true);

        let test = [
            ["Breakfast", "-"],
            ["Lunch", "-"],
            ["Dinner", "-"],
        ];
        setItems(test);
    }, []);

    return (
        <>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.title}>Past Week</Text>
                <View>
                    {show ? (
                        <VictoryChart width={350} domainPadding={{ x: 20 }}>
                            <VictoryGroup offset={0}>
                                <VictoryBar
                                    barWidth={20}
                                    data={graphData}
                                    style={{
                                        data: {
                                            fill: "green",
                                        },
                                    }}
                                    barRatio={0.8}
                                    animate={{
                                        duration: 500,
                                    }}
                                />
                            </VictoryGroup>
                            <VictoryLegend
                                x={100}
                                orientation="horizontal"
                                alignItems="center"
                                gutter={10}
                                data={[
                                    {
                                        name: "CO2 Emission / g",
                                        symbol: {
                                            fill: "green",
                                        },
                                    },
                                ]}
                            />
                        </VictoryChart>
                    ) : null}
                </View>
                <TouchableOpacity
                    onPress={showDatePicker}
                    style={{
                        color: "white",
                        marginBottom: 20,
                        backgroundColor: "green",
                        padding: 10,
                        borderRadius: 10,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 20,
                            color: "white",
                        }}
                    >
                        {dateString}
                    </Text>
                </TouchableOpacity>
                <View style={styles.wrapper}>
                    <Text style={styles.row1}> Diet </Text>
                    <Text style={styles.row1}> CO2 Emission / g </Text>
                </View>

                <SwipeablePanel
                    {...panelProps}
                    isActive={isPanelActive}
                ></SwipeablePanel>

                {items.map((item) => (
                    <View style={styles.wrapper}>
                        <Text style={styles.row2}> {item[0]} </Text>
                        <Text style={styles.row3}> {item[1]} </Text>
                    </View>
                ))}
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={currDate}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <TouchableOpacity
                style={styles.floatingActionButton}
                onPress={openPanel}
                //{() =>
                //    navigation.navigate("Food", { currDate: dateString })
                //}
            >
                <Icon name="add" color="white" />
            </TouchableOpacity>
        </>
    );
};

export default DietMenu;

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
        marginTop: 20,
        fontSize: 20,
        alignSelf: "center",
        fontWeight: "bold",
        marginBottom: 10,
    },

    floatingActionButton: {
        backgroundColor: "green",
        width: 55,
        height: 55,
        position: "absolute",
        bottom: 10,
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
