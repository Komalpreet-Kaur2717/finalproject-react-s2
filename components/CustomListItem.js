import React, { useState } from 'react';
import { ListItem, Icon } from '@rneui/themed';
import styles from '../styles/CustomListItemStyle';
import { Image, Modal, Text, View, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const confirmDelete = () => {
    console.log("Delete tapped for:", chatName); 
    setModalVisible(true);
  };

  const deleteChat = async () => {
    console.log("Confirmed delete for:", id); 
    try {
      await deleteDoc(doc(db, 'chats', id));
      console.log("Chat deleted successfully");
    } catch (error) {
      console.error("Error deleting chat:", error.code, error.message);
      alert("Failed to delete chat.");
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <>
      <ListItem bottomDivider>
        <TouchableOpacity
          onPress={() => enterChat(id, chatName)}
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        >
          <Image
            source={require('../assets/fanshawe-icon.png')}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{chatName}</ListItem.Title>
          </ListItem.Content>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDelete}>
          <Icon
            name="trash"
            type="feather"
            color="red"
          />
        </TouchableOpacity>
      </ListItem>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>
              Delete chat "{chatName}"?
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#C8102E', fontWeight: 'bold', marginRight: 20 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteChat}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomListItem;
