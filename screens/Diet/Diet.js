import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DietMenu from "./DietMenu";
import Food from "./Food";

const Stack = createNativeStackNavigator();

const Diet = ({ navigation }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="DietMenu"
                component={DietMenu}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Food"
                component={Food}
            />
        </Stack.Navigator>
    );
};

export default Diet;
