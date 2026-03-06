import { View, Text, TextInput, Button, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { AddLotteryScreenNavigationProp, RegisterScreenRouteProp } from "../types";
import useLotteryRegister from "../hooks/useLotteryRegister";

const Register = () => {

    const { error, loading, registerToLotteries } = useLotteryRegister();
    const route = useRoute<RegisterScreenRouteProp>();
    const navigation = useNavigation<AddLotteryScreenNavigationProp>();

    const selectedLotteries = route.params?.selectedLotteries;

    const close = () => {
        navigation.goBack();
    }

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(4).required('Name is required'),
        }),
        validateOnChange: true,
        validateOnMount: true,
        onSubmit: async ({ name }) => {
           await registerToLotteries({ name, lotteries: selectedLotteries });
           close();
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register to lotteries</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
            />
            {formik.errors.name && <Text style={styles.error}>{formik.errors.name}</Text>}
            <Pressable 
            disabled={formik.isSubmitting || !formik.isValid} 
            style={[styles.button, (formik.isSubmitting || !formik.isValid) && styles.buttonDisabled]} 
            onPress={() => formik.handleSubmit()} >
                {loading ? <ActivityIndicator size="small" color="white" /> : <Text>Register</Text>}
            </Pressable>
            {error && <Text>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    }, 
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        width: '100%',
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#84a9e0',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});
   
export default Register;