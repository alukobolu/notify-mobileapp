import React,{ useContext,useState } from "react";
import {View,Text,TouchableOpacity,FlatList,SafeAreaView} from "react-native";
import { Context } from "../Global/context";
import GlobalStyle from "../Global/style";
import axios from 'axios';



const Notifications = ({ navigation,route }) => {
    const styles = GlobalStyle
    const globalContext = useContext(Context);
    const {  notificationList, setNotificationList,domain,authToken } = globalContext;
    const [notlist, setNotlist] = useState(notificationList.results)
    function next(nextlink){
        
        let headers = {
            "Authorization": "Token " + authToken, //Your API key goes in here
        }
        axios.get(`${nextlink}`,{headers: headers})
        .then(function (response) {
            // handle success
            console.log("___________________________")
            setNotificationList(response.data)
            setNotlist([...notlist, ...response.data.results])
            console.log(notificationList)
        })
        .catch(function (error) {
            // handle error
            console.log(error.message);
        });
    }

    function renderAlbumList() {
        const renderItem = ({ item }) => (
            <View style={styles.notification}>
                <View style={styles.notificationlist}>
                   <Text style={{fontSize:18,fontWeight:'600'}}>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</Text>
                   <Text style={{}}>{item.message.charAt(0).toUpperCase() + item.message.slice(1)}</Text>
                </View>
            </View>
        )

        return (
            <FlatList
                data={notlist} 
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                onEndReached={next(notificationList.next)}
                onEndReachedThreshold={0.5}
                contentContainerStyle={{
                    paddingHorizontal: 2,
                    paddingBottom: 30
                }}
            />
        )
    }
    return (
        <SafeAreaView style={styles.container}>  
            <View style={styles.notificationContainer}>
                {renderAlbumList()}
            </View>
        </SafeAreaView>
    )
}


export default Notifications;