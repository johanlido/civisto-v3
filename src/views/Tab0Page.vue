<template>
  <ion-page>
    <ion-content :fullscreen="true" class="app-container">
      <!-- Background with Gradient and Dots Pattern -->
      <div class="background-pattern"></div>

      <!-- Status Bar -->
      <div class="status-bar"></div>

      <!-- Header -->
      <ion-header class="header">
        <ion-toolbar>
          <ion-title class="logo">Civisto</ion-title>
          <ion-buttons slot="end" class="header-icons">
            <ion-button>
              <ion-icon slot="icon-only" :icon="notificationsOutline" />
            </ion-button>
            <div class="avatar"></div>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Modern Hero Section -->
          <section class="hero-section">
          <ion-card class="hero-card">
            <ion-card-header>
              <ion-card-title>Make your community better today</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Report issues in your neighborhood or scan QR codes at designated locations.</p>
                <ion-button>Report</ion-button>
                <ion-button>QR Code</ion-button>
            </ion-card-content>
          </ion-card>
        </section>

        <!-- Modern Impact Stats Section -->
        <section class="stats-section">
          <ion-text><h2>Your Community Impact</h2></ion-text>
          <ion-card class="stats-card">
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
            <div class="progress-container">
              <div class="progress-header">
                <span>Progress to Silver</span>
                <span>1,250 / 2,000</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill"></div>
              </div>
            </div>
          </ion-card>
        </section>

        <!-- Recent Reports -->
        <section class="reports-section">
          <div class="section-header">
            <ion-text><h2>Recent Reports</h2></ion-text>
            <ion-button fill="clear" class="view-all">
              View All <ion-icon slot="end" :icon="chevronForwardOutline" />
            </ion-button>
          </div>
          <div class="report-cards">
            <ion-card class="report-card">
              <div class="report-content">
                <div class="report-image electricity">
                  <ion-icon :icon="flashOutline" />
                </div>
                <div class="report-details">
                  <div class="report-status-row">
                    <ion-badge color="warning">In Progress</ion-badge>
                    <span class="report-time">2h ago</span>
                  </div>
                  <ion-card-title>Broken Streetlight</ion-card-title>
                  <ion-card-subtitle>Kungsgatan 32, Stockholm</ion-card-subtitle>
                </div>
              </div>
            </ion-card>
            <ion-card class="report-card">
              <div class="report-content">
                <div class="report-image retail">
                  <ion-icon :icon="cartOutline" />
                </div>
                <div class="report-details">
                  <div class="report-status-row">
                    <ion-badge color="success">Resolved</ion-badge>
                    <span class="report-time">Yesterday</span>
                  </div>
                  <ion-card-title>Abandoned Trolley</ion-card-title>
                  <ion-card-subtitle>Götgatan 14, Stockholm</ion-card-subtitle>
                </div>
              </div>
            </ion-card>
          </div>
        </section>

        <!-- Trending Issues -->
        <section class="trending-section">
          <ion-text><h2>Trending in Your Area</h2></ion-text>
          <div class="trending-cards">
            <ion-card class="trending-card">
              <div class="trending-content">
                <div class="icon-container red">
                  <ion-icon :icon="createOutline" />
                </div>
                <div class="trending-details">
                  <ion-card-title>Graffiti on Main Street</ion-card-title>
                  <ion-card-subtitle>7 reports this week</ion-card-subtitle>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="arrow-icon" />
              </div>
            </ion-card>
            <ion-card class="trending-card">
              <div class="trending-content">
                <div class="icon-container yellow">
                  <ion-icon :icon="busOutline" />
                </div>
                <div class="trending-details">
                  <ion-card-title>Illegal Parking Near Park</ion-card-title>
                  <ion-card-subtitle>5 reports this week</ion-card-subtitle>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="arrow-icon" />
              </div>
            </ion-card>
            <ion-card class="trending-card">
              <div class="trending-content">
                <div class="icon-container blue">
                  <ion-icon :icon="cartOutline" />
                </div>
                <div class="trending-details">
                  <ion-card-title>Trolleys at Central Station</ion-card-title>
                  <ion-card-subtitle>3 reports this week</ion-card-subtitle>
                </div>
                <ion-icon :icon="chevronForwardOutline" class="arrow-icon" />
              </div>
            </ion-card>
          </div>
        </section>
      </div>
    </ion-content>
    <!-- Bottom Navigation can be handled by TabsPage.vue -->
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonText, IonBadge
} from '@ionic/vue';
import {
  notificationsOutline, addOutline, gridOutline, flashOutline, cartOutline, createOutline, busOutline, chevronForwardOutline
} from 'ionicons/icons';
</script>

<style scoped>
ion-page {
  background: #fff !important;
  --background: #fff !important;
}
</style>

<style scoped src="./civisto.css"></style>