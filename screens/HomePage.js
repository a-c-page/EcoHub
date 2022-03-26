import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diet from "./Diet/Diet";
import Household from "./Household";
import Transportation from "./Transportation/Transportation";
import { ScrollView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

const HomePage = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Home Display"
                component={HomeDisplay}
            />
            <Stack.Screen name="Household" component={Household} />
            <Stack.Screen name="Transportation" component={Transportation} />
            <Stack.Screen name="Diet" component={Diet} />
        </Stack.Navigator>
    );
};

const HomeDisplay = ({ navigation }) => {
    return (
        <ScrollView>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text>TETET</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        width: "90%",
        height: 200,
    },
});

export default HomePage;
