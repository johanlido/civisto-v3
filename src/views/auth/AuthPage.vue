<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="auth-container">
        <!-- Logo Container -->
        <div class="logo-container">
          <h1 class="app-logo">Civisto</h1>
          <p class="tagline">Make your community better today</p>
        </div>
        
        <!-- Auth Tab Buttons -->
        <div class="tab-buttons">
          <button 
            class="tab-button" 
            :class="{ active: activeTab === 'signin' }" 
            @click="activeTab = 'signin'"
          >
            Sign In
          </button>
          <button 
            class="tab-button" 
            :class="{ active: activeTab === 'signup' }" 
            @click="activeTab = 'signup'"
          >
            Create Account
          </button>
        </div>
        
        <!-- Sign In Form -->
        <div class="auth-form" v-if="activeTab === 'signin'">
          <form @submit.prevent="handleSignIn">
            <div class="input-field">
              <label for="email">Email</label>
              <input 
                id="email"
                v-model="credentials.email" 
                type="email" 
                required 
                autocomplete="email"
                placeholder="Enter your email"
              >
            </div>
            
            <div class="input-field">
              <label for="password">Password</label>
              <input 
                id="password"
                v-model="credentials.password" 
                type="password" 
                required 
                autocomplete="current-password"
                placeholder="Enter your password"
              >
            </div>
            
            <div class="forgot-password">
              <a href="#" @click.prevent="handleForgotPassword">Forgot Password?</a>
            </div>
            
            <button type="submit" class="primary-button" :disabled="isLoading">
              <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
              <span v-else>Sign In</span>
            </button>
            
            <div class="divider">
              <span>or continue with</span>
            </div>
            
            <div class="social-buttons">
              <button type="button" class="social-button">
                <ion-icon :icon="logoGoogle" class="social-icon"></ion-icon>
              </button>
              <button type="button" class="social-button">
                <ion-icon :icon="logoApple" class="social-icon"></ion-icon>
              </button>
            </div>
          </form>
        </div>
        
        <!-- Sign Up Form -->
        <div class="auth-form" v-if="activeTab === 'signup'">
          <form @submit.prevent="handleSignUp">
            <div class="input-field">
              <label for="signup-email">Email</label>
              <input 
                id="signup-email"
                v-model="registration.email" 
                type="email" 
                required 
                autocomplete="email"
                placeholder="Enter your email"
              >
            </div>
            
            <div class="name-row">
              <div class="input-field">
                <label for="first-name">First Name</label>
                <input 
                  id="first-name"
                  v-model="registration.firstName" 
                  type="text" 
                  required 
                  autocomplete="given-name"
                  placeholder="First name"
                >
              </div>
              
              <div class="input-field">
                <label for="last-name">Last Name</label>
                <input 
                  id="last-name"
                  v-model="registration.lastName" 
                  type="text" 
                  required 
                  autocomplete="family-name"
                  placeholder="Last name"
                >
              </div>
            </div>
            
            <div class="input-field">
              <label for="create-password">Create Password</label>
              <input 
                id="create-password"
                v-model="registration.password" 
                type="password" 
                required 
                autocomplete="new-password"
                placeholder="Create a password"
              >
            </div>
            
            <div class="input-field">
              <label for="confirm-password">Confirm Password</label>
              <input 
                id="confirm-password"
                v-model="confirmPassword" 
                type="password" 
                required 
                autocomplete="new-password"
                placeholder="Confirm your password"
              >
            </div>
            
            <div class="terms-container">
              <div class="checkbox-wrapper">
                <input type="checkbox" id="terms" v-model="agreeToTerms">
                <span class="checkmark"></span>
              </div>
              <label for="terms" class="terms-text">I agree to the <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.</label>
            </div>
            
            <button type="submit" class="primary-button" :disabled="isLoading || !isSignUpValid">
              <ion-spinner v-if="isLoading" name="crescent"></ion-spinner>
              <span v-else>Create Account</span>
            </button>
          </form>
        </div>
        
        <!-- Error Message Toast -->
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
  IonContent, 
  IonSpinner,
  IonToast,
  IonIcon
} from '@ionic/vue';
import { 
  logoGoogle,
  logoApple
} from 'ionicons/icons';

const router = useRouter();
const activeTab = ref('signin');
const isLoading = ref(false);
const errorMessage = ref('');
const agreeToTerms = ref(false);

// Sign In Data
const credentials = ref({
  email: '',
  password: ''
});

// Sign Up Data
const registration = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: ''
});
const confirmPassword = ref('');

// Computed validation for sign up form
const isSignUpValid = computed(() => {
  return (
    registration.value.email.trim() !== '' &&
    registration.value.password.trim() !== '' &&
    registration.value.firstName.trim() !== '' &&
    registration.value.lastName.trim() !== '' &&
    registration.value.password === confirmPassword.value &&
    agreeToTerms.value
  );
});

// Handle Sign In
const handleSignIn = async () => {
  if (credentials.value.email.trim() === '' || credentials.value.password.trim() === '') {
    errorMessage.value = 'Please fill in all fields';
    return;
  }
  
  isLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, you would call your authentication service here
    
    // Navigate to home on success
    router.replace('/tabs/home');
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to sign in';
  } finally {
    isLoading.value = false;
  }
};

// Handle Sign Up
const handleSignUp = async () => {
  if (!isSignUpValid.value) {
    if (registration.value.password !== confirmPassword.value) {
      errorMessage.value = 'Passwords do not match';
    } else if (!agreeToTerms.value) {
      errorMessage.value = 'You must agree to the Terms & Conditions';
    } else {
      errorMessage.value = 'Please fill in all required fields';
    }
    return;
  }
  
  isLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, you would call your registration service here
    
    // Navigate to home on success
    router.replace('/tabs/home');
  } finally {
    isLoading.value = false;
  }
};

// Handle Forgot Password
const handleForgotPassword = () => {
  // Implement forgot password logic
  console.log('Forgot password clicked');
};
</script>

<style scoped>
/* Auth Container */
.auth-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Logo Styling */
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0 2rem;
}

.app-logo {
  font-family: 'Bagel Fat One', cursive;
  font-weight: bold;
  font-size: 42px;
  color: #22c55e;
  margin-bottom: 10px;
  letter-spacing: 2px;
}

.tagline {
  font-size: 16px;
  color: #6b7280;
  text-align: center;
}

/* Tab Buttons */
.tab-buttons {
  display: flex;
  background-color: #f3f4f6;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 4px;
}

.tab-button {
  flex: 1;
  padding: 12px;
  text-align: center;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.tab-button.active {
  background-color: #22c55e;
  color: white;
  font-weight: 600;
}

/* Form Styling */
.auth-form {
  margin-bottom: 20px;
}

.input-field {
  margin-bottom: 16px;
}

.input-field label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.input-field input {
  width: 100%;
  padding: 12px 14px;
  font-size: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #fff;
  transition: border-color 0.2s;
}

.input-field input:focus {
  border-color: #22c55e;
  outline: none;
}

.input-field input::placeholder {
  color: #9ca3af;
}

.forgot-password {
  text-align: right;
  margin: 4px 0 20px;
}

.forgot-password a {
  color: #22c55e;
  font-size: 14px;
  text-decoration: none;
}

.primary-button {
  width: 100%;
  padding: 14px;
  background-color: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  transition: background-color 0.2s;
}

.primary-button:hover {
  background-color: #1ca04a;
}

.primary-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Name Fields Row */
.name-row {
  display: flex;
  gap: 12px;
}

.name-row .input-field {
  flex: 1;
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 24px 0;
}

.divider::before, .divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: calc(50% - 70px);
  height: 1px;
  background-color: #e5e7eb;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background-color: white;
  padding: 0 10px;
  font-size: 14px;
  color: #6b7280;
}

/* Social Buttons */
.social-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-button {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.social-button:hover {
  border-color: #d1d5db;
}

.social-icon {
  font-size: 22px;
  color: #6b7280;
}

/* Terms and Conditions */
.terms-container {
  display: flex;
  align-items: flex-start;
  margin: 20px 0;
  gap: 10px;
}

.checkbox-wrapper {
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.checkbox-wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.checkbox-wrapper:hover input ~ .checkmark {
  background-color: #f9fafb;
}

.checkbox-wrapper input:checked ~ .checkmark {
  background-color: #22c55e;
  border-color: #22c55e;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-wrapper input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-wrapper .checkmark:after {
  left: 7px;
  top: 3px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.terms-text {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
  padding-top: 1px;
  cursor: pointer;
}

.terms-text a {
  color: #22c55e;
  text-decoration: none;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .auth-container {
    padding: 16px;
  }
  
  .app-logo {
    font-size: 36px;
  }
  
  .name-row {
    flex-direction: column;
    gap: 0;
  }
  
  .social-icon {
    width: 20px;
    height: 20px;
  }
}
</style>