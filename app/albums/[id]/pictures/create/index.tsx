import { addPictureToAlbum } from "@/actions";
import { MonoText } from "@/components/StyledText";
import { useAuth } from "@/contexts/AuthContext";
import { IPicture } from "@/models";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerSuccessResult } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

const PictureCreateScreen = () => {
  const [file, setFile] = useState<ImagePickerSuccessResult | null>(null);
  const { user } = useAuth();
  const { id } = useLocalSearchParams();

  const handleSubmit = async () => {
    if (!user) {
      console.log("User not found");
      return;
    }

    if (file) {
      const picture: IPicture = {
        albumId: Number(id),
        url: file.assets[0].uri,
        thumbnailUrl: file.assets[0].uri,
        title: file.assets[0].fileName || "",
      };
      await addPictureToAlbum(picture);
      router.back();
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setFile(result);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <MonoText style={styles.title}>Add picture</MonoText>
        <MonoText style={styles.text}>Upload image</MonoText>
      </View>
      <View style={styles.separator} />

      {file ? (
        <>
          <Pressable onPress={pickImage}>
            <Image source={{ uri: file.assets[0].uri }} style={{ width: 200, height: 200 }} />
          </Pressable>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <MonoText style={styles.buttonText}>Submit</MonoText>
          </Pressable>
        </>
      ) : (
        <Pressable style={styles.button} onPress={pickImage}>
          <MonoText style={styles.buttonText}>Upload</MonoText>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 50,
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 60,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    color: "#ccc",
    marginBottom: 10,
  },
  button: {
    height: 60,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#ccc",
    padding: 15,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "semibold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "85%",
    backgroundColor: "#eee",
    opacity: 0.5,
  },
});
export default PictureCreateScreen;
