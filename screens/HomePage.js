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
        <View
            style={{
                width: "100%",
                height: 290,
            }}
        >
            <ImageBackground
                source={require("../assets/banner.jpg")}
                resizeMode="cover"
                style={{
                    flex: 0.75,
                    alignItems: "center",
                }}
            >
                <Image
                    source={require("../assets/EcoHub.png")}
                    style={{
                        resizeMode: "cover",
                        width: 300,
                        height: 250,
                        marginTop: 10,
                    }}
                ></Image>
            </ImageBackground>

            <View
                style={{
                    position: "absolute",
                    bottom: -325,
                }}
            >
                <FlatList
                    contentContainerStyle={{ marginTop: SIZES.base }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <TouchableOpacity
                    style={{
                        width: 350,
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.padding,
                        marginLeft: 20,
                        marginRight: SIZES.padding,
                        borderRadius: 10,
                        backgroundColor: COLORS.white,
                    }}
                    onPress={() => {
                        navigation.navigate("Household");
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Image
                                source={require("../assets/household.png")}
                                resizeMode="cover"
                                style={{
                                    marginTop: 5,
                                    width: 35,
                                    height: 35,
                                    marginRight: 25,
                                }}
                            />
                        </View>
                        <View>
                            <Text style={{ ...FONTS.h2 }}>Household</Text>
                            <Text
                                style={{ color: COLORS.gray, ...FONTS.body3 }}
                            >
                                Projected Savings: $
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 350,
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.padding,
                        marginLeft: 20,
                        marginRight: SIZES.padding,
                        borderRadius: 10,
                        backgroundColor: COLORS.white,
                        marginTop: 25,
                    }}
                    onPress={() => {
                        navigation.navigate("Transportation");
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Image
                                source={require("../assets/car.png")}
                                resizeMode="cover"
                                style={{
                                    marginTop: 5,
                                    width: 35,
                                    height: 35,
                                    marginRight: 25,
                                }}
                            />
                        </View>
                        <View>
                            <Text style={{ ...FONTS.h2 }}>Transportation</Text>
                            <Text
                                style={{ color: COLORS.gray, ...FONTS.body3 }}
                            >
                                Projected Savings: $
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 350,
                        paddingVertical: SIZES.padding,
                        paddingHorizontal: SIZES.padding,
                        marginLeft: 20,
                        marginRight: SIZES.padding,
                        borderRadius: 10,
                        backgroundColor: COLORS.white,
                        marginTop: 25,
                    }}
                    onPress={() => {
                        navigation.navigate("Diet");
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <View>
                            <Image
                                source={require("../assets/food.png")}
                                resizeMode="cover"
                                style={{
                                    marginTop: 5,
                                    width: 35,
                                    height: 35,
                                    marginRight: 25,
                                }}
                            />
                        </View>
                        <View>
                            <Text style={{ ...FONTS.h2 }}>Dietary</Text>
                            <Text
                                style={{ color: COLORS.gray, ...FONTS.body3 }}
                            >
                                Projected Savings: $
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomePage;
