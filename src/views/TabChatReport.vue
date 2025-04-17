<template>
    <ion-page>
      <ion-header class="header">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="onBack">
              <ion-icon :icon="arrowBackOutline" />
            </ion-button>
          </ion-buttons>
          <ion-title>Report Something</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="page-content">
        <div v-if="!showConfirmation" class="chat-container">
          <ion-item lines="none" class="assistant-message message">
            <ion-label>
              Hi there! I'm here to help you report issues in your community. What would you like to report today?
            </ion-label>
          </ion-item>
          <ion-item lines="none" class="location-info">
            <ion-icon :icon="locationOutline" slot="start" class="location-icon" />
            <ion-label class="location-details">
              <div class="location-address">Kungsgatan 65, Stockholm</div>
              <div class="location-coordinates">59.3293° N, 18.0686° E</div>
            </ion-label>
          </ion-item>
          <template v-for="(msg, idx) in messages" :key="idx">
            <ion-item v-if="msg.type === 'assistant'" lines="none" class="assistant-message message">
              <ion-label>{{ msg.text }}</ion-label>
            </ion-item>
            <ion-item v-else-if="msg.type === 'human'" lines="none" class="human-message message">
              <ion-label>{{ msg.text }}</ion-label>
            </ion-item>
            <ion-item v-else-if="msg.type === 'system'" lines="none" class="system-message message">
              <ion-label>{{ msg.text }}</ion-label>
            </ion-item>
          </template>
          <div v-if="showTyping" class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>
          <div v-if="showOptions" class="option-buttons">
            <ion-button v-for="option in currentOptions" :key="option" expand="block" @click="selectOption(option)" class="option-button">{{ option }}</ion-button>
          </div>
        </div>
        <div v-else class="confirmation-screen">
          <div class="confirmation-icon">
            <ion-icon :icon="checkmarkCircleOutline" class="confirmation-tick" />
          </div>
          <h2 class="confirmation-title">Report Submitted!</h2>
          <p class="confirmation-message">Thank you for helping to improve your community. We'll notify you when there's an update.</p>
          <div class="report-id">Report ID: KS-2025-04836</div>
          <ion-button class="new-report-button" @click="resetChat">Create New Report</ion-button>
        </div>
      </ion-content>
      <ion-footer v-if="!showConfirmation">
        <div class="bottom-area">
          <div class="suggestions">
            <div class="suggestion-title">Suggested Categories</div>
            <div class="suggestion-buttons">
              <ion-button v-for="cat in categories" :key="cat" class="suggestion-button" fill="outline" size="small" @click="selectCategory(cat)">{{ cat }}</ion-button>
            </div>
          </div>
          <div class="input-container">
            <ion-button fill="clear" class="attach-button" @click="toggleImagePreview">
              <ion-icon :icon="attachOutline" />
            </ion-button>
            <ion-textarea
              v-model="input"
              class="message-input"
              :auto-grow="true"
              placeholder="Describe the issue..."
              rows="1"
              @keydown.enter.exact.prevent="sendMessage"
            />
            <ion-button class="send-button" :disabled="!input.trim()" @click="sendMessage">
              <ion-icon :icon="sendOutline" class="send-icon" />
            </ion-button>
          </div>
          <div v-if="showImagePreview" class="image-preview">
            <div class="preview-container">
              <img class="preview-image" src="https://via.placeholder.com/80" alt="Uploaded issue">
              <div class="remove-image" @click="removeImage">
                <ion-icon :icon="closeOutline" size="small" />
              </div>
            </div>
          </div>
        </div>
      </ion-footer>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonFooter, IonTextarea, IonItem, IonLabel
  } from '@ionic/vue';
  import {
    arrowBackOutline, locationOutline, attachOutline, sendOutline, closeOutline, checkmarkCircleOutline
  } from 'ionicons/icons';
  
  const categories = [
    'Street Lighting',
    'Road Damage',
    'Graffiti',
    'Trash/Litter',
    'Safety Hazard',
    'Other Issue'
  ];
  
  const input = ref('');
  const messages = ref<any[]>([]);
  const showTyping = ref(false);
  const showOptions = ref(false);
  const currentOptions = ref<string[]>([]);
  const showConfirmation = ref(false);
  const showImagePreview = ref(false);
  
  const reportData = ref({
    location: 'Kungsgatan 65, Stockholm',
    coordinates: '59.3293° N, 18.0686° E',
    category: '',
    description: '',
    severity: '',
    hasPhotos: false
  });
  
  let questionFlow: any[] = [];
  let currentStep = 0;
  
  function onBack() {
    // In a real app, use router.back()
    window.history.back();
  }
  
  function selectCategory(cat: string) {
    reportData.value.category = cat;
    addMessage('human', `I'd like to report an issue with ${cat}`);
    showOptions.value = false;
    questionFlow = [
      {
        type: 'text',
        text: getCategorySpecificQuestion(cat)
      },
      {
        type: 'options',
        text: 'How would you rate the severity of this issue?',
        options: [
          'Critical - Immediate danger',
          'High - Needs urgent attention',
          'Medium - Should be fixed soon',
          'Low - Can be scheduled for later'
        ]
      }
    ];
    currentStep = 0;
    nextTick(() => showNextQuestion());
  }
  
  function sendMessage() {
    if (!input.value.trim()) return;
    addMessage('human', input.value.trim());
    if (questionFlow.length > 0 && currentStep > 0) {
      if (questionFlow[currentStep - 1].type === 'text') {
        reportData.value.description = input.value.trim();
      }
    }
    input.value = '';
    if (currentStep < questionFlow.length) {
      showNextQuestion();
    } else {
      completeReport();
    }
  }
  
  function addMessage(type: string, text: string) {
    messages.value.push({ type, text });
    nextTick(scrollToBottom);
  }
  
  function showNextQuestion() {
    if (currentStep < questionFlow.length) {
      showTyping.value = true;
      setTimeout(() => {
        showTyping.value = false;
        const q = questionFlow[currentStep];
        if (q.type === 'text') {
          addMessage('assistant', q.text);
          showOptions.value = false;
        } else if (q.type === 'options') {
          addMessage('assistant', q.text);
          currentOptions.value = q.options;
          showOptions.value = true;
        }
        currentStep++;
      }, 800);
    }
  }
  
  function selectOption(option: string) {
    addMessage('human', option);
    if (questionFlow.length > 0 && currentStep > 0) {
      if (questionFlow[currentStep - 1].type === 'options') {
        reportData.value.severity = option;
      }
    }
    showOptions.value = false;
    if (currentStep < questionFlow.length) {
      showNextQuestion();
    } else {
      completeReport();
    }
  }
  
  function completeReport() {
    showTyping.value = true;
    setTimeout(() => {
      showTyping.value = false;
      addMessage('assistant', "Thank you for providing all the details. I'm submitting your report now...");
      setTimeout(() => {
        addMessage('system', 'Report submitted successfully!');
        setTimeout(() => {
          showConfirmation.value = true;
        }, 1200);
      }, 1200);
    }, 1000);
  }
  
  function getCategorySpecificQuestion(category: string) {
    switch (category) {
      case 'Street Lighting':
        return "I see you're reporting an issue with street lighting. Please describe the problem in detail. Is the light flickering, completely out, or damaged?";
      case 'Road Damage':
        return "I understand you want to report road damage. Please describe the type of damage (pothole, cracks, etc.) and approximately how large it is.";
      case 'Graffiti':
        return "You're reporting graffiti. Please describe where exactly it is and approximately how large the affected area is.";
      case 'Trash/Litter':
        return "I see you're reporting trash or litter. Please describe what kind of waste it is and how spread out it is.";
      case 'Safety Hazard':
        return "You're reporting a safety hazard. Please describe the hazard in detail and if it poses an immediate danger to people.";
      default:
        return "I understand you want to report an issue. Please describe the problem in as much detail as possible.";
    }
  }
  
  function toggleImagePreview() {
    showImagePreview.value = !showImagePreview.value;
    reportData.value.hasPhotos = showImagePreview.value;
  }
  
  function removeImage() {
    showImagePreview.value = false;
    reportData.value.hasPhotos = false;
  }
  
  function resetChat() {
    messages.value = [];
    showConfirmation.value = false;
    showOptions.value = false;
    currentOptions.value = [];
    input.value = '';
    showImagePreview.value = false;
    reportData.value = {
      location: 'Kungsgatan 65, Stockholm',
      coordinates: '59.3293° N, 18.0686° E',
      category: '',
      description: '',
      severity: '',
      hasPhotos: false
    };
    currentStep = 0;
  }
  
  function scrollToBottom() {
    const el = document.querySelector('.chat-container');
    if (el) el.scrollTop = el.scrollHeight;
  }
  </script>
  
  <style scoped>
  /* General page/content */
  ion-page, .page-content {
    background: #fff !important;
    --background: #fff !important;
    min-height: 100vh;
  }
  
  .header {
    --background: #ffffff !important;
    background: #fff !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }
  
  ion-title {
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
    letter-spacing: 0.01em;
  }
  
  .chat-container {
    background: #fff !important;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 0 80px 0;
    max-width: 600px;
    margin: 0 auto;
    min-height: 60vh;
    overflow-y: auto;
  }
  
  .location-info {
    background: #fff !important;
    border-radius: 12px;
    margin: 0 16px 8px 16px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    align-items: flex-start;
    padding: 10px 12px;
    --inner-padding-end: 0;
    --inner-border-width: 0;
  }
  
  .location-icon {
    color: #3880ff;
    font-size: 22px;
    margin-right: 8px;
  }
  
  .location-details {
    display: flex;
    flex-direction: column;
    font-size: 0.95em;
  }
  
  .location-address {
    font-weight: 600;
    color: #222;
  }
  
  .location-coordinates {
    color: #666;
    font-size: 0.92em;
  }
  
  .message {
    margin: 0 16px;
    border-radius: 16px;
    padding: 0;
    background: transparent;
    box-shadow: none;
    --inner-padding-end: 0;
    --inner-border-width: 0;
  }
  
  .assistant-message {
    background: #fff !important;
    align-self: flex-start;
    color: #1a237e;
    border-radius: 16px 16px 16px 4px;
    margin-bottom: 2px;
    padding: 0;
    max-width: 85%;
  }
  
  .human-message {
    background: #fff !important;
    color: #222 !important;
    align-self: flex-end;
    border-radius: 16px 16px 4px 16px;
    margin-bottom: 2px;
    padding: 0;
    max-width: 85%;
  }
  
  .system-message {
    background: #fff !important;
    align-self: center;
    color: #888;
    border-radius: 12px;
    font-size: 0.93em;
    margin: 8px 0;
    padding: 0;
  }
  
  ion-label {
    padding: 10px 16px;
    display: block;
    width: 100%;
    white-space: pre-line;
    margin: 0;
  }
  
  .typing-indicator {
    display: flex;
    align-items: center;
    gap: 4px;
    margin: 0 24px 0 24px;
    height: 24px;
  }
  
  .typing-dot {
    width: 7px;
    height: 7px;
    background: #b0b8c1;
    border-radius: 50%;
    animation: typingBlink 1.2s infinite both;
    display: inline-block;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  
  @keyframes typingBlink {
    0%, 80%, 100% { opacity: 0.3; }
    40% { opacity: 1; }
  }
  
  .option-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 12px 16px 0 16px;
  }
  
  .option-button {
    --background: #fff !important;
    background: #fff !important;
    --color: #3880ff;
    --border-radius: 12px;
    --box-shadow: 0 1px 4px rgba(56,128,255,0.08);
    font-weight: 500;
    font-size: 1em;
    border: 1px solid #dbeafe;
    transition: background 0.2s;
    margin: 0;
    text-transform: none;
    height: auto;
    padding: 12px 16px;
  }
  .option-button:active {
    --background: #eaf1fb;
  }
  
  .confirmation-screen {
    background: #fff !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: 32px 16px;
    border-radius: 18px;
    margin: 32px 16px 0 16px;
    box-shadow: 0 2px 12px rgba(56,128,255,0.07);
  }
  
  .confirmation-icon {
    margin-bottom: 16px;
    color: #10dc60;
    font-size: 48px;
  }
  
  .confirmation-title {
    font-size: 1.5em;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: #222;
  }
  
  .confirmation-message {
    color: #444;
    margin-bottom: 18px;
    text-align: center;
  }
  
  .report-id {
    font-size: 0.98em;
    color: #3880ff;
    background: #eaf1fb;
    border-radius: 8px;
    padding: 6px 18px;
    margin-bottom: 18px;
    font-family: monospace;
  }
  
  .new-report-button {
    --background: #3880ff;
    --color: #ffffff;
    --border-radius: 12px;
    font-weight: 600;
    font-size: 1em;
    margin-top: 8px;
    text-transform: none;
    --padding-top: 12px;
    --padding-bottom: 12px;
    --padding-start: 24px;
    --padding-end: 24px;
  }
  
  .bottom-area {
    background: #fff !important;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.06);
    padding: 12px 0 16px 0;
    border-radius: 18px 18px 0 0;
    position: relative;
    z-index: 2;
  }
  
  .suggestions {
    background: #fff !important;
    margin: 0 16px 12px 16px;
  }
  
  .suggestion-title {
    font-size: 0.98em;
    color: #888;
    margin-bottom: 8px;
    font-weight: 500;
  }
  
  .suggestion-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .suggestion-button {
    --background: #fff !important;
    background: #fff !important;
    --border-radius: 10px;
    --color: #3880ff;
    --border-color: #dbeafe;
    font-size: 0.96em;
    font-weight: 500;
    margin: 0;
    padding: 0 12px;
    min-height: 28px;
    text-transform: none;
  }
  
  .input-container {
    background: #fff !important;
    display: flex;
    align-items: flex-end;
    gap: 8px;
    margin: 0 16px;
    border-radius: 14px;
    padding: 8px 10px 8px 6px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  }
  
  .attach-button {
    --color: #888;
    font-size: 1.2em;
    margin: 0;
    margin-right: 2px;
    --padding-start: 8px;
    --padding-end: 8px;
  }
  
  .message-input {
    flex: 1;
    --background: transparent;
    --padding-start: 0;
    --padding-end: 0;
    --padding-top: 6px;
    --padding-bottom: 6px;
    font-size: 1em;
    min-height: 32px;
    max-height: 80px;
    border: none;
    background: transparent;
    resize: none;
  }
  
  .send-button {
    --background: #3880ff;
    --color: #ffffff;
    --border-radius: 50%;
    min-width: 38px;
    min-height: 38px;
    margin: 0;
    font-size: 1.2em;
    --padding-start: 0;
    --padding-end: 0;
    box-shadow: 0 2px 8px rgba(56,128,255,0.2);
    transition: background 0.2s;
  }
  .send-button:disabled {
    --background: #b0b8c1;
    --color: #ffffff;
  }
  
  .send-icon {
    font-size: 1.3em;
  }
  
  .image-preview {
    margin: 10px 16px 0 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  
  .preview-container {
    background: #fff !important;
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(56,128,255,0.09);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .remove-image {
    background: #fff !important;
    position: absolute;
    top: 4px;
    right: 4px;
    border-radius: 50%;
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    cursor: pointer;
    padding: 2px;
    z-index: 2;
  }
  
  @media (max-width: 600px) {
    .chat-container, .confirmation-screen {
      margin: 0;
      border-radius: 0;
      max-width: 100vw;
    }
    .confirmation-screen {
      margin: 24px 0 0 0;
    }
    .bottom-area {
      border-radius: 16px 16px 0 0;
    }
  }
  </style>
