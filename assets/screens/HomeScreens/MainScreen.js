import React, { useState,useEffect } from 'react';
import { View, Text, Image, Dimensions,  StyleSheet, TouchableOpacity, FlatList,SafeAreaView, ScrollView,StatusBar, ImageBackground,Modal} from 'react-native';
import Colors from '../../Colors';
import LottieView from 'lottie-react-native'; // Lottie ekledik

const MainScreen = (props) => {
  const { width, height } = Dimensions.get('window');
const TestDataDuyurular = [
  {id:1, title:'7 Ekim günü yapılacak ABC yayınları deneme sınavı kayıt başlamıştır. Değerli öğrenciler lütfen kaydınızı Sınav Kayıt sekmesinden yapınız.', from:'Mustafa Bey'},
  {id:2, title:'eğerli öğrenciler lütfen kaydınızı Sınav Kayıt sekmesinden yapınız.', from:'Ali Bey'},
  {id:3, title:'7 Ekimştır. Değerli öğrenciler lütfen kaydınızı Sınav pınız.', from:'Salih Bey'}

];
const [duyuruIndex, setDuyuruIndex] = useState(0);
const nextDuyuru = () => {
  if (duyuruIndex < TestDataDuyurular.length - 1) {
    setDuyuruIndex(duyuruIndex + 1);
  }
};

const prevDuyuru = () => {
  if (duyuruIndex > 0) {
    setDuyuruIndex(duyuruIndex - 1);
  }
};

 

  return (
    <SafeAreaView style={{ flex: 1}}>
     <View style={{backgroundColor:Colors.mainYellow, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:10}} >
   
     <Image
      style={{ width:width/2, height:85, alignSelf:'center',marginTop:10}}
      source={require('../../logoSiyah.png')}
                resizeMode='contain'
            />
           </View>
           <View style={{marginTop:20,margin:10, backgroundColor:'#fff', paddingBottom:10, borderTopLeftRadius:25, borderBottomRightRadius:25,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderWidth:1,
    borderColor:'#ddd'}} >
     
     <View style={{justifyContent:'space-between',flexDirection:'row', alignItems:'center' }} >
      <Text style={{fontFamily:'Lato-Bold', color:'#000', marginLeft:10, marginTop:10, fontSize:24}} >Duyurular</Text>
     <View style={{flexDirection:'row'}} >
      <TouchableOpacity onPress={prevDuyuru} style={{margin:5, backgroundColor:'coral'}} >

      </TouchableOpacity>
      <TouchableOpacity onPress={nextDuyuru} style={{margin:5, backgroundColor:'blue'}} >

      </TouchableOpacity>
      </View>
            </View>
            <View >
            <View style={{flexDirection:'row', marginLeft:10, marginTop:10}} >
           <View style={{backgroundColor:Colors.mainYellow, borderRadius:50, alignSelf:'flex-start', padding:5}} >
            <Image
                style={{ width: 20, height: 20}}
                source={require('../../logoSiyah.png')}
                resizeMode='contain'
            />
            </View>
            <Text style={{alignSelf:'center', color:'#000',marginLeft:5, fontFamily:'Lato-Bold', fontSize:16 }} >{TestDataDuyurular[duyuruIndex].from}</Text>

            </View>
            <Text style={{alignSelf:'center', color:'#000',marginLeft:5, fontFamily:'Lato-Medium', fontSize:12, marginTop:5}} >{TestDataDuyurular[duyuruIndex].title}</Text>

            </View>
      </View>
          
     <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}} >
      <TouchableOpacity  onPress={()=>props.navigation.navigate('YoklamaMain')} style={{backgroundColor:Colors.mainYellow,   elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    paddingVertical:8, alignSelf:'center', alignItems:'center', width:width/2.5, height:width/2.5, justifyContent:'center', borderRadius:25, marginTop:20}} >
 <Image
      style={{ width:width/4.1, height:width/4.1, alignSelf:'center',marginTop:10}}
      source={require('../../checklist.png')}
                resizeMode='contain'
            />
        <Text style={{fontFamily:'Lato-Black',fontSize:16, color:'#000', marginTop:10 }} >YOKLAMA AL</Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={()=>props.navigation.navigate('Notlarim')} style={{backgroundColor:Colors.mainYellow,paddingVertical:8,  elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf:'center', alignItems:'center', width:width/2.5, height:width/2.5, justifyContent:'center', borderRadius:25, marginTop:20}} >
 <Image
      style={{ width:width/4.1, height:width/4.1, alignSelf:'center',marginTop:10}}
      source={require('../../post-it.png')}
                resizeMode='contain'
            />
        <Text style={{fontFamily:'Lato-Black',fontSize:16, color:'#000', marginTop:10}} >NOTLARIM</Text>
      </TouchableOpacity>
      
     
      </View>
      <TouchableOpacity  onPress={()=>props.navigation.navigate('test')} style={{backgroundColor:Colors.mainYellow,paddingVertical:8,  elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf:'center', alignItems:'center', width:width/2.5, height:width/2.5, justifyContent:'center', borderRadius:25, marginTop:20}} >
 <Image
      style={{ width:width/4.1, height:width/4.1, alignSelf:'center',marginTop:10}}
      source={require('../../post-it.png')}
                resizeMode='contain'
            />
        <Text style={{fontFamily:'Lato-Black',fontSize:16, color:'#000', marginTop:10}} >TEST</Text>
      </TouchableOpacity>
     
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  
});


export default MainScreen;
