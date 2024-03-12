import React from 'react';
import MainTabScreen from './assets/screens/MainTabScreen';
import { LogBox } from "react-native"
import {UserStore} from "./context/user";

LogBox.ignoreAllLogs(true)
const App = () => {
  return (
    <UserStore> 
      <MainTabScreen />
    </UserStore>);
};

export default App;
