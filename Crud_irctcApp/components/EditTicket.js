import React, {useEffect, useState} from 'react';
import { View, Text, LogBox, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'Ticket.db'})
LogBox.ignoreAllLogs();

export default EditTicket = (props) => {
  const route=useRoute();
  // console.log(route.params.data);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [noofticket, setNoofticket] = useState('');
  const updateTicket = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE table_ticket set name=?, email=?, address=?, noofticket=? where id=?',
        [name, email, address, noofticket],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if(results.rowsAffected > 0){
            Alert.alert('Success', 'Ticket data updated successfully',
            [
              {
                text: 'OK',
                onPress: () =>  props.navigation.navigate("Booking Tickets")
              },
             ],
             {cancelable: false},
            );
          } else Alert('Updation Failed');
        }
      )
    });
  };
  // useEffect(() => {
  //  setName(route.params.data.name);
  //  setEmail(route.params.data.email);
  //  setAddress(route.params.data.address);
  //  setNoofticket(route.params.data.noofticket);
  // }, []);

     return(
       <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
         <Text style={{fontSize: 30, marginTop:-186}}>EditTickets</Text>
         <TextInput 
           placeholder="Enter name"
           style={styles.input}
           value={name}
           onchangeText={txt => setName(txt)}
         />
         <TextInput
          placeholder="Enter email"
          value={email}
          onchangeText={txt => setEmail(txt)}
          style={[styles.input, {marginTop: 20}]}
         />
         <TextInput
          placeholder="Enter address"
          value={address}
          onchangeText={txt => setAddress(txt)}
          style={[styles.input, {marginTop: 20}]}
         />
         <TextInput
          placeholder="Enter tickets"
          value={noofticket}
          onchangeText={txt => setNoofticket(txt)}
          style={[styles.input, {marginTop: 20}]} 
         />
         <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            updateTicket();
          }}>
            <Text style={styles.btnText}>Save Ticket</Text>
          </TouchableOpacity>   
         <Text style={{marginTop: 23}} onPress={()=>{props.navigation.navigate("Display Tickets")}}>Go to Display for Tickets Info</Text>
       </View>
     );
   };

   const styles = StyleSheet.create({
     input: {
      width: '80%',
      height: 50,
      borderRadius: 10,
      borderWidth: 0.3,
      alignSelf: 'center',
      paddingLeft: 20,
      marginTop: 100
     },
     addBtn: {
       backgroundColor:'purple',
       width: '80%',
       height: 50,
       borderRadius: 10,
       justifyContent:'center',
       alignItems:'center',
       marginTop: 30,
       alignSelf:'center',
     },
     btnText: {
      color: '#fff',
      fontSize: 18,
     },
   });