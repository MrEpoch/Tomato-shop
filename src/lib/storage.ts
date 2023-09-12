import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storageRef } from './firebase';
import { FIREBASE_STORAGE_BUCKET } from '$env/static/private';

export async function storeFile(file: File, fileName: string) {
	try {
		const file_upload = new Uint8Array(await file.arrayBuffer());
		const fileRef = ref(storageRef, fileName);
		return await uploadBytes(fileRef, file_upload);
	} catch (error) {
		return await handle_storage_errors(error);
	}
}

export async function downLoadFile(filename: string) {
	try {
		const fileRef = ref(storageRef, `gs://${FIREBASE_STORAGE_BUCKET}/${filename}`);
		const file = await getDownloadURL(fileRef);
		return file;
	} catch (error) {
		console.log(error);
		return await handle_storage_errors(error);
	}
}

export async function deleteFile(filename: string) {
	try {
		const fileRef = ref(storageRef, `gs://${FIREBASE_STORAGE_BUCKET}/${filename}`);
		await deleteObject(fileRef);
	} catch (error) {
		return await handle_storage_errors(error);
	}
}

export async function handle_storage_errors(error, handler?: any) {
	switch (error.code) {
		case 'storage/unknown':
			console.log('Unknown error occurred, inspect error.serverResponse');
			handler(error.code);
			break;
		case 'storage/object-not-found':
			console.log('Object does not exist');
			handler(error.code);
			break;
		case 'storage/bucket-not-found':
			console.log('Bucket does not exist');
			handler(error.code);
			break;
		case 'storage/project-not-found':
			console.log('Project does not exist');
			handler(error.code);
			break;
		case 'storage/quota-exceeded':
			console.log('Quota on your Cloud Storage bucket has been exceeded.');
			handler(error.code);
			break;
		case 'storage/unauthenticated':
			console.log('User is unauthenticated. Authenticate and try again.');
			handler(error.code);
			break;
		case 'storage/unauthorized':
			console.log('User does not have permission to access the object');
			handler(error.code);
			break;
		case 'storage/retry-limit-exceeded':
			console.log(
				'The maximum time limit on an operation (upload, download, delete, etc.) has been exceeded.'
			);
			handler(error.code);
			break;
		case 'storage/invalid-checksum':
			console.log(
				'File on the client does not match the checksum of the file received by the server.'
			);
			handler(error.code);
			break;
		case 'storage/canceled':
			console.log('User canceled the upload/download');
			handler(error.code);
			break;
		case 'storage/invalid-event-name':
			console.log('The provided event name is invalid.');
			handler(error.code);
			break;
		case 'storage/invalid-url':
			console.log('The provided URL is not valid.');
			handler(error.code);
			break;
		case 'storage/invalid-argument':
			console.log(
				'An invalid argument was provided. Check function call and make sure the provided arguments match the function signature.'
			);
			handler(error.code);
			break;
		case 'storage/no-default-bucket':
			console.log('No default bucket is set in the Storage config');
			handler(error.code);
			break;
		case 'storage/cannot-slice-blob':
			console.log('Cannot slice blob for upload. Please retry the upload.');
			handler(error.code);
			break;
		case 'storage/server-file-wrong-size':
			console.log('Server recorded incorrect upload file size, please retry the upload.');
			handler(error.code);
			break;
	}
	return error.code;
}
