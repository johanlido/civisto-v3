<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Achievements</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="container">
        <div class="header-section">
          <h1>Your Achievements</h1>
          <p class="subtitle">Track your progress and earn rewards for making your community better</p>
        </div>
        
        <ion-card class="stats-card">
          <ion-card-content>
            <div class="level-info">
              <div class="level-badge">
                <ion-icon :icon="ribbonOutline" size="large"></ion-icon>
                <span class="level-text">Bronze</span>
              </div>
              <div class="level-details">
                <h2>Current Level: Bronze</h2>
                <p>1,250 points earned</p>
                <div class="progress-container">
                  <div class="progress-header">
                    <span>Progress to Silver</span>
                    <span>1,250 / 2,000</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 62.5%"></div>
                  </div>
                </div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        
        <div class="section-title">Completed Achievements</div>
        
        <ion-card class="achievement-card completed">
          <ion-card-content>
            <div class="achievement-icon">
              <ion-icon :icon="flagOutline"></ion-icon>
            </div>
            <div class="achievement-details">
              <h3>First Report</h3>
              <p>Submit your first community issue report</p>
              <div class="achievement-meta">
                <ion-badge color="success">+50 points</ion-badge>
                <span class="completion-date">Completed Apr 1, 2025</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="achievement-card completed">
          <ion-card-content>
            <div class="achievement-icon">
              <ion-icon :icon="cameraOutline"></ion-icon>
            </div>
            <div class="achievement-details">
              <h3>Photo Reporter</h3>
              <p>Include a photo with your report</p>
              <div class="achievement-meta">
                <ion-badge color="success">+25 points</ion-badge>
                <span class="completion-date">Completed Apr 2, 2025</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="achievement-card completed">
          <ion-card-content>
            <div class="achievement-icon">
              <ion-icon :icon="checkmarkDoneOutline"></ion-icon>
            </div>
            <div class="achievement-details">
              <h3>Issue Resolved</h3>
              <p>Have one of your reported issues fixed</p>
              <div class="achievement-meta">
                <ion-badge color="success">+100 points</ion-badge>
                <span class="completion-date">Completed Apr 5, 2025</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        
        <div class="section-title">Upcoming Achievements</div>
        
        <ion-card class="achievement-card">
          <ion-card-content>
            <div class="achievement-icon locked">
              <ion-icon :icon="peopleOutline"></ion-icon>
            </div>
            <div class="achievement-details">
              <h3>Community Champion</h3>
              <p>Submit 10 reports in your neighborhood</p>
              <div class="achievement-meta">
                <ion-badge color="medium">+200 points</ion-badge>
                <span class="progress-text">Progress: 7/10</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="achievement-card">
          <ion-card-content>
            <div class="achievement-icon locked">
              <ion-icon :icon="starOutline"></ion-icon>
            </div>
            <div class="achievement-details">
              <h3>Five Star Reporter</h3>
              <p>Receive 5 upvotes on your reports</p>
              <div class="achievement-meta">
                <ion-badge color="medium">+150 points</ion-badge>
                <span class="progress-text">Progress: 3/5</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="achievement-card">
          <ion-card-content>
            <div class="achievement-icon locked">
              <ion-icon :icon="calendarOutline"></ion-icon>
            </div>
            <div class="achievement-details">
              <h3>Consistent Contributor</h3>
              <p>Report issues for 5 consecutive weeks</p>
              <div class="achievement-meta">
                <ion-badge color="medium">+300 points</ion-badge>
                <span class="progress-text">Progress: 2/5</span>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
    
    <ion-tabs>
      <ion-tab-bar slot="bottom" class="bottom-nav">
        <ion-tab-button tab="home">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="reports">
          <ion-icon :icon="clipboardOutline"></ion-icon>
          <ion-label>Reports</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="new-report" class="new-report">
          <div class="add-button">
            <ion-icon :icon="addOutline"></ion-icon>
          </div>
          <ion-label>New Report</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="rewards" class="active">
          <ion-icon :icon="ribbonOutline" color="success"></ion-icon>
          <ion-label>Rewards</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="profile">
          <ion-icon :icon="personOutline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardContent,
  IonIcon,
  IonBadge,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/vue';
import { 
  ribbonOutline, 
  flagOutline, 
  cameraOutline, 
  checkmarkDoneOutline, 
  peopleOutline, 
  starOutline, 
  calendarOutline,
  homeOutline,
  clipboardOutline,
  addOutline,
  personOutline
} from 'ionicons/icons';
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
}

.container {
  max-width: 650px;
  margin: 0 auto;
  padding-bottom: 70px;
}

.header-section {
  margin-bottom: 24px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  font-weight: 400;
  color: var(--gray-medium);
}

.stats-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.level-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.level-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f0ad4e;
}

.level-text {
  font-weight: 600;
  margin-top: 4px;
}

.level-details {
  flex: 1;
}

.level-details h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.level-details p {
  font-size: 16px;
  color: var(--gray-medium);
  margin-bottom: 12px;
}

.progress-container {
  width: 100%;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--gray-medium);
}

.progress-bar {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #28a745;
  border-radius: 4px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin: 24px 0 16px;
}

.achievement-card {
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.achievement-card.completed {
  border-left: 4px solid #28a745;
}

.achievement-card ion-card-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
}

.achievement-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--primary-light);
  color: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.achievement-icon.locked {
  background-color: var(--gray-light);
  color: var(--gray-medium);
}

.achievement-details {
  flex: 1;
}

.achievement-details h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.achievement-details p {
  font-size: 14px;
  color: var(--gray-medium);
  margin-bottom: 8px;
}

.achievement-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.completion-date {
  font-size: 12px;
  color: var(--gray-medium);
}

.progress-text {
  font-size: 12px;
  color: var(--gray-medium);
}

/* Bottom navigation */
.bottom-nav {
  border-top: 1px solid var(--gray);
}

.new-report {
  position: relative;
}

.add-button {
  width: 48px;
  height: 48px;
  background-color: var(--primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

ion-tab-button.active {
  color: #28a745;
  font-weight: 600;
}
</style>
