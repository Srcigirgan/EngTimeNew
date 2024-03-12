import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    token: null,
    id: null,
    username: null,
    first_name: null,
    last_name: null,
};

export const UserContext = createContext();

export const UserStore = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "LOGIN":
                return { ...state, token: action.payload.token };
            case "USER_DETAIL":
                return {
                    ...state,
                    id: action.payload.user_data.id,
                    username: action.payload.user_data.username,
                    first_name: action.payload.user_data.first_name,
                    last_name: action.payload.user_data.last_name,
                };
            case "LOGOUT":
                return { ...initialState };
            default:
                return state;
        }
    }, initialState);

    useEffect(() => {
        const checkUserFirstLogin = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("UserToken");
                if (storedToken) {
                    await AsyncStorage.setItem("UserToken", storedToken);
                    dispatch({ type: "LOGIN", payload: { token: storedToken } });
                }
            } catch (error) {
                console.error("Token check error:", error);
            }
        };

        checkUserFirstLogin();
    }, []);
      
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children || <></>}
        </UserContext.Provider>
    );
};
