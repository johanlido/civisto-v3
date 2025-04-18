<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Report Something</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <div class="page-content">
        <div class="chat-container" id="chatContainer">
          <div class="message assistant-message">
            Hi there! I'm here to help you report issues in your community. What would you like to report today?
          </div>
          
          <div class="location-info">
            <div class="location-icon">
              <ion-icon :icon="locationOutline"></ion-icon>
            </div>
            <div class="location-details">
              <div class="location-address">{{ locationData.address }}</div>
              <div class="location-coordinates">{{ locationData.latitude }}° N, {{ locationData.longitude }}° E</div>
            </div>
          </div>

          <div v-if="messages.length > 0">
            <div v-for="(message, index) in messages" :key="index" 
                 :class="['message', message.sender === 'user' ? 'human-message' : 'assistant-message']">
              {{ message.text }}
            </div>
          </div>

          <div v-if="showOptions" class="option-buttons">
            <ion-button v-for="(option, index) in currentOptions" :key="index" 
                      expand="block" fill="outline" class="option-button"
                      @click="selectOption(option)">
              {{ option }}
            </ion-button>
          </div>

          <div v-if="isTyping" class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
        
        <div class="bottom-area">
          <div class="suggestions">
            <div class="suggestion-title">Suggested Categories</div>
            <div class="suggestion-buttons">
              <ion-button v-for="category in categories" :key="category" 
                        fill="outline" size="small" class="suggestion-button"
                        @click="selectCategory(category)">
                {{ category }}
              </ion-button>
            </div>
          </div>
          
          <div class="image-preview" :class="{ active: selectedImage }">
            <div v-if="selectedImage" class="preview-container">
              <img :src="selectedImage" class="preview-image" alt="Selected image" />
              <div class="remove-image" @click="removeImage">
                <ion-icon :icon="closeOutline" color="light"></ion-icon>
              </div>
            </div>
          </div>
          
          <div class="input-container">
            <ion-button fill="clear" class="attach-button" @click="openImagePicker">
              <ion-icon :icon="imageOutline"></ion-icon>
            </ion-button>
            
            <ion-textarea
              class="message-input"
              placeholder="Describe the issue..."
              v-model="userInput"
            ></ion-textarea>
            
            <ion-button 
              class="send-button" 
              :disabled="!userInput.trim() && !selectedImage" 
              @click="sendMessage"
            >
              <ion-icon :icon="paperPlaneOutline" class="send-icon"></ion-icon>
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>

    <!-- Confirmation screen (initially hidden) -->
    <div class="confirmation-screen" :style="{ display: showConfirmation ? 'flex' : 'none' }">
      <div class="confirmation-icon">
        <ion-icon :icon="checkmarkOutline" size="large" class="confirmation-tick"></ion-icon>
      </div>
      <h2 class="confirmation-title">Report Submitted!</h2>
      <p class="confirmation-message">Thank you for making your community better. We'll notify you when there's an update.</p>
      <div class="report-id">Report ID: #{{ reportId }}</div>
      <ion-button class="new-report-button" @click="resetForm">
        Submit Another Report
      </ion-button>
    </div>

    <!-- File input for image selection (hidden) -->
    <input
      type="file"
      accept="image/*"
      ref="fileInput"
      style="display: none"
      @change="handleFileSelected"
    />
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonBackButton,
  IonButton,
  IonIcon,
  IonTextarea
} from '@ionic/vue';
import { 
  locationOutline,
  imageOutline,
  paperPlaneOutline,
  closeOutline,
  checkmarkOutline
} from 'ionicons/icons';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
}

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

const userInput = ref('');
const messages = ref<Message[]>([]);
const isTyping = ref(false);
const showOptions = ref(false);
const currentOptions = ref<string[]>([]);
const selectedImage = ref<string | null>(null); // Changed to string or null
const fileInput = ref<HTMLInputElement | null>(null);
const showConfirmation = ref(false);
const reportId = ref('');
const categories = ref([
  'Street Lighting',
  'Road Damage',
  'Graffiti',
  'Trash/Litter',
  'Safety Hazard',
  'Other Issue'
]);

const locationData = ref<LocationData>({
  latitude: 59.3293, // Ensure it's a number
  longitude: 18.0686, // Ensure it's a number
  address: 'Kungsgatan 65, Stockholm',
});

interface ConversationStep {
  question: string;
  options?: string[]; // Make options optional
  next: string;
}

const conversationSteps: Record<string, ConversationStep> = {
  category: {
    question: "What type of issue would you like to report?",
    options: [
      "Street Lighting",
      "Road Damage",
      "Graffiti",
      "Trash/Litter",
      "Safety Hazard",
      "Other Issue"
    ],
    next: "description"
  },
  description: {
    question: "Please describe the issue in detail. What exactly did you observe?",
    next: "severity"
  },
  severity: {
    question: "How urgent is this issue?",
    options: ["Very urgent", "Somewhat urgent", "Not urgent"],
    next: "confirmation"
  },
  confirmation: {
    question: "Thank you for your report. Would you like to submit it now?",
    options: ["Yes, submit report", "No, I want to edit"],
    next: "complete"
  }
};

let currentStep = 'category';

onMounted(() => {
  setTimeout(() => {
    showNextQuestion();
  }, 1000);
});

const showNextQuestion = () => {
  if (!conversationSteps[currentStep as keyof typeof conversationSteps]) return;
  
  const step = conversationSteps[currentStep as keyof typeof conversationSteps];
  isTyping.value = true;
  
  setTimeout(() => {
    isTyping.value = false;
    addAssistantMessage(step.question);
    
    if (step.options) {
      currentOptions.value = step.options;
      showOptions.value = true;
    } else {
      showOptions.value = false;
    }
  }, 1500);
};

const addAssistantMessage = (text: string) => {
  messages.value.push({
    text,
    sender: 'assistant'
  });
  scrollToBottom();
};

const addUserMessage = (text: string) => {
  messages.value.push({
    text,
    sender: 'user'
  });
  scrollToBottom();
};

const scrollToBottom = () => {
  setTimeout(() => {
    const container = document.getElementById('chatContainer');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, 100);
};

const sendMessage = () => {
  if (!userInput.value.trim() && !selectedImage.value) return;
  
  addUserMessage(userInput.value);
  userInput.value = '';
  showOptions.value = false;
  
  // Move to next step in conversation
  const step = conversationSteps[currentStep as keyof typeof conversationSteps];
  currentStep = step.next;
  
  if (currentStep === 'complete') {
    completeReport();
  } else {
    showNextQuestion();
  }
};

const selectOption = (option: string) => {
  addUserMessage(option);
  showOptions.value = false;
  
  // Move to next step in conversation
  const step = conversationSteps[currentStep as keyof typeof conversationSteps];
  currentStep = step.next;
  
  if (currentStep === 'complete') {
    completeReport();
  } else {
    showNextQuestion();
  }
};

const selectCategory = (category: string) => {
  if (currentStep === 'category') {
    addUserMessage(category);
    showOptions.value = false;
    
    // Move to next step
    const step = conversationSteps[currentStep as keyof typeof conversationSteps];
    currentStep = step.next;
    showNextQuestion();
  } else {
    // Just insert the category into the input field
    userInput.value = category;
  }
};

const openImagePicker = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      selectedImage.value = e.target?.result as string; // Set to string
    };
    
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  selectedImage.value = null; // Set to null
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const completeReport = () => {
  // Generate a random report ID
  reportId.value = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  // Show confirmation screen
  setTimeout(() => {
    showConfirmation.value = true;
  }, 1500);
};

const resetForm = () => {
  // Reset all form state
  userInput.value = '';
  messages.value = [];
  isTyping.value = false;
  showOptions.value = false;
  selectedImage.value = null; // Set to null
  showConfirmation.value = false;
  currentStep = 'category';
  
  // Start the conversation again
  setTimeout(() => {
    showNextQuestion();
  }, 500);
};
</script>

<style scoped>
:root {
  --primary: #28a745;
  --primary-light: #e5f7ec;
  --background: #f8f9fa;
  --foreground: #333333;
  --gray-light: #F2F2F2;
  --gray-medium: #6c757d;
  --gray: #e9ecef;
  --white: #ffffff;
  --human-bg: #f0f7ff;
  --human-border: #d1e6ff;
  --assistant-bg: var(--primary-light);
  --assistant-border: #c1e7d9;
}

.page-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 180px; /* Space for suggestion area, input box and navbar */
}

.message {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
}

.assistant-message {
  align-self: flex-start;
  background-color: var(--assistant-bg);
  border: 1px solid var(--assistant-border);
}

.human-message {
  align-self: flex-end;
  background-color: var(--human-bg);
  border: 1px solid var(--human-border);
}

.system-message {
  align-self: center;
  background-color: var(--gray-light);
  border: 1px solid var(--gray);
  font-size: 14px;
  color: var(--gray-medium);
  padding: 8px 16px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 12px;
  background-color: var(--assistant-bg);
  align-self: flex-start;
  width: 60px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background-color: var(--primary);
  border-radius: 50%;
  animation: typing-animation 1.5s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing-animation {
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.bottom-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--white);
  border-top: 1px solid var(--gray);
  z-index: 10;
}

.suggestions {
  padding: 12px 16px;
  background-color: var(--white);
}

.suggestion-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--gray-medium);
}

.suggestion-buttons {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.suggestion-buttons::-webkit-scrollbar {
  display: none;
}

.suggestion-button {
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --border-radius: 16px;
  --border-color: var(--gray);
  --background: var(--white);
  --color: var(--foreground);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  margin: 0;
}

.input-container {
  padding: 16px;
  background-color: var(--white);
  display: flex;
  gap: 12px;
  align-items: flex-end;
  border-top: 1px solid var(--gray);
}

.message-input {
  flex: 1;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --border-radius: 24px;
  --border-color: var(--gray);
  --background: var(--white);
  font-size: 16px;
  min-height: 48px;
  max-height: 120px;
}

.send-button {
  width: 48px;
  height: 48px;
  --border-radius: 50%;
  --background: var(--primary);
  margin: 0;
}

.send-button:disabled {
  --background: var(--gray);
  opacity: 0.7;
}

.attach-button {
  --background: transparent;
  --color: var(--gray-medium);
  margin: 0;
}

.image-preview {
  display: none;
  gap: 8px;
  padding: 8px 16px;
}

.image-preview.active {
  display: flex;
}

.preview-container {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.location-info {
  background-color: var(--gray-light);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  align-self: flex-start;
  max-width: 85%;
}

.location-icon {
  color: var(--primary);
}

.location-details {
  flex: 1;
}

.location-address {
  font-size: 14px;
  font-weight: 500;
}

.location-coordinates {
  font-size: 12px;
  color: var(--gray-medium);
}

/* Confirmation screen */
.confirmation-screen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--white);
  z-index: 20;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  text-align: center;
}

.confirmation-icon {
  width: 80px;
  height: 80px;
  background-color: var(--primary-light);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}

.confirmation-tick {
  color: var(--primary);
}

.confirmation-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.confirmation-message {
  font-size: 16px;
  color: var(--gray-medium);
  margin-bottom: 16px;
}

.report-id {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 32px;
}

.new-report-button {
  --background: var(--primary);
  --color: white;
  --border-radius: 8px;
  --padding-start: 24px;
  --padding-end: 24px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
}

/* Options */
.option-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  align-self: flex-start;
  width: 85%;
}

.option-button {
  --background: var(--white);
  --border-color: var(--gray);
  --border-radius: 8px;
  --color: var(--foreground);
  font-size: 14px;
  text-align: left;
  margin: 0;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 10px;
  --padding-bottom: 10px;
}
</style>
