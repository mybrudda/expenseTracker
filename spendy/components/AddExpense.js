import { StyleSheet, Text, View } from "react-native"



const AddExpense = () => {
    return (
        <View style={styles.container}>
            <Text>
                this is addexpense screen
            </Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default AddExpense