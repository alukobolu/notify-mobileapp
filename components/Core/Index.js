import 'react-native-gesture-handler';
import React,{ useContext,useState } from "react";
import {Image,TouchableOpacity} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import Home from './Home';
import Contact from './Contact';
import Notifications from './Notifications';
import { Context } from "../Global/context";
import axios from 'axios';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function TabStack(navigation) {
    const icon = require("../../assets/icon.png");
    const globalContext = useContext(Context);
    const {  notificationList, setNotificationList,domain,authToken } = globalContext; 

    function refresh_notifications(){

        let headers = {
            "Authorization": "Token " + authToken, //Your API key goes in here
        }
        axios.get(`${domain}/notification/get/`,{headers: headers})
        .then(function (response) {
            // handle success
            console.log("___________________________")
            setNotificationList(response.data)
            console.log(notificationList)
        })
        .catch(function (error) {
            // handle error
            console.log(error.message);
        });
    }
    return (
        <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
            activeTintColor: "blue",
            inactiveTintColor: "black",
            style: {
            backgroundColor: "white",
            },
            labelStyle: {
            textAlign: 'center',
            },
            indicatorStyle: {
            borderBottomColor: "blue",
            borderBottomWidth: 2,
            },
        }}>
            
        {/* <Tab.Screen
            name="Contacts"
            component={Contact}
            options={{
            tabBarLabel: 'Contact',
            tabBarIcon: ({ focused }) => (
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? "blue" : "black"
                    }}
                />
            )
            }}
            // initialParams={{ itemId: itemId }}
            /> */}
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                tabBarLabel: 'Home',  
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? "blue" : "black"
                        }}
                    />
                ),      
                }} 
                // initialParams={{ itemId: itemId }}
            />
            <Tab.Screen
            name="Notification"
            component={Notifications}
            options={{
                tabBarLabel: 'Notification',
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={icon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? "blue" : "black"
                        }}
                    />
                ),
                headerRight: () => (
                    <TouchableOpacity  onPress={()=> refresh_notifications()} style={{backgroundColor:"transparent",marginRight:4,}}>
                        <Image
                            source={icon}
                            resizeMode="cover"
                            style={{
                                height: 25,
                                width: 25,
                                margin:10,
                                tintColor:"black",
                            }}
                        /> 
                    </TouchableOpacity>
                ),
            }} 
            // initialParams={{ itemId: itemId }}
            />
        </Tab.Navigator>
    );
}

const Core = ({ route,navigation }) => {
  return (   
    TabStack(navigation)
  );
}

export default Core;