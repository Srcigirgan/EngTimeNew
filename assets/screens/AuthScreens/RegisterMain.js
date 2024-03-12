import { View, Text, Dimensions, TouchableOpacity,Image   } from 'react-native'
import React from 'react'
import Colors from '../../Colors';
const RegisterMain = (props) => {
  
  const { width, height } = Dimensions.get('window');
  
  return (
    <View style={{backgroundColor:'#fff', flex:1, justifyContent:'space-between'}} >
    <View style={{backgroundColor:Colors.mainYellow, width:width*3, height:width*3, position:'absolute', bottom:height/3.5, borderRadius:1000, alignSelf:'center', overflow:'hidden' }} >
    <Image
      style={{ width:width/3, height:height/1.5, alignSelf:'center',marginTop:10, position:'absolute', bottom:0, right:width+20,}}
      source={require('../../kuleYellow.png')}
                resizeMode='contain'
            />
 
    </View>
    <Image
      style={{ width:width/1.3, height:140, alignSelf:'center',marginTop:140,}}
      source={require('../../logoSiyah.png')}
                resizeMode='contain'
            />
<View>
<TouchableOpacity  onPress={()=>props.navigation.navigate('GirisYap')} style={{backgroundColor:Colors.mainYellow, borderRadius:20, marginHorizontal:40,paddingVertical:8, alignItems:'center', justifyContent:'center', marginBottom:30}} >
  <Text style={{fontFamily:'Lato-Bold', color:'#000', fontSize:18}} >GİRİŞ YAP</Text>
</TouchableOpacity>
{/* <TouchableOpacity  onPress={()=>props.navigation.navigate('KayitOl')} style={{backgroundColor:Colors.mainYellow, borderRadius:20, marginHorizontal:40,paddingVertical:8, alignItems:'center', justifyContent:'center', marginBottom:30}} >
  <Text style={{fontFamily:'Lato-Bold', color:'#000', fontSize:18}} >KAYIT OL</Text>
</TouchableOpacity> */}
</View>      
    </View>
  )
}

export default RegisterMain