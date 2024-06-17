import { Pressable, StyleSheet, Image } from "react-native";
import { IAlbum, IPicture } from "@/models";
import { View } from "./Themed";
import { MonoText } from "./StyledText";
import { useEffect, useState } from "react";
import { getPicturesByAlbumId } from "@/actions";
import { router } from "expo-router";

interface AlbumProps {
  album: IAlbum;
  renderPictures: boolean;
  pressable: boolean;
}

export function Album({ album, renderPictures, pressable }: AlbumProps) {
  const [pictures, setPictures] = useState<IPicture[]>([]);

  useEffect(() => {
    const fetchPictures = async () => {
      const response = await getPicturesByAlbumId(album.id);
      setPictures(response);
    };
    fetchPictures();
  }, []);

  const handleAlbumPress = () => {
    if (pressable) {
      router.push(`/albums/${album.id}`);
    }
  };

  return (
    <Pressable onPress={handleAlbumPress}>
      <View style={[styles.container, { marginBottom: 20 }]}>
        <MonoText style={styles.title}>{album.title}</MonoText>
        <MonoText>{pictures.length} pictures</MonoText>

        {renderPictures &&
          pictures.map((picture) => (
            <View key={picture.id} style={styles.commentContainer}>
              <View style={styles.separator} />
              <Image source={{ uri: picture.thumbnailUrl }} style={{ width: 150, height: 150 }} />
            </View>
          ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  separator: {
    marginBottom: 15,
    height: 1,
    backgroundColor: "#eee",
  },
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#373A40",
    padding: 20,
    gap: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  desc: {
    fontWeight: "semibold",
    fontSize: 16,
  },
  commentContainer: {
    backgroundColor: "#373A40",
    padding: 10,
    margin: 5,
    gap: 10,
  },
});
