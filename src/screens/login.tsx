import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {StyleSheet, TouchableOpacity, Text, View, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import FormInput from '../components/form-input';
import { ERROR } from '../styles/colors';

const auth = getAuth();

const Login = () => {
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const handleSubmit = async (payload: any, formik: any) => {
    try {
      await signInWithEmailAndPassword(auth, payload.email, payload.password);
    } catch (error: any) {
      setError(error.message);
    }
  }

  const registerClk = () => {
    navigation.navigate('Register');
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email')
          .required('Please enter a valid email address.'),
        password: Yup.string().required('Please enter a valid password.'),
      })}
      onSubmit={handleSubmit}>
      {({
        errors,
        values,
        setValues,
        touched,
        setTouched,
        submitForm,
      }) => (
        <View style={styles.loginForm}>
          <FormInput
            valueKey={'email'}
            text={'Email'}
            required={true}
            errors={errors}
            values={values}
            setValues={setValues}
            touched={touched}
            setTouched={setTouched} />

          <FormInput
            secureTextEntry={true}
            valueKey={'password'}
            text={'Password'}
            required={true}
            errors={errors}
            values={values}
            setValues={setValues}
            touched={touched}
            setTouched={setTouched} />

          <Button 
            testID='login'
            mode="contained" 
            onPress={submitForm}>
            LOGIN
          </Button>

          {error && <Text 
            testID='errorMsg'
            style={styles.errorMsg}>
            {error}
          </Text>}

          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={registerClk}>
              <Text style={[styles.actionButtonText]}>
                CREATE A FREE ACCOUNT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  loginForm: {
    marginTop: Platform.OS == 'web' ? 200 : 100,
    alignSelf: 'center',
    width: Platform.OS == 'web' ? 600 : 300
  },
  actionButtons: {
    paddingTop: 14,
  },
  actionButtonText: {
    color: '#171E1E',
    textAlign: 'center',
    fontWeight: '500',
    paddingVertical: 10,
  },
  errorMsg: {
    color: ERROR,
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 16,
  },
});

export default Login;