import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, db } from "../FirebaseConfig";
import { authstyle } from "../styles/AuthStyle";
const Register = ({ navigation }) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("")


  const onRegister = async () => {
    try {
        if(username && email && password){
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            await updateProfile(user, {
                displayName: username,
            })

            await setDoc(doc(db, 'users', user.uid),{
                username: username,
                email: email,
                createdAt: serverTimestamp(),
            })

            setUsername('')
            setEmail('')
            setPassword('')
            setErrorMsg('')

            Alert.alert('User ' + user.displayName + ' created!')

            navigation.navigate('Login')

        } else{
            setErrorMsg('Please fill in all the fields')
        }
    } catch (error) {
        console.log('Error: ', error.message)
        setErrorMsg('User already exists with this email')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={authstyle.container}>
        <View style={authstyle.authForm}>

          <Text style={authstyle.title}>Create new account</Text>

          {
            errorMsg ? <Text style={authstyle.errorMsg}>{errorMsg}</Text> : null
          }

          <View style={authstyle.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#888"
              style={authstyle.icon}
            />
            <TextInput
              style={authstyle.input}
              value={username}
              placeholder="Username"
              onChangeText={setUsername}
              placeholderTextColor="#888"
            />
          </View>

          <View style={authstyle.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#888"
              style={authstyle.icon}
            />
            <TextInput
              style={authstyle.input}
              value={email}
              placeholder="Email"
              onChangeText={setEmail}
              placeholderTextColor="#888"
            />
          </View>

          <View style={authstyle.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#888"
              style={authstyle.icon}
            />
            <TextInput
              style={authstyle.input}
              value={password}
              placeholder="Password"
              onChangeText={setPassword}
              placeholderTextColor="#888"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity
            style={authstyle.buttonContainer}
            onPress={onRegister}
          >
            <Text style={authstyle.buttonText}>Register</Text>
          </TouchableOpacity>

          <Text style={authstyle.normalText} onPress={() => navigation.navigate('Login')}>Already have an account?</Text>

        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
