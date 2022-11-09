import React, { cloneElement, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
} from "react-native";
import { Component } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import * as Font from "expo-font";
import { useNavigation } from "@react-navigation/native";
const Doctorscreen = ({ navigation, route }, {app}) => {
    const currentUser = route.params.user;
    const nameofUser = currentUser.userName;
    const degreeofUser = currentUser.userDegree;
    const phoneUser = currentUser.userPhone;
    console.log(currentUser);

    // history

    const getHistory = async(dci)=> {
        const db = getFirestore(app)
    
        const docRef = doc(db, "docHistory", dci);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            navigation.navigate("dochistory", {history: docSnap.data(), user: currentUser})
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
                <TouchableOpacity style={Styles.button1}
                    onPress={()=>navigation.navigate("scanqr2", {doctor: currentUser})}>
                    <Image
                        style={Styles.img2}
                        source={require("../assets/resume.png")}
                    />
                    <Text style={{ textAlign: "center", marginTop: 8 }}>
                        Edit Documents
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={Styles.button1}
                    onPress={() => navigation.navigate("scanqr")}
                >
                    <Image
                        style={Styles.img}
                        source={require("../assets/scan.png")}
                    />
                    <Text style={{ textAlign: "center", fontSize: 13 }}>View Patient Info</Text>
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
                    source={require("../assets/doctor.png")}
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
                            lineHeight: 24,
                        }}
                    >
                        Name: {nameofUser}
                        {"\n"}
                        Qualifications: 
                        {"\n"}{degreeofUser}
                        {"\n"}
                        Contact number : {phoneUser}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={Styles.button}
                onPress={() => getHistory(currentUser.dciNmc)}
            >
                <Image
                    style={{
                        height: 90,
                        width: 90,
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    source={require("../assets/file.png")}
                />
                <Text style={{}}>View File History</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};
export default Doctorscreen;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
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
        paddingBottom: 15,
        width: 350,
        paddingTop: 20,
    },
    userinfo: {
        backgroundColor: "#A9E6DE",
        borderRadius: 15,
        textAlign: "left",
        marginTop: 20,
    },
    button: {
        width: 350,
        marginTop: 30,
        paddingBottom: 10,
        backgroundColor: "#A9E6DE",
        alignItems: "center",
        borderRadius: 30,
        paddingTop: 10,
        marginBottom:20,
    },
    history: {},
});
