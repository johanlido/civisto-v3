<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="auth-container">
        <div class="logo-container">
          <h1 class="app-name">Civisto</h1>
          <p class="tagline">Make your community better today</p>
        </div>
        
        <form @submit.prevent="handleSignIn">
          <ion-card>
            <ion-card-content>
              <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input 
                  v-model="credentials.email" 
                  type="email" 
                  required
                  autocomplete="email"
                ></ion-input>
              </ion-item>
              
              <ion-item class="ion-margin-top">
                <ion-label position="floating">Password</ion-label>
                <ion-input 
                  v-model="credentials.password" 
                  type="password" 
                  required
                  autocomplete="current-password"
                ></ion-input>
              </ion-item>
              
              <div class="ion-margin-top ion-text-end">
                <ion-button fill="clear" size="small" router-link="/auth/forgot-password">
                  Forgot Password?
                </ion-button>
              </div>
              
              <ion-button 
                type="submit" 
                expand="block" 
                class="ion-margin-top"
                :disabled="isLoading"
              >
                <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
                <span v-else>Sign In</span>
              </ion-button>
            </ion-card-content>
          </ion-card>
        </form>
        
        <div class="signup-prompt ion-text-center ion-margin-top">
          <p>Don't have an account?</p>
          <ion-button fill="clear" router-link="/auth/signup">
            Create Account
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
import { ref } from 'vue';
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
  IonToast
} from '@ionic/vue';
import { signIn, UserCredentials } from '@/services/supabase';

const router = useRouter();
const credentials = ref<UserCredentials>({
  email: '',
  password: ''
});
const isLoading = ref(false);
const errorMessage = ref('');

const handleSignIn = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    const { user, error } = await signIn(credentials.value);
    
    if (error) {
      errorMessage.value = error.message || 'Failed to sign in. Please try again.';
      return;
    }
    
    if (user) {
      // Redirect to home page after successful login
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

.signup-prompt {
  margin-top: 2rem;
}

.signup-prompt p {
  margin-bottom: 0.5rem;
  color: var(--ion-color-medium);
}
</style>
