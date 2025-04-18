<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Reports</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="container">
        <p class="subtitle">Track the status of your maintenance reports and their progress</p>
        
        <div class="tabs">
          <div class="tab active">Active</div>
          <div class="tab">Completed</div>
          <div class="tab">All</div>
        </div>
        
        <ion-card class="notification">
          <ion-card-content>
            <div class="bell-icon">
              <ion-icon :icon="notificationsOutline" color="success"></ion-icon>
            </div>
            <div class="notification-content">
              <h3>Updates Available</h3>
              <p>Your report at Stora Torget has been updated. Check for details.</p>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="report-card">
          <div class="recycling-icon">
            <ion-icon :icon="imageOutline" size="large"></ion-icon>
          </div>
          <ion-card-content>
            <div class="report-title">
              Broken Streetlight
              <span class="status in-progress">
                <span class="status-icon">
                  <ion-icon :icon="timeOutline" size="small"></ion-icon>
                </span>
                In Progress
              </span>
            </div>
            <div class="location-date">
              Stora Torget, Uppsala • 2025-04-01
            </div>
            <div class="description">
              The streetlight has been flickering for two weeks and sometimes doesn't turn on at night, creating safety...
            </div>
            <div class="tags">
              <div class="tag">Street Lighting</div>
              <div class="tag">Uppsala Kommun</div>
            </div>
            <div class="votes">
              <span>
                <ion-icon :icon="pulseOutline" size="small"></ion-icon>
                12 votes
              </span>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="report-card">
          <div class="recycling-icon">
            <ion-icon :icon="imageOutline" size="large"></ion-icon>
          </div>
          <ion-card-content>
            <div class="report-title">
              Pothole on Main Road
              <span class="status pending">
                <span class="status-icon">
                  <ion-icon :icon="hourglassOutline" size="small"></ion-icon>
                </span>
                Pending Review
              </span>
            </div>
            <div class="location-date">
              Kungsgatan, Stockholm • 2025-04-03
            </div>
            <div class="description">
              Large pothole approximately 30cm in diameter and 10cm deep. Causing traffic problems and potential...
            </div>
            <div class="tags">
              <div class="tag">Road Damage</div>
              <div class="tag">Stockholm Stad</div>
            </div>
            <div class="votes">
              <span>
                <ion-icon :icon="pulseOutline" size="small"></ion-icon>
                8 votes
              </span>
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
        
        <ion-tab-button tab="reports" class="active">
          <ion-icon :icon="clipboardOutline" color="success"></ion-icon>
          <ion-label>Reports</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="new-report" class="new-report">
          <div class="add-button">
            <ion-icon :icon="addOutline"></ion-icon>
          </div>
          <ion-label>New Report</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="rewards">
          <ion-icon :icon="ribbonOutline"></ion-icon>
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
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel
} from '@ionic/vue';
import { 
  notificationsOutline, 
  imageOutline, 
  timeOutline, 
  hourglassOutline, 
  pulseOutline,
  homeOutline,
  clipboardOutline,
  addOutline,
  ribbonOutline,
  personOutline
} from 'ionicons/icons';
</script>

<style scoped>
:root {
  --primary: #00A651;
  --background: #f8f9fa;
  --foreground: #333333;
  --karen-green: #00A651;
  --karen-light-green: #E8F7EF;
  --karen-dark-green: #00894A;
  --karen-dark-gray: #333333;
  --karen-gray: #F2F2F2;
}

.container {
  max-width: 650px;
  margin: 0 auto;
  padding-bottom: 70px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 16px;
  font-weight: 400;
  color: #6c757d;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
  border: 1px solid #e9ecef;
}

.tab {
  flex: 1;
  padding: 12px 0;
  text-align: center;
  background-color: var(--karen-gray);
  cursor: pointer;
  border-right: 1px solid #e9ecef;
}

.tab:last-child {
  border-right: none;
}

.tab.active {
  background-color: #ffffff;
  color: var(--foreground);
  font-weight: 500;
}

.notification {
  background-color: #e5f7ec;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  margin-bottom: 24px;
}

.notification ion-card-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
}

.bell-icon {
  color: #28a745;
  font-size: 20px;
}

.notification-content h3 {
  color: #28a745;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.notification-content p {
  font-size: 14px;
  font-weight: 400;
  margin: 0;
}

.report-card {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.recycling-icon {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1d3557;
  color: #ffffff;
}

.report-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 16px;
  display: flex;
  align-items: center;
}

.status.in-progress {
  background-color: #e7f1ff;
  color: #0d6efd;
}

.status.pending {
  background-color: #fff8e1;
  color: #b8860b;
}

.status-icon {
  margin-right: 4px;
}

.location-date {
  font-size: 14px;
  font-weight: 400;
  color: #6c757d;
  margin-bottom: 12px;
}

.description {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 16px;
  line-height: 1.5;
}

.tags {
  display: flex;
  margin-bottom: 12px;
}

.tag {
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  background-color: var(--karen-gray);
  border-radius: 16px;
  margin-right: 8px;
}

.votes {
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* Bottom navigation */
.bottom-nav {
  border-top: 1px solid #e9ecef;
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
