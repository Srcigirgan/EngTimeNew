import React, { useState } from 'react';
import { View, FlatList, Text, Button, TouchableOpacity, Alert,} from 'react-native';
import Colors from '../../Colors';
import BouncyCheckbox from "react-native-bouncy-checkbox";
const App = () => {
   
    const [className, setClassName] = useState('12-A')

   
   
    const [students, setStudents] = useState([
        { id: '1',  name: 'Ahmet Yılmaz', checked: false },
        { id: '2',  name: 'Mehmet Öztürk', checked: false },
        { id: '3',  name: 'Emre Kaya', checked: false },
        { id: '4',  name: 'Büşra Demir', checked: false },
        { id: '5',  name: 'Selin Akın', checked: false },
        { id: '6',  name: 'Barış Can', checked: false },
        { id: '7',  name: 'Kübra Genç', checked: false },
        { id: '8',  name: 'Ege Karadağ', checked: false },
        { id: '9',  name: 'Bora Erdem', checked: false },
        { id: '10', name: 'Melis Alp', checked: false },
        { id: '11', name: 'Sarp Ünlü', checked: false },
        { id: '12', name: 'İrem Altun', checked: false },
        { id: '13', name: 'Fırat Yavuz', checked: false },
        { id: '14', name: 'Elif Polat', checked: false },
        { id: '15', name: 'Gökhan Tan', checked: false },
        { id: '16', name: 'Merve Aydın', checked: false },
        { id: '17', name: 'Oğuzhan Kılıç', checked: false },
        { id: '18', name: 'Derya Koç', checked: false },
        { id: '19', name: 'Tolga Sarı', checked: false },
        { id: '20', name: 'Ayşe Tekin', checked: false },
        { id: '21', name: 'Burak Duman', checked: false },
        { id: '22', name: 'Zeynep Ceylan', checked: false }

    ]);

    const handleCheckboxChange = (index) => {
        const newStudents = [...students];
        newStudents[index].checked = !newStudents[index].checked;
        setStudents(newStudents);
    };

    const handleSend = () => {
        const selectedStudents = students.filter(student => student.checked).map(student => student.name);
        if (selectedStudents && selectedStudents.length > 0) {
            console.log('Olmayan Öğrenciler:', selectedStudents);
        } else {
            console.log('Sınıf Mevcudu Tam');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{fontFamily:'Lato-Black', fontSize:22, color:Colors.main}} >{className}</Text>
            <FlatList
    data={students}
    renderItem={({ item, index }) => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <BouncyCheckbox
                isChecked={item.checked}
                onPress={() => handleCheckboxChange(index)}
            />
            <Text style={{ marginLeft: 10 }}>{item.name}</Text>
        </View>
    )}
    keyExtractor={(item) => item.id}
/>
            
            <TouchableOpacity style={{backgroundColor:'green', borderRadius:8, paddingVertical:4, paddingHorizontal:12, alignSelf:'center'}} onPress={handleSend} >
                <Text style={{fontSize:22, fontFamily:'Lato-Bold', color:'#fff'}} >Yoklamayı Gönder</Text>
            </TouchableOpacity>
        </View>
    );
};

export default App;
