import React, { useContext } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '../../Colors';
import { UserContext } from '../../../context/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profil = (props) => {
  const { width, height } = Dimensions.get('window');
  const [state, dispatch] = useContext(UserContext);
  const { first_name, last_name, username } = state;

  const handleLogout = async () => {
    // Oturum bilgilerini AsyncStorage'den temizle
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userName');

    // Kullanıcı bağlamını temizle
    dispatch({ type: 'LOGOUT' });

    // Auth sayfasına yönlendir
    props.navigation.navigate('Auth');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ backgroundColor: Colors.mainYellow }}>
        <Image
          style={{ width: width / 2, height: 85, alignSelf: 'center', marginTop: 10 }}
          source={require('../../logoSiyah.png')}
          resizeMode='contain'
        />
        <View style={{ width: width / 2.8, height: width / 2.8, backgroundColor: '#fff', borderRadius: 100, alignSelf: 'center', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: width / 4, height: width / 4, alignSelf: 'center' }}
            source={require('../../logoSiyah.png')}
            resizeMode='contain'
          />
        </View>
        <Text style={{ fontFamily: 'Lato-Bold', fontSize: 20, color: '#000', alignSelf: 'center', marginBottom: 20, marginTop: 10 }}> {first_name + " " + last_name} </Text>
      </View>
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}></View>
        <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <View style={{ width: 12, height: 55, backgroundColor: Colors.mainYellow }}></View>
          <Text style={{ fontFamily: 'Lato-Bold', color: '#000', fontSize: 22, marginLeft: 10 }}> Kullanıcı Adı:</Text>
          <Text style={{ fontFamily: 'Lato-Medium', color: 'gray', fontSize: 22, marginLeft: 10 }}>{username}</Text>
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('DersProgramim')} style={styles.button}>
          <Text style={styles.buttonText}>Ders Programım</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('GecmisYoklama')} style={styles.button}>
          <Text style={styles.buttonText}>Geçmiş Yoklamalar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={[styles.button, { backgroundColor: 'red' }]}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Çıkış Yap</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.mainYellow,
    marginTop: 20,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12
  },
  buttonText: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    color: '#000'
  }
});

export default Profil;
