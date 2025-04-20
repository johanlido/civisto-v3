<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <div class="header">
          <h1>My Profile</h1>
          <ion-button fill="clear" class="settings-button">
            <ion-icon :icon="settingsOutline" />
          </ion-button>
        </div>
        
        <ion-card class="profile-card">
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
        
        <ion-list>
          <ion-item class="setting-item" v-for="(setting, index) in settings" :key="index" button detail>
            <div class="setting-left">
              <ion-icon :icon="setting.icon" class="setting-icon" />
              <div class="setting-content">
                <div class="setting-title">{{ setting.title }}</div>
                <div class="setting-description">{{ setting.description }}</div>
              </div>
            </div>
            
            <div slot="end" class="setting-value" v-if="setting.value">
              <span v-if="setting.badge" class="badge">{{ setting.value }}</span>
              <span v-else>{{ setting.value }}</span>
            </div>
          </ion-item>
        </ion-list>
        
        <ion-button expand="block" color="danger" fill="outline" class="sign-out-button">
          <ion-icon slot="start" :icon="logOutOutline" />
          Sign Out
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { 
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonLabel
} from '@ionic/vue';
import { 
  settingsOutline,
  personOutline,
  globeOutline,
  notificationsOutline,
  medalOutline,
  lockClosedOutline,
  helpCircleOutline,
  documentTextOutline,
  logOutOutline,
  homeOutline,
  chevronForward
} from 'ionicons/icons';

export default defineComponent({
  name: 'ProfilePage',
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonRouterOutlet,
    IonLabel
  },
  setup() {
    const settings = [
      {
        icon: personOutline,
        title: 'Personal Information',
        description: 'Update your name and contact details'
      },
      {
        icon: globeOutline,
        title: 'Municipality',
        description: 'Change your primary municipality',
        value: 'Stockholm'
      },
      {
        icon: notificationsOutline,
        title: 'Notifications',
        description: 'Manage notification preferences'
      },
      {
        icon: medalOutline,
        title: 'Rewards',
        description: 'View available and redeemed rewards',
        value: '3 Available',
        badge: true
      },
      {
        icon: lockClosedOutline,
        title: 'Privacy',
        description: 'Control your data and privacy settings'
      },
      {
        icon: helpCircleOutline,
        title: 'Help & Support',
        description: 'Get assistance or report an issue'
      },
      {
        icon: documentTextOutline,
        title: 'Terms & Conditions',
        description: 'Review our terms and policies'
      }
    ];

    return {
      settings,
      settingsOutline,
      personOutline,
      medalOutline,
      documentTextOutline,
      homeOutline,
      logOutOutline
    };
  }
});
</script>

<style scoped>
.container {
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.settings-button {
  width: 40px;
  height: 40px;
  --border-radius: 8px;
  --box-shadow: none;
  --background: #fff;
  --border-color: var(--ion-color-light);
}

.profile-card {
  margin-bottom: 24px;
  box-shadow: none;
  border: 1px solid var(--ion-color-light);
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
  border: 2px solid var(--ion-color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: var(--ion-color-primary);
  margin-bottom: 16px;
}

.profile-name {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 4px;
}

.profile-location {
  font-size: 16px;
  color: var(--ion-color-medium);
  margin-bottom: 4px;
}

.profile-member {
  font-size: 14px;
  color: var(--ion-color-medium);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.stat-box {
  background-color: var(--ion-color-primary-tint);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--ion-color-primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: var(--ion-color-primary);
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

ion-list {
  background: transparent;
  padding: 0;
  margin-bottom: 24px;
}

.setting-item {
  --padding-start: 0;
  --inner-padding-end: 0;
  --background: transparent;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid var(--ion-color-light);
}

.setting-left {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 16px;
}

.setting-icon {
  color: var(--ion-color-primary);
  font-size: 24px;
}

.setting-content {
  display: flex;
  flex-direction: column;
}

.setting-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
}

.setting-description {
  font-size: 14px;
  color: var(--ion-color-medium);
}

.setting-value {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 16px;
  font-size: 14px;
  color: var(--ion-color-medium);
}

.badge {
  background-color: var(--ion-color-primary);
  color: white;
  border-radius: 16px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
}

.sign-out-button {
  --border-radius: 8px;
  --border-color: #f8d7da;
  --color: #dc3545;
  font-weight: 500;
  margin-bottom: 24px;
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
