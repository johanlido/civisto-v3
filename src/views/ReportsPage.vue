<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Achieve Something</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="container">
        <h1>My Reports</h1>
        <p class="subtitle">Track the status of your maintenance reports and their progress</p>
        
        <div class="tabs">
          <div 
            v-for="tab in tabs" 
            :key="tab.id" 
            :class="['tab', activeTab === tab.id ? 'active' : '']"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </div>
        </div>
        
        <ion-card class="notification">
          <ion-card-content class="notification-content-wrapper">
            <div class="bell-icon">
              <ion-icon :icon="notifications" />
            </div>
            <div class="notification-content">
              <h3>Updates Available</h3>
              <p>Your report at Stora Torget has been updated. Check for details.</p>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-card v-for="(report, index) in filteredReports" :key="index" class="report-card">
          <div class="recycling-icon">
            <ion-icon :icon="image" size="large" />
          </div>
          
          <ion-card-content>
            <div class="report-title">
              {{ report.title }}
              <span :class="['status', report.statusClass]">
                <span class="status-icon">
                  <ion-icon :icon="report.statusIcon" size="small" />
                </span>
                {{ report.status }}
              </span>
            </div>
            
            <div class="location-date">
              {{ report.location }} • {{ report.date }}
            </div>
            
            <div class="description">
              {{ report.description }}
            </div>
            
            <div class="tags">
              <div class="tag" v-for="(tag, tagIndex) in report.tags" :key="tagIndex">
                {{ tag }}
              </div>
            </div>
            
            <div class="votes">
              <span>
                <ion-icon :icon="pulse" size="small" />
                {{ report.votes }} votes
              </span>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
    
  </ion-page>
</template>

<script>
import { 
  IonPage, 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonIcon, 
  IonTabs, 
  IonTabBar, 
  IonTabButton,
  IonLabel,
  IonRouterOutlet
} from '@ionic/vue';
import { 
  home, 
  document, 
  medal, 
  person, 
  notifications,
  pulse,
  refreshCircle,
  time,
  image
} from 'ionicons/icons';
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'ReportsPage',
  components: {
    IonPage, 
    IonContent, 
    IonCard, 
    IonCardContent, 
    IonIcon, 
    IonTabs, 
    IonTabBar, 
    IonTabButton,
    IonLabel,
    IonRouterOutlet
  },
  setup() {
    const activeTab = ref('active');
    
    const tabs = [
      { id: 'active', name: 'Active' },
      { id: 'completed', name: 'Completed' },
      { id: 'all', name: 'All' }
    ];
    
    const reports = [
      {
        id: 1,
        title: 'Broken Streetlight',
        status: 'In Progress',
        statusClass: 'in-progress',
        statusIcon: refreshCircle,
        location: 'Stora Torget, Uppsala',
        date: '2025-04-01',
        description: 'The streetlight has been flickering for two weeks and sometimes doesn\'t turn on at night, creating safety...',
        tags: ['Street Lighting', 'Uppsala Kommun'],
        votes: 12,
        isCompleted: false
      },
      {
        id: 2,
        title: 'Pothole on Main Road',
        status: 'Pending Review',
        statusClass: 'pending',
        statusIcon: time,
        location: 'Kungsgatan, Stockholm',
        date: '2025-04-03',
        description: 'Large pothole approximately 30cm in diameter and 10cm deep. Causing traffic problems and potential...',
        tags: ['Road Damage', 'Stockholm Stad'],
        votes: 8,
        isCompleted: false
      },
      {
        id: 3,
        title: 'Graffiti Clean Up',
        status: 'Completed',
        statusClass: 'completed',
        statusIcon: time,
        location: 'Central Station, Malmö',
        date: '2025-03-15',
        description: 'Graffiti on the south-facing wall of the station needs to be removed. Contains inappropriate content...',
        tags: ['Vandalism', 'Malmö Stad'],
        votes: 5,
        isCompleted: true
      }
    ];
    
    const filteredReports = computed(() => {
      if (activeTab.value === 'all') {
        return reports;
      } else if (activeTab.value === 'active') {
        return reports.filter(report => !report.isCompleted);
      } else if (activeTab.value === 'completed') {
        return reports.filter(report => report.isCompleted);
      }
      return reports;
    });
    
    return {
      activeTab,
      tabs,
      reports,
      filteredReports,
      // Icons
      home,
      document,
      medal,
      person,
      notifications,
      pulse,
      refreshCircle,
      time,
      image
    };
  }
});
</script>

<style>
:root {
  --ion-color-primary: #00A651;
  --ion-color-primary-rgb: 0, 166, 81;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #00894A;
  --ion-color-primary-tint: #E8F7EF;
  
  --ion-color-light: #f8f9fa;
  --ion-color-light-rgb: 248, 249, 250;
  --ion-color-light-contrast: #000000;
  --ion-color-light-contrast-rgb: 0, 0, 0;
  --ion-color-light-shade: #dadddf;
  --ion-color-light-tint: #f9fafb;
  
  --ion-color-medium: #6c757d;
  --ion-color-medium-rgb: 108, 117, 125;
  --ion-color-medium-contrast: #ffffff;
  --ion-color-medium-contrast-rgb: 255, 255, 255;
  --ion-color-medium-shade: #5f666e;
  --ion-color-medium-tint: #7b848a;
  
  --karen-green: #00A651;
  --karen-light-green: #E8F7EF;
  --karen-dark-green: #00894A;
  --karen-dark-gray: #333333;
  --karen-gray: #F2F2F2;
}

/* Global Styles */
* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

ion-content {
  --background: var(--ion-color-light);
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--karen-dark-gray);
}

.container {
  max-width: 650px;
  margin: 0 auto;
  padding-bottom: 70px;
}

.subtitle {
  font-size: 16px;
  font-weight: 400;
  color: var(--ion-color-medium);
  margin-bottom: 24px;
}

/* Custom Tabs */
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
  color: var(--karen-dark-gray);
  font-weight: 500;
}

/* Notification Card */
.notification {
  background-color: #e5f7ec;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 0;
  margin-bottom: 24px;
  --background: #e5f7ec;
  box-shadow: none;
}

.notification-content-wrapper {
  display: flex;
  align-items: flex-start;
  padding: 16px;
}

.bell-icon {
  margin-right: 12px;
  color: #28a745;
  font-size: 24px;
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

/* Report Cards */
.report-card {
  margin-bottom: 24px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: none;
}

.recycling-icon {
  width: 100%;
  height: 200px;
  background-color: #1d3557;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

ion-card-content {
  padding: 16px;
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

.status.completed {
  background-color: #e5f7ec;
  color: #28a745;
}

.status-icon {
  margin-right: 4px;
  display: flex;
  align-items: center;
}

.location-date {
  font-size: 14px;
  font-weight: 400;
  color: var(--ion-color-medium);
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
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  background-color: var(--karen-gray);
  border-radius: 16px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.votes {
  font-size: 14px;
  font-weight: 500;
  color: var(--ion-color-medium);
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.votes span {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Tab Bar */
ion-tab-bar {
  --background: #fff;
  border-top: 1px solid #e9ecef;
}

ion-tab-button {
  --color: var(--karen-dark-gray);
  --color-selected: #28a745;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .report-title {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .status {
    margin-top: 8px;
  }
  
  .tags {
    flex-wrap: wrap;
  }
  
  .tag {
    margin-bottom: 8px;
  }
}
</style>