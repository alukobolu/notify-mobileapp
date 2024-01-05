import React, { useState, useEffect, useRef, createContext} from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const Context = createContext()

const Provider = ( { children } ) => {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } 
    else {
      alert("Must use physical device for Push Notifications");
    }
  
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    console.log(token)
    return token;
  }
  
  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [ isRegistered, setIsRegistered ] = useState(false)
  const [ domain, setDomain ] = useState("http://192.168.178.243:8000")
  const [authToken, setAuthToken] = useState("");
  const [notificationList, setNotificationList] = useState([]);
  const [email, setEmail] = useState("")

  async function getValueFor(tokenkey,emailkey) {
    let tokenresult = await SecureStore.getItemAsync(tokenkey);
    let emailresult = await SecureStore.getItemAsync(emailkey);
    if (tokenresult) {
      setIsRegistered(true);
      setAuthToken(tokenresult);
      setEmail(emailresult);
      return tokenresult 
    } else {
      return null
    }
  }
  useEffect(() => {
    getValueFor("token","email").then((result) => {
      if (result != null){
        console.log('get notifications')
        let headers = {
          "Authorization": "Token " + authToken, //Your API key goes in here
        }
        axios.get(`${domain}/notification/get/`,{headers: headers})
        .then(function (response) {
          // handle success
          setNotificationList(response.data)
          console.log(notificationList)
        })
        .catch(function (error) {
          // handle error
          console.log(error.message);
        });
      }
    });
    registerForPushNotificationsAsync().then((token) => {
      
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  const globalContext = {
    isRegistered,
    setIsRegistered,
    domain,
    expoPushToken,
    authToken,
    setAuthToken,
    email,
    setEmail,
    notificationList,
    setNotificationList
  }

  return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };