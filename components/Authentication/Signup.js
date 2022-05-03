import React,{ useContext,useState} from "react";
import {View,Text,StyleSheet,TouchableOpacity,TextInput} from "react-native";
import * as Animatable from 'react-native-animatable';
import GlobalStyle from "../Global/style"
import { Context } from "../Global/context";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Signup = ({ navigation,route }) => {
    const globalContext = useContext(Context);
    const { isRegistered, setIsRegistered,domain,expoPushToken,setAuthToken,email,setEmail  } = globalContext;
    const stylepage = GlobalStyle
    const [securePassword, setSecurePassword] = useState(true)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
    }
    function register(){
        console.log('yes')
        let body = {
            'firstname':name.toLocaleLowerCase(),
            'email':email.toLocaleLowerCase(),
            'expoT':expoPushToken,
            'password': password
        }
        axios.post(`${domain}/accounts/sign-up/`,body)
        .then(function (response) {
            // handle success
            alert(JSON.stringify(response.data));
            console.log(response.data.response)
            save("token",response.data.token)
            save("email",email.toLocaleLowerCase())
            setAuthToken(response.data.token)
            setIsRegistered(true)
          })
          .catch(function (error) {
            // handle error
            setError("Something Went Wrong ")
            alert(error.message);
          });
    }  
    function registered(){
        alert("If you do not already have an account registered to this device, you will not recieve any notification when sent to you.");
        setIsRegistered(true)
    }   
    function Page() {
        return (
            <View style={stylepage.outerPage}>
                <View  style={stylepage.foreBox}>
                    <View>
                        <Text style={stylepage.h1}>SIGN UP</Text>
                    </View>
                    <View style={stylepage.formComponents}>
                        <Text  style={stylepage.inputLabel}>Email</Text>
                        <TextInput value={email} onChangeText={ text => setEmail(text)}  textContentType='emailAddress'  autoCompleteType="email"  style={stylepage.textInput}  placeholder="Email Address" />
                    </View>
                    <View style={stylepage.formComponents}>
                        <Text  style={stylepage.inputLabel}>Name</Text>
                        <TextInput value={name} onChangeText={ text => setName(text)} textContentType='name'  autoCompleteType="username"  style={stylepage.textInput}  placeholder="firstname only" />
                    </View>
                    <View style={stylepage.formComponents}>
                        <Text  style={stylepage.inputLabel}>Password</Text>
                        <TextInput value={password} onChangeText={ text => setPassword(text)}  textContentType='password' autoCompleteType="password" secureTextEntry ={securePassword}  style={stylepage.textInput} placeholder="Password" />
                    </View>
                    <View style={stylepage.formComponents}>
                        <TouchableOpacity style={stylepage.loginbutton} onPress={()=> register()}  >
                            <Text style={stylepage.buttonFonts}>Sign up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop:20}} onPress={()=> registered()}>
                            <Text style={stylepage.p}>Already have an account ?</Text>
                            <Text style={{color:'red'}}>{error}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInUpBig" >
            {Page()}
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#fff',
      },
})

export default Signup;