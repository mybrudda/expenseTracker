import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { db } from "../FirebaseConfig";

const AddExpense = () => {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  const userProfile = useSelector((state) => state.user);

  const expenseCategories = [
    { id: "1", name: "Rent", icon: "home" },
    { id: "2", name: "Shopping", icon: "cart" },
    { id: "3", name: "Food", icon: "food" },
    { id: "4", name: "Transportation", icon: "car" },
    { id: "5", name: "Utilities", icon: "flash" },
    { id: "6", name: "Entertainment", icon: "movie" },
    { id: "7", name: "Healthcare", icon: "hospital-box" },
    { id: "8", name: "Fitness", icon: "dumbbell" },
    { id: "9", name: "Insurance", icon: "shield-account" },
    { id: "10", name: "Travel", icon: "airplane" },
    { id: "11", name: "Education", icon: "school" },
  ];

  const handleSubmitExpense = async () => { 
    if (!userProfile || !userProfile.uid) {
        Alert.alert('Please log in to add an expense.');
        return; 
    }

    try {
        if(expenseAmount && selectedCategoryId && expenseDescription){
            await addDoc(
            collection(db, "users", userProfile.uid, "savedExpenses"),
            {
            amount: expenseAmount,
            category: expenseCategories.find(category => category.id === selectedCategoryId)?.name,
            categoryId: selectedCategoryId,
            description: expenseDescription,
            SavedAt: serverTimestamp(),
            }
            );

            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Expense Saved!',
                text2: 'Your expense has been successfully saved.',
                visibilityTime: 3000,
              });

            setExpenseAmount('')
            setSelectedCategoryId('')
            setExpenseDescription('')
        } else{
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Something went wrong!',
                text2: 'Fill in all the fields and try again saving.',
                visibilityTime: 3000,
              });
        }
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <TextInput
                placeholder="Add expense amount"
                value={expenseAmount}
                onChangeText={setExpenseAmount}
                keyboardType="numeric"
                style={styles.input}
              />

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
              >
                {expenseCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.button,
                      selectedCategoryId === category.id && styles.selectedButton,
                    ]}
                    onPress={() => setSelectedCategoryId(category.id)}
                  >
                    <Icon name={category.icon} size={40} color="#9c66cc" />
                    <Text style={styles.buttonText}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TextInput
                placeholder="Description..."
                value={expenseDescription}
                onChangeText={setExpenseDescription}
                style={styles.multilineInput}
                multiline={true}
                numberOfLines={5}
              />

              <TouchableOpacity
                onPress={handleSubmitExpense}
                style={styles.buttonContainer}
              >
                <Text style={styles.submitButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f3f1f8",
  },
  formContainer: {
    marginTop: 100,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: "#9c66cc",
    width: "90%",
    marginVertical: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#f8f4fc",
  },
  multilineInput: {
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: "#9c66cc",
    width: "90%",
    marginVertical: 20,
    padding: 15,
    borderRadius: 5,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#f8f4fc",
  },
  scrollView: {
    flexGrow: 0,
    width: "90%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8e6e6",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    width: 130,
    height: 100,
  },
  selectedButton: {
    backgroundColor: "#d0eaff",
    borderColor: "#9c66cc",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 14,
    textAlign: "center",
    color: "#7a4fa1",
    marginTop: 5,
  },
  buttonContainer: {
    width: "90%",
    height: 50,
    backgroundColor: "#9c66cc",
    marginVertical: 20,
    justifyContent: "center",
    borderRadius: 10,
  },
  submitButtonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});

export default AddExpense;
