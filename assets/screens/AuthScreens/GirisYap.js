import { View, Text, Dimensions, TouchableOpacity, Button,Image,TextInput} from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Colors';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const GirisYap = (props) => {
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
          placeholder="TC Kimlik No"
          value={text}
          keyboardType='numeric'
          onChangeText={handleTextInputChange}
          style={{width: width / 1.2, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10}}
        />
        <TextInput
          placeholder="Şifre"
          value={text2}
          secureTextEntry={true}
          onChangeText={handleTextInputChange2}
          style={{width: width / 1.2, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10}}
        />
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',width:width/1.2, marginTop:20}} >
         <View style={{flexDirection:'row', alignItems:'center'}} >
          <BouncyCheckbox
              checked={isChecked}
              fillColor='#000'

              onChange={() => setIsChecked(!isChecked)}
          />
                    <Text style={{fontFamily:'Lato-Medium', color:'#000', fontSize:14}} >Beni Hatırla</Text>
</View>
          <TouchableOpacity style={{}} >
            <Text style={{fontFamily:'Lato-Bold', color:'#a8a8a8', fontSize:13}} >Şifremi Unuttum</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity  onPress={()=>props.navigation.navigate('MainScreen')} style={{backgroundColor:Colors.mainYellow, borderRadius:20, paddingVertical:8, alignItems:'center', justifyContent:'center', width:width/1.2, marginTop:20  }} >
          <Text style={{fontFamily:'Lato-Bold', color:'#000', fontSize:18}} >GİRİŞ YAP</Text>
        </TouchableOpacity>
       
      </View>
    </View>
  )
}

export default GirisYap
