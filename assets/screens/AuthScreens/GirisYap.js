import { View, Text, Dimensions, TouchableOpacity, Button,Image,TextInput} from 'react-native'
import React, { useContext, useState } from 'react'

import Colors from '../../Colors';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {login, user_detail} from '../../../api/login';
import { UserContext } from '../../../context/user';

import AsyncStorage from '@react-native-async-storage/async-storage';

const GirisYap = (props) => {
  const [state, dispatch] = useContext(UserContext)
  const handleTextInputChange = (newText) => {
    setText(newText);
  };
  const handleTextInputChange2 = (newText2) => {
    setText2(newText2);
  };

  const [isChecked, setIsChecked] = useState(false);
  const { width, height } = Dimensions.get('window');
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');

  const onSubmit = async () => {
    console.log("yükleme ekranı başladı")

    userData = {username : text, password : text2}

    try {
      const response = await login(userData)
      if(response?.status == 200 || response?.status == 201 ){
        await AsyncStorage.setItem('userToken', response.data.token);

        dispatch({ type: 'LOGIN', payload: { token: response.data.token } }); // Dispatch with correct payload
        const userResponse = await fetch(`http://161.97.97.61:8000/api/user/${text}/`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${response.data.token}`
          }
        }
      );
        const user_data = await userResponse.json();
        console.log("user_data : ",user_data.data)
        // const user_data = await fetch(`http://api/user/${text}`, { headers: { Authorization: `Token ${response.data.token}` } })
        dispatch({ type: 'USER_DETAIL', payload: { user_data: user_data.data } }); // Dispatch with correct payload

        props.navigation.navigate('MainScreen')
      }
    } catch (error) {
        console.log(error)

    } finally {
      console.log("yükleme ekranı bitti")
    }


  }
  return (
    <View style={{ backgroundColor: Colors.mainYellow, flex: 1, justifyContent: 'space-between' }} >
      <Image
        style={{ width: width / 1.3, height: 140, alignSelf: 'center', marginTop: 40, }}
        source={require('../../logoSiyah.png')}
        resizeMode="contain"
      />
      <View style={{ height: height / 1.7, backgroundColor: '#fff', borderTopLeftRadius: 70, justifyContent:'center', alignItems:'center' }} >
     
      <TextInput
        placeholder="TC Kimlik No"
        value={text}
        mode='outlined'
        outlineColor={Colors.mainYellow}
        theme={{ colors: { primary: 'black', text: '#000', background:'white'}}}
        keyboardType='numeric'
        onChangeText={handleTextInputChange}
        style={{ width:width/1.2, margin:10}}
      />
       <TextInput
        placeholder="Şifre"
        value={text2}
        mode='outlined'
        outlineColor={Colors.mainYellow}
        secureTextEntry={true}
        theme={{ colors: { primary: 'black', text: '#000', background:'white'}}}

        onChangeText={handleTextInputChange2}
        style={{ width:width/1.2, margin:10}}
      />
   <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',width:width/1.2, marginTop:20}} >
    <BouncyCheckbox
        label="Beni Hatırla"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <TouchableOpacity style={{}} >
        <Text style={{fontFamily:'Lato-Bold', color:'#a8a8a8', fontSize:13}} >Şifremi Unuttum</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity  onPress={()=> onSubmit() } style={{backgroundColor:Colors.mainYellow, borderRadius:20, paddingVertical:8, alignItems:'center', justifyContent:'center', width:width/1.2, marginTop:20  }} >
        <Text style={{fontFamily:'Lato-Bold', color:'#000', fontSize:18}} >GİRİŞ YAP</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=>props.navigation.navigate('KayitOl')} style={{marginTop:20, flexDirection:'row'}} >


      </TouchableOpacity>
      </View>
    </View>
  )
}

export default GirisYap