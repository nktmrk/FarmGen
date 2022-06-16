import React from 'react';
import {HelperText, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

import { BLUE_RIBBON } from '../styles/colors';

interface Props {
  valueKey: string;
  text: string;
  required: boolean;
  errors: any;
  values: any;
  setValues: (values: any, shouldValidate?: boolean) => void;
  touched: any;
  setTouched: (touched: any, shouldValidate?: boolean) => void;
  secureTextEntry?: boolean;
  right?: any;
  style?: any;
}

const FormInput = ({
  valueKey,
  text,
  required,
  errors,
  values,
  setValues,
  touched,
  setTouched,
  secureTextEntry = false,
  right = null,
  style = {},
}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        testID={valueKey}
        onChangeText={(textValue: string) => {
          setValues((formValues: any) => ({
            ...formValues,
            [valueKey]: textValue,
          }));
        }}
        onBlur={() => {
          setTouched({...touched, [valueKey]: true});
        }}
        value={values?.[valueKey]}
        placeholder={text}
        label={text + (required ? '*' : '')}
        mode="outlined"
        style={[styles.input, style]}
        error={!!(touched?.[valueKey] && errors?.[valueKey])}
        secureTextEntry={secureTextEntry}
        theme={{colors: {primary: BLUE_RIBBON}}}
        right={right}
      />
      <HelperText type="error" visible={true} style={styles.helper}>
        {errors?.[valueKey] && touched?.[valueKey] && 'ⓧ ' + errors?.[valueKey]}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: 'white',
  },
  helper: {
    height: 24,
  },
});

export default FormInput;
