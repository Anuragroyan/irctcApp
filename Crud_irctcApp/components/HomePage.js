import React from 'react';
import { View, Text, LogBox, Image } from 'react-native';

LogBox.ignoreAllLogs();
export default homePage = (props) => {
     return(
       <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
           <Image source={require('./image/download.jpeg')} 
        style={{width: 400, height:400}} />
         <Text style={{fontSize: 30, marginBottom:76}}>Welcome to Booking Ticket Service for Our customer</Text>
         <Text onPress={()=>{props.navigation.navigate("Booking Tickets")}}>Go to AddTicket page for booking</Text>
       </View>
     );
   }