import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../constants/index";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Diet from "./Diet/Diet";
import Devices from "./Devices";
import Transportation from "./Transportation/Transportation";
import HomeMenuItem from "../components/HomeMenuItem";
import GlobalStyles from "../styles/GlobalStyles";

const Stack = createNativeStackNavigator();

const HomePage = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Home Display"
                component={HomeDisplay}
            />
            <Stack.Screen name="Devices" component={Devices} />
            <Stack.Screen name="Transportation" component={Transportation} />
            <Stack.Screen name="Diet" component={Diet} />
        </Stack.Navigator>
    );
};

const HomeDisplay = ({ navigation }) => {
    return (
        <>
            <View style={GlobalStyles.header}>
                <Image
                    style={GlobalStyles.headerLogo}
                    source={require("../assets/EcoPal.png")}
                ></Image>
            </View>
            <ScrollView>
                <View style={GlobalStyles.homeMainContainer}>
                    <HomeMenuItem
                        itemText={"House"}
                        imagePath={require("../assets/housePicture.jpg")}
                        click={"Devices"}
                        navigation={navigation}
                    ></HomeMenuItem>
                    <HomeMenuItem
                        itemText={"Food"}
                        imagePath={require("../assets/foodPicture.jpg")}
                        click={"Diet"}
                        navigation={navigation}
                    ></HomeMenuItem>
                    <HomeMenuItem
                        itemText={"Transportation"}
                        imagePath={require("../assets/transportPicture.jpg")}
                        click={"Transportation"}
                        navigation={navigation}
                    ></HomeMenuItem>
                </View>
            </ScrollView>
        </>
    );
};

export default HomePage;
