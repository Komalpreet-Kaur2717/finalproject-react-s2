import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <TouchableOpacity style={styles.row}>
        <Icon name="bell" type="feather" color="#C8102E" />
        <Text style={styles.text}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row}>
        <Icon name="shield" type="feather" color="#C8102E" />
        <Text style={styles.text}>Privacy & Security</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.row}>
        <Icon name="help-circle" type="feather" color="#C8102E" />
        <Text style={styles.text}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Icon name="edit-2" type="feather" color="#C8102E" />
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', padding: 20,
  },
  header: {
    fontSize: 26, fontWeight: 'bold', marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18, marginLeft: 15,
  },
});
