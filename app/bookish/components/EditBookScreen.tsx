import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type EditBookScreenRouteProp = RouteProp<RootStackParamList, 'EditBook'>;

const EditBookScreen = () => {
  const route = useRoute<EditBookScreenRouteProp>();
  const navigation = useNavigation();
  const [book, setBook] = useState({
    id: route.params.bookId,
    title: '',
    author: '',
    description: '',
    publishedYear: ''
  });

  useEffect(() => {

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3000/books/${route.params.bookId}`);
        const bookData = await response.json();
        setBook(bookData);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [route.params.bookId]);

  const handleSave = async () => {
    try {
      // Implementa la lógica para guardar los cambios del libro
      const response = await fetch(`http://10.0.2.2:3000/books/${book.id}`, {
        method: 'PUT', // Usar el método PUT para actualizar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        console.log('Libro actualizado con éxito');
        navigation.goBack();
      } else {
        console.error('Error al actualizar el libro');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={book.title}
        onChangeText={(newTitle) => setBook({ ...book, title: newTitle })}
      />
      <Text style={styles.label}>Autoría</Text>
      <TextInput
        style={styles.input}
        value={book.author}
        onChangeText={(newAuthor) => setBook({ ...book, author: newAuthor })}
      />
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        value={book.description}
        onChangeText={(newDescription) => setBook({ ...book, description: newDescription })}
      />
      <Text style={styles.label}>Año de publicación</Text>
      <TextInput
        style={styles.input}
        value={String(book.publishedYear)}
        keyboardType="numeric"
        onChangeText={(newYear) => setBook({ ...book, publishedYear: newYear })}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>GUARDAR CAMBIOS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    padding: 20,
  },
  input: {
    backgroundColor: '#F0F0F0', 
    borderWidth: 0, 
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333333', 
    fontWeight: 'bold', 
  },
  button: {
    marginTop: 20,
    backgroundColor: '#43766C', 
    paddingVertical: 15,
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EditBookScreen;
