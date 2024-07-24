import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";//import toast from 'react-hot-toast';



const baseURL = "https://yazilimsrc.com/";

const instance = axios.create({
    baseURL,
});


instance.interceptors.request.use( async (config) => {

    try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
    } catch (error) {
        console.error("Error retrieving token:", error);
    }

    return config;
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            // Handle unauthorized access, for example, redirect the user to the login page
            AsyncStorage.removeItem("UserToken");
            // Example of redirecting in a React Native environment
            // You may need to adjust this depending on your navigation setup
            // props.navigation.navigate('Login'); // Uncomment if using navigation props
        }
        try {
            const message = error?.response?.data?.message;
       
        } catch (e) {
           
        }
        return error;
    }
);

const fetcher = (url) => instance.get(url).then((res) => res.data);

export { instance, fetcher };