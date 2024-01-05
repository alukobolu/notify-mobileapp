import React ,{ useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../Authentication/Signup.js";
import Core from "../Core/Index.js";
import { Context }  from "../Global/context.js"; 

const Stack = createStackNavigator();

function Navigator(props) {

    const globalContext = useContext(Context);
    const { isRegistered } = globalContext;

    return(
        <Stack.Navigator initialRouteName ="choice">
            {(!isRegistered)?
                <>
                    <Stack.Screen name ="signup" component={Signup} options={{headerShown: false }} />   
                </>
                :
                <>        
                    <Stack.Screen name ="core" component={Core} options={{headerShown: false }} />
                    
                </>
            }
        </Stack.Navigator>
    )

};
// options={{
//     title: 'Home',
//     headerStyle: {
//         backgroundColor: 'blue',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//         fontWeight: 'bold',
//     },
// }} 
export default Navigator;