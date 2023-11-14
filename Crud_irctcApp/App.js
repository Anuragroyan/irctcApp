import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import AddTicket from './components/AddTicket';
import EditTicket from './components/EditTicket';
import ShowTicket from './components/ShowTicket';

const Stack = createNativeStackNavigator();
export default App = () => {
  return(
     <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleStyle:{fontSize: 25}, headerTitleAlign:'center'}}>
        <Stack.Screen  name='HomePage' component={HomePage} />
        <Stack.Screen  name='Booking Tickets' component={AddTicket}/>
        <Stack.Screen  name='Editing Tickets' component={EditTicket}/>
        <Stack.Screen  name='Display Tickets' component={ShowTicket}/>
      </Stack.Navigator>
     </NavigationContainer>
  );
}