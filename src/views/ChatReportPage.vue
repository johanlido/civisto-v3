<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goBack">
            <ion-icon :icon="arrowBack" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Report Something</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :scroll-events="true" @ionScroll="handleScroll" ref="contentRef">
      <!-- Main Chat Interface -->
      <div id="chatInterface" v-if="!showConfirmation">
        <div class="chat-container" ref="chatContainer">
          <!-- Initial Assistant Message -->
          <div class="message assistant-message">
            Hi there! I'm here to help you report issues in your community. What would you like to report today?
          </div>
          
          <!-- Location Info -->
          <div class="location-info">
            <div class="location-icon">
              <ion-icon :icon="locationOutline" size="small"></ion-icon>
            </div>
            <div class="location-details">
              <div class="location-address">{{ reportData.location }}</div>
              <div class="location-coordinates">{{ reportData.coordinates }}</div>
            </div>
          </div>
          
          <!-- Chat Messages -->
          <div v-for="(message, index) in messages" :key="index"
               :class="['message', message.sender + '-message']">
            {{ message.text }}
          </div>
          
          <!-- Option Buttons Container -->
          <div class="option-buttons" v-if="showOptions">
            <ion-button 
              v-for="(option, idx) in currentOptions" 
              :key="idx"
              expand="block"
              fill="outline"
              size="small"
              class="option-button"
              @click="selectOption(option)">
              {{ option }}
            </ion-button>
          </div>
          
          <!-- Typing Indicator -->
          <div class="typing-indicator" v-if="isTyping">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
        </div>
      </div>
      
      <!-- Confirmation Screen -->
      <div class="confirmation-screen" v-if="showConfirmation">
        <div class="confirmation-icon">
          <ion-icon :icon="checkmarkOutline" class="confirmation-tick"></ion-icon>
        </div>
        <h2 class="confirmation-title">Report Submitted!</h2>
        <p class="confirmation-message">Thank you for helping to improve your community. We'll notify you when there's an update.</p>
        <div class="report-id">Report ID: KS-2025-04836</div>
        <ion-button class="new-report-button" expand="block" @click="resetChat">
          Create New Report
        </ion-button>
      </div>
    </ion-content>
    
    <!-- Bottom Area with Suggestions and Input -->
    <div class="bottom-area" v-if="!showConfirmation">
      <!-- Suggestions -->
      <div class="suggestions" v-if="currentStep === 0">
        <div class="suggestion-title">Suggested Categories</div>
        <ion-scroll horizontal="true" class="suggestion-buttons">
          <ion-button 
            v-for="category in categories" 
            :key="category.id"
            fill="outline"
            size="small"
            class="suggestion-button"
            @click="selectCategory(category.id, category.name)">
            {{ category.name }}
          </ion-button>
        </ion-scroll>
      </div>
      
      <!-- Image Preview -->
      <div class="image-preview" v-if="reportData.hasPhotos">
        <div class="preview-container">
          <ion-img src="/api/placeholder/80/80" alt="Uploaded issue"></ion-img>
          <div class="remove-image" @click="removeImage">
            <ion-icon :icon="closeOutline" size="small"></ion-icon>
          </div>
        </div>
      </div>
      
      <!-- Input Container -->
      <div class="input-container">
        <ion-button fill="clear" class="attach-button" @click="toggleImagePreview">
          <ion-icon :icon="imageOutline" slot="icon-only"></ion-icon>
        </ion-button>
        
        <ion-textarea
          class="message-input"
          placeholder="Describe the issue..."
          v-model="userInput"
          auto-grow="true"
          rows="1"
          @keyup.enter="sendMessage"
          ref="messageInput">
        </ion-textarea>
        
        <ion-button 
          class="send-button" 
          :disabled="!userInput.trim()"
          @click="sendMessage">
          <ion-icon :icon="paperPlaneOutline" slot="icon-only"></ion-icon>
        </ion-button>
      </div>
    </div>
      </ion-page>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons,
  IonButton,
  IonIcon,
  IonTextarea,
  IonImg,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet
} from '@ionic/vue';
import { 
  arrowBack,
  homeOutline,
  documentTextOutline,
  medalOutline,
  personOutline,
  paperPlaneOutline,
  imageOutline,
  locationOutline,
  closeOutline,
  checkmarkOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'ReportChat',
  components: {
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButtons,
    IonButton,
    IonIcon,
    IonTextarea,
    IonImg,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonRouterOutlet
  },
  setup() {
    const router = useRouter();
    const contentRef = ref(null);
    const chatContainer = ref(null);
    const messageInput = ref(null);
    
    // State variables
    const userInput = ref('');
    const messages = ref([]);
    const currentStep = ref(0);
    const isTyping = ref(false);
    const showOptions = ref(false);
    const currentOptions = ref([]);
    const showConfirmation = ref(false);
    
    // Report data
    const reportData = reactive({
      location: "Kungsgatan 65, Stockholm",
      coordinates: "59.3293° N, 18.0686° E",
      category: "",
      description: "",
      severity: "",
      hasPhotos: false
    });
    
    // Categories
    const categories = [
      { id: 'streetLighting', name: 'Street Lighting' },
      { id: 'roadDamage', name: 'Road Damage' },
      { id: 'graffiti', name: 'Graffiti' },
      { id: 'trash', name: 'Trash/Litter' },
      { id: 'safetyHazard', name: 'Safety Hazard' },
      { id: 'other', name: 'Other Issue' }
    ];
    
    // Question flow template
    const questionFlow = reactive([]);
    
    // Add message to chat
    const addMessage = (sender, text) => {
      messages.value.push({ sender, text });
      nextTick(() => {
        scrollToBottom();
      });
    };
    
    // Show typing indicator
    const showTypingIndicator = () => {
      isTyping.value = true;
      nextTick(() => {
        scrollToBottom();
      });
    };
    
    // Remove typing indicator
    const removeTypingIndicator = () => {
      isTyping.value = false;
    };
    
    // Scroll to bottom of chat
    const scrollToBottom = () => {
      if (contentRef.value) {
        contentRef.value.$el.scrollToBottom(300);
      }
    };
    
    // Handle scroll
    const handleScroll = () => {
      // Additional scroll handling if needed
    };
    
    // Go back function
    const goBack = () => {
      router.go(-1);
    };
    
    // Select category
    const selectCategory = (categoryId, categoryName) => {
      reportData.category = categoryId;
      
      // Add user message
      addMessage('human', `I'd like to report an issue with ${categoryName}`);
      
      // Set up question flow based on category
      setupQuestionFlow(categoryId);
      
      // Show next question
      currentStep.value = 1;
      showNextQuestion();
    };
    
    // Set up question flow based on selected category
    const setupQuestionFlow = (categoryId) => {
      questionFlow.length = 0; // Clear previous flow
      
      questionFlow.push({
        type: 'text',
        text: getCategorySpecificQuestion(categoryId)
      });
      
      questionFlow.push({
        type: 'options',
        text: "How would you rate the severity of this issue?",
        options: [
          "Critical - Immediate danger",
          "High - Needs urgent attention",
          "Medium - Should be fixed soon",
          "Low - Can be scheduled for later"
        ]
      });
    };
    
    // Get category-specific question
    const getCategorySpecificQuestion = (categoryId) => {
      switch(categoryId) {
        case 'streetLighting':
          return "I see you're reporting an issue with street lighting. Please describe the problem in detail. Is the light flickering, completely out, or damaged?";
        case 'roadDamage':
          return "I understand you want to report road damage. Please describe the type of damage (pothole, cracks, etc.) and approximately how large it is.";
        case 'graffiti':
          return "You're reporting graffiti. Please describe where exactly it is and approximately how large the affected area is.";
        case 'trash':
          return "I see you're reporting trash or litter. Please describe what kind of waste it is and how spread out it is.";
        case 'safetyHazard':
          return "You're reporting a safety hazard. Please describe the hazard in detail and if it poses an immediate danger to people.";
        default:
          return "I understand you want to report an issue. Please describe the problem in as much detail as possible.";
      }
    };
    
    // Show next question
    const showNextQuestion = () => {
      if (currentStep.value <= questionFlow.length) {
        const question = questionFlow[currentStep.value - 1];
        
        // Show typing indicator
        showTypingIndicator();
        
        // Show question after delay
        setTimeout(() => {
          removeTypingIndicator();
          
          if (question.type === 'text') {
            addMessage('assistant', question.text);
            showOptions.value = false;
          } else if (question.type === 'options') {
            addMessage('assistant', question.text);
            currentOptions.value = question.options;
            showOptions.value = true;
          }
        }, 1000);
      } else {
        completeReport();
      }
    };
    
    // Send message
    const sendMessage = () => {
      if (userInput.value.trim() === '') return;
      
      const message = userInput.value.trim();
      addMessage('human', message);
      
      // Store response based on current step
      if (currentStep.value === 1) {
        reportData.description = message;
      }
      
      // Clear input
      userInput.value = '';
      
      // Move to next question
      currentStep.value++;
      showNextQuestion();
    };
    
    // Select option
    const selectOption = (option) => {
      addMessage('human', option);
      reportData.severity = option;
      
      // Hide options
      showOptions.value = false;
      
      // Move to next question
      currentStep.value++;
      
      // Check if we need to show the next question or complete
      if (currentStep.value <= questionFlow.length) {
        showNextQuestion();
      } else {
        completeReport();
      }
    };
    
    // Toggle image preview
    const toggleImagePreview = () => {
      reportData.hasPhotos = !reportData.hasPhotos;
    };
    
    // Remove image
    const removeImage = () => {
      reportData.hasPhotos = false;
    };
    
    // Complete report
    const completeReport = () => {
      showTypingIndicator();
      
      setTimeout(() => {
        removeTypingIndicator();
        addMessage('assistant', "Thank you for providing all the details. I'm submitting your report now...");
        
        // Show system message after delay
        setTimeout(() => {
          addMessage('system', "Report submitted successfully!");
          
          // Show confirmation screen
          setTimeout(() => {
            showConfirmation.value = true;
          }, 1500);
        }, 1500);
      }, 1500);
    };
    
    // Reset chat for new report
    const resetChat = () => {
      // Reset all variables
      messages.value = [];
      currentStep.value = 0;
      isTyping.value = false;
      showOptions.value = false;
      showConfirmation.value = false;
      
      // Reset report data
      reportData.category = "";
      reportData.description = "";
      reportData.severity = "";
      reportData.hasPhotos = false;
      
      // Add initial message
      setTimeout(() => {
        addMessage('assistant', "Hi there! I'm here to help you report issues in your community. What would you like to report today?");
      }, 100);
    };
    
    return {
      userInput,
      messages,
      currentStep,
      isTyping,
      showOptions,
      currentOptions,
      showConfirmation,
      reportData,
      categories,
      contentRef,
      chatContainer,
      messageInput,
      addMessage,
      sendMessage,
      selectCategory,
      selectOption,
      toggleImagePreview,
      removeImage,
      handleScroll,
      scrollToBottom,
      goBack,
      resetChat,
      
      // Icons
      arrowBack,
      homeOutline,
      documentTextOutline,
      medalOutline,
      personOutline,
      paperPlaneOutline,
      imageOutline,
      locationOutline,
      closeOutline,
      checkmarkOutline
    };
  }
});
</script>

<style scoped>
/* Report Chat CSS */
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

/* Chat Container */
.chat-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

/* Message Styles */
.message {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
  font-size: 15px;
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

/* Location Info */
.location-info {
  background-color: var(--gray-light);
  border-radius: 8px;
  padding: 12px;
  margin-top: 8px;
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

/* Typing Indicator */
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

/* Bottom Area */
.bottom-area {
  position: fixed;
  bottom: 60px; /* Space for navbar */
  left: 0;
  right: 0;
  background-color: var(--white);
  border-top: 1px solid var(--gray);
  z-index: 10;
}

/* Suggestions */
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

/* Input Container */
.input-container {
  padding: 12px 16px;
  background-color: var(--white);
  display: flex;
  gap: 12px;
  align-items: flex-end;
  border-top: 1px solid var(--gray);
}

/* Image Preview */
.image-preview {
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--white);
}

.preview-container {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
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
  color: white;
}

/* Option Buttons */
.option-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  align-self: flex-start;
  width: 85%;
}

/* Confirmation Screen */
.confirmation-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  text-align: center;
  min-height: 80vh;
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
  font-size: 48px;
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
</style>
