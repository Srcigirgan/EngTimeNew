import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Dimensions,Image } from 'react-native'
import React from 'react'
import Colors from '../../Colors';
const YoklamaMain = (props) => {
  const { width, height } = Dimensions.get('window');

    const DataSiniflar = [
        {id:1, SinifAdi:'A-1', ClassType:0},
        {id:2, SinifAdi:'B-1', ClassType:1},
        {id:3, SinifAdi:'C-1', ClassType:2},
        {id:4, SinifAdi:'C-2', ClassType:2},
        {id:5, SinifAdi:'B-2', ClassType:1},
        {id:6, SinifAdi:'A-2', ClassType:0},
        {id:7, SinifAdi:'A-3', ClassType:0},
        {id:8, SinifAdi:'C-3', ClassType:2},
        {id:9, SinifAdi:'C-4', ClassType:2},
        {id:10, SinifAdi:'C-5', ClassType:2},

       
    ];
   

    const SiniflarRender = ({item}) =>(
        <TouchableOpacity onPress={()=>props.navigation.navigate('YoklamaDetay')} style={{borderWidth:1, borderColor:'#ddd', marginTop:5, backgroundColor:'#a8a8a8', paddingVertical:3, width:300, justifyContent:'center', alignItems:'center', borderRadius:12}}  >
<Text style={{fontFamily:'Lato-Medium', fontSize:18, color:'#fff'}} >{item.SinifAdi}</Text>
        </TouchableOpacity>
    );
    

    return (
    <SafeAreaView style={{flex:1}} >
      <View style={{backgroundColor:Colors.mainYellow, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:10}} >
    <TouchableOpacity style={{position:'absolute', left:10, padding:10}} onPress={() => props.navigation.goBack()} >
    <Image
      style={{ width:30, height:30, alignSelf:'center'}}
      source={require('../../back.png')}
                resizeMode='contain'
            />
</TouchableOpacity>
     <Image
      style={{ width:width/2, height:85, alignSelf:'center',marginTop:10}}
      source={require('../../logoSiyah.png')}
                resizeMode='contain'
            />
           </View>
<Text style={{fontFamily:'Lato-Black', fontSize:22, color:'#000', alignSelf:'center',marginTop:20}} >A Sınıfları</Text>
        <FlatList
      data={DataSiniflar.filter(item => item.ClassType === 0)}
        renderItem={SiniflarRender}
        keyExtractor={item => item.id.toString()}
        key={1}
        style={{alignSelf:'center'}}
        />
        <Text style={{fontFamily:'Lato-Black', fontSize:22, color:'#000', marginTop:20, alignSelf:'center'}} >B Sınıfları</Text>

        <FlatList
      data={DataSiniflar.filter(item => item.ClassType === 1)}
        renderItem={SiniflarRender}
        keyExtractor={item => item.id.toString()}
        key={2}
        style={{alignSelf:'center'}}

        />
        <Text style={{fontFamily:'Lato-Black', fontSize:22, color:'#000', marginTop:10, alignSelf:'center'}} >C Sınıfları</Text>

        <FlatList
       data={DataSiniflar.filter(item => item.ClassType === 2)}
        renderItem={SiniflarRender}
        keyExtractor={item => item.id.toString()}
        key={3}
        style={{alignSelf:'center'}}

        />
    
    </SafeAreaView>
  );
    }

export default YoklamaMain