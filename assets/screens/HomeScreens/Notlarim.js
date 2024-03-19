import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Colors';
const trashIcon = require('../../trash-can.png');
const {width, height} = Dimensions.get('window')   ;


const TodoApp = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('@todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.log('Error loading todos', error);
    }
  };

  const saveTodos = async newTodos => {
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(newTodos));
    } catch (error) {
      console.log('Error saving todos', error);
    }
  };

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now().toString(),
        text: inputValue,
        text2:inputValue2,
        date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' }),
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setInputValue('');
      setModalVisible(false);
    }
  };

  const deleteTodo = async id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const renderItem = ({ item }) => (
  

<View style={{margin:10}} >
<View style={{borderTopRightRadius:width/30, borderTopLeftRadius:width/30,backgroundColor:Colors.mainYellow, width:width/2.5, paddingVertical:8,justifyContent:'center', alignItems:'center' }} >
<Text style={{fontSize:width/30, fontFamily:'Lato-Bold', color:'#000'}} >{item.text}</Text>
      </View>
      <View style={{borderBottomRightRadius:width/30, borderBottomLeftRadius:width/30,backgroundColor:'#ddd', width:width/2.5, paddingBottom:20,  alignItems:'center', paddingHorizontal:8 }} >
        
<Text style={{fontSize:width/25, fontFamily:'Lato-Bold', color:'#000', marginTop:10}} >{item.text2}</Text>
<View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between',width:width/3, marginTop:10}} >
    <Text style={{fontFamily:'Lato-Bold', fontSize:width/30, color:'#000'}} >{item.date}</Text>
<TouchableOpacity style={{ padding:10}} onPress={() => deleteTodo(item.id)}>
        <Image source={trashIcon} style={styles.trashIcon} />
      </TouchableOpacity>
      </View>
      </View>
      </View>
  );

  return (
    <View style={styles.container}>
         <Image
      style={{ width:width/2, height:height/1.1, alignSelf:'center',marginTop:10, position:'absolute', right:20, bottom:0}}
      source={require('../../kuleGray.png')}
                resizeMode='contain'
            />
          <View style={{backgroundColor:Colors.mainYellow, flexDirection:'row', alignItems:'center', justifyContent:'center', paddingVertical:10}} >
   
   <Image
    style={{ width:width/2, height:85, alignSelf:'center',marginTop:10}}
    source={require('../../logoSiyah.png')}
              resizeMode='contain'
          />
         </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
<Text style={{fontFamily:'Lato-Bold', fontSize:width/20, color:'#000'}} >Lütfen Not başlığınızı ekleyiniz</Text>
            <TextInput
              style={styles.input}
              placeholder="Başlık Giriniz.."
              onChangeText={text => setInputValue(text)}
              value={inputValue}
            />
            <Text style={{fontFamily:'Lato-Bold', fontSize:width/20, color:'#000'}} >Lütfen içerk giriniz..</Text>
            <TextInput
              style={styles.input}
              placeholder="Başlık Giriniz.."
              onChangeText={text2 => setInputValue2(text2)}
              value={inputValue2}
              multiline={true}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={addTodo}
            >
              <Text style={styles.buttonText}>Add Todo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
     
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        style={{alignSelf:'center', marginTop:20}}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{backgroundColor:'#000', borderRadius:10, width:width/1.1, paddingVertical:5, alignSelf:'center', justifyContent:'center',alignItems:'center', marginBottom:20}} >
        <Text style={{fontFamily:'Lato-Black', color:'#fff', fontSize:width/20}} >NOT EKLE</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:999
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    width:width/1.2,
    paddingVertical:30
  },
  input: {
    width: '80%',
    marginTop:10,
    marginBottom:10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
  trashIcon: {
    width: 15,
    height: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'red',
  },
});

export default TodoApp;
