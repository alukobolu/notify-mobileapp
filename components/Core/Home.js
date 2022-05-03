import React,{ useContext,useState } from "react";
import {View,Text,TouchableOpacity,TextInput} from "react-native";
import { Context } from "../Global/context";
import GlobalStyle from "../Global/style";
import axios from 'axios';



const Home = ({ navigation,route }) => {
    const globalContext = useContext(Context);
    const {  isRegistered, setIsRegistered,domain,authToken } = globalContext;
    const stylepage = GlobalStyle
    const [topic, setTopic] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    function logout(){
        setIsRegistered(false)
    }   
    
    function send(){
        console.log(authToken)
        let headers = {
            "Authorization": "Token " + authToken, //Your API key goes in here
          }
        let body = {
            'users':email.toLocaleLowerCase(),
            'title':topic.toLocaleLowerCase(),
            'message':message.toLocaleLowerCase(),
        }
        axios.post(`${domain}/notification/send/`,body,{headers: headers})
        .then(function (response) {
            // handle success
            alert(JSON.stringify(response.data));
          })
          .catch(function (error) {
            // handle error
            setError("Something Went Wrong ")
            alert(error.message);
          });
    } 

    function Page() {
        return( 
            <View style={{justifyContent:"center",alignContent:"center",alignItems:"center",}}>
                <Text style={stylepage.h1}>Send a Notification</Text>
                <View style={stylepage.formComponents}>
                    <Text  style={stylepage.inputLabel}>Email</Text>
                    <TextInput value={email} onChangeText={ text => setEmail(text)} textContentType='emailAddress'  autoCompleteType="email"  style={stylepage.textInput}  placeholder="Email Address" />
                </View>
                <View style={stylepage.formComponents}>
                    <Text  style={stylepage.inputLabel}>Topic</Text>
                    <TextInput value={topic} onChangeText={ text => setTopic(text)} textContentType='name'  style={stylepage.textInput}  placeholder="What's the message about?" />
                </View>
                <TextInput value={message} multiline={true} onChangeText={ text => setMessage(text)} numberOfLines={5} placeholder="Enter Message" style={{borderColor:"blue",borderWidth:1,alignSelf:"center",width:"90%" }}>

                </TextInput>
            </View>
        )
    }

    return (
        <View style={stylepage.container}>
            <View >
                {Page()}
            </View>
            <Text style={{color:'red'}}>{error}</Text>
            {/* <TouchableOpacity  onPress={()=> logout()} >
                <Text style={stylepage.h1} >Logout</Text>
            </TouchableOpacity>  */}
            <View style={stylepage.logout}>
                <TouchableOpacity style={stylepage.logoutBotton} onPress={()=> send()} >
                    <Text style={stylepage.Buttontext} >Send</Text>
                </TouchableOpacity> 
            </View>
        </View>
    )
}


export default Home;