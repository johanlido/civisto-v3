<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/tabs/home">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>        
        <ion-tab-button tab="chat-report" href="/tabs/chat-report">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Chat report</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="reports" href="/tabs/reports">
          <ion-icon :icon="clipboardOutline"></ion-icon>
          <ion-label>Reports</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="new-report" href="/tabs/new-report">
          <ion-icon :icon="addOutline"></ion-icon>
          <ion-label>New Report</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="achievements" href="/tabs/achievements">
          <ion-icon :icon="ribbonOutline"></ion-icon>
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
  IonRouterOutlet 
} from '@ionic/vue';
import { 
  homeOutline, 
  clipboardOutline, 
  addOutline, 
  ribbonOutline, 
  personOutline 
} from 'ionicons/icons';
</script>

<style scoped>
.new-report {
  position: relative;
}

.add-button {
  width: 48px;
  height: 48px;
  background-color: var(--ion-color-primary);
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
</style>
