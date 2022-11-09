import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Height, Width } from "../util/Dimensions";
import {
    getFirestore,
    collection,
    doc,
    setDoc,
    getDocs,
    arrayUnion,
    getDoc,
    query,
    where,
} from "firebase/firestore";

const ScanQRScreen = ({ navigation }, { app }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        const db = getFirestore(app);
        const dataRef = collection(db, "users");

        const q = query(dataRef, where("userAadhar", "==", data));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            navigation.replace("edit", { user: doc.data() });
        });
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

export default ScanQRScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
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
