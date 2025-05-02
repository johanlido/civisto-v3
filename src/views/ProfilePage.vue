<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <div class="profile-section">
          <div class="avatar">LA</div>
          <div class="profile-name">Lisa Andersson</div>
          <div class="profile-location">Stockholm, Sweden</div>
          <div class="profile-member">Member since January 2025</div>
        </div>
        
        <div class="stats-grid">
          <div class="stat-box stat-green">
            <div class="stat-number">12</div>
            <div class="stat-label">Reports</div>
          </div>
          <div class="stat-box stat-blue">
            <div class="stat-number">350</div>
            <div class="stat-label">Points</div>
          </div>
          <div class="stat-box stat-purple">
            <div class="stat-number">8</div>
            <div class="stat-label">Fixed Issues</div>
          </div>
          <div class="stat-box stat-yellow">
            <div class="stat-number">5</div>
            <div class="stat-label">Badges</div>
          </div>
        </div>
        
        <div class="section-title">Account Settings</div>
        
        <div class="settings-list">
          <div class="setting-item" v-for="(setting, index) in settings" :key="index" @click="openSetting(setting)">
            <div class="setting-content">
              <div class="setting-icon" :class="'setting-' + index">
                <ion-icon :icon="setting.icon"></ion-icon>
              </div>
              <div class="setting-details">
                <div class="setting-title">{{ setting.title }}</div>
                <div class="setting-description">{{ setting.description }}</div>
              </div>
              <div class="setting-value" v-if="setting.value">
                <span v-if="setting.badge" class="setting-badge">{{ setting.value }}</span>
                <span v-else>{{ setting.value }}</span>
              </div>
              <ion-icon :icon="chevronForward" class="setting-arrow"></ion-icon>
            </div>
          </div>
        </div>
        
        <ion-button expand="block" color="danger" fill="outline" class="sign-out-button" @click="signOut">
          <ion-icon slot="start" :icon="logOutOutline"></ion-icon>
          Sign Out
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/vue';
import { 
  personOutline,
  globeOutline,
  notificationsOutline,
  ribbonOutline,
  lockClosedOutline,
  helpCircleOutline,
  documentTextOutline,
  logOutOutline,
  chevronForward
} from 'ionicons/icons';

export default defineComponent({
  name: 'ProfilePage',
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonIcon
  },
  setup() {
    const router = useRouter();
    
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
        icon: ribbonOutline,
        title: 'Rewards',
        description: 'Coming soon'
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

    const openSetting = (setting) => {
      console.log(`Opening setting: ${setting.title}`);
    };

    const signOut = () => {
      console.log('Signing out...');
      // In a real implementation, this would sign the user out
      // router.push('/auth/signin');
    };

    return {
      settings,
      openSetting,
      signOut,
      personOutline,
      globeOutline,
      notificationsOutline,
      ribbonOutline,
      lockClosedOutline,
      helpCircleOutline,
      documentTextOutline,
      logOutOutline,
      chevronForward
    };
  }
});
</script>

<style>
.container {
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 70px;
}

/* Profile Section */
.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 24px;
  padding-top: 24px;
}

.avatar {
  width: 96px;
  height: 96px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 600;
  color: white;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(34, 197, 94, 0.2);
}

.profile-name {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.profile-location {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 4px;
}

.profile-member {
  font-size: 14px;
  color: #6b7280;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-box {
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transition: transform 0.2s ease;
}

.stat-box:hover {
  transform: translateY(-2px);
}

.stat-green {
  background-color: #f0fdf4;
}

.stat-green .stat-number {
  color: #22c55e;
}

.stat-green .stat-label {
  color: #16a34a;
}

.stat-blue {
  background-color: #e0f2fe;
}

.stat-blue .stat-number {
  color: #0ea5e9;
}

.stat-blue .stat-label {
  color: #0284c7;
}

.stat-purple {
  background-color: #f3e8ff;
}

.stat-purple .stat-number {
  color: #9333ea;
}

.stat-purple .stat-label {
  color: #7e22ce;
}

.stat-yellow {
  background-color: #fef3c7;
}

.stat-yellow .stat-number {
  color: #f59e0b;
}

.stat-yellow .stat-label {
  color: #d97706;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  font-weight: 500;
}

/* Section Title */
.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
  margin-top: 32px;
}

/* Settings List */
.settings-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.setting-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
  margin: 0;
  padding: 16px;
}

.setting-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.setting-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.setting-icon {
  width: 40px;
  height: 40px;
  background-color: #f0fdf4;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #22c55e;
}

.setting-0 {
  background-color: #f0fdf4;
  color: #22c55e;
}

.setting-1 {
  background-color: #dbeafe;
  color: #3b82f6;
}

.setting-2 {
  background-color: #fef3c7;
  color: #f59e0b;
}

.setting-3 {
  background-color: #f3e8ff;
  color: #9333ea;
}

.setting-4 {
  background-color: #fff1f2;
  color: #ef4444;
}

.setting-5 {
  background-color: #e0f2fe;
  color: #0ea5e9;
}

.setting-6 {
  background-color: #ede9fe;
  color: #8b5cf6;
}

.setting-details {
  flex: 1;
}

.setting-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 2px;
}

.setting-description {
  font-size: 14px;
  color: #6b7280;
}

.setting-value {
  margin-right: 8px;
  font-size: 14px;
  color: #6b7280;
}

.setting-badge {
  background-color: #22c55e;
  color: white;
  border-radius: 16px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
}

.setting-arrow {
  color: #9ca3af;
  font-size: 18px;
}

/* Sign Out Button */
.sign-out-button {
  --border-radius: 12px;
  --border-color: #fee2e2;
  --color: #ef4444;
  font-weight: 500;
  height: 48px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .profile-name {
    font-size: 20px;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    font-size: 28px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat-number {
    font-size: 28px;
  }
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>