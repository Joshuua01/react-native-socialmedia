import { getAlbums } from "@/actions";
import { Album } from "@/components/Album";
import { View } from "@/components/Themed";
import { IAlbum } from "@/models";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

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
          <View key={album.id} style={styles.container}>
            <Album album={album} pressable={true} renderPictures={false} />
            <View style={styles.separator} />
          </View>
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
  separator: {
    marginVertical: 15,
    height: 1,
    width: "100%",
    backgroundColor: "#eee",
  },
});
