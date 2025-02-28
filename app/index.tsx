import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Index() {
  const camera = useRef<typeof CameraView | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');

  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your camera permission</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await camera.current?.takePictureAsync();
    if (photo) {
      setPhoto(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView 
          style={styles.camera} 
          facing={facing}
        />
      </View>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePicture}
        >
          <Text style={styles.buttonText}>Take a photo</Text>
        </TouchableOpacity>
      </View>

      {photo && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: photo }}
            style={styles.preview}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 2,
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 40,
    marginHorizontal: 20,
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  previewContainer: {
    flex: 1,
    padding: 20,
  },
  preview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  }
});