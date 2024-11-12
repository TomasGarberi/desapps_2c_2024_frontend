import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal, Button } from 'react-native';

export default function UserSuggestion({ user, onPress }) {
  const [isFollowing, setIsFollowing] = useState(false); // Estado para seguimiento
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para mostrar el popup

  // Función para manejar el seguimiento
  const handleFollow = () => {
    if (isFollowing) {
      // Si ya está siguiendo, mostrar popup de confirmación para dejar de seguir
      setShowConfirmation(true);
    } else {
      // Si no está siguiendo, empezar a seguir
      setIsFollowing(true);
      // Aquí iría la lógica para actualizar el feed del usuario
    }
  };

  // Confirmar dejar de seguir
  const confirmUnfollow = () => {
    setIsFollowing(false);
    setShowConfirmation(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <TouchableOpacity
        onPress={handleFollow}
        style={isFollowing ? styles.unfollowButton : styles.followButton}
      >
        <Text style={isFollowing ? styles.unfollowButtonText : styles.followButtonText}>
          {isFollowing ? 'Eliminar' : 'Seguir'}
        </Text>
      </TouchableOpacity>

      {/* Modal de confirmación */}
      {showConfirmation && (
        <Modal
          transparent
          animationType="fade"
          visible={showConfirmation}
          onRequestClose={() => setShowConfirmation(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                ¿Estás seguro de que deseas dejar de seguir a esta persona?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowConfirmation(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={confirmUnfollow}
                >
                  <Text style={styles.confirmButtonText}>Sí</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'transparent',
    borderImage: 'linear-gradient(to right, #902CA5, #00F0FF) 1',
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  username: {
    fontSize: 12,
    color: '#902CA5',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 10,
    color: '#3B3F58',
  },
  followButton: {
    backgroundColor: '#3B3F58',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  unfollowButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#4F5269',
    borderWidth: 1,
  },
  unfollowButtonText: {
    color: '#3B3F58',
    fontSize: 11,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#2B2B2B',
    width: 91,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#2B2B2B',
    width: 91,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
