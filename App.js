import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// screens
import Homescreen from "./screens/Homescreen";
import Signupscreen from "./screens/Signupscreen";
import Loginscreen from "./screens/Loginscreen";
import GenerateQRscreen from "./screens/GenerateQRscreen";
import HistoryScreen from "./screens/HistoryScreen";
import Doctorscreen from "./screens/Doctorscreen";
import ScanQRScreen from "./screens/ScanQRScreen";
import ScanDocQRScreen from "./screens/ScanDocQRScreen";
import ShowDoc from "./screens/ShowDocscreen";
import EditUserInfoScreen from "./screens/EditUserInfoScreen";
import UploadDoc from "./screens/UploadDocScreen";
import SignupDocscreen from "./screens/SignupDocscreen";
import DocHistoryScreen from "./screens/DocHistoryScreen";

// firebase config stuff starts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDtqW0SqoA-SRmqP-w4nKhl_wh65OJDREs",
    authDomain: "medfyler.firebaseapp.com",
    projectId: "medfyler",
    storageBucket: "medfyler.appspot.com",
    messagingSenderId: "288327368061",
    appId: "1:288327368061:web:f47a8d5b06409a477b2014",
    measurementId: "G-Y5NJPX4BQ0",
};

const app = initializeApp(firebaseConfig);

//firebase config stuff ends

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="login" component={Loginscreen} options={app}/>
                <Stack.Screen name="signup" component={Signupscreen} />
                <Stack.Screen name="home" component={Homescreen}/>  
                <Stack.Screen name="generate" component={GenerateQRscreen} />
                <Stack.Screen name="history" component={HistoryScreen} options = {app} />
                <Stack.Screen name="dochistory" component={DocHistoryScreen} options = {app} />
                <Stack.Screen name="doctor" component={Doctorscreen} options={app}/>
                <Stack.Screen name="scanqr" component={ScanQRScreen} options={app}/>
                <Stack.Screen name="scanqr2" component={ScanDocQRScreen} options={app}/>
                <Stack.Screen name="docs" component={ShowDoc} options={app}/>
                <Stack.Screen name="edit" component={EditUserInfoScreen}/>
                <Stack.Screen name="upload" component={UploadDoc} options={app}/>
                <Stack.Screen name="newdoctor" component={SignupDocscreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
