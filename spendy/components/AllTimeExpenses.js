import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { db } from "../FirebaseConfig";
import { expenseCategories } from "./expenseCategories";

const timePeriods = [
  { label: "1 Month", value: 1 },
  { label: "2 Months", value: 2 },
  { label: "Year", value: 12 },
  { label: "All Time", value: "all" },
];

const ExpenseCategorySummary = ({ navigation }) => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(1);
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const currentUser = useSelector((state) => state.user);

  const fetchExpenses = () => {
    if (!currentUser || !currentUser.uid) {
      console.error("User is not logged in or uid is missing.");
      return;
    }

    const userUid = currentUser.uid;
    const expensesRef = collection(db, "users", userUid, "savedExpenses");

    let expensesQuery = expensesRef;

    if (selectedTimePeriod !== "all") {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - selectedTimePeriod);
      expensesQuery = query(expensesRef, where("SavedAt", ">=", startDate));
    }

    const unsubscribe = onSnapshot(expensesQuery, (querySnapshot) => {
      const expenses = querySnapshot.docs.map((doc) => doc.data());

      // Group expenses by category
      const expensesByCategory = expenseCategories.map((category) => {
        const totalAmount = expenses
          .filter((expense) => expense.categoryId === category.id)
          .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

        return {
          category: category.name,
          icon: category.icon,
          total: totalAmount,
        };
      });

      setCategoryExpenses(expensesByCategory); 
    });

    return unsubscribe; 
  };

  useEffect(() => {
   
    const unsubscribe = fetchExpenses();

  
    return () => unsubscribe();
  }, [selectedTimePeriod]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <RNPickerSelect
          placeholder={{ label: "Select time period", value: null }}
          value={selectedTimePeriod}
          onValueChange={setSelectedTimePeriod}
          items={timePeriods}
          style={{
            inputIOS: styles.dropdown,
            inputAndroid: styles.dropdown,
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("AddExpense")}>
          <Icon name="plus-circle" size={30} color="#9c66cc" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {categoryExpenses.length > 0 &&
          categoryExpenses.map((expense, index) => (
            <View key={index} style={styles.categoryContainer}>
              <View style={styles.categoryNameIcon}>
                <Icon name={expense.icon} size={40} color="#9c66cc" />
                <Text style={styles.categoryText}>{expense.category}</Text>
              </View>
              <Text style={styles.categoryText}>${expense.total.toFixed(2)}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f3f1f8",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f3e9fc",
  },
  dropdown: {
    height: 50,
    width: 200,
    backgroundColor: "#b09af0",
    fontSize: 16,
    color: "white",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    alignItems: "center",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 15,
    width: "90%",
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  categoryText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#7a4fa1",
  },
  categoryNameIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExpenseCategorySummary;
