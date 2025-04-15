import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState(auth.currentUser?.displayName || '');

  const saveChanges = () => {
    if (!name.trim()) {
      Alert.alert("Invalid Name", "Display name cannot be empty.");
      return;
    }

    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        Alert.alert("Success", "Profile updated.");
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <Input
        label="Display Name"
        value={name}
        onChangeText={(text) => setName(text)}
        autoFocus
      />

      <Button
        title="Save Changes"
        onPress={saveChanges}
        buttonStyle={styles.saveButton}
      />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, padding: 20, backgroundColor: '#fff',
  },
  header: {
    fontSize: 26, fontWeight: 'bold', marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#C8102E',
    borderRadius: 8,
  },
});
