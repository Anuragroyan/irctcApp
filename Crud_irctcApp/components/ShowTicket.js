import { View, Text, StyleSheet, TouchableOpacity, 
     FlatList, Alert, Image, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';  
import { openDatabase} from 'react-native-sqlite-storage';
let db = openDatabase({name: 'Ticket.db'});   
LogBox.ignoreAllLogs();

export default ShowTicket = (props) => {
    const isFocused = useIsFocused();
    const [ticketList, setTicketList] = useState([]); 
    useEffect(() => {
     getData();
    },[isFocused]);
    const getData = () => {
     db.transaction(tx =>{
          tx.executeSql('SELECT * FROM table_ticket', [], (tx, results) =>{
               var temp=[];
               for(let i=0;i<results.rows.length; i++){
                  temp.push(results.rows.item(i));
                  setTicketList(temp);  
               }
          });
     });
    };
    let deleteTickets = id => {
     db.transaction(tx => {
          tx.executeSql(
               'DELETE FROM table_ticket where id=?',
                [id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if(results.rowsAffected > 0){
                         Alert.alert(
                             'Success',
                             'tickets deleted successfully',
                             [
                               {
                                   text: 'Ok',
                                   onPress: () => {
                                        getData();
                                   },
                               },
                             ],
                             { cancelable: false}, 
                         );
                    }
                    else { Alert('Please insert a valid user id');
                  }
                },
          );
     });
    };
   return(
     <View style={StyleSheet.container}>
        <FlatList
          data={ticketList}
          renderItem={({ item, index}) =>{
            return(
               <TouchableOpacity style={styles.ticketItem}>
                    <Text style={styles.itemText}>{'Name: ' + item.name}</Text>
                    <Text style={styles.itemText}>{'Email: ' + item.email}</Text>
                    <Text style={styles.itemText}>{'Address: ' + item.address}</Text>
                    <Text style={styles.itemText}>{'NoofTickets: ' + item.noofticket}</Text>
                    <View style={styles.belowView}>
                         <TouchableOpacity 
                           onPress={()=>{
                              props.navigation.navigate('Editing Tickets', {
                                   data: {
                                      name: item.name,
                                      email: item.email,
                                      address: item.address,
                                      nooftickets: item.noofticket,
                                      id: item.id,
                                   },
                              });
                           }}>
                              <Image 
                                source={require('./image/edit.png')}
                                style={styles.icons}
                              />  
                           </TouchableOpacity>
                           <TouchableOpacity
                             onPress={()=>{
                                deleteTickets(item.id);
                             }}>
                              <Image
                                source={require('./image/delete.png')}
                                style={styles.icons}
                              />  
                             </TouchableOpacity>
                    </View>
               </TouchableOpacity>
            );
          }}
          />
          <TouchableOpacity
            style={styles.addNewBtn}
            onPress={()=>{
               props.navigation.navigate("Booking Tickets");
            }}>
               <Text style={styles.btnText}>Book Tickets</Text>
            </TouchableOpacity>
     </View>
   );
};

const styles = StyleSheet.create({
     container: {
       flex: 1,
     },
     addNewBtn: {
       backgroundColor: 'purple',
       width: 150,
       height: 50,
       borderRadius: 20,
       position: 'relative',
       bottom: -10,
       right: -20,
       justifyContent: 'center',
       alignItems: 'center',
     },
     btnText: {
       color: '#fff',
       fontSize: 18,
     },
     userItem: {
       width: '100%',
       backgroundColor: '#fff',
       padding: 10,
     },
     itemText: {
       fontSize: 20,
       fontWeight: '600',
       color: '#000',
       marginLeft: 23,
       padding: 5,
     },
     belowView: {
       flexDirection: 'row',
       width: '100%',
       alignItems: 'center',
       justifyContent: 'space-evenly',
       marginTop: 20,
       backgroundColor: '#f2f2f2',
       borderRadius: 10,
       height: 50,
     },
     icons: {
       width: 24,
       height: 24,
     },
   });