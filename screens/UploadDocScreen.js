import React, { cloneElement, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    BackHandler,
    ScrollView,
    FlatList,
    Alert,
} from "react-native";
import * as Linking from 'expo-linking';
import { Width, Height } from "../util/Dimensions";
import { Component } from "react";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from "firebase/storage";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { ScreenStackHeaderRightView } from "react-native-screens";

import * as DocumentPicker from "expo-document-picker";

const UploadDoc = ({ navigation, route }, { app }) => {
    const aadhar = route.params.user;
    const doctor = route.params.doctor;
    console.log(doctor)
    const items = route.params.files;

    const UploadFile = (blobFile, fileName, storageVar, userAadhar) => {
        if (!blobFile) return;
        const sotrageRef = ref(storageVar, `${userAadhar}/${fileName}`);
        const uploadTask = uploadBytesResumable(sotrageRef, blobFile);
        uploadTask.on(
            "state_changed",
            null,
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    Alert.alert("File Uploaded", "You can exit now")
                    console.log("File available at", downloadURL);
                    //
                    const db = getFirestore(app)
                    const docRef = doc(db, "documents", aadhar);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        navigation.navigate("upload", {user: aadhar, files: docSnap.data().docs});
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                    //
                    return downloadURL;
                });
            }
        );
    };

    const uploadFiles = async (userAadhar, doctor) => {
        const result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
        const r = await fetch(result.uri);
        const b = await r.blob();

        const storage = getStorage();

        Alert.alert("File being Uploaded", "Please do not exit until prompted")

        UploadFile(b, result.name, storage, userAadhar);

        const db = getFirestore(app);
        try {
            await updateDoc(doc(db, "documents", userAadhar), {
                docs: arrayUnion(result.name),
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        try {
            await updateDoc(doc(db, "history", aadhar), {
            title: arrayUnion(`Uploaded ${result.name}`),
            byLine: arrayUnion(`Uploaded by ${doctor.userName}`),
            dci: arrayUnion(doctor.dciNmc),
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        try {
            await updateDoc(doc(db, "docHistory", doctor.dciNmc), {
            title: arrayUnion(`Uploaded ${result.name}`),
            byLine: arrayUnion(`Uploaded to ${aadhar}`)
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const lols = []

    for (let i =0; i<items.length;i++) {
        lols.push({key: items[i]})
    }

    const getFile = async(aadhar, filename) => {
        const storage = getStorage();
        const url = await getDownloadURL(ref(storage, `${aadhar}/${filename}`))
        Linking.openURL(url);
        console.log(url)
    }


    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerStyle}>Documents</Text>
                </View>
                <FlatList
                data={lols}
                renderItem={({item})=>
                // item html here
                <TouchableOpacity 
                    style={styles.itemContainer}
                    onPress={() => getFile(aadhar, item.key)}>
                    <Image source={require("../assets/doc-icon.png")} style={styles.itemIconStyle}/>
                    <Text style={styles.itemTextStyle}>{item.key}</Text>
                </TouchableOpacity>
                // item html ends
                }/>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => uploadFiles(aadhar, doctor)}>
                    <Text>Upload Documents</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UploadDoc;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "10%",
    },
    contentContainer: {
        flex: 1,
    },
    itemContainer: {
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
    },
    itemIconStyle: {
        height: 40,
        width: 40,
    },
    itemTextStyle: {
        marginLeft: 30,
        fontSize: 16,
    },
    headerContainer: {
        marginVertical: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    headerStyle: {
        fontSize: 32,
        fontWeight: "bold",
    },
    footer: {
        height: 50,
        backgroundColor: "#A9E6DE",
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        borderRadius: 15,
    },
});
