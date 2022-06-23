import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {StyleSheet, TouchableOpacity, Text, View, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore"; 

import FormInput from '../components/form-input';
import { firestore } from '../config/firebase';

const auth = getAuth();

const Register = () => {
  const navigation = useNavigation();

  const handleSubmit = async (payload: any, formik: any) => {
    try {
      await createUserWithEmailAndPassword(auth, payload.email, payload.password);

      const addRes = await addDoc(collection(firestore, 'users'), {
        name: payload.name,
        email: payload.email
      });
      console.log('add user res:', addRes);
    } catch (error) {
      console.log('error');
    }
  }

  const loginClk = () => {
    navigation.navigate('Login');
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
                  valueKey={'name'}
                  text={'Name'}
                  required={true}
                  errors={errors}
                  values={values}
                  setValues={setValues}
                  touched={touched}
                  setTouched={setTouched} />
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
              <View>
                  <Button mode="contained" onPress={submitForm}>
                      REGISTER
                  </Button>
                  <View style={styles.actionButtons}>
                      <TouchableOpacity onPress={loginClk}>
                          <Text style={[styles.actionButtonText]}>
                              Login
                          </Text>
                      </TouchableOpacity>
                  </View>
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
    width: Platform.OS == 'web' ? 600 : 400
  },
  actionButtons: {
    paddingTop: 14,
  },
  actionButtonText: {
    color: '#171E1E',
    textAlign: 'center',
    fontWeight: '500',
    paddingVertical: 10,
  }
});

export default Register;