import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Ekranlarımızı içeri aktaralım
import MainScreen from './HomeScreens/MainScreen';
import NasilOynanir from './HomeScreens/NasilOynanir';
import GameOptions from './HomeScreens/GameOptions';
import Game from './HomeScreens/Game';
import Hakkinda from './HomeScreens/Hakkinda';
import DersProgramim from './HomeScreens/DersProgramim';
import Profil from './HomeScreens/Profil';
import YoklamaDetay from './HomeScreens/YoklamaDetay';
import YoklamaMain from './HomeScreens/YoklamaMain';
import Notlarim from './HomeScreens/Notlarim';

import GirisYap from './AuthScreens/GirisYap';
import KayitOl from './AuthScreens/KayitOl';
import RegisterMain from './AuthScreens/RegisterMain';
import test from './HomeScreens/test'
import GecmisYoklama from './HomeScreens/GecmisYoklama';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Iconları içeri aktar
const anaSayfaIcon = require('../home-2.png');
const anaSayfaIconFocused = require('../home.png');
const profilIcon = require('../user.png');
const profilIconFocused = require('../user-2.png');




const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GirisYap" component={GirisYap} /> 
    {/* <Stack.Screen name="KayitOl" component={KayitOl} />
    <Stack.Screen name="RegisterMain" component={RegisterMain} /> */}
  </Stack.Navigator>
);
const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainScreen" component={MainScreen} />
    <Stack.Screen name="YoklamaMain" component={YoklamaMain} />
    <Stack.Screen name="YoklamaDetay" component={YoklamaDetay} />
    <Stack.Screen name="test" component={test} />
    <Stack.Screen name="Notlarim" component={Notlarim} />



  </Stack.Navigator>
);

const ProfilStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profil" component={Profil} />
    <Stack.Screen name="DersProgramim" component={DersProgramim} />
    <Stack.Screen name="GecmisYoklama" component={GecmisYoklama} />

  </Stack.Navigator>
);

const MainTabScreen = () => (
  <NavigationContainer>
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel:false}} >
    <Tab.Screen
        options={({ focused }) => ({
          tabBarLabel: 'Auth',
         
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        })}
        name="Auth"
        component={AuthStack}
      />
      <Tab.Screen
        options={({ focused }) => ({
          tabBarLabel: 'AnaSayfa',
          tabBarIcon: () => (
            <Image
              source={focused ? anaSayfaIconFocused : anaSayfaIcon}
              style={{ width: 25, height: 25 }}
            />
          ),
        })}
        name="AnaSayfa"
        component={MainStack}
      />
     
      <Tab.Screen
        options={({ focused }) => ({
          
          tabBarLabel: 'Auth',
          tabBarIcon: () => (
            <Image
              source={focused ? profilIconFocused : profilIcon}
              style={{ width: 25, height: 25 }}
            />
          ),
        })}
        name="ProfilStack"
        component={ProfilStack}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default MainTabScreen;


