import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import styles from '../styles/HomeScreenStyle';
import { useAuth } from '../components/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const signOut = () => {
    auth.signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Welcome back ${user?.displayName}`,
      headerStyle: { backgroundColor: '#C8102E' },
      headerTitleStyle: styles.headerTitle,
      headerTintColor: "white",
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={signOut}>
          <Icon name="log-out" type="feather" color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 20, marginRight: 15 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Icon name="user" type="feather" color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
            <Icon name="plus" type="feather" color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, user]);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 10 }}>
        <Input
          placeholder="Search chats"
          value={search}
          onChangeText={(text) => setSearch(text)}
          leftIcon={{ type: 'feather', name: 'search', color: '#999' }}
          inputContainerStyle={{ borderBottomWidth: 1 }}
        />
      </View>

      {chats
        .filter(({ data: { chatName } }) =>
          chatName.toLowerCase().includes(search.toLowerCase())
        )
        .map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
    </ScrollView>
  );
};

export default HomeScreen;
