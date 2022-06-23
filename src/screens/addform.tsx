import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Platform, Text, ScrollView} from 'react-native';
import { collection, addDoc, onSnapshot } from "firebase/firestore"; 
import { useNavigation } from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import "yup-phone";
import { getAuth } from 'firebase/auth';

import { firestore } from '../config/firebase';
import ImagePicker from '../components/image-picker';
import FormInput from '../components/form-input';
import { ERROR } from '../styles/colors';

const auth = getAuth();

const AddForm = () => {
  const navigation = useNavigation();
  const [names, setNames] = useState<string[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const unsub = onSnapshot(collection(firestore, "farm"), 
      (snapshot) => {
        let nameArr:string[] = [];
        snapshot.forEach(doc => {
          nameArr.push(doc.data().name);
        });
        setNames(nameArr);
      },
      (error) => {
        console.log("onSnapshot error: ", error);
      });

    return () => unsub()
  }, []);

  const handleSubmit = async (payload: any, formik: any) => {
    try {
      const docRef = await addDoc(collection(firestore, "farm"), {
        displayname: payload.displayname,
        name: payload.name,
        phone: payload.phone,
        open_hours: payload.open_hours,
        url: payload.imgUrl,
        owner: auth.currentUser?.uid
      });
      console.log("add new doc id:", docRef.id);
      navigation.navigate('Home');
    } catch (error: any) {
      setError(error.message);
    }
  }

  Yup.addMethod(Yup.string, 'uniqueIn', function (array = [], message) {
    return this.test('uniqueIn', message, function (value) {
      return array.filter((item: string) => item === value).length < 2;
    });
  });

  return (
    <Formik
      initialValues={{
        displayname: '',
        name: '',
        phone: '',
        open_hours: '',
        imgUrl: ''
      }}
      validationSchema={Yup.object({
        displayname: Yup.string().required('Please enter a valid display name.'),
        name: Yup.string().uniqueIn(names, 'Please enter a unique name').required('Please enter a valid name.'),
        phone: Yup.string().phone('US').required('Please enter a valid phone.'),
        imgUrl: Yup.string().required('Please select image.'),
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
        <ScrollView style={styles.loginForm}>
          <FormInput
            valueKey={'displayname'}
            text={'Display Name'}
            required={true}
            errors={errors}
            values={values}
            setValues={setValues}
            touched={touched}
            setTouched={setTouched} />

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
            valueKey={'phone'}
            text={'Phone'}
            required={true}
            errors={errors}
            values={values}
            setValues={setValues}
            touched={touched}
            setTouched={setTouched} />

          <FormInput
            valueKey={'open_hours'}
            text={'Open Hours'}
            required={true}
            errors={errors}
            values={values}
            setValues={setValues}
            touched={touched}
            setTouched={setTouched} />

          <ImagePicker 
            style={styles.marginBottom}
            setValues={setValues}
            values={values}
            error={errors.imgUrl} />

          <Button 
            testID='addFormBut'
            style={styles.marginBottom}
            mode="contained" 
            onPress={submitForm}>
            Submit
          </Button>

          {error && <Text style={styles.errorMsg}>
            {error}
          </Text>}         
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  loginForm: {
    marginTop:50,
    alignSelf: 'center',
    width: Platform.OS == 'web' ? 600 : 350
  },
  errorMsg: {
    color: ERROR,
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 16,
  },
  marginBottom: {
    marginBottom: 20
  }
});

export default AddForm;