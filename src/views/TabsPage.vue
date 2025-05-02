<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>        
        <ion-tab-button tab="reports" href="/tabs/reports">
          <ion-icon :icon="documentTextOutline"></ion-icon>
          <ion-label>Reports</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="chat-report" href="/tabs/chat-report">
          <ion-icon :icon="addCircleOutline"></ion-icon>
          <ion-label>Chat report</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="achievements" href="/tabs/achievements">
          <ion-icon :icon="medalOutline"></ion-icon>
          <ion-label>Rewards</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon :icon="personOutline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>

        
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet,
  IonPage
} from '@ionic/vue';
import { 
  homeOutline, 
  personOutline,
  medalOutline,
  documentTextOutline,
  addCircleOutline
} from 'ionicons/icons';
</script>

<style scoped>
.modern-tab-bar {
  --background: #ffffff;
  height: 60px; /* Slightly increased for more space */
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
  border-top: 1px solid #f1f1f1;
  padding-top: 6px; /* Added padding at the top */
}

.tab-button {
  --color: #6b7280;
  --color-selected: #22c55e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-icon {
  font-size: 22px;
  margin-bottom: 4px;
}

.tab-label {
  font-size: 12px;
  margin-top: 4px; /* Consistent margin */
}

.report-tab {
  position: relative;
  margin-top: -12px; /* Adjust this value to position the circle properly */
}

.report-button {
  background-color: #22c55e;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.report-icon {
  font-size: 20px;
}

/* Selected state styling */
.tab-button.tab-selected .tab-icon,
.tab-button.tab-selected .tab-label {
  color: #22c55e;
}

.tab-button.tab-selected.report-tab .report-button {
  background-color: #1ca04a;
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.3);
}
</style>