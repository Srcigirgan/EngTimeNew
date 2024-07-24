import { View, Text, Dimensions, TouchableOpacity, Button,TextInput,CheckBox,Image} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Colors';
const KayitOl = (props) => {
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

  return (
    <View style={{ backgroundColor: Colors.mainYellow, flex: 1, justifyContent: 'space-between' }} >
      <Image
        style={{ width: width / 1.3, height: 140, alignSelf: 'center', marginTop: 40, }}
        source={require('../../logoSiyah.png')}
        resizeMode='contain'
      />
      <View style={{ height: height / 1.7, backgroundColor: '#fff', borderTopLeftRadius: 70, justifyContent:'center', alignItems:'center' }} >
     
      <TextInput
        label="TC Kimlik NoSilll"
        value={text}
        keyboardType='numeric'
        onChangeText={handleTextInputChange}
        style={{ width:width/1.2, margin:10, }}
      />
       <TextInput
        label="Şifre"
        value={text2}
        secureTextEntry={true}

        onChangeText={handleTextInputChange2}
        style={{ width:width/1.2, margin:10, }}
      />
       <TextInput
        label="Şifre Tekrar"
        value={text2}
        mode='outlined'
        outlineColor={Colors.mainYellow}
        secureTextEntry={true}
        theme={{ colors: { primary: 'black', text: '#000', background:'white'}}}

        onChangeText={handleTextInputChange2}
        style={{ width:width/1.2, margin:10, }}
      />
  
      <TouchableOpacity  onPress={()=>props.navigation.navigate('MainScreen')} style={{backgroundColor:Colors.mainYellow, borderRadius:20, paddingVertical:8, alignItems:'center', justifyContent:'center', width:width/1.2, marginTop:20  }} >
  <Text style={{fontFamily:'Lato-Bold', color:'#000', fontSize:18}} >KAYIT OL</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=> props.navigation.navigate('GirisYap')} style={{marginTop:20, flexDirection:'row'}} >
        <Text style={{fontFamily:'Lato-Bold', color:'#a8a8a8', fontSize:13,}} >Zaten bir hesabın var mı? </Text>
        <Text style={{fontFamily:'Lato-Bold', color:'#000', fontSize:13,}} > GİRİŞ YAP</Text>

      </TouchableOpacity>
      </View>
    </View>
  )
}

export default KayitOl