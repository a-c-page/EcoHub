import React, { useEffect, useState, useContext } from "react";
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Overlay, Icon } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import { StateContext } from "../StateProvider";
import { app } from "../../firebase";
import {
    doc,
    getFirestore,
    getDoc,
    setDoc,
    updateDoc,
    deleteField,
    increment,
} from "firebase/firestore";

const remove = (arr, val) => {
    // Remove from the breakfastList
    let array = [...arr];
    let len = array.length;
    let index;
    for (let i = 0; i < len; i++) {
        if (array[i].type == val) {
            index = i;
        }
    }
    array.splice(index, 1);
    return array;

    // Add back to the array
};

const Food = ({ route, navigation }) => {
    const { foodItems, setFoodItems, userID, dietAmount } =
        useContext(StateContext);
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Beef (Cows Meat)", value: "Beef (Cows Meat)" },
        { label: "Lamb", value: "Lamb" },
        {
            label: "Shellfish (Shrimp, Scallops, Lobster)",
            value: "Shellfish (Shrimp, Scallops, Lobster)",
        },
        { label: "Fish and Other Seafood", value: "Fish and Other Seafood" },
        { label: "Bacon (Pork meat)", value: "Bacon (Pork meat)" },
        { label: "Chicken and Turkey", value: "Chicken and Turkey" },
        { label: "Cheese and Yogurt", value: "Cheese and Yogurt" },
        { label: "Milk", value: "Milk" },
        { label: "Eggs", value: "Eggs" },
        { label: "Nuts and Seeds", value: "Nuts and Seeds" },
        { label: "Peas and Legumes", value: "Peas and Legumes" },
        { label: "Tofu and Soy Based Food", value: "Tofu and Soy Based Food" },
        { label: "Rice and Quinoa", value: "Rice and Quinoa" },
        { label: "Bread, Pasta, Crackers", value: "Bread, Pasta, Crackers" },
        { label: "Oatmeal and Cereal", value: "Oatmeal and Cereal" },
        { label: "Root Vegtables", value: "Root Vegtables" },
        { label: "Other Vegetables", value: "Other Vegetables" },
        { label: "Potatoes and Starches", value: "Potatoes and Starches" },
        { label: "Berries & Grapes", value: "Berries & Grapes" },
        { label: "Other Fruits", value: "Other Fruits" },
        {
            label: "Pastries and Baked Goods",
            value: "Pastries and Baked Goods",
        },
        { label: "Chocolate", value: "Chocolate" },
        { label: "Coffee", value: "Coffee" },
        { label: "Wine and Spirits", value: "Wine and Spirits" },
        { label: "Beer", value: "Beer" },
    ]);
    const [serving, setServing] = useState(0);
    const db = getFirestore(app);
    const { currDate } = route.params;

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const addItem = async () => {
        if (value != null && serving > 0) {
            let docData = {};
            docData[value] = serving;

            let item = {
                type: value,
                servings: serving,
            };

            let result = dietAmount[item.type] * item.servings;

            docData["total"] = increment(result);

            const dayDocRef = doc(
                db,
                `userInfo/${userID}/dietTotals`,
                currDate
            );
            await updateDoc(dayDocRef, docData);

            setFoodItems((foodItems) => [...foodItems, item]);

            toggleOverlay();
            setServing(0);
            setValue(null);
            toggleOverlay();
        } else if (value == null) {
            alert("Please select an item");
        } else if (serving == 0) {
            alert("Please select a serving amount");
        }
    };

    const handleDelete = async (item) => {
        let arr = remove(foodItems, item.type);
        setFoodItems(arr);

        let result = dietAmount[item.type] * item.servings * -1;

        //Removing it from database
        let docData = {};
        docData[item.type] = deleteField(result);
        docData["total"] = increment(result);

        const dayDocRef = doc(db, `userInfo/${userID}/dietTotals`, currDate);
        await updateDoc(dayDocRef, docData);
    };

    useEffect(async () => {
        const dayDocRef = doc(db, `userInfo/${userID}/dietTotals`, currDate);
        const dayDocSnap = await getDoc(dayDocRef);
        // SEE IF TODAY IS IN DB
        if (!dayDocSnap.exists()) {
            await setDoc(dayDocRef, { total: 0 });
        }

        let info = await getDoc(dayDocRef);
        let infoData = info.data();

        result = [];
        for (const key in infoData) {
            const item = {
                type: key,
                servings: infoData[key],
            };
            if (key != "total") {
                result.push(item);
            }
        }
        setFoodItems(result);
    }, []);

    return (
        <ScrollView>
            <View
                style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                }}
            >
                {/* Main Heading */}

                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        marginBottom: 20,
                        marginTop: 30,
                    }}
                >
                    Food Items
                </Text>

                {/* Adding All the Items in a drop down */}

                <View style={styles.wrapper}>
                    <Text style={styles.row1}> Item </Text>
                    <Text style={styles.row1}> Serving </Text>
                </View>

                {foodItems.map((item) => (
                    <View style={styles.tableList}>
                        <View style={styles.wrapper}>
                            <Text style={styles.row2}> {item.type} </Text>
                            <Text style={styles.row3}> {item.servings} </Text>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(item)}
                            >
                                <Icon name="delete" color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <TouchableOpacity
                    style={styles.floatingActionButton}
                    onPress={toggleOverlay}
                >
                    <Icon name="add" color="white" />
                </TouchableOpacity>

                {/* POP-UP MENU */}
                {/* POP-UP MENU */}
                {/* POP-UP MENU */}
                <Overlay
                    overlayStyle={{ borderRadius: 10, margin: 10 }}
                    isVisible={visible}
                    onBackdropPress={toggleOverlay}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            marginBottom: 20,
                        }}
                    >
                        Items
                    </Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            marginTop: 20,
                            marginBottom: 20,
                        }}
                    >
                        Servings
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                            style={styles.raisedSides}
                            onPress={() => {
                                serving > 0 ? setServing(serving - 1) : null;
                            }}
                        >
                            <Text>-</Text>
                        </TouchableOpacity>
                        <View style={styles.raisedMiddle}>
                            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                                {serving}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.raisedSides}
                            onPress={() => {
                                setServing(serving + 1);
                            }}
                        >
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={addItem}
                        >
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </View>
        </ScrollView>
    );
};

export default Food;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#228B22",
        width: 300,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40,
    },
    deleteButton: {
        backgroundColor: "#228B22",
        width: 35,
        height: 35,
        padding: 2,
        borderRadius: 50,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 30,
    },
    raisedSides: {
        width: 52,
        height: 52,
        borderRadius: 10,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
    },
    raisedMiddle: {
        width: 52,
        height: 52,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flex: 4,
    },

    tableList: {
        flex: 1,
        width: "100%",
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

    floatingActionButton: {
        position: "absolute",
        backgroundColor: "green",
        width: 55,
        height: 55,
        top: 0,
        left: 300,
        bottom: 10,
        zIndex: 5,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
});
