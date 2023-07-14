# React Native Stories Trabbe ⚡

#### Basic Usage

```js
import React from "react";
import { View } from "react-native";
import Stories from "react-native-stories-trabbe";

const data = [
  {
    uuid: "cab3d8d6-cfff-4703-a01f-766bbc977ca5",
    uuid_oferta_trabalho_fk: "754de3a0-dbb1-47b8-8f57-548f8adbc1fa",
    ds_nome: "Vídeo 3",
    ds_arquivo:
      "https://trabbe-upload-homolog.s3.us-east-2.amazonaws.com/videos/10_segundos.mp4",
    fl_status: "A",
    createdAt: "2023-06-13T16:38:42.586Z",
    updatedAt: "2023-06-13T16:38:42.586Z",
  },
  {
    uuid: "4e6ac3e3-4e62-4e5d-b6fe-5dc188b2571a",
    uuid_oferta_trabalho_fk: "754de3a0-dbb1-47b8-8f57-548f8adbc1fa",
    ds_nome: "Vídeo 2",
    ds_arquivo:
      "https://trabbe-upload-homolog.s3.us-east-2.amazonaws.com/videos/regressiva_10_segundos.mp4",
    fl_status: "A",
    createdAt: "2023-06-13T16:38:25.789Z",
    updatedAt: "2023-06-13T16:38:25.789Z",
  },
  {
    uuid: "7ecaab89-29ad-463a-8de6-ac6a952ac189",
    uuid_oferta_trabalho_fk: "754de3a0-dbb1-47b8-8f57-548f8adbc1fa",
    ds_nome: "Imagem 1",
    ds_arquivo:
      "https://trabbe-upload-homolog.s3.us-east-2.amazonaws.com/videos/png-transparent-tree-tree-leaf-grass-green.png",
    fl_status: "A",
    createdAt: "2023-06-13T16:37:16.915Z",
    updatedAt: "2023-06-13T16:37:16.915Z",
  },
];

export default function Demo() {
  const [isModelOpen, setModel] = React.useState(false);
  return (
    <View style={{ flex: 1, paddingVertical: 20 }}>
      <Stories isModelOpen={isModelOpen} setModel={setModel} data={[data]} />
    </View>
  );
}
```
