<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="logo" slot="start">Civisto</div>
        <ion-buttons slot="end" class="header-icons">
          <ion-button>
            <ion-icon :icon="notificationsOutline" slot="icon-only"></ion-icon>
          </ion-button>
          <ion-avatar class="avatar">
            <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="avatar" />
          </ion-avatar>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- Background with Gradient and Dots Pattern -->
    <div class="background-pattern"></div>

    <ion-content>
      <div class="main-content">
        <!-- Modern Hero Section -->
        <div class="hero-section">
          <div class="hero-card">
            <!-- Abstract pattern elements -->
            <div class="pattern-circle-1"></div>
            <div class="pattern-circle-2"></div>
            
            <h1>Make your community better today</h1>
            <p>Report issues in your neighborhood or scan QR codes at designated locations.</p>
            
            <!-- Action Buttons -->
            <div class="action-buttons">
              <ion-button class="btn-primary" expand="block" @click="reportIssue">
                <ion-icon :icon="addOutline" slot="start"></ion-icon>
                <span>Report</span>
              </ion-button>
              
              <ion-button class="btn-secondary" expand="block" @click="scanQR">
                <ion-icon :icon="gridOutline" slot="start"></ion-icon>
                <span>Scan QR</span>
              </ion-button>
            </div>
          </div>
        </div>

        <!-- Modern Impact Stats Section -->
        <div class="stats-section">
          <h2>Your Community Impact</h2>
          
          <ion-card class="stats-card">
            <ion-card-content>
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
                <ion-progress-bar value="0.625" class="progress-bar"></ion-progress-bar>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Recent Reports -->
        <div class="reports-section">
          <div class="section-header">
            <h2>Recent Reports</h2>
            <ion-button fill="clear" class="view-all" @click="viewAllReports">
              View All
              <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
            </ion-button>
          </div>
          
          <!-- Report Cards -->
          <div class="report-cards">
            <ion-card class="report-card" v-for="(report, index) in recentReports" :key="index" @click="openReport(report)">
              <ion-card-content>
                <div class="report-content">
                  <div class="report-image" :class="report.imageClass">
                    <ion-icon :icon="report.icon" size="large"></ion-icon>
                  </div>
                  <div class="report-details">
                    <div class="report-status-row">
                      <ion-badge class="status-badge" :class="report.statusClass">{{ report.status }}</ion-badge>
                      <span class="report-time">{{ report.time }}</span>
                    </div>
                    <h3>{{ report.title }}</h3>
                    <p>{{ report.location }}</p>
                  </div>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>

        <!-- Trending Issues -->
        <div class="trending-section">
          <h2>Trending in Your Area</h2>
          <div class="trending-cards">
            <ion-card class="trending-card" v-for="(trend, index) in trendingIssues" :key="index" @click="openTrend(trend)">
              <ion-card-content>
                <div class="trending-content">
                  <div class="icon-container" :class="trend.iconClass">
                    <ion-icon :icon="trend.icon" size="small"></ion-icon>
                  </div>
                  <div class="trending-details">
                    <h3>{{ trend.title }}</h3>
                    <p>{{ trend.count }}</p>
                  </div>
                  <ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonCardContent,
  IonBadge,
  IonProgressBar,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
  IonAvatar
} from '@ionic/vue';
import {
  notificationsOutline,
  homeOutline,
  clipboardOutline,
  addOutline,
  ribbonOutline,
  personOutline,
  chevronForwardOutline,
  gridOutline,
  flashOutline,
  cartOutline,

} from 'ionicons/icons';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonCard,
    IonCardContent,
    IonBadge,
    IonProgressBar,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonRouterOutlet,
    IonAvatar
  },
  setup() {
    const router = useRouter();
    
    // Sample data for recent reports
    const recentReports = ref([
      {
        icon: flashOutline,
        imageClass: 'electricity',
        title: 'Broken Streetlight',
        location: 'Kungsgatan 32, Stockholm',
        status: 'In Progress',
        statusClass: 'yellow',
        time: '2h ago'
      },
      {
        icon: cartOutline,
        imageClass: 'retail',
        title: 'Abandoned Trolley',
        location: 'Götgatan 14, Stockholm',
        status: 'Resolved',
        statusClass: 'green',
        time: 'Yesterday'
      }
    ]);
    
    // Sample data for trending issues
    const trendingIssues = ref([
      {
        icon: flashOutline,
        iconClass: 'red',
        title: 'Graffiti on Main Street',
        count: '7 reports this week'
      },
      {
        icon: flashOutline,
        iconClass: 'yellow',
        title: 'Illegal Parking Near Park',
        count: '5 reports this week'
      },
      {
        icon: flashOutline,
        iconClass: 'blue',
        title: 'Trolleys at Central Station',
        count: '3 reports this week'
      }
    ]);
    
    // Functions for handling user actions
    const reportIssue = () => {
      console.log('Report Issue button clicked');
      router.push('/report');
    };
    
    const scanQR = () => {
      console.log('Scan QR button clicked');
      // Implement QR scanning functionality
    };
    
    const viewAllReports = () => {
      console.log('View All clicked');
      router.push('/reports');
    };
    
    const openReport = (report) => {
      console.log('Report card clicked:', report.title);
      router.push(`/reports/${report.title.toLowerCase().replace(/\s+/g, '-')}`);
    };
    
    const openTrend = (trend) => {
      console.log('Trending card clicked:', trend.title);
      router.push(`/trends/${trend.title.toLowerCase().replace(/\s+/g, '-')}`);
    };
    
    return {
      recentReports,
      trendingIssues,
      reportIssue,
      scanQR,
      viewAllReports,
      openReport,
      openTrend,
      
      // Icons
      notificationsOutline,
      homeOutline,
      clipboardOutline,
      addOutline,
      ribbonOutline,
      personOutline,
      chevronForwardOutline,
      gridOutline,
      flashOutline,
      cartOutline
    };
  }
});
</script>

<style>
/* Civisto App Styles for Ionic Vue */

/* Base Variables */
:root {
  --ion-color-primary: #22c55e;
  --ion-color-primary-rgb: 34, 197, 94;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #16a34a;
  --ion-color-primary-tint: #3eb058;
  
  --ion-color-secondary: #16a34a;
  --ion-color-secondary-rgb: 22, 163, 74;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255, 255, 255;
  
  --ion-background-color: #f9fafb;
  --ion-text-color: #111827;
  
  --ion-font-family: 'Inter', sans-serif;
}

/* Override Ionic defaults */
ion-content {
  --background: transparent;
}

ion-toolbar {
  --background: #ffffff;
  --border-color: transparent;
  --padding-top: 12px;
  --padding-bottom: 12px;
  --padding-start: 16px;
  --padding-end: 16px;
}

ion-card {
  margin: 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
}

ion-progress-bar {
  --buffer-background: #f3f4f6;
  --progress-background: linear-gradient(to right, #22c55e, #3b82f6);
  height: 8px;
  border-radius: 9999px;
}

ion-tab-bar {
  --background: #ffffff;
  border-top: 1px solid #e5e7eb;
  height: 64px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

ion-tab-button {
  --color: #6b7280;
  --color-selected: #16a34a;
}

ion-badge {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 9999px;
}

/* Background Pattern */
.background-pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(to bottom, #e8f7efcc, #e8f7ef00);
  background-image: radial-gradient(circle, #22c55e 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.35;
}

/* Logo */
.logo {
  font-family: 'Bagel Fat One', cursive;
  font-weight: bold;
  font-size: 24px;
  color: #22c55e;
  padding-left: 8px;
}

/* Header icons */
.header-icons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 36px;
  height: 36px;
}

/* Main Content */
.main-content {
  position: relative;
  z-index: 10;
  padding-bottom: 80px;
}

@media (min-width: 768px) {
  .main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 32px;
  }
  
  .hero-section {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  .stats-section {
    grid-column: span 1;
  }
  
  .reports-section {
    grid-column: span 2;
  }
  
  .trending-section {
    grid-column: 1 / -1;
  }
}

/* Hero Section */
.hero-section {
  padding: 16px;
  padding-top: 24px;
  padding-bottom: 24px;
  position: relative;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: -64px;
  right: 0;
  width: 96px;
  height: 96px;
  background-color: #dcfce7;
  border-radius: 50%;
  opacity: 0.5;
  z-index: -1;
}

.hero-card {
  background: linear-gradient(to right, #22c55e, #16a34a);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow: hidden;
  position: relative;
}

.pattern-circle-1 {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.1;
}

.pattern-circle-2 {
  position: absolute;
  bottom: 20px;
  right: 48px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.1;
}

.hero-card h1 {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
  position: relative;
  z-index: 10;
  max-width: 300px;
}

.hero-card p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
  font-weight: 300;
  position: relative;
  z-index: 10;
  max-width: 320px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  position: relative;
  z-index: 10;
  width: 100%;
}

/* Override Ionic button styles for action buttons */
.action-buttons ion-button {
  margin: 0;
  height: auto;
  white-space: nowrap;
}

.btn-primary {
  --background: white;
  --color: #16a34a;
  --border-radius: 9999px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
}

.btn-secondary {
  --background: #16a34a;
  --color: white;
  --border-radius: 9999px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  font-weight: 500;
  font-size: 14px;
  border: 1px solid white;
}

/* Stats Section */
.stats-section {
  padding: 24px 16px;
}

.stats-section h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.stats-card {
  --background: white;
  --padding: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.stat-circle.green {
  background-color: #f0fdf4;
}

.stat-circle.green .stat-number {
  color: #16a34a;
}

.stat-circle.blue {
  background-color: #eff6ff;
}

.stat-circle.blue .stat-number {
  color: #2563eb;
}

.stat-circle.purple {
  background-color: #faf5ff;
}

.stat-circle.purple .stat-number {
  color: #9333ea;
}

.stat-number {
  font-weight: 700;
  font-size: 14px;
}

.stat-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.progress-container {
  margin-top: 16px;
  padding: 0 4px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.progress-header span {
  font-size: 12px;
  color: #6b7280;
}

.progress-header span:last-child {
  font-weight: 500;
  color: #374151;
}

/* Reports Section */
.reports-section {
  padding: 24px 16px 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.view-all {
  --color: #16a34a;
  --box-shadow: none;
  --background: transparent;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  font-size: 14px;
  height: auto;
  margin: 0;
  font-weight: normal;
}

.report-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.report-card {
  --padding: 0;
  --background: white;
  --margin-bottom: 12px;
}

.report-card ion-card-content {
  padding: 12px;
}

.report-content {
  display: flex;
  gap: 12px;
}

.report-image {
  width: 64px;
  height: 64px;
  background-color: #f3f4f6;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
}

.report-image.electricity {
  background-color: #fef9c3;
  color: #ca8a04;
}

.report-image.retail {
  background-color: #dbeafe;
  color: #2563eb;
}

.report-details {
  flex: 1;
}

.report-status-row {
  display: flex;
  justify-content: space-between;
}

.status-badge {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 9999px;
}

.status-badge.yellow {
  --background: #fef3c7;
  --color: #b45309;
}

.status-badge.green {
  --background: #dcfce7;
  --color: #16a34a;
}

.report-time {
  font-size: 12px;
  color: #6b7280;
}

.report-details h3 {
  font-weight: 500;
  margin-top: 4px;
  font-size: 16px;
}

.report-details p {
  font-size: 12px;
  color: #6b7280;
  margin-top: 4px;
}

/* Trending Section */
.trending-section {
  padding: 24px 16px 80px;
}

.trending-section h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.trending-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trending-card {
  --padding: 0;
  --background: white;
}

.trending-card ion-card-content {
  padding: 12px;
}

.trending-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.icon-container.red {
  background-color: #fee2e2;
}

.icon-container.red ion-icon {
  color: #ef4444;
}

.icon-container.yellow {
  background-color: #fef3c7;
}

.icon-container.yellow ion-icon {
  color: #f59e0b;
}

.icon-container.blue {
  background-color: #e0f2fe;
}

.icon-container.blue ion-icon {
  color: #0ea5e9;
}

.trending-details {
  flex: 1;
}

.trending-details h3 {
  font-weight: 500;
  font-size: 16px;
}

.trending-details p {
  font-size: 12px;
  color: #6b7280;
  font-weight: 300;
}

.arrow-icon {
  color: #9ca3af;
}

/* New Report Button */
.new-report .add-button {
  width: 40px;
  height: 40px;
  background-color: #22c55e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.new-report .add-button ion-icon {
  color: white;
}

.new-report {
  --color: #16a34a;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .logo {
    font-size: 20px;
  }
  
  .action-buttons {
    flex-direction: row;
    gap: 6px;
    justify-content: space-between;
  }
  
  .btn-primary,
  .btn-secondary {
    --padding-start: 8px;
    --padding-end: 8px;
    font-size: 12px;
  }
  
  ion-icon {
    font-size: 14px;
  }
  
  .hero-card h1 {
    font-size: 18px;
  }
  
  .hero-card p {
    font-size: 12px;
    margin-bottom: 14px;
  }
  
  ion-tab-button ion-label {
    font-size: 10px;
  }
  
  .report-cards,
  .trending-cards {
    gap: 8px;
  }
}

/* Extra small devices */
@media (max-width: 360px) {
  .btn-primary,
  .btn-secondary {
    --padding-start: 6px;
    --padding-end: 6px;
    font-size: 11px;
  }
  
  .hero-card h1 {
    font-size: 16px;
  }
  
  .hero-card p {
    font-size: 11px;
    margin-bottom: 12px;
  }
}

@media (min-width: 768px) {
  .report-cards, 
  .trending-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
  
  .hero-section {
    padding: 32px;
  }
  
  .stats-section, 
  .reports-section, 
  .trending-section {
    padding: 32px;
  }
  
  .hero-card {
    max-width: 768px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .trending-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>