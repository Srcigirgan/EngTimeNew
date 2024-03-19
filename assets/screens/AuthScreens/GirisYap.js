import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import LottieView from 'lottie-react-native'; // Lottie ekledik
import Colors from '../../Colors';
import { login } from '../../../api/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../context/user';

const GirisYap = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [isChecked, setIsChecked] = useState(false);
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [loading, setLoading] = useState(false); // Yükleme durumu için state ekledik
  const { width, height } = Dimensions.get('window');

  const handleTextInputChange = (newText) => {
    setText(newText);
  };

  const handleTextInputChange2 = (newText2) => {
    setText2(newText2);
  };

  const onSubmit = async () => {
    setLoading(true); // Giriş işlemi başladığında yükleme durumunu true olarak ayarlayın

    console.log("Giriş işlemi başladı.");

    userData = { username: text, password: text2 };

    try {
      const response = await login(userData);
      console.log("Login API çağrısı tamamlandı.", response);

      if (response?.status == 200 || response?.status == 201) {
        await AsyncStorage.setItem('userToken', response.data.token);
        console.log("AsyncStorage.setItem tamamlandı.");

        dispatch({ type: 'LOGIN', payload: { token: response.data.token } }); // Dispatch with correct payload
        console.log("UserContext'e dispatch yapıldı.");

        const userResponse = await fetch(`http://161.97.97.61:8000/api/user/${text}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${response.data.token}`,
          },
        });
        console.log("Kullanıcı bilgilerini almak için API çağrısı yapıldı.", userResponse);

        const user_data = await userResponse.json();
        console.log("Kullanıcı bilgileri alındı.", user_data);

        dispatch({ type: 'USER_DETAIL', payload: { user_data: user_data.data } }); // Dispatch with correct payload
        console.log("UserContext'e kullanıcı bilgileri dispatch yapıldı.");

        props.navigation.navigate('AnaSayfa');
        console.log("AnaSayfa'ya yönlendirildi.");
      }
    } catch (error) {
      console.log("Hata oluştu:", error);
    } finally {
      setLoading(false); // Giriş işlemi tamamlandığında yükleme durumunu false olarak ayarlayın
      console.log("Giriş işlemi tamamlandı.");
    }
  };

  return (
    <View style={{ backgroundColor: Colors.mainYellow, flex: 1, justifyContent: 'space-between' }}>
      <Image
        style={{ width: width / 1.3, height: 140, alignSelf: 'center', marginTop: 40 }}
        source={require('../../logoSiyah.png')}
        resizeMode="contain"
      />
      <View style={{ height: height / 1.7, backgroundColor: '#fff', borderTopLeftRadius: 70, justifyContent: 'center', alignItems: 'center' }}>
        <TextInput
          placeholder="Kullanıcı Adı"
          value={text}
          onChangeText={handleTextInputChange}
          style={{ width: width / 1.2, margin: 10, borderColor:'#000', borderWidth:1, borderRadius:12 }}
        />
        <TextInput
          placeholder="Şifre"
          value={text2}
          mode="outlined"
          outlineColor={Colors.mainYellow}
          secureTextEntry={true}
          theme={{ colors: { primary: 'black', text: '#000', background: 'white' } }}
          onChangeText={handleTextInputChange2}
          style={{ width: width / 1.2, margin: 10, borderColor:'#000', borderWidth:1, borderRadius:12 }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width / 1.2, marginTop: 20 }}>
          
        </View>
        <TouchableOpacity onPress={() => onSubmit()} style={{ backgroundColor: Colors.mainYellow, borderRadius: 20, paddingVertical: 8, alignItems: 'center', justifyContent: 'center', width: width / 1.2, marginTop: 20 }}>
          <Text style={{ fontFamily: 'Lato-Bold', color: '#000', fontSize: 18 }}>GİRİŞ YAP</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('KayitOl')} style={{ marginTop: 20, flexDirection: 'row' }}></TouchableOpacity>
      </View>

      {loading && ( // loading true ise Lottie animasyonunu göster
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <LottieView
            source={require('../../loading.json')}
            autoPlay={true}
            loop={true}
            style={{ 
              width: 200,
              height: 200,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default GirisYap;
