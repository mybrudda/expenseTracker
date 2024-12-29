import { TextInput, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { authstyle } from "../styles/AuthStyle";

const CustomInput = ({
  value,
  placeholder,
  onChangeText,
  iconName,
  secureTextEntry = false,
}) => {
  return (
    <View style={authstyle.inputContainer}>
      <Ionicons name={iconName} size={20} color="#888" style={authstyle.icon} />
      <TextInput
        style={authstyle.input}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomInput;
