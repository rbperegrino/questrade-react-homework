import { View, Text, StyleSheet } from "react-native";
import { useToast } from "react-native-toast-notifications";
import Form from "../components/Form";

const AddLottery = () => {
  const toast = useToast();

  const onSubmit = () => {
    toast.show("New lottery added successfully!", { type: "success" });
  }

  return <View style={styles.container}>
    <Text>Add new lottery</Text>
    <Form onSubmit={onSubmit} />
   
  </View>

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: '100%',
        flexDirection: 'column',
    }
})

export default AddLottery;