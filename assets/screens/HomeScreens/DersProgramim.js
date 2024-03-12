import React, { useState, useRef, useEffect,useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,ScrollView, SafeAreaView } from 'react-native';
import Colors from '../../Colors';
import {teacher_schedule} from '../../../api/schedule';
import { UserContext } from '../../../context/user';

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
    <TouchableOpacity onPress={()=>{ props.navigation.navigate("YoklamaDetay", { id: item?.id })}} style={[
      { backgroundColor: isUpcomingLesson(item.start_time,item.finis_time) ? Colors.mainYellow : '#fff' },
      { flexDirection: 'row', alignItems: 'center', flex: 1, margin: 5, borderRadius: 12, borderColor: '#ddd', borderWidth: 1, justifyContent: 'space-between' }
    ]}>
      <Text style={{ padding: 15, fontFamily:'Lato-Medium', fontSize:16}}>{item?.start_time} - {item?.finis_time}</Text>
      <Text style={{ padding: 15, fontFamily:'Lato-Bold', fontSize:18}}>{item?.lesson?.name}</Text>
      <Text style={{ padding: 15, fontFamily:'Lato-Bold', fontSize:18}}>{item?.class_fk?.name}</Text>
    </TouchableOpacity>
  );
  


  return (
    <SafeAreaView style={{marginTop:10}} >
      <TouchableOpacity style={{padding:10}} onPress={() => props.navigation.goBack()} >
     {/* <FontAwesomeIcon icon={faAngleLeft} style={{color:'#000'}} size={20} /> */}
</TouchableOpacity>
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
    data={teacherSchedules[selected]}
    renderItem={renderItem} 
    keyExtractor={(item, index) => index.toString()}
    extraData={ongoingOrUpcomingRef}
    onRefresh={() => {ongoingOrUpcomingRef.current = false; setRerender(!render)}}    
    refreshing={false}
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
