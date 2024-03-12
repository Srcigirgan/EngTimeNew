import React, { useState,useEffect } from 'react';
import { View, Text, Image, Dimensions,  StyleSheet, TouchableOpacity, FlatList,SafeAreaView, ScrollView,StatusBar } from 'react-native';
import Colors from '../../Colors';
const Profil = (props) => {
  const { width, height } = Dimensions.get('window');
 
   const Alan = ['Matematik'] 
   const No = ['123123'] 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:'#fff'}}>
      <View style={{ backgroundColor:Colors.mainYellow}} >
     
      <Image
            style={{ width:width/2, height:85, alignSelf:'center',marginTop:10}}
            source={require('../../logoSiyah.png')}
            resizeMode='contain'
            />
      <View style={{width:width/2.8, height:width/2.8, backgroundColor:'#000', borderRadius:100, alignSelf:'center', marginTop:10, justifyContent:'center', alignItems:'center'}} >  
      <Image
            style={{ width:width/3, height:width/3, alignSelf:'center', borderRadius:100}}
            source={require('../../src.png')}
            resizeMode='contain'
            />
      </View>
      <Text style={{fontFamily:'Lato-Bold', fontSize:20, color:'#000', alignSelf:'center', marginBottom:20, marginTop:10}} >Salih Rafi ÇIĞIRGAN</Text>

      </View  >
      <View style={{ backgroundColor:'#fff'}} >
      <View style={{flexDirection:'row', marginTop:20, alignItems:'center'}} >
      
      </View>
      <View style={{flexDirection:'row', marginTop:10, alignItems:'center'}} >
      <View style={{width:12, height:55, backgroundColor:Colors.mainYellow}} ></View>
      <Text style={{fontFamily:'Lato-Bold', color:'#000', fontSize:22, marginLeft:10}} >No:</Text>
      <Text style={{fontFamily:'Lato-Medium', color:'gray', fontSize:22, marginLeft:10}} >{No}</Text>

      </View>

<TouchableOpacity onPress={()=>props.navigation.navigate('DersProgramim')} style={{backgroundColor:Colors.mainYellow, marginTop:20, alignSelf:'flex-start', paddingVertical:5, paddingHorizontal:25, justifyContent:'center', alignItems:'center', borderTopRightRadius:12, borderBottomRightRadius:12}} >
      <Text style={{fontFamily:'Lato-Bold', color:'#000', fontSize:20}} >Ders Programım</Text>
</TouchableOpacity>
<TouchableOpacity style={{backgroundColor:Colors.mainYellow, marginTop:20, alignSelf:'flex-start', paddingVertical:5, paddingHorizontal:25, justifyContent:'center', alignItems:'center', borderTopRightRadius:12, borderBottomRightRadius:12}} >
      <Text style={{fontFamily:'Lato-Bold', color:'#000', fontSize:20}} >Geçmiş Yoklamalar</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => props.navigation.navigate('Auth')} style={{backgroundColor:'red', marginTop:20, alignSelf:'flex-start', paddingVertical:5, paddingHorizontal:25, justifyContent:'center', alignItems:'center', borderTopRightRadius:12, borderBottomRightRadius:12}} >
      <Text style={{fontFamily:'Lato-Bold', color:'#fff', fontSize:20}} >Çıkış Yap</Text>
</TouchableOpacity>

</View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
 
});


export default Profil;