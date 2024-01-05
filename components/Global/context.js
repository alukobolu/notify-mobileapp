import React, { useState, useEffect, useRef, createContext } from "react";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import * as Device from "expo-device";

const Context = createContext();

const Provider = ({ children }) => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  // async function registerForPushNotificationsAsync() {
  //   let token;

  //   if (Platform.OS === 'android') {
  //     await Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   if (Device.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   return token;
  // }
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
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
      token = await Notifications.getExpoPushTokenAsync({
        projectId: "3bd73e48-b442-4f5a-b0a7-cfea291e9774",
      });
      console.log(token, "this is token");
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const notificationListener = useRef();
  const responseListener = useRef();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [domain, setDomain] = useState("http://192.168.1.170:8000");
  const [authToken, setAuthToken] = useState("");
  const [notificationList, setNotificationList] = useState([]);
  const [email, setEmail] = useState("");

  async function getValueFor(tokenkey, emailkey) {
    let tokenresult = await SecureStore.getItemAsync(tokenkey);
    let emailresult = await SecureStore.getItemAsync(emailkey);
    if (tokenresult) {
      setIsRegistered(true);
      setAuthToken(tokenresult);
      setEmail(emailresult);
      return tokenresult;
    } else {
      return null;
    }
  }
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(() => token);
    });

    console.log("--------------");
    console.log(expoPushToken);
    console.log("--------------");

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
    setNotificationList,
  };

  return <Context.Provider value={globalContext}>{children}</Context.Provider>;
};

export { Context, Provider };
