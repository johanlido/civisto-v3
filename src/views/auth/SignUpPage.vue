<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/auth/signin"></ion-back-button>
        </ion-buttons>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="auth-container">
        <div class="logo-container">
          <h1 class="app-name">Civisto</h1>
          <p class="tagline">Join our community today</p>
        </div>
        
        <form @submit.prevent="handleSignUp">
          <ion-card>
            <ion-card-content>
              <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input 
                  v-model="registration.email" 
                  type="email" 
                  required
                  autocomplete="email"
                ></ion-input>
              </ion-item>
              
              <ion-item class="ion-margin-top">
                <ion-label position="floating">First Name</ion-label>
                <ion-input 
                  v-model="registration.firstName" 
                  type="text" 
                  required
                  autocomplete="given-name"
                ></ion-input>
              </ion-item>
              
              <ion-item class="ion-margin-top">
                <ion-label position="floating">Last Name</ion-label>
                <ion-input 
                  v-model="registration.lastName" 
                  type="text" 
                  required
                  autocomplete="family-name"
                ></ion-input>
              </ion-item>
              
              <ion-item class="ion-margin-top">
                <ion-label position="floating">Age</ion-label>
                <ion-input 
                  v-model="registration.age" 
                  type="number" 
                  min="18"
                  max="120"
                  required
                ></ion-input>
              </ion-item>
              
              <ion-item class="ion-margin-top">
                <ion-label position="floating">Gender</ion-label>
                <ion-select v-model="registration.gender" interface="action-sheet" required>
                  <ion-select-option value="male">Male</ion-select-option>
                  <ion-select-option value="female">Female</ion-select-option>
                  <ion-select-option value="non-binary">Non-binary</ion-select-option>
                  <ion-select-option value="prefer-not-to-say">Prefer not to say</ion-select-option>
                </ion-select>
              </ion-item>
              
              <ion-item class="ion-margin-top">
                <ion-label position="floating">Password</ion-label>
                <ion-input 
                  v-model="registration.password" 
                  type="password" 
                  required
                  autocomplete="new-password"
                ></ion-input>
              </ion-item>
              
              <ion-item class="ion-margin-top">
                <ion-label position="floating">Confirm Password</ion-label>
                <ion-input 
                  v-model="confirmPassword" 
                  type="password" 
                  required
                  autocomplete="new-password"
                ></ion-input>
              </ion-item>
              
              <ion-button 
                type="submit" 
                expand="block" 
                class="ion-margin-top"
                :disabled="isLoading || !isFormValid"
              >
                <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                <span v-else>Create Account</span>
              </ion-button>
            </ion-card-content>
          </ion-card>
        </form>
        
        <div class="signin-prompt ion-text-center ion-margin-top">
          <p>Already have an account?</p>
          <ion-button fill="clear" router-link="/auth/signin">
            Sign In
          </ion-button>
        </div>
        
        <ion-toast
          :is-open="!!errorMessage"
          :message="errorMessage"
          :duration="3000"
          @didDismiss="errorMessage = ''"
          color="danger"
        ></ion-toast>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonCard, 
  IonCardContent,
  IonSpinner,
  IonToast,
  IonBackButton,
  IonButtons,
  IonSelect,
  IonSelectOption
} from '@ionic/vue';
import { signUp, UserRegistration } from '@/services/supabase';

const router = useRouter();
const registration = ref<UserRegistration>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  age: 0,
  gender: ''
});
const confirmPassword = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const isFormValid = computed(() => {
  return (
    registration.value.email.trim() !== '' &&
    registration.value.password.trim() !== '' &&
    registration.value.firstName.trim() !== '' &&
    registration.value.lastName.trim() !== '' &&
    registration.value.age > 0 &&
    registration.value.gender !== '' &&
    registration.value.password === confirmPassword.value
  );
});

const handleSignUp = async () => {
  if (!isFormValid.value) {
    if (registration.value.password !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match';
    } else {
      errorMessage.value = 'Please fill in all required fields';
    }
    return;
  }
  
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const { user, error } = await signUp(registration.value);
    
    if (error) {
      errorMessage.value = error.message || 'Failed to create account. Please try again.';
      return;
    }
    
    if (user) {
      // Redirect to home page or confirmation page after successful signup
      router.replace('/');
    }
  } catch (err) {
    errorMessage.value = 'An unexpected error occurred. Please try again.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.logo-container {
  text-align: center;
  margin-bottom: 2rem;
}

.app-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--ion-color-primary);
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1rem;
  color: var(--ion-color-medium);
}

.signin-prompt {
  margin-top: 2rem;
}

.signin-prompt p {
  margin-bottom: 0.5rem;
  color: var(--ion-color-medium);
}
</style>
