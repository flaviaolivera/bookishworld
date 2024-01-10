import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import BookDetailsScreen from './components/BookDetailsScreen';
import AddNewBookScreen from './components/AddNewBookScreen';

export type RootStackParamList = {
  Home: undefined;
  BookDetails: { bookId: string }; // Se espera un parámetro 'bookId' para BookDetails
  AddNewBook: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
        <Stack.Screen name="AddNewBook" component={AddNewBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
