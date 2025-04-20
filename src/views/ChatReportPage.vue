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
          <div class="location-info" style="position:relative;">
            <div class="location-icon" @click="toggleMap">
              <ion-icon :icon="locationOutline" size="small"></ion-icon>
            </div>
            <div class="location-details">
              <div class="location-address">{{ reportData.location }}</div>
              <div class="location-coordinates">{{ reportData.coordinates }}</div>
            </div>
            <div 
              id="opmap"
              :style="mapExpanded ? 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:1001;background:#fff;display:flex;align-items:center;justify-content:center;' : 'display:none;'"
              @click.self="toggleMap"
            >
              <div style="position:relative;width:90vw;max-width:600px;height:60vh;">
                <iframe
                  width="100%"
                  height="100%"
                  frameborder="0"
                  style="border:0; border-radius: 8px;"
                  :src="mapSrc"
                  allowfullscreen
                  @load="attachMapClickHandler"
                  ref="mapIframe"
                ></iframe>
                <ion-button
                  style="position:absolute;top:10px;right:10px;z-index:10;"
                  fill="clear"
                  @click.stop="toggleMap"
                >
                  <ion-icon :icon="closeOutline"></ion-icon>
                </ion-button>
                <div style="position:absolute;bottom:10px;left:0;right:0;text-align:center;font-size:13px;color:#666;">
                  Click on the map to set a new location
                </div>
              </div>
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
import { defineComponent, ref, reactive, onMounted, nextTick, computed } from 'vue';
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
    const mapExpanded = ref(false);
    const mapIframe = ref(null);
    
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
    
    // Helper to parse coordinates from string to numbers
    const parseCoordinates = (coordStr) => {
      const match = coordStr.match(/([0-9.]+)[°] N, ([0-9.]+)[°] E/);
      if (match) {
        return {
          lat: parseFloat(match[1]),
          long: parseFloat(match[2])
        };
      }
      return { lat: 0, long: 0 };
    };

    // Helper to format coordinates as string
    const formatCoordinates = (lat, long) => {
      return `${lat.toFixed(4)}° N, ${long.toFixed(4)}° E`;
    };

    // Map src computed from reportData.coordinates
    const mapSrc = computed(() => {
      const coords = parseCoordinates(reportData.coordinates);
      const bbox = [
        (coords.long - 0.01).toFixed(4),
        (coords.lat - 0.005).toFixed(4),
        (coords.long + 0.01).toFixed(4),
        (coords.lat + 0.005).toFixed(4)
      ].join(',');
      return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coords.lat},${coords.long}`;
    });

    // Toggle map expanded/collapsed
    const toggleMap = () => {
      mapExpanded.value = !mapExpanded.value;
      if (mapExpanded.value) {
        nextTick(() => {
          attachMapClickHandler();
        });
      }
    };

    // Attach click handler to iframe map
    const attachMapClickHandler = () => {
      if (!mapExpanded.value) return;
      const iframe = mapIframe.value?.$el || mapIframe.value;
      if (!iframe || !iframe.contentWindow) return;
      iframe.contentWindow.document.body.onclick = null;
      iframe.contentWindow.document.body.onclick = (e) => {
        const map = iframe.contentWindow.document.querySelector('img.leaflet-tile');
        if (!map) return;
        const rect = map.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;
        const src = iframe.src;
        const bboxMatch = src.match(/bbox=([0-9.,\-]+)/);
        if (!bboxMatch) return;
        const [minLong, minLat, maxLong, maxLat] = bboxMatch[1].split(',').map(Number);
        const long = minLong + (maxLong - minLong) * (x / width);
        const lat = maxLat - (maxLat - minLat) * (y / height);
        updateLocation(lat, long);
      };
    };

    // Update location and coordinates in reportData
    const updateLocation = async (lat, long) => {
      try {
        const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`);
        const data = await resp.json();
        reportData.location = data.display_name || 'Unknown location';
        reportData.coordinates = formatCoordinates(lat, long);
      } catch {
        reportData.location = 'Unknown location';
        reportData.coordinates = formatCoordinates(lat, long);
      }
      mapExpanded.value = false;
    };

    // Send message
    const sendMessage = async () => {
      if (userInput.value.trim() === '') return;

      const message = userInput.value.trim();
      addMessage('human', message);

      // Store response based on current step
      if (currentStep.value === 1) {
        reportData.description = message;
      }

      try {
        // Always use up-to-date description and coordinates
        const coords = parseCoordinates(reportData.coordinates);
        await fetch('http://localhost:5678/webhook/7475d8ba-6602-4633-b3f0-30d0c002a1de', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: "https://cdn.shopify.com/s/files/1/0274/7288/7913/files/MicrosoftTeams-image_32.jpg?v=1705315718",
            description: reportData.description || message,
            coordinates: coords,
            location: reportData.location,
            qrCode: "",
            timestamp: new Date().toISOString(),
            userProfile: "Private"
          })
        });
      } catch (e) {
        // Optionally handle error
      }

      userInput.value = '';
      currentStep.value++;
      showNextQuestion();
    };

    // Select option
    const selectOption = (option) => {
      addMessage('human', option);
      reportData.severity = option;
      
      showOptions.value = false;
      currentStep.value++;
      
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
        
        setTimeout(() => {
          addMessage('system', "Report submitted successfully!");
          
          setTimeout(() => {
            showConfirmation.value = true;
          }, 1500);
        }, 1500);
      }, 1500);
    };
    
    // Reset chat for new report
    const resetChat = () => {
      messages.value = [];
      currentStep.value = 0;
      isTyping.value = false;
      showOptions.value = false;
      showConfirmation.value = false;
      
      reportData.category = "";
      reportData.description = "";
      reportData.severity = "";
      reportData.hasPhotos = false;
      
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
      mapExpanded,
      mapSrc,
      toggleMap,
      mapIframe,
      attachMapClickHandler,
      
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

<style>
/* Report Chat CSS */
:root {
  --ion-color-primary: #28a745;
  --ion-color-primary-rgb: 40, 167, 69;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #23933d;
  --ion-color-primary-tint: #3eb058;
  
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

/* Global Styles */
* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

ion-content {
  --background: var(--background);
}

ion-content::part(scroll) {
  padding-bottom: 180px;
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

/* Override Ionic button styles for suggestions */
ion-button.suggestion-button {
  --border-radius: 16px;
  --border-color: var(--gray);
  --background: var(--white);
  --color: var(--foreground);
  --box-shadow: none;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  height: 36px;
  --padding-start: 12px;
  --padding-end: 12px;
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

ion-textarea.message-input {
  --background: var(--white);
  --border-radius: 24px;
  --border-color: var(--gray);
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --placeholder-color: var(--gray-medium);
  margin: 0;
  flex: 1;
  max-height: 120px;
}

ion-button.attach-button {
  --padding-start: 8px;
  --padding-end: 8px;
  --box-shadow: none;
  --background: transparent;
  --color: var(--gray-medium);
  margin: 0;
}

ion-button.send-button {
  width: 48px;
  height: 48px;
  --border-radius: 50%;
  --background: var(--primary);
  --color: var(--white);
  margin: 0;
}

ion-button.send-button[disabled] {
  --background: var(--gray);
  opacity: 0.7;
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

ion-img {
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

ion-button.option-button {
  --background: var(--white);
  --background-hover: var(--primary-light);
  --color: var(--foreground);
  --border-color: var(--gray);
  --border-radius: 8px;
  margin: 0;
  text-transform: none;
  font-size: 14px;
  font-weight: 400;
  height: auto;
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-start: 16px;
  --padding-end: 16px;
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

ion-button.new-report-button {
  --background: var(--primary);
  --color: var(--white);
  --border-radius: 8px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 24px;
  --padding-end: 24px;
  max-width: 250px;
  margin: 0 auto;
  font-weight: 600;
}

/* Tab Styles */
ion-tab-bar {
  --background: var(--white);
  border-top: 1px solid var(--gray);
}

ion-tab-button {
  --color: var(--gray-medium);
  --color-selected: var(--primary);
}

ion-tab-button[selected] ion-icon {
  color: var(--primary);
}
</style>