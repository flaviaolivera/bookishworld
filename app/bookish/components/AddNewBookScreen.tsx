import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; 
import { useNavigation } from '@react-navigation/native';

type AddNewBookNavigationProp = StackNavigationProp<RootStackParamList, 'AddNewBook'>;


const AddNewBookScreen: React.FC = () => {
  const navigation = useNavigation<AddNewBookNavigationProp>();
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: ''
  });

  const handleAddBook = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        console.error('Error al añadir el libro');
      }
    } catch (error) {
      console.error('Error al guardar el nuevo libro:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={newBook.title}
        onChangeText={(text) => setNewBook({ ...newBook, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        value={newBook.author}
        onChangeText={(text) => setNewBook({ ...newBook, author: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={newBook.description}
        onChangeText={(text) => setNewBook({ ...newBook, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Año de publicación"
        value={newBook.publishedYear}
        onChangeText={(text) => setNewBook({ ...newBook, publishedYear: text })}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddBook}>
        <Text style={styles.buttonText}>AÑADIR LIBRO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9', 
      padding: 20,
    },
    input: {
      backgroundColor: '#ffffff', 
      borderWidth: 1,
      borderColor: '#e8e8e8', 
      borderRadius: 8, 
      paddingVertical: 12,
      paddingHorizontal: 15,
      fontSize: 16,
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#43766C',
      borderRadius: 25, 
      paddingVertical: 14,
      paddingHorizontal: 20,
      marginTop: 20, 
      shadowOpacity: 0.1, 
      shadowRadius: 8,
      shadowColor: '#0000',
      shadowOffset: { height: 2, width: 0 },
      elevation: 4,
    },
    buttonText: {
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '500', 
    },
  });

export default AddNewBookScreen;
