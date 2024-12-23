import { StyleSheet } from "react-native";

export const authstyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f3e9fc", 
    },
    authForm: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        padding: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#9c66cc", 
    },
    title: {
        fontSize: 24,
        marginVertical: 20,
        color: "#4c2c8f", 
        fontWeight: "bold",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#9c66cc", 
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: "#f8f0fc",
    },
    icon: {
        marginRight: 10,
        color: "#9c66cc",
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#4c2c8f",
    },
    buttonContainer: {
        width: "100%",
        height: 50,
        backgroundColor: "#6a41a5", 
        marginVertical: 20,
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },
    normalText: {
        fontSize: 14,
        color: "#4c2c8f", 
    },
    errorMsg: {
        color: "#d32f2f", 
        marginBottom: 20,
        fontSize: 14,
    },
});
