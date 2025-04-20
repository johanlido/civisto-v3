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
        <h1>My Achievements</h1>
        <p class="subtitle">Track your progress and earn rewards for your community contributions</p>
        
        <ion-card class="level-card">
          <ion-card-content>
            <div class="level-info">
              <div class="citizen-level">Citizen Level 2</div>
              <div class="points-badge">350 points</div>
            </div>
            <div class="next-level">
              <div>Next level: 150 points away</div>
              <div>350/500</div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: '70%' }"></div>
            </div>
            <div class="level-indicators">
              <div class="level-indicator">
                <ion-icon :icon="arrowForward" class="indicator-icon active"></ion-icon>
                <div class="indicator-level">1</div>
              </div>
              <div class="level-indicator">
                <ion-icon :icon="medal" class="indicator-icon active"></ion-icon>
                <div class="indicator-level">2</div>
              </div>
              <div class="level-indicator">
                <ion-icon :icon="star" class="indicator-icon inactive"></ion-icon>
                <div class="indicator-level">3</div>
              </div>
              <div class="level-indicator">
                <ion-icon :icon="trophy" class="indicator-icon inactive"></ion-icon>
                <div class="indicator-level">4</div>
              </div>
              <div class="level-indicator">
                <ion-icon :icon="sparkles" class="indicator-icon inactive"></ion-icon>
                <div class="indicator-level">5</div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-segment v-model="selectedTab">
          <ion-segment-button value="badges">
            <ion-label>Badges</ion-label>
          </ion-segment-button>
          <ion-segment-button value="challenges">
            <ion-label>Challenges</ion-label>
          </ion-segment-button>
          <ion-segment-button value="rewards">
            <ion-label>Rewards</ion-label>
          </ion-segment-button>
        </ion-segment>
        
        <!-- Badges Content -->
        <div v-if="selectedTab === 'badges'" class="badges-grid">
          <ion-card v-for="(badge, index) in badges" :key="index" class="badge-card">
            <div :class="['badge-icon', !badge.earned && 'inactive']">
              <ion-icon :icon="badge.icon" size="medium"></ion-icon>
            </div>
            <div class="badge-title">{{ badge.title }}</div>
            <div class="badge-description">{{ badge.description }}</div>
            <div v-if="badge.earned" class="badge-earned">
              <ion-icon :icon="checkmark" size="small"></ion-icon>
              Earned {{ badge.earnedDate }}
            </div>
          </ion-card>
        </div>
        
        <!-- Challenges Content -->
        <div v-if="selectedTab === 'challenges'">
          <ion-card v-for="(challenge, index) in challenges" :key="index" class="challenge-card">
            <ion-card-content>
              <div class="challenge-header">
                <div class="challenge-icon-title">
                  <div class="challenge-icon">
                    <ion-icon :icon="challenge.icon" size="small"></ion-icon>
                  </div>
                  <div class="challenge-title">{{ challenge.title }}</div>
                </div>
                <div class="challenge-points">+{{ challenge.points }} pts</div>
              </div>
              <div class="challenge-description">{{ challenge.description }}</div>
              <div class="challenge-progress-bar">
                <div class="challenge-progress-fill" :style="{ width: challenge.progress + '%' }"></div>
              </div>
              <div class="challenge-progress-text">{{ challenge.current }}/{{ challenge.total }}</div>
            </ion-card-content>
          </ion-card>
        </div>
        
        <!-- Rewards Content -->
        <div v-if="selectedTab === 'rewards'" class="rewards-coming-soon">
          <p>Rewards section coming soon!</p>
        </div>
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
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonIcon, 
  IonTabs, 
  IonTabBar, 
  IonTabButton,
  IonRouterOutlet
} from '@ionic/vue';
import { 
  arrowForward, 
  medal, 
  star, 
  trophy, 
  sparkles, 
  checkmark, 
  home, 
  document, 
  person,
  globe,
  shield
} from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'AchievementsPage',
  components: {
    IonPage, 
    IonContent, 
    IonCard, 
    IonCardContent, 
    IonSegment, 
    IonSegmentButton, 
    IonLabel, 
    IonIcon, 
    IonTabs, 
    IonTabBar, 
    IonTabButton,
    IonRouterOutlet
  },
  setup() {
    const selectedTab = ref('badges');
    
    const badges = [
      {
        icon: arrowForward,
        title: 'First Report',
        description: 'Submit your first maintenance report',
        earned: true,
        earnedDate: 'Feb 12'
      },
      {
        icon: medal,
        title: 'Civic Watchdog',
        description: 'Submit 5 verified reports',
        earned: true,
        earnedDate: 'Mar 20'
      },
      {
        icon: globe,
        title: 'Community Voice',
        description: 'Get 10+ votes on your reports',
        earned: false
      },
      {
        icon: trophy,
        title: 'Problem Solver',
        description: 'Have 3 reports addressed & fixed',
        earned: false
      },
      {
        icon: star,
        title: 'Town Guardian',
        description: 'Report issues in 3 different categories',
        earned: true,
        earnedDate: 'Apr 1'
      },
      {
        icon: document,
        title: 'Consistency King',
        description: 'Submit reports 3 weeks in a row',
        earned: false
      }
    ];
    
    const challenges = [
      {
        icon: arrowForward,
        title: 'Spring Cleaning',
        description: 'Report 5 cleanliness issues this month',
        points: 50,
        current: 3,
        total: 5,
        progress: 60
      },
      {
        icon: globe,
        title: 'Neighborhood Watch',
        description: 'Submit reports in 3 different neighborhoods',
        points: 75,
        current: 3,
        total: 3,
        progress: 100
      },
      {
        icon: shield,
        title: 'Safety First',
        description: 'Report 3 safety hazards',
        points: 100,
        current: 1,
        total: 3,
        progress: 33.3
      }
    ];
    
    return {
      selectedTab,
      badges,
      challenges,
      // Icons
      arrowForward,
      medal,
      star,
      trophy,
      sparkles,
      checkmark,
      home,
      document,
      person,
      globe,
      shield
    };
  }
});
</script>

<style>
/* Achievements.css */
:root {
  --ion-color-primary: #28a745;
  --ion-color-primary-rgb: 40, 167, 69;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #23933d;
  --ion-color-primary-tint: #3eb058;
  
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
  
  --primary-light: #e5f7ec;
  --gray-light: #F2F2F2;
  --gray: #e9ecef;
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
  color: var(--ion-color-dark);
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

/* Level Card */
.level-card {
  margin-bottom: 24px;
  box-shadow: none;
  border: 1px solid var(--gray);
}

.level-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.citizen-level {
  font-size: 18px;
  font-weight: 700;
}

.points-badge {
  background-color: var(--ion-color-primary);
  color: white;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
}

.next-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--ion-color-medium);
}

.progress-bar {
  height: 8px;
  background-color: var(--gray-light);
  border-radius: 4px;
  margin-bottom: 16px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--ion-color-primary);
  border-radius: 4px;
}

.level-indicators {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.level-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.indicator-icon {
  width: 24px;
  height: 24px;
  color: var(--ion-color-primary);
}

.indicator-icon.inactive {
  color: #ccc;
}

.indicator-level {
  font-size: 12px;
  color: var(--ion-color-medium);
}

/* Segment/Tabs */
ion-segment {
  margin-bottom: 20px;
}

ion-segment-button {
  --color: var(--ion-color-medium);
  --color-checked: var(--ion-color-primary);
  --indicator-color: var(--ion-color-primary);
}

/* Badges Section */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.badge-card {
  border: 1px solid var(--gray);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 0;
  box-shadow: none;
}

.badge-icon {
  width: 48px;
  height: 48px;
  background-color: var(--ion-color-primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  color: white;
}

.badge-icon.inactive {
  background-color: var(--gray-light);
  color: var(--ion-color-medium);
}

.badge-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.badge-description {
  font-size: 12px;
  color: var(--ion-color-medium);
  margin-bottom: 8px;
}

.badge-earned {
  font-size: 12px;
  color: var(--ion-color-primary);
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Challenges Section */
.challenge-card {
  margin-bottom: 16px;
  border: 1px solid var(--gray);
  border-radius: 8px;
  box-shadow: none;
}

.challenge-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.challenge-icon-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.challenge-icon {
  width: 32px;
  height: 32px;
  background-color: var(--ion-color-primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.challenge-title {
  font-size: 16px;
  font-weight: 600;
}

.challenge-points {
  color: var(--ion-color-primary);
  font-weight: 500;
}

.challenge-description {
  font-size: 14px;
  color: var(--ion-color-medium);
  margin-bottom: 12px;
}

.challenge-progress-bar {
  height: 8px;
  background-color: var(--gray-light);
  border-radius: 4px;
  margin-bottom: 4px;
  overflow: hidden;
}

.challenge-progress-fill {
  height: 100%;
  background-color: var(--ion-color-primary);
  border-radius: 4px;
}

.challenge-progress-text {
  text-align: right;
  font-size: 12px;
  color: var(--ion-color-medium);
}

/* Rewards Coming Soon */
.rewards-coming-soon {
  text-align: center;
  padding: 40px 0;
  color: var(--ion-color-medium);
}

/* Tab Bar */
ion-tab-bar {
  --background: #fff;
  border-top: 1px solid var(--gray);
}

ion-tab-button {
  --color: var(--ion-color-medium);
  --color-selected: var(--ion-color-primary);
}

/* Responsive adjustments for smaller screens */
@media (max-width: 576px) {
  .badges-grid {
    grid-template-columns: 1fr;
  }
}
</style>