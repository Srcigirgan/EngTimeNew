import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import {rollcall_detail,rollcall_multiple} from '../../../api/rollcall';
import { UserContext } from '../../../context/user';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const App = (props) => {
   
    const [className, setClassName] = useState('A-2')
    const [students, setStudents] = useState([]);
    const [state, dispatch] = useContext(UserContext);
    const { token, id, username, first_name, last_name } = state;

    useEffect(() => {
        fetchRollCallDetail();
    }, []);
  
    const fetchRollCallDetail = async () => {
      try {
        const response = await rollcall_detail(props?.route?.params?.id);
        const data = await response?.data;
        const updatedStudents = data.students.map(student => ({
            ...student,
            status: false
          }));
        setStudents(updatedStudents);
      } catch (error) {
        console.error('Error fetching teacher_schedule:', error);
      }
    };

   
    const handleCheckboxChange = (index) => {
        const newStudents = [...students];
        newStudents[index].status = !newStudents[index].status;
        setStudents(newStudents);
    };

    const handleSend = () => {
        const selectedStudents = students.filter(student => student.status);
        console.log('selectedStudents', selectedStudents);
        console.log('selectedStudents.length', students);
        if (selectedStudents && selectedStudents.length > 0) {
            var rollcall_last_list = []
            console.log('selectedStudents', selectedStudents);
            for (let i = 0; i < selectedStudents.length; i++) {
                rollcall_last_list[i] ={
                    schedule : props?.route?.params?.id, 
                    user : selectedStudents[i].id, 
                    date: new Date().toISOString().slice(0, 10),
                    status : true}
            }

            rollcall_multiple({list: rollcall_last_list});

        } else {
            console.log('Sınıf Mevcudu Tam');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, margin:10}}>
            <TouchableOpacity style={{padding:10}} onPress={() => props.navigation.goBack()} >
</TouchableOpacity>
        <Text style={{fontFamily:'Lato-Black', fontSize:32, color:'#000', alignSelf:'center'}} > {props?.route?.params?.class_name} </Text>
            <Text style={{fontFamily:'Lato-Black', fontSize:32, color:'#000', alignSelf:'center'}} > {props?.route?.params?.lesson} </Text>
            <Text style={{fontFamily:'Lato-Bold', fontSize:18, color:'#a8a8a8',  alignSelf:'center' ,marginBottom:10}} > {new Date().toISOString().slice(0, 10)} </Text>

            <FlatList
                data={students}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <BouncyCheckbox
                            checked={item.status}
                            onPress={() => {handleCheckboxChange(index);}}
                        />

                        <Text>
                            {item.first_name + ' ' + item.last_name + ' / ' + item.username}
                        </Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
            
            <TouchableOpacity style={{backgroundColor:'green', borderRadius:8, paddingVertical:4, paddingHorizontal:12, alignSelf:'center'}} onPress={handleSend} >
                <Text style={{fontSize:22, fontFamily:'Lato-Bold', color:'#fff'}} >Yoklamayı Gönder</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default App;
