import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ref } from 'vue';

export interface CapturedImage {
  dataUrl: string;
  format: string;
}

export function useCamera() {
  const capturedImage = ref<CapturedImage | null>(null);
  const isCapturing = ref(false);
  const captureError = ref<string | null>(null);

  // Request camera permissions
  const requestPermissions = async (): Promise<boolean> => {
    try {
      const permissions = await Camera.requestPermissions();
      return permissions.camera === 'granted';
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      return false;
    }
  };

  // Take a photo using the device camera
  const takePhoto = async (): Promise<CapturedImage> => {
    isCapturing.value = true;
    captureError.value = null;

    try {
      // Request permissions first
      await requestPermissions();

      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      if (!photo.dataUrl) {
        throw new Error('Failed to capture image');
      }

      const image: CapturedImage = {
        dataUrl: photo.dataUrl,
        format: photo.format
      };

      capturedImage.value = image;
      return image;
    } catch (error: any) {
      captureError.value = error.message || 'Failed to capture image';
      throw error;
    } finally {
      isCapturing.value = false;
    }
  };

  // Select a photo from the device gallery
  const selectPhoto = async (): Promise<CapturedImage> => {
    isCapturing.value = true;
    captureError.value = null;

    try {
      // Request permissions first
      await requestPermissions();

      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      if (!photo.dataUrl) {
        throw new Error('Failed to select image');
      }

      const image: CapturedImage = {
        dataUrl: photo.dataUrl,
        format: photo.format
      };

      capturedImage.value = image;
      return image;
    } catch (error: any) {
      captureError.value = error.message || 'Failed to select image';
      throw error;
    } finally {
      isCapturing.value = false;
    }
  };

  // Clear the captured image
  const clearImage = () => {
    capturedImage.value = null;
  };

  return {
    capturedImage,
    isCapturing,
    captureError,
    requestPermissions,
    takePhoto,
    selectPhoto,
    clearImage
  };
}
