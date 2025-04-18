<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My Profile</ion-title>
        <ion-buttons slot="end">
          <ion-button class="settings-button">
            <ion-icon :icon="settingsOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <div class="container">
        <ion-card>
          <ion-card-content>
            <div class="profile-section">
              <div class="avatar">LA</div>
              <div class="profile-name">Lisa Andersson</div>
              <div class="profile-location">Stockholm Resident</div>
              <div class="profile-member">Member since January 2025</div>
            </div>
            
            <div class="stats-grid">
              <div class="stat-box">
                <div class="stat-number">12</div>
                <div class="stat-label">Reports</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">350</div>
                <div class="stat-label">Points</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">8</div>
                <div class="stat-label">Fixed Issues</div>
              </div>
              <div class="stat-box">
                <div class="stat-number">5</div>
                <div class="stat-label">Badges</div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        
        <div class="section-title">Account Settings</div>
        
        <ion-card class="setting-row" button>
          <ion-card-content>
            <div class="setting-left">
              <ion-icon class="setting-icon" :icon="personOutline"></ion-icon>
              <div class="setting-content">
                <div class="setting-title">Personal Information</div>
                <div class="setting-description">Update your name and contact details</div>
              </div>
            </div>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="setting-row" button>
          <ion-card-content>
            <div class="setting-left">
              <ion-icon class="setting-icon" :icon="globeOutline"></ion-icon>
              <div class="setting-content">
                <div class="setting-title">Municipality</div>
                <div class="setting-description">Change your primary municipality</div>
              </div>
            </div>
            <div class="setting-value">
              Stockholm
              <ion-icon :icon="chevronForwardOutline"></ion-icon>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="setting-row" button>
          <ion-card-content>
            <div class="setting-left">
              <ion-icon class="setting-icon" :icon="notificationsOutline"></ion-icon>
              <div class="setting-content">
                <div class="setting-title">Notifications</div>
                <div class="setting-description">Manage notification preferences</div>
              </div>
            </div>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="setting-row" button>
          <ion-card-content>
            <div class="setting-left">
              <ion-icon class="setting-icon" :icon="ribbonOutline"></ion-icon>
              <div class="setting-content">
                <div class="setting-title">Rewards</div>
                <div class="setting-description">View available and redeemed rewards</div>
              </div>
            </div>
            <div class="setting-value">
              <ion-badge class="badge">3 Available</ion-badge>
              <ion-icon :icon="chevronForwardOutline"></ion-icon>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="setting-row" button>
          <ion-card-content>
            <div class="setting-left">
              <ion-icon class="setting-icon" :icon="lockClosedOutline"></ion-icon>
              <div class="setting-content">
                <div class="setting-title">Privacy</div>
                <div class="setting-description">Control your data and privacy settings</div>
              </div>
            </div>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="setting-row" button>
          <ion-card-content>
            <div class="setting-left">
              <ion-icon class="setting-icon" :icon="helpCircleOutline"></ion-icon>
              <div class="setting-content">
                <div class="setting-title">Help & Support</div>
                <div class="setting-description">Get assistance or report an issue</div>
              </div>
            </div>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </ion-card-content>
        </ion-card>
        
        <ion-card class="setting-row" button>
          <ion-card-content>
            <div class="setting-left">
              <ion-icon class="setting-icon" :icon="documentTextOutline"></ion-icon>
              <div class="setting-content">
                <div class="setting-title">Terms & Conditions</div>
                <div class="setting-description">Read our terms and privacy policy</div>
              </div>
            </div>
            <ion-icon :icon="chevronForwardOutline"></ion-icon>
          </ion-card-content>
        </ion-card>
        
        <ion-button expand="block" color="danger" class="sign-out-button" @click="handleSignOut">
          <ion-icon slot="start" :icon="logOutOutline" class="sign-out-icon"></ion-icon>
          Sign Out
        </ion-button>
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
        
        <ion-tab-button tab="rewards">
          <ion-icon :icon="ribbonOutline"></ion-icon>
          <ion-label>Rewards</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="profile" class="active">
          <ion-icon :icon="personOutline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
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
  IonCard, 
  IonCardContent,
  IonBadge,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonToast
} from '@ionic/vue';
import { 
  settingsOutline, 
  personOutline, 
  globeOutline, 
  notificationsOutline, 
  ribbonOutline, 
  lockClosedOutline, 
  helpCircleOutline, 
  documentTextOutline, 
  logOutOutline,
  chevronForwardOutline,
  homeOutline,
  clipboardOutline,
  addOutline
} from 'ionicons/icons';
import { signOut } from '@/services/supabase';

const router = useRouter();

const handleSignOut = async () => {
  const { error } = await signOut();
  
  if (error) {
  /*  IonToast({
      message: 'Failed to sign out. Please try again.',
      duration: 3000,
      color: 'danger'
    });*/
    return;
  }
  
  router.replace('/auth/signin');
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
}

.container {
  max-width: 650px;
  margin: 0 auto;
  padding-bottom: 70px;
}

.settings-button {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  --background: #fff;
  --color: var(--foreground);
  --border-color: var(--gray);
  --border-style: solid;
  --border-width: 1px;
}

ion-card {
  margin: 0 0 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: var(--primary);
  margin-bottom: 16px;
  background-color: var(--primary-light);
}

.profile-name {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--foreground);
}

.profile-location {
  font-size: 16px;
  color: var(--gray-medium);
  margin-bottom: 4px;
}

.profile-member {
  font-size: 14px;
  color: var(--gray-medium);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-box {
  background-color: var(--primary-light);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--primary);
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--foreground);
}

.setting-row {
  padding: 0;
  margin-bottom: 16px;
  cursor: pointer;
}

.setting-row ion-card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.setting-left {
  display: flex;
  gap: 12px;
  align-items: center;
}

.setting-icon {
  width: 24px;
  height: 24px;
  color: var(--primary);
}

.setting-content {
  display: flex;
  flex-direction: column;
}

.setting-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
  color: var(--foreground);
}

.setting-description {
  font-size: 14px;
  color: var(--gray-medium);
}

.setting-value {
  font-size: 14px;
  color: var(--gray-medium);
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  --background: var(--primary);
  --color: white;
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 4px;
  --padding-bottom: 4px;
  font-size: 12px;
  font-weight: 500;
}

.sign-out-button {
  margin-top: 16px;
  --border-radius: 8px;
  --background: white;
  --color: #dc3545;
  --border-color: #f8d7da;
  --border-style: solid;
  --border-width: 1px;
  --box-shadow: none;
  font-weight: 500;
}

.sign-out-icon {
  color: #dc3545;
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
  color: var(--primary);
  font-weight: 600;
}
</style>
