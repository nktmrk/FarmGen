import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, Text, Image, Dimensions } from 'react-native';
import { getAuth } from 'firebase/auth';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot } from "firebase/firestore";
import _ from 'lodash';

import { firestore } from '../config/firebase';
import { Farm } from '../model/farm';

const {height} = Dimensions.get('window');

const auth = getAuth();

const Home = () => {
  const navigation = useNavigation(); 
  const [farms, setFarms] = useState<Farm[]>([]);

  useEffect(() => { 
    const unsub = onSnapshot(collection(firestore, "farm"), 
      (snapshot) => {
        let farmArr: Farm[] = [];
        snapshot.forEach(doc => {
          var farm:Farm = {
            displayname: doc.data().displayname,
            name: doc.data().name,
            openHours: doc.data().open_hours,
            phone: doc.data().phone,
            url: doc.data().url,
          };
          farmArr.push(farm);
        });
        setFarms(farmArr);
      },
      (error) => {
        console.log("onSnapshot error: ", error);
      });

    return () => unsub()
  }, []);

  const submitForm = () => {
    navigation.navigate('AddForm');
  }

  const signout = () => {
    auth.signOut().then(function() {
      console.log('signout successful');
    }).catch(function(error) {
      console.log('signout error');
    });
  }

  return (
    <View>
      <FlatList 
        accessibilityLabel='farms'
        style={styles.listStyle}
        data={farms}
        keyExtractor={(item: any) => item.url}
        renderItem={({item}) => {
          return (
            <View style={styles.listItem}>
              <Image style={styles.farmImg} source={{uri: item.url}} />
              <View>
                <Text style={styles.title}>Display Name: {item.displayname}</Text>
                <Text style={styles.subTitle}>Name: {item.name}</Text>
                <Text style={styles.subTitle}>Open Hours: {item.openHours}</Text>
                <Text style={styles.subTitle}>Phone: {item.phone}</Text>
              </View>              
            </View>
          )
        }} />

      <Button 
        testID='newFormBut'
        style={styles.addButton}
        mode="contained" 
        onPress={submitForm}>
        Add New Form
      </Button>
      
      <Button 
        testID='logoutBut'
        style={styles.addButton}
        mode="contained" 
        onPress={signout}>
        LogOut
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14
  },
  listStyle: {
    marginVertical: 20,
    height: height - 300
  },
  listItem: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  farmImg: {
    width: 100,
    height: 100,
    marginHorizontal: 30,
    borderRadius: 5,
  },
  addButton: {
    width: 200,
    marginBottom: 20,
    alignSelf: 'center'
  }
});

export default Home;