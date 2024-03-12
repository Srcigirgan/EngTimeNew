import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,ScrollView, SafeAreaView,Image,Dimensions } from 'react-native';
import Colors from '../../Colors';

const App = () => {
  const today = new Date().getDay();
  const initialSelected = (today + 6) % 7; // Pazar için 6, Pazartesi için 0, Salı için 1... değerlerini elde ederiz.
  const [selected, setSelected] = useState(initialSelected);
  const todayIndex = (new Date().getDay() + 6) % 7;  // Bugünün indeksini al
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    ongoingOrUpcomingRef.current = false;
  });

   
  const scrollViewRef = useRef(null); //bulunan güne kayması scroll

  useEffect(() => {
    // Her bir butonun genişliği ve arasındaki boşluğun toplamını hesaplayarak doğru pozisyona kaydırma
    const position = selected * (80);
    scrollViewRef.current.scrollTo({ x: position, animated: true });
  }, [selected]);

  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };
  const ongoingOrUpcomingRef = useRef(false);

  const isUpcomingLesson = (lessonTime) => {
    if (ongoingOrUpcomingRef.current || selected !== todayIndex) {
      // Eğer bir ders zaten yeşil renkte gösterildiyse veya seçili gün bugün değilse yeşil gösterme
      return false;
    }
  
    const [start, end] = lessonTime.split('-').map(t => t.trim());
    const currentTime = getCurrentTime();
  
    const isOngoing = currentTime >= start && currentTime <= end;
    const isUpcoming = currentTime < start;
  
    if (isOngoing || isUpcoming) {
      ongoingOrUpcomingRef.current = true;
      return true;
    }
  
    return false;
  };
  

  const dataSets = [
    [{ClassName:'14-A',LessonName:'Speaking', Time:'08:00 - 09:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'10:00 - 11:20' },
    {ClassName:'12-B',LessonName:'Reading', Time:'13:00 - 14:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'17:00 - 18:00' }, ], //pazartesi
   
   
    [{ClassName:'14-A',LessonName:'Speaking', Time:'08:00 - 09:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'10:00 - 11:20' },
    {ClassName:'12-B',LessonName:'Reading', Time:'13:00 - 14:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'17:00 - 18:00' }, ], //Salı
   
   
    [{ClassName:'14-A',LessonName:'Speaking', Time:'08:00 - 09:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'10:00 - 11:20' },
    {ClassName:'12-B',LessonName:'Reading', Time:'13:00 - 14:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'17:00 - 18:00' },  ], //çrş
   
   
    [{ClassName:'14-A',LessonName:'Speaking', Time:'08:00 - 09:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'10:00 - 11:20' },
    {ClassName:'12-B',LessonName:'Reading', Time:'13:00 - 14:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'17:00 - 18:00' },  ], //prş
   
   
    [{ClassName:'14-A',LessonName:'Speaking', Time:'08:00 - 09:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'10:00 - 11:20' },
    {ClassName:'12-B',LessonName:'Reading', Time:'13:00 - 14:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'17:00 - 18:00' },  ], //cuma
    
    
    [{ClassName:'14-A',LessonName:'Speaking', Time:'08:00 - 09:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'10:00 - 11:20' },
    {ClassName:'12-B',LessonName:'Reading', Time:'13:00 - 14:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'15:00 - 16:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'17:00 - 18:00' },  ], //cmt
   
   
    [{ClassName:'14-A',LessonName:'Speaking', Time:'08:00 - 09:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'10:00 - 11:20' },
    {ClassName:'12-B',LessonName:'Reading', Time:'13:00 - 14:45' },
    {ClassName:'12-B',LessonName:'Reading', Time:'17:00 - 18:00' },  ], //cumartesi
   
   

   


  ];

  const buttons = [
    { label: 'Pazartesi', index: 0 },
    { label: 'Salı', index: 1},
    { label: 'Çarşamba', index: 2 },
    { label: 'Perşembe', index: 3},
    { label: 'Cuma', index: 4 },
    { label: 'Cumartesi', index: 5 },
    { label: 'Pazar', index: 6 },



  ];

  const renderItem = ({ item }) => (
    <View style={[
      { backgroundColor: isUpcomingLesson(item.Time) ? Colors.mainYellow: '#fff' },
      { flexDirection: 'row', alignItems: 'center', flex: 1, margin: 5, borderRadius: 12, borderColor: '#ddd', borderWidth: 1, justifyContent: 'space-between' }
    ]}>
      <Text style={{ padding: 15, fontFamily:'Lato-Medium', fontSize:16}}>{item.Time}</Text>
      <Text style={{ padding: 15, fontFamily:'Lato-Bold', fontSize:18}}>{item.LessonName}</Text>
      <Text style={{ padding: 15, fontFamily:'Lato-Bold', fontSize:18}}>{item.ClassName}</Text>
    </View>
  );
  


  return (
    <SafeAreaView style={{marginTop:10}} >
     <Image
        style={{ width: width / 1.3, height: height, position:'absolute', right:0 }}
        source={require('../../kuleGray.png')}
        resizeMode='contain'
      />
      <ScrollView horizontal={true} 
       ref={scrollViewRef} 
      >
        {buttons.map((button, index) => (
         <TouchableOpacity
            key={index}
            onPress={() => setSelected(button.index)}
            style={[
              styles.button,
              selected === button.index && styles.selectedButton,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selected === button.index && styles.selectedButtonText,
              ]}
            >
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
    data={dataSets[selected]}
    renderItem={renderItem} 
    keyExtractor={(item, index) => index.toString()}
    extraData={ongoingOrUpcomingRef}
    onRefresh={() => ongoingOrUpcomingRef.current = false}    refreshing={false}
  />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  
  button: {
    padding: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ddd',
alignSelf:'flex-start'
  },
  selectedButton: {
    backgroundColor: Colors.mainYellow,
  },
  buttonText: {
    color: 'black',
  },
  selectedButtonText: {
    color: '#000',
  },

});

export default App;
