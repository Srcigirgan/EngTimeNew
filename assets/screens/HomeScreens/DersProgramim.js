import React, { useState, useRef, useEffect,useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,ScrollView, SafeAreaView, Dimensions,Image} from 'react-native';
import Colors from '../../Colors';
import {teacher_schedule} from '../../../api/schedule';
import { UserContext } from '../../../context/user';

const { width, height } = Dimensions.get('window');

const App = (props) => {
  const [state, dispatch] = useContext(UserContext)
  const today = new Date().getDay();
  const initialSelected = (today + 6) % 7; // Pazar için 6, Pazartesi için 0, Salı için 1... değerlerini elde ederiz.
  const [selected, setSelected] = useState(initialSelected);
  const todayIndex = (new Date().getDay() + 6) % 7;  // Bugünün indeksini al

  //öğretmen için tutulan ders programı listesi
  const [teacherSchedules, setTeacherSchedules] = useState([[],[],[],[],[],[],[] ]);
  const [render, setRerender] = useState(false);

  useEffect(() => {
    ongoingOrUpcomingRef.current = false;
  });

   
  const scrollViewRef = useRef(null); //bulunan güne kayması scroll

  useEffect(() => {
    // Her bir butonun genişliği ve arasındaki boşluğun toplamını hesaplayarak doğru pozisyona kaydırma
    const position = selected * (80);
    scrollViewRef.current.scrollTo({ x: position, animated: true });
  }, [selected]);


  useEffect(() => {
      fetchTeacherSchedules();
  }, [render]);

  const fetchTeacherSchedules = async () => {
    try {
      const response = await teacher_schedule(state?.id);
      setTeacherSchedules(response?.data?.schedules);
    } catch (error) {
      console.error('Error fetching teacher_schedule:', error);
    }
  };



  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };
  const ongoingOrUpcomingRef = useRef(false);

  const isUpcomingLesson = (startTime, finishTime) => {
    if (ongoingOrUpcomingRef.current || selected !== todayIndex) {
      // Eğer bir ders zaten yeşil renkte gösterildiyse veya seçili gün bugün değilse yeşil gösterme
      return false;
    }
  
    const currentTime = getCurrentTime();
  
    const [start, end] = [startTime, finishTime].map(t => t.trim());
    const isOngoing = currentTime >= start && currentTime <= end;
    const isUpcoming = currentTime < start;
  
    if (isOngoing || isUpcoming) {
      ongoingOrUpcomingRef.current = true;
      return true;
    }
  
    return false;
  };
  
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
    <TouchableOpacity onPress={()=>{ props.navigation.navigate("YoklamaDetay", { id: item?.id, lesson: item?.lesson?.name, class_name: item?.class_fk?.name })}} style={[
      { backgroundColor: isUpcomingLesson(item.start_time,item.finis_time) ? Colors.mainYellow : '#fff' },
      { flexDirection: 'row',  margin: 5, borderRadius: 12, borderColor: '#ddd', borderWidth: 1, justifyContent: 'space-between',width:width/1.1 }
    ]}>
      <Text style={{ padding: 15, fontFamily:'Lato-Medium', fontSize:16}}>{item?.start_time.slice(0, -3)} - {item?.finis_time.slice(0, -3)}</Text>
      <Text style={{ padding: 15, fontFamily:'Lato-Bold', fontSize:18}}>{item?.lesson?.name}</Text>
      <Text style={{ padding: 15, fontFamily:'Lato-Bold', fontSize:18}}>{item?.class_fk?.name}</Text>
    </TouchableOpacity>
  );
  


  return (
    <SafeAreaView style={{marginTop:10, flex:1, justifyContent:'flex-start', alignItems:'flex-start'}} >
      
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{padding:10, backgroundColor:'red', position:'absolute', bottom:20, alignSelf:'center', zIndex:999, borderRadius:8}} >
          <Text style={{fontFamily:'Lato-Bold', fontSize:18, color:'#fff'}} >GERİ DÖN</Text>
          </TouchableOpacity> 
<Image
        style={styles.backgroundImage}
        source={require('../../kuleGray.png')}
        resizeMode='contain'
      />
      <ScrollView  horizontal={true} 
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
            <Text style={styles.buttonText}>
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
    data={teacherSchedules[selected]}
    renderItem={renderItem} 
    keyExtractor={(item, index) => index.toString()}
    extraData={ongoingOrUpcomingRef}
    onRefresh={() => {ongoingOrUpcomingRef.current = false; setRerender(!render)}}    
    refreshing={false}
    style={{marginTop:10, alignSelf:'center'}}
  />
  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  backgroundImage: {
    width: width / 2,
    height: height / 1.1,
    alignSelf: 'center',
    marginTop: 10,
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
  
  button: {
    padding: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#ddd',
  
  },
  selectedButton: {
    backgroundColor: Colors.mainYellow,
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000',
    fontFamily:'Lato-Bold',
  },
  selectedButtonText: {
    color: '#000',
    fontFamily:'Lato-Bold'
  },

});

export default App;
