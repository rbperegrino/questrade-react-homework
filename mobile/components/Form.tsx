import {useFormik } from "formik";
import { View, TextInput, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import * as Yup from "yup";
import { useNewLottery } from "../hooks/useNewLottery";
import { useNavigation } from "@react-navigation/native";
import { AddLotteryScreenNavigationProp } from "../types";

type FormProps = {
    onSubmit: () => void;
}

type FormikProps = {
    name: string;
    prize: string;
}

const Form = ({ onSubmit }: FormProps) => {

    const navigation = useNavigation<AddLotteryScreenNavigationProp>();

    const { loading, createNewLottery, error } = useNewLottery();

    const initialValues: FormikProps = {
        name: "",
        prize: "",
      };

    const onFormSubmit = async (values: FormikProps) => {
        await createNewLottery({ name: values.name, prize: values.prize });
        onSubmit();
        formik.resetForm();
        navigation.goBack();
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(4, "Name must be at least 4 characters").required("Name is required"),
        prize: Yup.string().min(4, "Prize must be at least 4 characters").required("Prize is required"),
    });

    const formik = useFormik({
        validationSchema,
        validateOnChange: true,
        validateOnMount: true,
        initialValues,
        onSubmit: onFormSubmit,
      });


   
    return (
       
          <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
            <TextInput
        
              value={formik.values.name}
              onChangeText={formik.handleChange("name")}
              placeholder="Lottery name"
              style={styles.input}
            />
            {formik.errors.name && <Text style={styles.error}>{formik.errors.name}</Text>}
            
            <TextInput
              value={formik.values.prize}
              onChangeText={formik.handleChange("prize")}
              placeholder="Lottery prize"
              style={styles.input}
            />
            {formik.errors.prize && <Text style={styles.error}>{formik.errors.prize}</Text>}
            <Pressable
                accessibilityRole="button"
                style={styles.button}
                onPress={() => formik.handleSubmit()}
                disabled={!formik.isValid}
            >
                {loading ? (
                <ActivityIndicator color="white" />
                ) : (
                <Text style={styles.buttonText}>ADD</Text>
                )}
            </Pressable>
            {error ? <Text style={styles.error}>error</Text> : null}
          </View>
       
    )
}

const styles = StyleSheet.create({
    
    form: {
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: "gray",
        padding: 8,
        marginBottom: 16,
    },
    error: {
        color: "red",
        marginBottom: 16,
    },
    button: {
        backgroundColor: "blue",
        padding: 8,
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    loading: {
        opacity: 0.5,
    },
})

export default Form;