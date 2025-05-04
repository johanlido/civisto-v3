<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <div class="logo" slot="start">Civisto</div>
      </ion-toolbar>
    </ion-header>

    <!-- Background with subtle pattern -->
    <div class="background-pattern"></div>

    <ion-content>
      <div class="main-content">
        <!-- Hero Section -->
        <div class="hero-section">
          <div class="hero-card">
            <!-- Abstract pattern elements -->
            <div class="pattern-circle-1"></div>
            <div class="pattern-circle-2"></div>
            
            <h1>Make your community better today</h1>
            <p>Report issues in your neighborhood to improve your local environment.</p>
            
            <!-- Action Button -->
            <div class="action-buttons">
              <ion-button class="btn-primary" expand="block" @click="reportIssue">
                <ion-icon :icon="addOutline" slot="start"></ion-icon>
                <span>Report an Issue</span>
              </ion-button>
            </div>
          </div>
        </div>

        <!-- Impact Stats Section -->
        <div class="stats-section">
          <h2>Your Community Impact</h2>
          
          <ion-card class="stats-card">
            <ion-card-content>
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-circle green">
                    <div class="stat-number">12</div>
                  </div>
                  <div class="stat-label">Reports</div>
                </div>
                
                <div class="stat-item">
                  <div class="stat-circle blue">
                    <div class="stat-number">8</div>
                  </div>
                  <div class="stat-label">Solved</div>
                </div>
                
                <div class="stat-item">
                  <div class="stat-circle purple">
                    <div class="stat-number">1.2K</div>
                  </div>
                  <div class="stat-label">Points</div>
                </div>
              </div>
              
              <!-- Progress Bar -->
              <div class="progress-container">
                <div class="progress-header">
                  <span>Progress to Silver</span>
                  <span>1,250 / 2,000</span>
                </div>
                <ion-progress-bar value="0.625" class="progress-bar"></ion-progress-bar>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Recent Reports -->
        <div class="reports-section">
          <div class="section-header">
            <h2>Recent Reports</h2>
            <ion-button fill="clear" class="view-all" @click="viewAllReports">
              View All
              <ion-icon :icon="chevronForwardOutline" slot="end"></ion-icon>
            </ion-button>
          </div>
          
          <!-- Report Cards -->
          <div class="report-cards">
            <ion-card class="report-card" v-for="(report, index) in recentReports" :key="index" @click="openReport(report)">
              <ion-card-content>
                <div class="report-content">
                  <div class="report-image" :class="report.imageClass">
                    <ion-icon :icon="report.icon" size="large"></ion-icon>
                  </div>
                  <div class="report-details">
                    <div class="report-status-row">
                      <ion-badge class="status-badge" :class="report.statusClass">{{ report.status }}</ion-badge>
                      <span class="report-time">{{ report.time }}</span>
                    </div>
                    <h3>{{ report.title }}</h3>
                    <p>{{ report.location }}</p>
                  </div>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>

        <!-- Trending Issues -->
        <div class="trending-section">
          <h2>Trending in Your Area</h2>
          <div class="trending-cards">
            <ion-card class="trending-card" v-for="(trend, index) in trendingIssues" :key="index" @click="openTrend(trend)">
              <ion-card-content>
                <div class="trending-content">
                  <div class="icon-container" :class="trend.iconClass">
                    <ion-icon :icon="trend.icon" size="small"></ion-icon>
                  </div>
                  <div class="trending-details">
                    <h3>{{ trend.title }}</h3>
                    <p>{{ trend.count }}</p>
                  </div>
                  <ion-icon :icon="chevronForwardOutline" class="arrow-icon"></ion-icon>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import useHomePage from './HomePage.js';
useHomePage();
</script>

<style scoped>
/* Base Variables */
:root {
  --ion-color-primary: #22c55e;
  --ion-color-primary-rgb: 34, 197, 94;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #16a34a;
  --ion-color-primary-tint: #3eb058;
  
  --ion-color-secondary: #16a34a;
  --ion-color-secondary-rgb: 22, 163, 74;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255, 255, 255;
  
  --ion-background-color: #f9fafb;
  --ion-text-color: #111827;
}

/* Background Pattern */
.background-pattern {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(to bottom, #e8f7efcc, #e8f7ef00);
  background-image: radial-gradient(circle, #22c55e 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.3;
}

/* Logo */
.logo {
  font-family: 'Bagel Fat One', cursive;
  font-weight: bold;
  font-size: 24px;
  color: #22c55e;
  padding-left: 8px;
  letter-spacing: 1px;
}

/* Removed header icons styles */

/* Main Content */
.main-content {
  position: relative;
  z-index: 10;
  padding: 16px;
  padding-bottom: 80px;
}

@media (min-width: 768px) {
  .main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 32px;
  }
  
  .hero-section {
    grid-column: 1 / -1;
  }
}

@media (min-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  .stats-section {
    grid-column: span 1;
  }
  
  .reports-section {
    grid-column: span 2;
  }
  
  .trending-section {
    grid-column: 1 / -1;
  }
}

/* Hero Section */
.hero-section {
  padding-bottom: 24px;
  position: relative;
}

.hero-card {
  background: linear-gradient(to right, #22c55e, #16a34a);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(22, 163, 74, 0.15);
  padding: 24px;
  overflow: hidden;
  position: relative;
}

.pattern-circle-1 {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.1;
}

.pattern-circle-2 {
  position: absolute;
  bottom: 20px;
  right: 48px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.1;
}

.hero-card h1 {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
  position: relative;
  z-index: 10;
  max-width: 300px;
}

.hero-card p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
  font-weight: 400;
  position: relative;
  z-index: 10;
  max-width: 320px;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  gap: 12px;
  position: relative;
  z-index: 10;
  width: 100%;
}

/* Override Ionic button styles for action buttons */
.action-buttons ion-button {
  margin: 0;
  height: 46px;
  flex: 1;
}

.btn-primary {
  --background: white;
  --color: #22c55e;
  --border-radius: 12px;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --background-activated: #f0fdf4;
  --background-focused: #f0fdf4;
  --background-hover: #f0fdf4;
  font-weight: 600;
  font-size: 15px;
  border: 1px solid #dcfce7;
}

/* Removed btn-secondary style */

/* Stats Section */
.stats-section {
  padding-top: 24px;
  padding-bottom: 24px;
}

.stats-section h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.stats-card {
  --background: white;
  --border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.stat-circle.green {
  background-color: #f0fdf4;
}

.stat-circle.green .stat-number {
  color: #16a34a;
}

.stat-circle.blue {
  background-color: #eff6ff;
}

.stat-circle.blue .stat-number {
  color: #2563eb;
}

.stat-circle.purple {
  background-color: #faf5ff;
}

.stat-circle.purple .stat-number {
  color: #9333ea;
}

.stat-number {
  font-weight: 700;
  font-size: 16px;
}

.stat-label {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.progress-container {
  padding: 0 4px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.progress-header span {
  font-size: 14px;
  color: #6b7280;
}

.progress-header span:last-child {
  font-weight: 600;
  color: #374151;
}

.progress-bar {
  height: 8px;
  --buffer-background: #f3f4f6;
  --progress-background: linear-gradient(to right, #22c55e, #3b82f6);
}

/* Reports Section */
.reports-section {
  padding-top: 24px;
  padding-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.view-all {
  --color: #16a34a;
  --box-shadow: none;
  --background: transparent;
  --padding-start: 8px;
  --padding-end: 8px;
  font-size: 14px;
  font-weight: 500;
  height: auto;
  margin: 0;
}

.report-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.report-card {
  --background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.report-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.report-card ion-card-content {
  padding: 16px;
}

.report-content {
  display: flex;
  gap: 16px;
}

.report-image {
  width: 60px;
  height: 60px;
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

.report-image.retail {
  background-color: #dbeafe;
  color: #2563eb;
}

.report-details {
  flex: 1;
}

.report-status-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.status-badge {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 4px;
  --padding-bottom: 4px;
  font-size: 12px;
  font-weight: 500;
  height: 22px;
}

.status-badge.yellow {
  --background: #fef3c7;
  --color: #b45309;
}

.status-badge.green {
  --background: #dcfce7;
  --color: #16a34a;
}

.report-time {
  font-size: 12px;
  color: #6b7280;
}

.report-details h3 {
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 16px;
  color: #1f2937;
}

.report-details p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* Trending Section */
.trending-section {
  padding-top: 24px;
  padding-bottom: 80px;
}

.trending-section h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.trending-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trending-card {
  --background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 0;
  transition: transform 0.2s ease;
}

.trending-card:hover {
  transform: translateY(-2px);
}

.trending-card ion-card-content {
  padding: 16px;
}

.trending-content {
  display: flex;
  align-items: center;
}

.icon-container {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.icon-container.red {
  background-color: #fee2e2;
}

.icon-container.red ion-icon {
  color: #ef4444;
}

.icon-container.yellow {
  background-color: #fef3c7;
}

.icon-container.yellow ion-icon {
  color: #f59e0b;
}

.icon-container.blue {
  background-color: #e0f2fe;
}

.icon-container.blue ion-icon {
  color: #0ea5e9;
}

.trending-details {
  flex: 1;
}

.trending-details h3 {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  color: #1f2937;
}

.trending-details p {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.arrow-icon {
  color: #9ca3af;
  margin-left: 12px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .logo {
    font-size: 20px;
  }
  
  .hero-card h1 {
    font-size: 20px;
  }
  
  .hero-card p {
    font-size: 14px;
    margin-bottom: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .report-cards,
  .trending-cards {
    gap: 12px;
  }
}

@media (min-width: 768px) {
  .report-cards, 
  .trending-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  
  .hero-card {
    max-width: 900px;
    margin: 0 auto;
  }
  
  .action-buttons {
    max-width: 500px;
  }
}

@media (min-width: 1024px) {
  .trending-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>