<template>
  <ion-page>
    <ion-content :fullscreen="true" class="app-container">
      <!-- Background with Gradient and Dots Pattern -->
      <div class="background-pattern"></div>

      <!-- Status Bar -->
      <div class="status-bar"></div>
      
      <!-- Header -->
      <ion-header class="header">
        <ion-toolbar>
          <ion-title class="logo">Civisto</ion-title>
          <ion-buttons slot="end" class="header-icons">
            <ion-button>
              <ion-icon :icon="notificationsOutline"></ion-icon>
            </ion-button>
            <div class="avatar"></div>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Modern Hero Section -->
        <div class="hero-section">
          <ion-card class="hero-card">
            <!-- Abstract pattern elements -->
            <div class="pattern-circle-1"></div>
            <div class="pattern-circle-2"></div>
            
            <ion-card-header>
              <ion-card-title>Make your community better today</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Report issues in your neighborhood or scan QR codes at designated locations.</p>
              
              <!-- Action Buttons -->
              <div class="action-buttons">
                <ion-button class="btn-primary">
                  <ion-icon slot="start" :icon="addOutline"></ion-icon>
                  <span>Report</span>
                </ion-button>
                
                <ion-button class="btn-secondary">
                  <ion-icon slot="start" :icon="gridOutline"></ion-icon>
                  <span>Scan QR</span>
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Modern Impact Stats Section -->
        <div class="stats-section">
          <h2>Your Community Impact</h2>
          
          <ion-card class="stats-card">
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-circle green">
                  <div class="stat-number">12</div>
                </div>
                <div class="stat-label">Reports</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-circle blue">
                  <div class="stat-number">8</div>
                </div>
                <div class="stat-label">Solved</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-circle purple">
                  <div class="stat-number">1.2K</div>
                </div>
                <div class="stat-label">Points</div>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="progress-container">
              <div class="progress-header">
                <span>Progress to Silver</span>
                <span>1,250 / 2,000</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
            </div>
          </ion-card>
        </div>

        <!-- Recent Reports -->
        <div class="reports-section">
          <div class="section-header">
            <h2>Recent Reports</h2>
            <span class="view-all">View All <ion-icon :icon="chevronForwardOutline"></ion-icon></span>
          </div>
          
          <!-- Report Cards -->
          <div class="report-cards">
            <ion-card class="report-card">
              <div class="report-content">
                <div class="report-image electricity">
                  <ion-icon :icon="flashOutline"></ion-icon>
                </div>
                <div class="report-details">
                  <div class="report-status-row">
                    <ion-badge color="warning" class="status-badge">In Progress</ion-badge>
                    <span class="report-time">2h ago</span>
                  </div>
                  <h3>Broken Streetlight</h3>
                  <p>Kungsgatan 32, Stockholm</p>
                </div>
              </div>
            </ion-card>
            
            <ion-card class="report-card">
              <div class="report-content">
                <div class="report-image retail">
                  <ion-icon :icon="cartOutline"></ion-icon>
                </div>
                <div class="report-details">
                  <div class="report-status-row">
                    <ion-badge color="success" class="status-badge">Resolved</ion-badge>
                    <span class="report-time">Yesterday</span>
                  </div>
                  <h3>Abandoned Trolley</h3>
                  <p>Götgatan 14, Stockholm</p>
                </div>
              </div>
            </ion-card>
          </div>
        </div>

        <!-- Trending Issues -->
        <div class="trending-section">
          <h2>Trending in Your Area</h2>
          <div class="trending-cards">
            <ion-card class="trending-card">
              <div class="trending-content">
                <div class="icon-container red">
                  <ion-icon :icon="createOutline"></ion-icon>
                </div>
                <div class="trending-details">
                  <h3>Graffiti on Main Street</h3>
                  <p>7 reports this week</p>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
              </div>
            </ion-card>
            
            <ion-card class="trending-card">
              <div class="trending-content">
                <div class="icon-container yellow">
                  <ion-icon :icon="carOutline"></ion-icon>
                </div>
                <div class="trending-details">
                  <h3>Illegal Parking Near Park</h3>
                  <p>5 reports this week</p>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
              </div>
            </ion-card>
            
            <ion-card class="trending-card">
              <div class="trending-content">
                <div class="icon-container blue">
                  <ion-icon :icon="cartOutline"></ion-icon>
                </div>
                <div class="trending-details">
                  <h3>Trolleys at Central Station</h3>
                  <p>3 reports this week</p>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
              </div>
            </ion-card>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <ion-tabs>
        <ion-tab-bar slot="bottom" class="bottom-nav">
          <ion-tab-button tab="home" class="nav-item active">
            <ion-icon :icon="homeOutline"></ion-icon>
            <ion-label>Home</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="reports" class="nav-item">
            <ion-icon :icon="clipboardOutline"></ion-icon>
            <ion-label>Reports</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="new" class="nav-item new-report">
            <div class="add-button">
              <ion-icon :icon="addOutline"></ion-icon>
            </div>
            <ion-label>New Report</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="rewards" class="nav-item">
            <ion-icon :icon="ribbonOutline"></ion-icon>
            <ion-label>Rewards</ion-label>
          </ion-tab-button>
          
          <ion-tab-button tab="profile" class="nav-item">
            <ion-icon :icon="personOutline"></ion-icon>
            <ion-label>Profile</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonBadge,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/vue';
import { 
  notificationsOutline, 
  addOutline, 
  gridOutline, 
  flashOutline, 
  cartOutline, 
  createOutline, 
  carOutline, 
  chevronForwardOutline,
  homeOutline,
  clipboardOutline,
  ribbonOutline,
  personOutline
} from 'ionicons/icons';
</script>

<style scoped>
/* App Container */
.app-container {
  font-family: 'Inter', sans-serif;
  color: #333333;
  background-color: #f8f9fa;
  height: 100%;
  position: relative;
}

/* Background Pattern */
.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  opacity: 0.8;
  z-index: -1;
}

.background-pattern::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, #ffffff 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.1;
}

/* Status Bar */
.status-bar {
  height: 24px;
}

/* Header */
.header {
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  --background: transparent;
}

.logo {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
}

.header-icons {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #ffffff;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

/* Main Content */
.main-content {
  padding: 0 16px 80px;
}

/* Hero Section */
.hero-section {
  margin-bottom: 24px;
}

.hero-card {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
}

.pattern-circle-1,
.pattern-circle-2 {
  position: absolute;
  border-radius: 50%;
  z-index: 0;
}

.pattern-circle-1 {
  width: 100px;
  height: 100px;
  background-color: rgba(40, 167, 69, 0.1);
  top: -30px;
  right: -30px;
}

.pattern-circle-2 {
  width: 60px;
  height: 60px;
  background-color: rgba(32, 201, 151, 0.1);
  bottom: -20px;
  left: 30px;
}

.hero-card ion-card-title {
  font-size: 24px;
  font-weight: 700;
  color: #333333;
  margin-bottom: 8px;
  z-index: 1;
  position: relative;
}

.hero-card p {
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 24px;
  z-index: 1;
  position: relative;
}

.action-buttons {
  display: flex;
  gap: 12px;
  z-index: 1;
  position: relative;
}

.btn-primary {
  --background: #28a745;
  --color: #ffffff;
  --border-radius: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  font-weight: 600;
}

.btn-secondary {
  --background: #f8f9fa;
  --color: #333333;
  --border-radius: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  font-weight: 600;
  --box-shadow: none;
  --border-style: solid;
  --border-width: 1px;
  --border-color: #e9ecef;
}

/* Stats Section */
.stats-section {
  margin-bottom: 24px;
}

.stats-section h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}

.stats-card {
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-circle {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}

.green {
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.blue {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
}

.purple {
  background-color: rgba(111, 66, 193, 0.1);
  color: #6f42c1;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
}

.stat-label {
  font-size: 14px;
  color: #6c757d;
}

.progress-container {
  width: 100%;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6c757d;
}

.progress-bar {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 62.5%;
  background-color: #28a745;
  border-radius: 4px;
}

/* Reports Section */
.reports-section {
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

.view-all {
  font-size: 14px;
  color: #6c757d;
  display: flex;
  align-items: center;
  gap: 4px;
}

.report-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.report-card {
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin: 0;
}

.report-content {
  display: flex;
  padding: 16px;
}

.report-image {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.electricity {
  background-color: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
}

.retail {
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
}

.report-details {
  flex: 1;
}

.report-status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.status-badge {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
}

.report-time {
  font-size: 12px;
  color: #6c757d;
}

.report-details h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
}

.report-details p {
  font-size: 14px;
  color: #6c757d;
  margin: 0;
}

/* Trending Section */
.trending-section {
  margin-bottom: 24px;
}

.trending-section h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
}

.trending-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trending-card {
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin: 0;
}

.trending-content {
  display: flex;
  align-items: center;
  padding: 16px;
}

.icon-container {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  flex-shrink: 0;
}

.red {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

.yellow {
  background-color: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}

.trending-details {
  flex: 1;
}

.trending-details h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
}

.trending-details p {
  font-size: 14px;
  color: #6c757d;
  margin: 0;
}

.arrow-icon {
  color: #6c757d;
}

/* Bottom Navigation */
.bottom-nav {
  background-color: #ffffff;
  border-top: 1px solid #e9ecef;
}

.nav-item {
  color: #6c757d;
  font-size: 12px;
}

.nav-item.active {
  color: #28a745;
}

.new-report {
  position: relative;
}

.add-button {
  width: 48px;
  height: 48px;
  background-color: #28a745;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}
</style>
