import React, { cloneElement } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    BackHandler,
} from "react-native";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
    getDoc,
} from "firebase/firestore";
import QRCode from "react-native-qrcode-svg";
const GenerateQRscreen = ({ navigation, route }) => {

    const currentUser = route.params.user;
    const userAadhar = currentUser.userAadhar;

    const Qrcode =() => {
        return <QRCode
        value = {userAadhar}
        size = {250}
        color = {"black"}
        backgroundColor={"white"}
        logo={require("../assets/logo.png")}
        logoSize={1}
        logoMargin={0}
        logoBorderRadius={0}
        logoBackgroundColor={"white"} />
    }

    return (
        <View style={Styles.container}>
            <View style= {{justifyContent:"center"}}>
            <Text style= {{textAlign: "center", fontSize:30, paddingBottom:"20%",paddingTop:"30%" }}>Scan the QR Below</Text>
            </View>
            <Qrcode/> 
            <View style= {{flexDirection:"row"}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style= {Styles.button}>
                    
                    <Text style={{fontSize:17}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style= {Styles.button}>
                    <Text style={{fontSize:17}}>Reload</Text>
                </TouchableOpacity>
            </View>
                
        </View>
        
            
    );
};
export default GenerateQRscreen;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: "#A9E6DE",
    },
    button:{
        borderRadius:15,
        marginTop: "15%",
        height: 50,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5EDACA",
        borderRadius: 15,
        marginRight: "3%",
        marginLeft:"3%",
    }
});
