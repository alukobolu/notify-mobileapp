// import React,{ useContext,useState } from "react";
// import {View,Text,TouchableOpacity,FlatList,} from "react-native";
// import { Context } from "../Global/context";
// import GlobalStyle from "../Global/style";
// import axios from 'axios';



// const   Contact = ({ navigation,route }) => {
//     const stylepage = GlobalStyle
//     function Page() {
//         const renderItem = ({ item }) => (
//             <View style={stylepage.event}>
//                 <View style={stylepage.eventlist}>
//                    <Text style={{fontSize:18,fontWeight:'600',}}>{item.title}</Text>
//                    <Text>App: {item.app}</Text>
//                    <Text>Time: {item.time}</Text>
//                 </View>
//             </View>
//         )
//         return (
//             <FlatList
//                 data={eventsList}
//                 keyExtractor={item => `${item.id}`}
//                 renderItem={renderItem}
//             />
//         )
//     }

//     return (
//         <View style={stylepage.container}>
//             <Text> con </Text>
//             {/* <View   style={stylepage.eventContainer}>
//             {Page()}
//             </View> */}
//         </View>
//     )
// }


// export default Contact;