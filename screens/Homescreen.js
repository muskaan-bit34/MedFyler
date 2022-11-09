import React, { cloneElement } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    BackHandler,
    ScrollView,
} from "react-native";
import { Width, Height } from "../util/Dimensions";
import { Component } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


const Homescreen = ({ navigation, route }, {app}, user) => {
    const currentUser =  route.params.user;

    const nameofUser = currentUser.userName;
    const ageofUser= currentUser.age;
    const bloodGroupUser = currentUser.bloodGroup;
    const phoneUser = currentUser.userPhone;

    const goToDocs = async(data) => {
        const db = getFirestore(app);
        const docRef = doc(db, "documents", data);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            navigation.navigate("docs", {user: data, files: docSnap.data().docs});
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        
    };

    // history

    const getHistory = async(userAadhar)=> {
        const db = getFirestore(app)
    
        const docRef = doc(db, "history", userAadhar);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            navigation.navigate("history", {history: docSnap.data(), user: currentUser.userAadhar})
          } else {
            console.log("No such document!");
          }
          
    }

    // history

    return (
        <ScrollView
            style={Styles.container}
            contentContainerStyle={{ alignItems: "center" }}
        >
            <Text style={Styles.header}>Welcome to MedFyler!</Text>
            <View style={Styles.card}>
                <TouchableOpacity 
                    style={Styles.button1}
                    onPress={()=>goToDocs(currentUser.userAadhar)}>
                    <Image
                        style={Styles.img2}
                        source={require("../assets/paper.png")}
                    />
                    <Text style={{ textAlign: "center", paddingTop: 2 }}>
                        Show Documents
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Styles.button1}
                    onPress={() => navigation.navigate("generate", {user: currentUser})}
                >
                    <Image
                        style={Styles.img}
                        source={require("../assets/sampleqr.png")}
                    />
                    <Text style={{ textAlign: "center" }}>Generate QR</Text>
                </TouchableOpacity>
            </View>
            <View style={Styles.card1}>
                <Image
                    style={{
                        height: 90,
                        width: 90,
                        marginLeft: 20,
                        marginRight: 20,
                    }}
                    source={require("../assets/user.png")}
                />
                <View style={Styles.userinfo}>
                    <Text
                        style={{
                            textAlign: "auto",
                            paddingLeft: 10,
                            paddingTop: 10,
                            width: 300,
                            paddingBottom: 10,
                            fontSize: 16,
                        }}
                    >
                        Name: {nameofUser}{"\n"}Age: {ageofUser}{"\n"}Blood Group: {bloodGroupUser}{"\n"}Phone No. : {phoneUser}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={Styles.button}
                onPress={() => getHistory(currentUser.userAadhar)}
            >
                <Image
                    style={{
                        height: 90,
                        width: 90,
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    source={require("../assets/history.png")}
                />
                <Text style={{}}>View History</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
export default Homescreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        height: Height,
        marginTop: 40,
    },
    header: {
        height: 50,
        backgroundColor: "#A9E6DE",
        width: 360,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        borderRadius: 15,
        textAlign: "center",
        paddingTop: 10,
        fontSize: 18,
    },
    card: {
        flexDirection: "row",
    },
    button1: {
        width: 150,
        height: 150,
        backgroundColor: "#A9E6DE",
        borderRadius: 15,
        marginTop: 20,
        marginRight: 15,
        marginLeft: 15,
        alignItems: "center",
    },
    img: {
        height: 100,
        width: 100,
        marginTop: 10,
        marginBottom: 0,
    },
    img2: {
        height: 80,
        width: 80,
        marginTop: 20,
    },
    card1: {
        marginTop: 30,
        //flexDirection:"row",
        backgroundColor: "#E0E6E6",
        alignItems: "center",
        borderRadius: 15,
        height: "35%",
        width: 350,
        paddingTop: 20,
    },
    userinfo: {
        backgroundColor: "#A9E6DE",
        borderRadius: 15,
        textAlign: "left",
        marginTop: 35,
        height: "45%",

    },
    button: {
        height: 200,
        width: 350,
        marginTop: 30,
        paddingBottom: 30,
        backgroundColor: "#A9E6DE",
        alignItems: "center",
        borderRadius: 30,
        paddingTop: 20,
        
    },
    history: {},
});
