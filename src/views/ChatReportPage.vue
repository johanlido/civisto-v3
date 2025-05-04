<template>
  <ion-page>
    <ion-header class="ion-no-border header-blur">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button class="back-button" @click="goBack">
            <ion-icon :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Report Issue</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :scroll-events="true" @ionScroll="handleScroll" ref="contentRef">
      <!-- Main Chat Interface -->
      <div class="chat-interface" v-if="!showConfirmation">
        <div class="chat-container" ref="chatContainer">
          <!-- Initial Assistant Message -->
          <div class="message-wrapper assistant-wrapper">
            <div class="message assistant-message">
              <p>Hi there! I'm here to help you report issues in your community. What would you like to report today?</p>
            </div>
          </div>
          
          <!-- Location Info -->
          <div class="location-wrapper">
            <div class="location-card" @click="toggleMap">
              <ion-icon :icon="locationOutline" class="location-icon"></ion-icon>
              <div class="location-info">
                <div class="location-name">{{ reportData.location }}</div>
                <div class="location-coords">{{ reportData.coordinates }}</div>
              </div>
              <ion-icon :icon="chevronForward" class="location-arrow"></ion-icon>
            </div>
          </div>
          
          <!-- Chat Messages -->
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            :class="['message-wrapper', message.sender + '-wrapper']"
          >
            <div :class="['message', message.sender + '-message']">
              <p>{{ message.text }}</p>
            </div>
          </div>
          
          <!-- Option Buttons Container -->
          <div class="options-container" v-if="showOptions">
            <div 
              v-for="(option, idx) in currentOptions" 
              :key="idx"
              class="option-button"
              @click="selectOption(option)"
            >
              {{ option }}
            </div>
          </div>
          
          <!-- Typing Indicator -->
          <div class="message-wrapper assistant-wrapper" v-if="isTyping">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Confirmation Screen -->
      <div class="success-screen" v-if="showConfirmation">
        <div class="success-animation">
          <div class="success-circle">
            <ion-icon :icon="checkmarkOutline"></ion-icon>
          </div>
        </div>
        <h2>Report Submitted!</h2>
        <p>Thank you for helping to improve your community. We'll notify you when there's an update.</p>
        <div class="report-id">Report ID: KS-2025-04836</div>
        <ion-button class="new-report-btn" @click="resetChat">
          Create New Report
        </ion-button>
      </div>
    </ion-content>
    
    <!-- Map Modal -->
    <div class="map-modal" :class="{ 'is-active': mapExpanded }">
      <div class="map-content">
        <div class="map-header">
          <h3>Select Location</h3>
          <ion-button fill="clear" @click="toggleMap">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </div>
        <div class="map-container">
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            :src="mapSrc"
            allowfullscreen
            @load="attachMapClickHandler"
            ref="mapIframe"
          ></iframe>
        </div>
        <div class="map-footer">
          <p>Tap on the map to set a new location</p>
        </div>
      </div>
    </div>
    
    <!-- Bottom Input Area -->
    <div class="input-area" v-if="!showConfirmation">
      <!-- Suggestions -->
      <div class="suggestions" v-if="currentStep === 0">
        <p class="suggestions-title">Suggested Categories</p>
        <div class="suggestions-scroll">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="suggestion-pill"
            @click="selectCategory(category.id, category.name)"
          >
            {{ category.name }}
          </div>
        </div>
      </div>
      
      <!-- Image Preview -->
      <div class="image-preview" v-if="reportData.hasPhotos">
        <div class="preview-box">
          <ion-img src="/api/placeholder/80/80" alt="Uploaded issue"></ion-img>
          <button class="remove-image" @click="removeImage">
            <ion-icon :icon="closeOutline"></ion-icon>
          </button>
        </div>
      </div>
      
      <!-- Input Container -->
      <div class="message-composer">
        <button class="add-photo-btn" @click="toggleImagePreview">
          <ion-icon :icon="imageOutline"></ion-icon>
        </button>
        
        <div class="input-wrapper">
          <ion-textarea
            class="input-field"
            placeholder="Describe the issue..."
            v-model="userInput"
            auto-grow="true"
            rows="1"
            @keyup.enter="sendMessage"
            ref="messageInput"
          ></ion-textarea>
        </div>
        
        <button 
          class="send-btn" 
          :class="{ 'send-active': userInput.trim() }" 
          :disabled="!userInput.trim()"
          @click="sendMessage"
        >
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
        </button>
      </div>
    </div>
  </ion-page>
</template>

<script setup>
import useChatReportPage from './ChatReportPage.js';
useChatReportPage();
</script>

<style>
:root {
  /* Colors - adjusted to match the rest of the app */
  --c-primary: #22c55e;
  --c-primary-soft: rgba(34, 197, 94, 0.1);
  --c-primary-light: #e5f7ec;
  --c-primary-dark: #16a34a;
  --c-gray-50: #f9fafb;
  --c-gray-100: #f3f4f6;
  --c-gray-200: #e5e7eb;
  --c-gray-300: #d1d5db;
  --c-gray-400: #9ca3af;
  --c-gray-500: #6b7280;
  --c-gray-600: #4b5563;
  --c-gray-700: #374151;
  --c-gray-800: #1f2937;
  --c-gray-900: #111827;
  --c-info: #3b82f6;
  --c-info-light: #eff6ff;
  --c-success: #22c55e;
  --c-success-light: #e5f7ec;
  --c-warning: #f59e0b;
  --c-warning-light: #fffbeb;
  --c-danger: #ef4444;
  --c-danger-light: #fef2f2;
  --c-white: #ffffff;
  --c-black: #000000;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-focus: 0 0 0 3px rgba(34, 197, 94, 0.2);
  
  /* Durations */
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  
  /* Z-index */
  --z-modal: 50;
  --z-popover: 40;
  --z-header: 30;
  --z-footer: 20;
  --z-base: 10;
  --z-below: -10;
}

/* ===== Base Styles ===== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: var(--c-gray-800);
  background-color: var(--c-gray-50);
}

/* ===== Header Styles ===== */
.header-blur {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.8);
  position: sticky;
  top: 0;
  z-index: var(--z-header);
}

ion-toolbar {
  --border-width: 0;
  --background: transparent;
  --min-height: 56px;
  --padding-top: 8px;
  --padding-bottom: 8px;
}

ion-title {
  font-size: 18px;
  font-weight: 600;
}

.back-button {
  --color: var(--c-gray-700);
  --background: var(--c-gray-100);
  --background-hover: var(--c-gray-200);
  --background-activated: var(--c-gray-200);
  --background-focused: var(--c-gray-200);
  --border-radius: 8px;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  margin: 4px 8px;
  height: 36px;
  width: 36px;
}

/* ===== Content Styles ===== */
ion-content {
  --background: var(--c-gray-50);
  --padding-bottom: 100px;
}

.chat-interface {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.chat-container {
  padding: 16px;
  max-width: 640px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 120px;
}

/* Message Styles */
.message-wrapper {
  display: flex;
  margin-bottom: 16px;
  width: 100%; /* Make sure wrapper spans full width */
}

.assistant-wrapper {
  justify-content: flex-start; /* Align assistant messages to the left */
}

.human-wrapper {
  justify-content: flex-end; /* Align human messages to the right */
}

.system-wrapper {
  justify-content: center; /* Center system messages */
  margin: 8px 0;
}

.message {
  max-width: 80%; /* Limit message width */
  border-radius: 18px;
  padding: 12px 16px;
  box-shadow: var(--shadow-sm);
  position: relative;
}

.message p {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
}

.assistant-message {
  background-color: var(--c-gray-100);
  color: var(--c-gray-800);
  border-bottom-left-radius: 4px;
  align-self: flex-start;
}

.human-message {
  background-color: var(--c-primary);
  color: var(--c-white);
  border-bottom-right-radius: 4px;
  align-self: flex-end;
}

.system-message {
  background-color: var(--c-gray-200);
  color: var(--c-gray-600);
  font-size: 13px;
  padding: 8px 12px;
  border-radius: 12px;
}

/* Location Card */
.location-wrapper {
  margin: 16px 0;
  width: 85%;
}

.location-card {
  display: flex;
  align-items: center;
  background-color: var(--c-white);
  border-radius: 12px;
  padding: 14px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--c-gray-200);
  transition: all var(--duration-normal) ease;
}

.location-card:hover, .location-card:active {
  background-color: var(--c-gray-50);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.location-icon {
  background-color: var(--c-primary-soft);
  color: var(--c-primary);
  padding: 8px;
  border-radius: 10px;
  font-size: 20px;
  margin-right: 12px;
}

.location-info {
  flex: 1;
}

.location-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--c-gray-800);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.location-coords {
  font-size: 12px;
  color: var(--c-gray-500);
}

.location-arrow {
  color: var(--c-gray-400);
  font-size: 18px;
}

/* Options Container */
.options-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 8px 0 16px;
  width: 100%; /* Make container full width */
}

.option-button {
  max-width: 85%; /* Limit option width */
  align-self: flex-start; /* Align options to the left like assistant messages */
  background-color: var(--c-white);
  border: 1px solid var(--c-gray-200);
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  text-align: left;
  color: var(--c-gray-800);
  transition: all var(--duration-normal) ease;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
}

.option-button:hover, .option-button:active {
  background-color: var(--c-primary-light);
  border-color: var(--c-primary);
  box-shadow: var(--shadow-md);
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  background-color: var(--c-gray-100);
  border-radius: 18px;
  padding: 12px 16px;
  border-bottom-left-radius: 4px;
  box-shadow: var(--shadow-sm);
  width: auto;
  height: 38px;
  max-width: 80px; /* Limit width for typing indicator */
  align-self: flex-start; /* Align to the left like assistant messages */
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  float: left;
  margin: 0 1px;
  background-color: var(--c-primary);
  display: block;
  border-radius: 50%;
  opacity: 0.4;
}

.typing-indicator span:nth-of-type(1) {
  animation: 1s blink infinite 0.3333s;
}

.typing-indicator span:nth-of-type(2) {
  animation: 1s blink infinite 0.6666s;
}

.typing-indicator span:nth-of-type(3) {
  animation: 1s blink infinite 0.9999s;
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}

/* Map Modal */
.map-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--duration-normal) ease, visibility var(--duration-normal) ease;
}

.map-modal.is-active {
  opacity: 1;
  visibility: visible;
}

.map-content {
  background-color: var(--c-white);
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  transform: scale(0.95);
  transition: transform var(--duration-normal) ease;
}

.map-modal.is-active .map-content {
  transform: scale(1);
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--c-gray-200);
}

.map-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--c-gray-800);
  margin: 0;
}

.map-header ion-button {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  margin: 0;
  height: 36px;
  width: 36px;
  --border-radius: 8px;
  --color: var(--c-gray-600);
}

.map-container {
  flex: 1;
  min-height: 300px;
  position: relative;
  overflow: hidden;
}

.map-footer {
  padding: 12px 16px;
  text-align: center;
  background-color: var(--c-gray-50);
  border-top: 1px solid var(--c-gray-200);
}

.map-footer p {
  font-size: 14px;
  color: var(--c-gray-600);
  margin: 0;
}

/* Success Screen */
.success-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 24px;
  height: 100%;
  background-color: var(--c-white);
}

.success-animation {
  margin-bottom: 32px;
}

.success-circle {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: var(--c-success-light);
  color: var(--c-success);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  box-shadow: 0 12px 24px rgba(34, 197, 94, 0.2);
  animation: pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes pop {
  0% { transform: scale(0.8); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

.success-screen h2 {
  font-size: 24px;
  font-weight: 700;
  color: var(--c-gray-800);
  margin-bottom: 16px;
}

.success-screen p {
  font-size: 16px;
  color: var(--c-gray-600);
  max-width: 340px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.report-id {
  display: inline-block;
  background-color: var(--c-gray-100);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: var(--c-gray-800);
  margin-bottom: 40px;
  font-family: 'SF Mono', 'Consolas', monospace;
}

.new-report-btn {
  --background: var(--c-primary);
  --color: var(--c-white);
  --border-radius: 10px;
  --padding-top: 16px;
  --padding-bottom: 16px;
  --padding-start: 24px;
  --padding-end: 24px;
  --box-shadow: var(--shadow-md);
  font-weight: 600;
  font-size: 15px;
}

/* Input Area */
.input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--c-white);
  z-index: var(--z-footer);
  border-top: 1px solid var(--c-gray-200);
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.04);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.suggestions {
  padding: 16px 16px 8px;
}

.suggestions-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-gray-600);
  margin-bottom: 12px;
}

.suggestions-scroll {
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 8px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.suggestions-scroll::-webkit-scrollbar {
  display: none;
}

.suggestion-pill {
  background-color: var(--c-white);
  border: 1px solid var(--c-gray-200);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  color: var(--c-gray-800);
  transition: all var(--duration-normal) ease;
  cursor: pointer;
}

.suggestion-pill:hover, .suggestion-pill:active {
  background-color: var(--c-primary-light);
  border-color: var(--c-primary);
  color: var(--c-primary-dark);
}

.image-preview {
  padding: 12px 16px;
  border-top: 1px solid var(--c-gray-200);
}

.preview-box {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.preview-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  color: var(--c-white);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.message-composer {
  display: flex;
  align-items: flex-end;
  padding: 12px 16px;
  gap: 8px;
}

.add-photo-btn {
  background-color: var(--c-gray-100);
  border: none;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-gray-600);
  transition: all var(--duration-normal) ease;
  cursor: pointer;
}

.add-photo-btn:hover, .add-photo-btn:active {
  background-color: var(--c-gray-200);
  color: var(--c-gray-700);
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.input-field {
  --background: var(--c-gray-100);
  --color: var(--c-gray-800);
  --placeholder-color: var(--c-gray-500);
  --placeholder-opacity: 1;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  border-radius: 20px;
  max-height: 120px;
  font-size: 15px;
  --border-radius: 20px !important;
  border: 1px solid var(--c-gray-200);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: border-color var(--duration-normal) ease, box-shadow var(--duration-normal) ease;
}

.input-field:focus {
  border-color: var(--c-primary);
  box-shadow: var(--shadow-focus);
}

.send-btn {
  background-color: var(--c-gray-200);
  border: none;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-gray-500);
  transition: all var(--duration-normal) ease;
  cursor: pointer;
}

.send-btn.send-active {
  background-color: var(--c-primary);
  color: var(--c-white);
  transform: scale(1);
  box-shadow: var(--shadow-sm);
}

.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive Styles */
@media (min-width: 640px) {
  .input-area {
    max-width: 640px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 1px solid var(--c-gray-200);
    border-right: 1px solid var(--c-gray-200);
  }
}

@media (max-width: 480px) {
  .chat-container {
    padding: 12px;
  }
  
  .message p {
    font-size: 14px;
  }
  
  .success-screen h2 {
    font-size: 22px;
  }
  
  .success-screen p {
    font-size: 15px;
  }
  
  .success-circle {
    width: 80px;
    height: 80px;
    font-size: 40px;
  }
}
</style>