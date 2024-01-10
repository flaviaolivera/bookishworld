import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import  {RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Book } from '../interfaces/Book';

// Definiciones de tipos para props de navegación y parámetros de ruta
type BookDetailsScreenRouteProp = RouteProp<RootStackParamList, 'BookDetails'>;
type BookDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BookDetails'
>;

// Componente de pantalla para mostrar los detalles de un libro individual
const BookDetailsScreen = ({
  route,
  navigation,
}: {
  route: BookDetailsScreenRouteProp;
  navigation: BookDetailsScreenNavigationProp;
}) => {
  const {bookId} = route.params;
  const [book, setBook] = useState<Book | null>(null);

  const fetchBookDetails = async () => {
    try {
      let response = await fetch(`http://10.0.2.2:3000/books/${bookId}`);
      let data = await response.json();
      setBook(data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
        fetchBookDetails(); // Llama a fetchBooksDetails cada vez que la pantalla gana foco
    }, [bookId])
  );

  if (!book) {
    return <Text style={styles.loading}>Loading...</Text>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  // Función para manejar la eliminación del libro
  const handleDelete = async () => {
    Alert.alert(
      'Eliminar Libro',
      '¿Estás seguro de que quieres eliminar este libro?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetch(`http://10.0.2.2:3000/books/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                  },
              });
              navigation.goBack();
            } catch (error) {
              console.error('Error al eliminar el libro:', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Autor: {book.author}</Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={() => navigation.navigate('EditBook', {bookId: book.id})}>
        <Text style={styles.buttonText}>EDITAR</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDelete}>
        <Text style={styles.buttonText}>ELIMINAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {height: 2, width: 0},
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 18,
  },
  editButton: {
    backgroundColor: '#3468C0',
  },
  deleteButton: {
    backgroundColor: '#B80000',
  },
});

export default BookDetailsScreen;
