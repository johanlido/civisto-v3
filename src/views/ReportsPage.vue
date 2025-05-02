<template>
  <ion-page>
    <ion-content>
      <div class="page-container">
        <div class="header">
          <div class="title-container">
            <h1 class="page-title">All Reports</h1>
          </div>

          <div class="search-bar">
            <ion-icon :icon="searchOutline" style="color: #6b7280;"></ion-icon>
            <ion-input placeholder="Search reports..." class="search-input"></ion-input>
            <ion-icon :icon="optionsOutline" class="filter-icon"></ion-icon>
          </div>

          <div class="modern-tabs">
            <div 
              v-for="tab in ['All', 'Active', 'Resolved']" 
              :key="tab"
              :class="['tab-option', activeTab === tab.toLowerCase() ? 'active' : '']"
              @click="handleTabClick(tab.toLowerCase())"
            >
              {{ tab }}
            </div>
          </div>
        </div>

        <div class="main-content">
          <div :class="['loading', isLoading ? 'visible' : '']">
            <ion-spinner name="circular"></ion-spinner>
            <p>Loading reports...</p>
          </div>

          <!-- Report Cards Container -->
          <div class="report-cards" v-if="!isLoading && displayedReports.length > 0">
            <div class="report-card" v-for="(report, index) in displayedReports" :key="index" @click="openReportDetails(report)">
              <div class="report-content">
                <div class="report-image" :class="getReportClass(report.type)">
                  <ion-icon :icon="getReportIcon(report.type)" size="large"></ion-icon>
                </div>
                <div class="report-details">
                  <div class="report-status-row">
                    <div class="status-badge" :class="getStatusClass(report.status)">
                      <ion-icon :icon="getStatusIcon(report.status)" size="small" class="status-icon"></ion-icon>
                      {{ formatStatus(report.status) }}
                    </div>
                    <span class="report-time">{{ report.time }}</span>
                  </div>
                  <h3 class="report-title">{{ report.title }}</h3>
                  <p class="report-location">{{ report.location }}</p>
                  <p class="report-verified" v-if="report.verified">
                    <ion-icon :icon="peopleOutline" size="small"></ion-icon>
                    {{ report.verified }} verified
                  </p>
                  <div class="progress-container" v-if="report.progress !== undefined">
                    <div class="progress-bar" :class="getStatusClass(report.status)" :style="{ width: report.progress + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="empty-state" v-if="!isLoading && displayedReports.length === 0">
            <ion-icon :icon="documentTextOutline" style="font-size: 3rem;"></ion-icon>
            <p>No issues reported yet</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonContent,
  IonIcon,
  IonInput,
  IonSpinner
} from '@ionic/vue';
import {
  searchOutline,
  optionsOutline,
  peopleOutline,
  documentTextOutline,
  bulbOutline,
  refreshOutline,
  constructOutline,
  checkmarkCircleOutline,
  hourglassOutline,
  alertCircleOutline
} from 'ionicons/icons';

export default defineComponent({
  name: 'ReportsPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonInput,
    IonSpinner
  },
  setup() {
    const router = useRouter();
    const activeTab = ref('all');
    const isLoading = ref(false);
    
    // Report types mapping
    const reportTypes = {
      'light': { icon: bulbOutline, class: 'electricity' },
      'recycling': { icon: refreshOutline, class: 'recycling' },
      'repair': { icon: constructOutline, class: 'repair' }
    };

    // Status mapping
    const statusMapping = {
      'in-progress': { class: 'yellow', icon: hourglassOutline },
      'assigned': { class: 'yellow', icon: hourglassOutline },
      'reported': { class: 'blue', icon: alertCircleOutline },
      'resolved': { class: 'green', icon: checkmarkCircleOutline }
    };

    // Sample report data
    const allReports = ref([
      {
        id: 'street-light-out',
        type: 'light',
        title: 'Street Light Out',
        location: 'Götaplatsen',
        time: '2h ago',
        verified: 5,
        status: 'in-progress',
        progress: 75,
        description: 'The street light at the north entrance of Götaplatsen has stopped working, creating a dark spot during evening hours.'
      },
      {
        id: 'full-recycling-bin',
        type: 'recycling',
        title: 'Full Recycling Bin',
        location: 'Central Park',
        time: '3h ago',
        verified: 3,
        status: 'assigned',
        progress: 45,
        description: 'The recycling bin near the main entrance is completely full and needs immediate attention.'
      },
      {
        id: 'damaged-bench',
        type: 'repair',
        title: 'Damaged Bench',
        location: 'Slottsskogen',
        time: '5h ago',
        verified: 2,
        status: 'reported',
        progress: 15,
        description: 'Wooden slats on the bench are broken and need replacement.'
      },
      {
        id: 'pothole-in-road',
        type: 'repair',
        title: 'Pothole in Road',
        location: 'Avenyn',
        time: '1d ago',
        verified: 8,
        status: 'resolved',
        progress: 100,
        description: 'Large pothole causing traffic hazard.'
      }
    ]);
    
    const displayedReports = ref([]);
    
    // Handle tab click
    const handleTabClick = (tab) => {
      activeTab.value = tab;
      filterReports();
    };
    
    // Filter reports based on selected tab
    const filterReports = () => {
      isLoading.value = true;
      displayedReports.value = [];
      
      // Simulate API call delay
      setTimeout(() => {
        // Filter reports based on the active tab
        if (activeTab.value === 'active') {
          displayedReports.value = allReports.value.filter(report => report.status !== 'resolved');
        } else if (activeTab.value === 'resolved') {
          displayedReports.value = allReports.value.filter(report => report.status === 'resolved');
        } else {
          displayedReports.value = [...allReports.value];
        }
        
        isLoading.value = false;
      }, 800);
    };

    // Helper functions
    const getReportIcon = (type) => {
      return reportTypes[type]?.icon || documentTextOutline;
    };
    
    const getReportClass = (type) => {
      return reportTypes[type]?.class || 'default';
    };
    
    const getStatusClass = (status) => {
      return statusMapping[status]?.class || 'default';
    };
    
    const getStatusIcon = (status) => {
      return statusMapping[status]?.icon || documentTextOutline;
    };
    
    const formatStatus = (status) => {
      return status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ');
    };
    
    // Function to navigate to report details
    const openReportDetails = (report) => {
      console.log('Opening report details for:', report.title);
      router.push(`/reports/${report.id}`);
    };
    
    // Initialize on component mount
    onMounted(() => {
      filterReports();
    });
    
    return {
      activeTab,
      isLoading,
      displayedReports,
      handleTabClick,
      filterReports,
      getReportIcon,
      getReportClass,
      getStatusClass,
      getStatusIcon,
      formatStatus,
      openReportDetails,
      
      // Icons
      searchOutline,
      optionsOutline,
      peopleOutline,
      documentTextOutline
    };
  }
});
</script>

<style>
/* Base styling */
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Header styling */
.header {
  background: white;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
}

.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.search-bar {
  background: #f3f4f6;
  border-radius: 0.5rem;
  padding: 0.25rem 0.75rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
}

.search-input {
  --background: transparent;
  --padding-start: 0.5rem;
  --padding-end: 0.5rem;
  --padding-top: 0.5rem;
  --padding-bottom: 0.5rem;
  --placeholder-color: #6b7280;
  margin: 0;
}

.filter-icon {
  color: #6b7280;
  font-size: 1.25rem;
  padding: 0.25rem;
}

/* Modern clean tab styling */
.modern-tabs {
  display: flex;
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 20px;
  max-width: 360px;
}

.tab-option {
  flex: 1;
  text-align: center;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-option.active {
  background-color: white;
  color: #16a34a;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.tab-option:not(.active):hover {
  color: #333;
}

/* Main content */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f9fafb;
}

/* Report cards */
.report-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.report-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.report-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.report-content {
  display: flex;
  gap: 16px;
}

.report-image {
  width: 64px;
  height: 64px;
  background-color: #f3f4f6;
  border-radius: 12px;
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

.report-image.recycling {
  background-color: #dbeafe;
  color: #2563eb;
}

.report-image.repair {
  background-color: #e0e7ff;
  color: #4f46e5;
}

.report-details {
  flex: 1;
}

.report-status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.status-badge {
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  background-color: #f3f4f6;
  color: #6b7280;
}

.status-badge.yellow {
  background-color: #fef3c7;
  color: #b45309;
}

.status-badge.green {
  background-color: #dcfce7;
  color: #16a34a;
}

.status-badge.blue {
  background-color: #dbeafe;
  color: #2563eb;
}

.status-icon {
  margin-right: 4px;
}

.report-time {
  font-size: 12px;
  color: #6b7280;
}

.report-title {
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 4px;
  font-size: 16px;
  color: #1f2937;
}

.report-location {
  font-size: 14px;
  color: #6b7280;
  margin-top: 0;
  margin-bottom: 4px;
}

.report-verified {
  font-size: 12px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.progress-container {
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  margin-top: 8px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  border-radius: 3px;
}

.progress-bar.yellow {
  background-color: #eab308;
}

.progress-bar.green {
  background-color: #16a34a;
}

.progress-bar.blue {
  background-color: #2563eb;
}

/* Loading and Empty states */
.loading {
  display: none;
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}

.loading.visible {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading p {
  margin-top: 1rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.empty-state p {
  margin-top: 1rem;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .page-title {
    font-size: 1.25rem;
  }
  
  .report-content {
    flex-direction: row;
  }
}

@media (min-width: 768px) {
  .report-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
  }
}
</style>