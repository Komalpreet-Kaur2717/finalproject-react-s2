import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { auth } from '../firebase';
import { Icon, Button } from '@rneui/themed';

const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth();

  const handleLogout = () => {
    auth.signOut()
      .then(() => navigation.replace("Login"))
      .catch((error) => alert("Logout failed"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <Image
        style={styles.avatar}
        source={{
          uri: `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=C8102E&color=fff&size=256`,
        }}
      />

      <Text style={styles.name}>{user?.displayName || "Anonymous"}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <View style={styles.options}>
        <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate("EditProfile")}>
          <Icon name="edit" type="feather" color="#C8102E" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow} onPress={() => navigation.navigate("Settings")}>
          <Icon name="settings" type="feather" color="#C8102E" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow} onPress={handleLogout}>
          <Icon name="log-out" type="feather" color="#C8102E" />
          <Text style={[styles.optionText, { color: "#C8102E" }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#C8102E',
    height: 150,
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: -60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  options: {
    width: '90%',
    marginTop: 30,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
  },
});
