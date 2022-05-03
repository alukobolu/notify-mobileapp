import React ,{ useContext }  from 'react';
import { StyleSheet , Dimensions } from 'react-native';

const GlobalStyle = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "white",
    },
    h1:{
        color:"black",
        fontSize:34,
        fontWeight:"700",
        textAlign:"center",
        width:"100%",
        marginTop:"10%",
    },
    p:{
        color:"blue",
        fontSize:12,
        width:"100%",
        textAlign:"center",
        margin:0,
    },
    outerPage:{
        backgroundColor:"#ffffff",//#f0efbc cream gray combo color
        color:"blue",
        height: Dimensions.get('screen').height,
        width: Dimensions.get('window').width,
        padding:10,
        margin:0,
        alignItems:"center",
        justifyContent:"center",
    },
    foreBox:{
        backgroundColor:"transparent",
        height: '100%',
        width: '90%',
        margin:0,
    },
    formheader:{
        backgroundColor:"transparent",
        marginVertical:60,
    },
    formComponents:{
        backgroundColor:"transparent",
        marginVertical:22,
        width:"90%",
        alignSelf:"center",
    },
    imageBackground:{
        width:"100%",
        height:"100%",
        resizeMode:"cover",
        position:"absolute"
    },
    textInput:{
        backgroundColor:"transparent",
        color:"black",
        height: 45,
        width: "100%",
        borderBottomWidth:1,
        borderColor:"blue",
    },
    inputLabel:{
        color:"blue",
        fontSize:14,
        fontWeight:"600",
        width:"100%",
        margin:0,
    },
    buttonFonts:{
        color:"white",
        fontSize:13,
        width:"100%",
        textAlign:"center",
        margin:0,
    },
    login:{
        backgroundColor:"white",
        color:"black",
        height: 25,
        width: "30%",
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center",
    },
    loginbutton:{
        backgroundColor:"blue",
        height: 45,
        width: "100%",
        textAlign:"center",
        justifyContent:"center",
        borderRadius:6,
        borderEndColor:"white",
    },
    logout:{  
        position:"absolute",
        bottom:0,
        height:60,
        width:"100%",
        backgroundColor:"transparent",
        justifyContent: 'center',
        alignItems:"center",
        padding:1,
    },
    logoutBotton:{
        marginTop:2,
        backgroundColor:"blue",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height: 50,
        elevation:3,
        borderRadius:10,
    },
    Buttontext:{
        color:"white",
        fontSize:18,
        width:"100%",
        textAlign:"center",
        margin:0,
    },
    notificationContainer:{
        padding:15,
    },
    notification:{
        padding:5,
    },
    notificationlist:{
        width:"100%",
        height:"auto",
        paddingBottom:20,
        borderBottomWidth:0.9,
        borderColor:"grey",
        flexDirection:"column",
    },

});

export default GlobalStyle;