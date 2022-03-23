import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StateProvider } from "./screens/StateProvider";
import BottomTabNode from "./screens/BottomTabNode";
import HomePage from "./screens/HomePage";
import Devices from "./screens/Devices";
import Settings from "./screens/Settings";
import Suggestions from "./screens/Suggestions";

const Stack = createBottomTabNavigator();

export default function App() {
    return (
        <StateProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: "#ffffff",
                            height: 80,
                            paddingBottom: 20,
                        },
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={HomePage}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <BottomTabNode
                                    imagePath={require("./assets/home.png")}
                                    tabText="HOME"
                                    focused={focused}
                                ></BottomTabNode>
                            ),
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Connected Devices"
                        component={Devices}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <BottomTabNode
                                    imagePath={require("./assets/light.png")}
                                    tabText="DEVICES"
                                    focused={focused}
                                ></BottomTabNode>
                            ),
                        }}
                    />

                    <Stack.Screen
                        name="Suggestions"
                        component={Suggestions}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <BottomTabNode
                                    imagePath={require("./assets/suggestion.png")}
                                    tabText="SUGGESTIONS"
                                    focused={focused}
                                ></BottomTabNode>
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <BottomTabNode
                                    imagePath={require("./assets/settings.png")}
                                    tabText="SETTINGS"
                                    focused={focused}
                                ></BottomTabNode>
                            ),
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </StateProvider>
    );
}
