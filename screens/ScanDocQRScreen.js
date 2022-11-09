import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {Height, Width} from "../util/Dimensions"
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    arrayUnion,
    getDoc,
} from "firebase/firestore";

const ScanDocQRScreen = ({ navigation, route }, {app}) => {
    const doctor = route.params.doctor
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async({ type, data }) => {
        setScanned(true);
        const db = getFirestore(app);
        const docRef = doc(db, "documents", data);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            navigation.replace("upload", {user: data, files: docSnap.data().docs, doctor: doctor});
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.border}
                source={require("../assets/qr-borders.png")}/>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
        </View>
    );
};

export default ScanDocQRScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black"
    },
    QR: {
        height: Height,
        Width: Width,
    },
    
    border: {
        zIndex: 3,
        elevation: 3,
        marginLeft: 23
    }
});
