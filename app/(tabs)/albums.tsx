import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { IAlbum } from "@/models";
import { getAlbums } from "@/actions";
import { Album } from "@/components/Album";

export default function AlbumsScreen() {
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await getAlbums();
      setAlbums(response);
    };
    fetchAlbums();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {albums.map((album) => (
          <Album key={album.id} album={album} pressable={true} renderPictures={false} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
