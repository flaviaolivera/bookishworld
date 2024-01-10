import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Book } from '../interfaces/Book';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

// Componente que muestra una lista de libros y permite la navegación a sus detalles o agregar uno nuevo.
const HomeScreen = () => {
  const [books, setBooks] = useState<Book[]>([]); // Usando la interfaz Book para el estado
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const fetchBooks = async () => {
    try {
      let response = await fetch('http://10.0.2.2:3000/books');
      let json = await response.json();
      setBooks(json);
    } catch (error) {
      console.error(error);
    }
  };
  
  // Efecto para cargar los libros inicialmente
  useFocusEffect(
    React.useCallback(() => {
      fetchBooks(); // Llama a fetchBooks cada vez que la pantalla gana foco
    }, [])
  );

  const renderItem = ({item}: {item: Book}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}
      >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* Botón para navegar a la pantalla de agregar un nuevo libro. */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddNewBook')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
// Estilos del contenedor principal
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
// Estilos para cada elemento de la lista de libros
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
// Estilos para el botón de agregar un nuevo libro
  addButton: {
    position: 'absolute', 
    right: 30, 
    bottom: 30, 
    backgroundColor: 'green', 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5, 
    shadowOpacity: 0.3, 
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
  },
  addButtonText: {
    color: 'white', 
    fontSize: 30, 
    fontWeight: 'bold',
  },
});

export default HomeScreen;
