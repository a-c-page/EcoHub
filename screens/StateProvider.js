import { useState, createContext } from "react";

const dietAmount = {
    Beef: [require("../assets/beef-min.jpg"), 7461],
    Chocolate: [require("../assets/chocolate-min.jpg"), 1400],
    Lamb: [require("../assets/lamb-min.jpg"), 2979],
    Coffee: [require("../assets/coffee-min.jpg"), 4993],
    Shellfish: [require("../assets/shellfish-min.jpg"), 2015],
    Dairy: [require("../assets/dairy-min.jpg"), 1194],
    Fish: [require("../assets/fish-min.jpg"), 1022],
    Bacon: [require("../assets/bacon-min.jpg"), 923],
    Chicken: [require("../assets/chicken-min.jpg"), 740],
    Gluten: [require("../assets/gluten-min.jpg"), 300],
    Nuts: [require("../assets/nuts-min.jpg"), 129],
    Cereal: [require("../assets/cereal-min.jpg"), 248],
    Vegetables: [require("../assets/vegetables-min.jpg"), 45],
    Alcohol: [require("../assets/alcohol-min.png"), 400],
    Fruits: [require("../assets/fruits-min.jpg"), 156],
    Legumes: [require("../assets/legumes-min.jpg"), 147],
    Juice: [require("../assets/juice-min.jpg"), 121],
    "Baked Goods": [require("../assets/baked-min.jpg"), 63],
    "Starch Foods": [require("../assets/starch-min.jpeg"), 39],
};

const transportAmount = {
    "Domestic Flight": [require("../assets/domestic-flight-min.jpg"), 240],
    "Long Haul Flight": [require("../assets/Long-Haul-Flight-min.jpg"), 195],
    Car: [require("../assets/car-min.jpg"), 194],
    Bus: [require("../assets/coach-bus-min.jpg"), 99],
    "Domestic Rail": [require("../assets/domestic-rail-min.jpg"), 46],
    "Electric Vehicle": [require("../assets/Electric-vehicle-min.jpg"), 80],
    Motorbike: [require("../assets/Motorbike-min.jpg"), 126],
    Bike: [require("../assets/bike-min.png"), 8],
    Walk: [require("../assets/walk-min.jpg"), 0],
};

export const StateContext = createContext();

export const StateProvider = (props) => {
    const [userID, setUserID] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [transportItems, setTransportItems] = useState([]);
    // Value's that goes through to all components
    const value = {
        userID,
        dietAmount,
        transportAmount,
        foodItems,
        setUserID,
        setFoodItems,
        setTransportItems,
        transportItems,
    };

    return (
        <StateContext.Provider value={value}>
            {props.children}
        </StateContext.Provider>
    );
};
