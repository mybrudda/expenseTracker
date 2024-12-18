import { StyleSheet } from "react-native";



export const authstyle = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authForm:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        padding: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#888'
    },
    title:{
        fontSize: 24,
        marginVertical: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
      },
      icon: {
        marginRight: 10,
      },
      input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#000",
      },
    buttonContainer:{
        width: '100%',
        height: 50,
        backgroundColor: 'orange',
        marginVertical: 20,
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    normalText:{
        fontSize: 14,
        color: 'blue'
    },
    errorMsg:{
        color: 'red',
        marginBottom: 20
    }
 
})

