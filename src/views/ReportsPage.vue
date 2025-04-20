<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <h1>My Reports</h1>
        <p class="subtitle">Track the status of your maintenance reports and their progress</p>
        
        <ion-segment v-model="activeTab" class="tabs">
          <ion-segment-button value="active">Active</ion-segment-button>
          <ion-segment-button value="completed">Completed</ion-segment-button>
          <ion-segment-button value="all">All</ion-segment-button>
        </ion-segment>
        
        <!-- Active Reports Section -->
        <div v-if="activeTab === 'active'" class="reports-container">
          <ion-card class="report-card" v-for="(report, index) in activeReports" :key="index" @click="openReportDetails(report)">
            <ion-card-content>
              <div class="report-header">
                <div class="category-icon" :style="{ backgroundColor: report.iconBg, color: report.iconColor }">
                  <ion-icon :icon="report.icon" size="small"></ion-icon>
                </div>
                <div class="report-info">
                  <div class="report-title">
                    {{ report.title }}
                    <ion-badge class="status" :class="report.statusClass">
                      <ion-icon :icon="report.statusIcon" size="small" class="status-icon"></ion-icon>
                      {{ report.status }}
                    </ion-badge>
                  </div>
                  <div class="location-date">
                    {{ report.location }} • {{ report.date }}
                  </div>
                </div>
              </div>
              <div class="progress-container">
                <div class="progress-bar" :class="report.statusClass" :style="{ width: report.progress + '%' }"></div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        
        <!-- Completed Reports Section -->
        <div v-if="activeTab === 'completed'" class="reports-container">
          <ion-card class="report-card" v-for="(report, index) in completedReports" :key="index" @click="openReportDetails(report)">
            <ion-card-content>
              <div class="report-header">
                <div class="category-icon" :style="{ backgroundColor: report.iconBg, color: report.iconColor }">
                  <ion-icon :icon="report.icon" size="small"></ion-icon>
                </div>
                <div class="report-info">
                  <div class="report-title">
                    {{ report.title }}
                    <ion-badge class="status" :class="report.statusClass">
                      <ion-icon :icon="report.statusIcon" size="small" class="status-icon"></ion-icon>
                      {{ report.status }}
                    </ion-badge>
                  </div>
                  <div class="location-date">
                    {{ report.location }} • {{ report.date }}
                  </div>
                </div>
              </div>
              <div class="progress-container">
                <div class="progress-bar" :class="report.statusClass" :style="{ width: report.progress + '%' }"></div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        
        <!-- All Reports Section -->
        <div v-if="activeTab === 'all'" class="reports-container">
          <ion-card class="report-card" v-for="(report, index) in allReports" :key="index" @click="openReportDetails(report)">
            <ion-card-content>
              <div class="report-header">
                <div class="category-icon" :style="{ backgroundColor: report.iconBg, color: report.iconColor }">
                  <ion-icon :icon="report.icon" size="small"></ion-icon>
                </div>
                <div class="report-info">
                  <div class="report-title">
                    {{ report.title }}
                    <ion-badge class="status" :class="report.statusClass">
                      <ion-icon :icon="report.statusIcon" size="small" class="status-icon"></ion-icon>
                      {{ report.status }}
                    </ion-badge>
                  </div>
                  <div class="location-date">
                    {{ report.location }} • {{ report.date }}
                  </div>
                </div>
              </div>
              <div class="progress-container">
                <div class="progress-bar" :class="report.statusClass" :style="{ width: report.progress + '%' }"></div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
    
  </ion-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet
} from '@ionic/vue';
import {
  homeOutline,
  documentTextOutline,
  ribbonOutline,
  personOutline,
  refreshCircle,
  timeOutline,
  checkmarkCircleOutline,
  documentOutline,
  alertCircleOutline,
  gridOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'SimplifiedReportsPage',
  components: {
    IonPage,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonCard,
    IonCardContent,
    IonBadge,
    IonIcon,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonRouterOutlet
  },
  setup() {
    const router = useRouter();
    const activeTab = ref('active');
    
    // Define the report data
    const reports = [
      {
        id: 1,
        title: 'Broken Streetlight',
        location: 'Stora Torget',
        date: '2025-04-01',
        status: 'In Progress',
        statusClass: 'in-progress',
        statusIcon: refreshCircle,
        icon: documentOutline,
        iconBg: '#e7f1ff',
        iconColor: '#0d6efd',
        progress: 45,
        isCompleted: false
      },
      {
        id: 2,
        title: 'Pothole on Main Road',
        location: 'Kungsgatan',
        date: '2025-04-03',
        status: 'Pending Review',
        statusClass: 'pending',
        statusIcon: timeOutline,
        icon: alertCircleOutline,
        iconBg: '#fff8e1',
        iconColor: '#b8860b',
        progress: 15,
        isCompleted: false
      },
      {
        id: 3,
        title: 'Broken Park Bench',
        location: 'City Park',
        date: '2025-03-15',
        status: 'Completed',
        statusClass: 'completed',
        statusIcon: checkmarkCircleOutline,
        icon: gridOutline,
        iconBg: '#dcfce7',
        iconColor: '#16a34a',
        progress: 100,
        isCompleted: true
      }
    ];
    
    // Filter reports based on active tab
    const activeReports = computed(() => {
      return reports.filter(report => !report.isCompleted);
    });
    
    const completedReports = computed(() => {
      return reports.filter(report => report.isCompleted);
    });
    
    const allReports = computed(() => {
      return reports;
    });
    
    // Function to navigate to report details
    const openReportDetails = (report) => {
      console.log('Opening report details for:', report.title);
      router.push(`/reports/${report.id}`);
    };
    
    return {
      activeTab,
      activeReports,
      completedReports,
      allReports,
      openReportDetails,
      
      // Icons
      homeOutline,
      documentTextOutline,
      ribbonOutline,
      personOutline,
      refreshCircle,
      timeOutline,
      checkmarkCircleOutline,
      documentOutline,
      alertCircleOutline,
      gridOutline
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

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--ion-color-dark);
}

.subtitle {
  font-size: 16px;
  font-weight: 400;
  color: var(--ion-color-medium);
  margin-bottom: 24px;
}

/* Tabs */
.tabs {
  margin-bottom: 24px;
  border-radius: 8px;
  --background: var(--ion-color-light);
}

ion-segment-button {
  --color: var(--ion-color-dark);
  --color-checked: var(--ion-color-dark);
  --background-checked: #ffffff;
  --border-color: #e9ecef;
  --indicator-color: transparent;
  min-height: 45px;
  font-weight: normal;
}

ion-segment-button::part(indicator) {
  display: none;
}

/* Report Cards */
.report-card {
  margin-bottom: 16px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: visible;
}

.report-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

ion-card-content {
  padding: 16px;
}

.report-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.category-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.report-info {
  flex: 1;
}

.report-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.status {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.status-icon {
  margin-right: 4px;
}

.status.in-progress {
  --background: #e7f1ff;
  --color: #0d6efd;
}

.status.pending {
  --background: #fff8e1;
  --color: #b8860b;
}

.status.completed {
  --background: #dcfce7;
  --color: #16a34a;
}

.location-date {
  font-size: 14px;
  font-weight: 400;
  color: var(--ion-color-medium);
}

/* Progress Bar */
.progress-container {
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-top: 12px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
  position: absolute;
  top: 0;
  left: 0;
}

.progress-bar.in-progress {
  background-color: #0d6efd;
  animation: pulse 2s infinite;
}

.progress-bar.pending {
  background-color: #b8860b;
  animation: pulse 2s infinite;
}

.progress-bar.completed {
  background-color: #16a34a;
}

@keyframes pulse {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}

/* Responsive Adjustments */
@media (max-width: 480px) {
  .report-title {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .status {
    align-self: flex-start;
    margin-top: 4px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 12px;
  }
  
  h1 {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 14px;
  }
  
  .report-card ion-card-content {
    padding: 12px;
  }
  
  .category-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
