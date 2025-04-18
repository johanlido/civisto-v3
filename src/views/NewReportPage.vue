<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>New Report</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="container">
        <h1>Report an Issue</h1>
        <p class="subtitle">Help make your community better by reporting issues you find</p>
        
        <form @submit.prevent="submitReport">
          <ion-card>
            <ion-card-content>
              <!-- Location Information -->
              <div class="location-section" v-if="locationData">
                <div class="section-header">
                  <h2>Location</h2>
                  <ion-button fill="clear" size="small" @click="refreshLocation">
                    <ion-icon slot="icon-only" :icon="refreshOutline"></ion-icon>
                  </ion-button>
                </div>
                
                <div class="location-info">
                  <ion-icon :icon="locationOutline" class="location-icon"></ion-icon>
                  <div class="location-details">
                    <div class="location-address">{{ locationData.address || 'Getting address...' }}</div>
                    <div class="location-coordinates">
                      {{ locationData.latitude.toFixed(4) }}°, {{ locationData.longitude.toFixed(4) }}°
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="location-loading">
                <ion-spinner name="crescent"></ion-spinner>
                <p>Getting your location...</p>
              </div>
              
              <!-- Category Selection -->
              <ion-item class="form-item">
                <ion-label position="stacked">Category</ion-label>
                <ion-select v-model="reportData.category" interface="action-sheet" placeholder="Select a category" required>
                  <ion-select-option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </ion-select-option>
                </ion-select>
              </ion-item>
              
              <!-- Title Input -->
              <ion-item class="form-item">
                <ion-label position="stacked">Title</ion-label>
                <ion-input v-model="reportData.title" placeholder="Brief description of the issue" required></ion-input>
              </ion-item>
              
              <!-- Description Input -->
              <ion-item class="form-item">
                <ion-label position="stacked">Description</ion-label>
                <ion-textarea 
                  v-model="reportData.description" 
                  placeholder="Provide details about the issue" 
                  required
                ></ion-textarea>
              </ion-item>
              
              <!-- Image Upload -->
              <div class="image-section">
                <div class="section-header">
                  <h2>Add Photo</h2>
                </div>
                
                <div class="image-upload-area" v-if="!capturedImage">
                  <ion-button expand="block" @click="openCamera" class="upload-button">
                    <ion-icon slot="start" :icon="cameraOutline"></ion-icon>
                    Take Photo
                  </ion-button>
                  
                  <ion-button expand="block" @click="openGallery" class="upload-button" fill="outline">
                    <ion-icon slot="start" :icon="imageOutline"></ion-icon>
                    Choose from Gallery
                  </ion-button>
                </div>
                
                <div class="image-preview" v-else>
                  <img :src="capturedImage.dataUrl" alt="Captured image" class="preview-image" />
                  <ion-button fill="clear" class="remove-image" @click="clearImage">
                    <ion-icon :icon="closeCircleOutline"></ion-icon>
                  </ion-button>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
          
          <ion-button type="submit" expand="block" class="submit-button" :disabled="isSubmitting || !locationData">
            <ion-spinner v-if="isSubmitting" name="crescent"></ion-spinner>
            <span v-else>Submit Report</span>
          </ion-button>
        </form>
      </div>
      
      <!-- Success Modal -->
      <ion-modal :is-open="showSuccessModal" @didDismiss="closeSuccessModal">
        <ion-content class="success-modal-content">
          <div class="success-container">
            <div class="success-icon">
              <ion-icon :icon="checkmarkCircleOutline" size="large"></ion-icon>
            </div>
            <h2>Report Submitted!</h2>
            <p>Thank you for making your community better. We'll notify you when there's an update.</p>
            <div class="report-id" v-if="submittedReportId">Report ID: #{{ submittedReportId }}</div>
            <ion-button expand="block" @click="closeSuccessModal">Done</ion-button>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonSpinner,
  IonModal,
  IonToast
} from '@ionic/vue';
import { 
  locationOutline, 
  refreshOutline, 
  cameraOutline, 
  imageOutline, 
  closeCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { useGeolocation, LocationData } from '@/composables/useGeolocation';
import { useCamera, CapturedImage } from '@/composables/useCamera';
import { useIssueReporting, IssueReport } from '@/composables/useIssueReporting';

const router = useRouter();

// Geolocation
const { getCurrentPosition, getAddressFromCoordinates } = useGeolocation();
const locationData = ref<{ latitude: number; longitude: number; address: string; timestamp: number } | null>(null);

// Camera
const capturedImage = ref<{ dataUrl: string } | null>(null);
const { takePhoto, selectPhoto, clearImage } = useCamera();

// Issue reporting
const { isSubmitting, createReport } = useIssueReporting();
const showSuccessModal = ref(false);
const submittedReportId = ref<string | undefined>('');

// Form data
const reportData = ref({
  title: '',
  description: '',
  category: '',
  userId: 'current-user' // This would be the actual user ID in a real implementation
});

// Categories
const categories = [
  'Street Lighting',
  'Road Damage',
  'Graffiti',
  'Trash/Litter',
  'Safety Hazard',
  'Public Facilities',
  'Noise',
  'Other'
];

// Get location on mount
onMounted(async () => {
  try {
    const position = await getCurrentPosition();
    const address = await getAddressFromCoordinates(position.latitude, position.longitude);
    
    locationData.value = {
      ...position,
      address,
      timestamp: position.timestamp // Add timestamp here
    };
  } catch (error: any) {
/*    presentToast({
      message: `Failed to get location: ${error.message}`,
      duration: 3000,
      color: 'danger'
    });*/
  }
});

// Refresh location
const refreshLocation = async () => {
  locationData.value = null;
  
  try {
    const position = await getCurrentPosition();
    const address = await getAddressFromCoordinates(position.latitude, position.longitude);
    
    locationData.value = {
      ...position,
      address,
      timestamp: position.timestamp // Add timestamp here
    };
  } catch (error: any) {
/*    presentToast({
      message: `Failed to refresh location: ${error.message}`,
      duration: 3000,
      color: 'danger'
    });*/
  }
};

// Open camera
const openCamera = async () => {
  try {
    await takePhoto();
  } catch (error: any) {
   /* presentToast({
      message: `Failed to take photo: ${error.message}`,
      duration: 3000,
      color: 'danger'
    });*/
  }
};

// Open gallery
const openGallery = async () => {
  try {
    await selectPhoto();
  } catch (error: any) {
/*    presentToast({
      message: `Failed to select photo: ${error.message}`,
      duration: 3000,
      color: 'danger'
    });*/
  }
};

// Submit report
const submitReport = async () => {
  if (!locationData.value) {
/*    presentToast({
      message: 'Location data is required',
      duration: 3000,
      color: 'warning'
    });*/
    return;
  }
  
  try {
    const report = await createReport({
      ...reportData.value,
      location: locationData.value,
      imageUrl: capturedImage.value?.dataUrl
    });
    
    submittedReportId.value = report.id;
    showSuccessModal.value = true;
    
    // Reset form
    reportData.value = {
      title: '',
      description: '',
      category: '',
      userId: 'current-user'
    };
    clearImage();
  } catch (error: any) {
   /* presentToast({
      message: `Failed to submit report: ${error.message}`,
      duration: 3000,
      color: 'danger'
    });*/
  }
};

// Close success modal
const closeSuccessModal = () => {
  showSuccessModal.value = false;
  router.replace('/');
};
</script>

<style scoped>
.container {
  max-width: 650px;
  margin: 0 auto;
  padding-bottom: 70px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  font-weight: 400;
  color: var(--ion-color-medium);
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.location-section {
  margin-bottom: 24px;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--ion-color-light);
  border-radius: 8px;
  padding: 12px;
}

.location-icon {
  color: var(--ion-color-primary);
  font-size: 24px;
}

.location-details {
  flex: 1;
}

.location-address {
  font-size: 16px;
  font-weight: 500;
}

.location-coordinates {
  font-size: 14px;
  color: var(--ion-color-medium);
}

.location-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.location-loading p {
  margin-top: 12px;
  color: var(--ion-color-medium);
}

.form-item {
  margin-bottom: 16px;
}

.image-section {
  margin-top: 24px;
}

.image-upload-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.upload-button {
  margin: 0;
}

.image-preview {
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.preview-image {
  width: 100%;
  height: auto;
  display: block;
}

.remove-image {
  position: absolute;
  top: 8px;
  right: 8px;
  --background: rgba(0, 0, 0, 0.5);
  --border-radius: 50%;
  margin: 0;
  width: 36px;
  height: 36px;
}

.submit-button {
  margin-top: 24px;
}

/* Success Modal */
.success-modal-content {
  --background: var(--ion-color-light);
}

.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  text-align: center;
  height: 100%;
}

.success-icon {
  width: 80px;
  height: 80px;
  background-color: var(--ion-color-success-tint);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  color: var(--ion-color-success);
}

.success-container h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
}

.success-container p {
  font-size: 16px;
  color: var(--ion-color-medium);
  margin-bottom: 24px;
  max-width: 300px;
}

.report-id {
  font-size: 18px;
  font-weight: 600;
  color: var(--ion-color-primary);
  margin-bottom: 32px;
}
</style>
