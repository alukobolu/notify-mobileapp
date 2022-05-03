import React ,{ useContext }  from 'react';
import { StyleSheet , Dimensions } from 'react-native';

const stylepage = StyleSheet.create({
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
    h1:{
        color:"#fff",
        fontSize:34,
        fontWeight:"700",
        textAlign:"center",
        width:"100%",
        marginTop:"30%",
    },

    p:{
        color:"blue",
        fontSize:12,
        width:"100%",
        textAlign:"center",
        margin:0,
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
});

export default stylepage;