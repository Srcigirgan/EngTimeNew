import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import LottieView from 'lottie-react-native'; // LottieView ekledik
import { rollcall_detail, rollcall_multiple } from '../../../api/rollcall';
import BouncyCheckbox from "react-native-bouncy-checkbox";


const App = (props) => {
    const [className, setClassName] = useState('A-2');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true); // loading state'i ekledik

    useEffect(() => {
        fetchRollCallDetail();
    }, []);

    const fetchRollCallDetail = async () => {
        try {
            const response = await rollcall_detail(props?.route?.params?.id);
            const data = await response?.data;
            const updatedStudents = data.students.map((student) => ({
                ...student,
                status: false,
            }));
            setStudents(updatedStudents);
        } catch (error) {
            console.error('Error fetching teacher_schedule:', error);
        } finally {
            setLoading(false); // İsteğin sonunda loading durumunu false olarak güncelliyoruz
        }
    };

    const handleCheckboxChange = (index) => {
        const newStudents = [...students];
        newStudents[index].status = !newStudents[index].status;
        setStudents(newStudents);
    };

    const handleSend = async () => {
        try {
            const selectedStudents = students.filter((student) => student.status);
            if (selectedStudents && selectedStudents.length > 0) {
                var rollcall_last_list = [];
                for (let i = 0; i < selectedStudents.length; i++) {
                    rollcall_last_list[i] = {
                        schedule: props?.route?.params?.id,
                        user: selectedStudents[i].id,
                        date: new Date().toISOString().slice(0, 10),
                        status: true,
                    };
                }
                await rollcall_multiple({ list: rollcall_last_list });
                showAlert("Yoklama başarıyla gönderildi");
            } else {
                showAlert("Sınıf mevcudu tam");
            }
        } catch (error) {
            console.error('Error sending roll call:', error);
            showAlert("Bir sorun oluştu, tekrar deneyin");
        }
    };
    
    const showAlert = (message) => {
        Alert.alert(
            "",
            message,
            [
                {
                    text: "Tamam",
                    onPress: () => console.log("Alert closed"),
                },
            ],
            { cancelable: false }
        );
    };
    

    return (
        <SafeAreaView style={{ flex: 1, margin: 10 }}>
            {loading ? ( // loading durumuna göre içeriği değiştiriyoruz
                 <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                 <LottieView
               source={require('../../loading.json')}
               autoPlay={true}
               loop={true}
               style={{ 
                 width: 200,
                 height: 200,
               }}
             />
               </View>
            ) : (
                <>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => props.navigation.goBack()}></TouchableOpacity>
                    <Text style={{ fontFamily: 'Lato-Black', fontSize: 32, color: '#000', alignSelf: 'center' }}>{props?.route?.params?.class_name}</Text>
                    <Text style={{ fontFamily: 'Lato-Black', fontSize: 32, color: '#000', alignSelf: 'center' }}>{props?.route?.params?.lesson}</Text>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 18, color: '#a8a8a8', alignSelf: 'center', marginBottom: 10 }}>{new Date().toISOString().slice(0, 10)}</Text>
                    <Text style={{ fontFamily: 'Lato-Bold', fontSize: 16, color: '#000', alignSelf: 'center', marginBottom: 10, textAlign:'center' }}>Lütfen aşağıda listelenen öğrencilerden sınıfta olmayanları işaretleyip "Yoklamayı Gönder" butonuna dokunun</Text>

                    <FlatList
                        data={students}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <BouncyCheckbox  textStyle={{fontSize:18, color:'#000', fontFamily:'Lato-Bold'}} fillColor="red" text={item.first_name + ' ' + item.last_name} checked={item.status} onPress={() => { handleCheckboxChange(index); }} />
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        style={{marginTop:20}}
                    />

                    <TouchableOpacity style={{ backgroundColor: 'green', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 12, alignSelf: 'center' }} onPress={handleSend}>
                        <Text style={{ fontSize: 22, fontFamily: 'Lato-Bold', color: '#fff' }}>Yoklamayı Gönder</Text>
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    );
};

export default App;
