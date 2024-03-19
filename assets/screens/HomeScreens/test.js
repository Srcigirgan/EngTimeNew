import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [inputValue, setInputValue] = useState('');

  const handleSaveData = async () => {
    try {
      await AsyncStorage.setItem('savedWord', inputValue);
      Alert.alert('Success', 'Word saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save word!');
    }
  };

  const handleGetData = async () => {
    try {
      const value = await AsyncStorage.getItem('savedWord');
      if (value !== null) {
        Alert.alert('Success', `Saved word is: ${value}`);
      } else {
        Alert.alert('Error', 'No word found!');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      Alert.alert('Error', 'Failed to retrieve word!');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Enter a word"
        onChangeText={(text) => setInputValue(text)}
        value={inputValue}
        style={{ marginBottom: 10, borderWidth: 1, padding: 5, width: 200 }}
      />
      <Button title="Save Word" onPress={handleSaveData} />
      <Button title="Get Word" onPress={handleGetData} />
    </View>
  );
}
