import { Capacitor } from '@capacitor/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { ref, onMounted } from 'vue';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  address?: string;
  timestamp: number;
}

export interface GeolocationError {
  code: number;
  message: string;
}

export function useGeolocation() {
  const currentPosition = ref<LocationData | null>(null);
  const locationError = ref<GeolocationError | null>(null);
  const isLoading = ref(false);
  const hasPermission = ref(false);

  // Check if running on a native platform
  const isNative = Capacitor.isNativePlatform();

  // Request permissions
  const requestPermissions = async (): Promise<boolean> => {
    try {
      if (isNative) {
        const permissionStatus = await Geolocation.requestPermissions();
        hasPermission.value = permissionStatus.location === 'granted';
        return hasPermission.value;
      } else {
        // For web, we'll check when we try to get the position
        return true;
      }
    } catch (error) {
      console.error('Error requesting geolocation permissions:', error);
      return false;
    }
  };

  // Get current position
  const getCurrentPosition = async (): Promise<LocationData> => {
    isLoading.value = true;
    locationError.value = null;

    try {
      // Request permissions first if on native platform
      if (isNative && !hasPermission.value) {
        const granted = await requestPermissions();
        if (!granted) {
          throw {
            code: 1,
            message: 'Location permission not granted'
          };
        }
      }

      const position: Position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp || Date.now()
      };
      
      currentPosition.value = locationData;
      return locationData;
    } catch (error: any) {
      const geoError: GeolocationError = {
        code: error.code || 0,
        message: error.message || 'Unknown geolocation error'
      };
      locationError.value = geoError;
      throw geoError;
    } finally {
      isLoading.value = false;
    }
  };

  // Get address from coordinates using reverse geocoding
  const getAddressFromCoordinates = async (latitude: number, longitude: number): Promise<string> => {
    try {
      // This would typically use a geocoding service like Google Maps, Mapbox, etc.
      // For now, we'll return a placeholder
      // In a real implementation, you would make an API call to a geocoding service
      
      // Simulating an API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return a placeholder address based on the coordinates
      return `Location at ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
    } catch (error) {
      console.error('Error getting address:', error);
      return 'Unknown location';
    }
  };

  // Watch position changes
  let watchId: string | null = null;
  
  const watchPosition = async () => {
    try {
      // Request permissions first if on native platform
      if (isNative && !hasPermission.value) {
        const granted = await requestPermissions();
        if (!granted) {
          throw {
            code: 1,
            message: 'Location permission not granted'
          };
        }
      }

      // Clear any existing watch
      if (watchId !== null) {
        await clearWatch();
      }

      watchId = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 10000
        },
        (position, err) => {
          if (err) {
            locationError.value = {
              code: err.code || 0,
              message: err.message || 'Unknown geolocation error'
            };
            return;
          }

          if (position) {
            currentPosition.value = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp || Date.now()
            };
            locationError.value = null;
          }
        }
      );

      return watchId;
    } catch (error: any) {
      const geoError: GeolocationError = {
        code: error.code || 0,
        message: error.message || 'Unknown geolocation error'
      };
      locationError.value = geoError;
      throw geoError;
    }
  };

  // Clear watch
  const clearWatch = async () => {
    if (watchId !== null) {
      await Geolocation.clearWatch({ id: watchId });
      watchId = null;
    }
  };

  // Get full location data with address
  const getFullLocationData = async (): Promise<LocationData> => {
    try {
      const position = await getCurrentPosition();
      const address = await getAddressFromCoordinates(position.latitude, position.longitude);
      
      return {
        ...position,
        address
      };
    } catch (error) {
      throw error;
    }
  };

  // Clean up on component unmount
  onMounted(() => {
    // Request permissions on mount if on native platform
    if (isNative) {
      requestPermissions();
    }
  });

  return {
    currentPosition,
    locationError,
    isLoading,
    hasPermission,
    requestPermissions,
    getCurrentPosition,
    getAddressFromCoordinates,
    watchPosition,
    clearWatch,
    getFullLocationData
  };
}
