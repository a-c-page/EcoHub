import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabNode from "./BottomTabNode";
import HomePage from "./HomePage";
import Devices from "./Devices";
import Settings from "./Settings";
import Suggestions from "./Suggestions";

const Tabs = createBottomTabNavigator();

const Start = ({ navigation }) => {
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#ffffff",
                    height: 80,
                    paddingBottom: 20,
                },
            }}
        >
            <Tabs.Screen
                name="Home"
                component={HomePage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabNode
                            imagePath={require("../assets/home.png")}
                            tabText="HOME"
                            focused={focused}
                        ></BottomTabNode>
                    ),
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="Connected Devices"
                component={Devices}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabNode
                            imagePath={require("../assets/light.png")}
                            tabText="DEVICES"
                            focused={focused}
                        ></BottomTabNode>
                    ),
                }}
            />

            <Tabs.Screen
                name="Suggestions"
                component={Suggestions}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabNode
                            imagePath={require("../assets/suggestion.png")}
                            tabText="SUGGESTIONS"
                            focused={focused}
                        ></BottomTabNode>
                    ),
                }}
            />
            <Tabs.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <BottomTabNode
                            imagePath={require("../assets/settings.png")}
                            tabText="SETTINGS"
                            focused={focused}
                        ></BottomTabNode>
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

export default Start;
