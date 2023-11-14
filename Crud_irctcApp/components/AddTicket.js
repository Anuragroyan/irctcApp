import React, {useState, useEffect} from 'react';
import { View, Text, LogBox, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'Ticket.db'});

LogBox.ignoreAllLogs();
export default AddTicket = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [noofticket, setNoofticket] = useState('');
  const saveData = () => {
    console.log(name, email, address, noofticket);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_ticket (name, email, address, noofticket) VALUES (?,?,?,?)',
        [name, email, address, noofticket],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => props.navigation.navigate("Booking Tickets"),
                },
              ],
              { cancelable: false }
            );
          } else Alert('Registration Failed');
        },
        error => {
          console.log(error);
        }
      );
    });
  };
  useEffect(()=>{
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_ticket'",
        [],
        function (txn, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_ticket', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_ticket(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(200), address VARCHAR(255), noofticket VARCHAR(255))',
              []
            );
          }
          else{
            console.log('already created table');
          }
        }
      );
    });
  },{});

     return(
       <View style={styles.container}>
         <TextInput placeholder="Enter User Name" 
            style={styles.input} value={name} onChangeText={txt=>setName(txt)} />
         <TextInput placeholder="Enter User Email" 
            style={styles.input} value={email} onChangeText={txt=>setEmail(txt)} />
         <TextInput placeholder="Enter User Location" 
            style={styles.input} value={address} onChangeText={txt=>setAddress(txt)} />
         <TextInput placeholder="Enter no of tickets" 
            style={styles.input} value={noofticket} onChangeText={txt=>setNoofticket(txt)} />  
         <TouchableOpacity style={styles.addBtn} onPress={()=>{saveData();}}>
          <Text style={styles.btnText}>Save Ticket</Text>
         </TouchableOpacity>     
         <Text style={{marginLeft: 85}}onPress={()=>{props.navigation.navigate("Editing Tickets")}}>Go to EditTicket page for booking details</Text>
       </View>
     );
  };

  const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    input: {
      width:'80%',
      height: 50,
      borderRadius: 10,
      borderWidth: 0.3,
      alignSelf: 'center',
      paddingLeft: 20,
      marginTop: 50,
    },
    addBtn: {
      backgroundColor:'purple',
      width: '80%',
      height: 50,
      borderRadius: 10,
      justifyContent:'center',
      marginTop: 30,
      alignSelf: 'center',
      marginBottom: 44,
    },
    btnText: {
      color: '#fff',
      fontSize: 18,
      marginLeft: 105,
    }
  })