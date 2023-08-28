import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storageRef } from "./firebase";

export async function storeFile(file: File, fileName: string) {
  const file_upload = new Uint8Array(await file.arrayBuffer())
  const fileRef = ref(storageRef, fileName);
  return await uploadBytes(fileRef, file_upload);
}

export async function downLoadFile(filename: string) {
    const fileRef = ref(storageRef, `gs://tomato-shop-b4874.appspot.com/${filename}`);
    const file = await getDownloadURL(fileRef);
    return file;
}
