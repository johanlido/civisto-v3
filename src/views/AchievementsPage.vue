<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <h1>My Achievements</h1>
        <p class="subtitle">Track your progress and earn rewards for improving your community</p>
        
        <ion-card class="level-card">
          <ion-card-content>
            <div class="level-info">
              <div class="level-badge">
                <ion-icon :icon="medal" class="level-icon"></ion-icon>
                <span>Citizen Level 2</span>
              </div>
              <div class="points-badge">350 points</div>
            </div>
            <div class="next-level">
              <div>Next level: <span class="highlight">150 points away</span></div>
              <div><span class="current-points">350</span>/500</div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 70%"></div>
            </div>
            <div class="level-indicators">
              <div class="level-indicator completed">
                <ion-icon :icon="checkmarkCircle" class="indicator-icon"></ion-icon>
                <div class="indicator-level">1</div>
              </div>
              <div class="level-indicator current">
                <div class="indicator-circle">2</div>
              </div>
              <div class="level-indicator">
                <div class="indicator-circle">3</div>
              </div>
              <div class="level-indicator">
                <div class="indicator-circle">4</div>
              </div>
              <div class="level-indicator">
                <div class="indicator-circle">5</div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
        
        <ion-segment v-model="selectedTab" class="custom-segment">
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
            <div class="badge-icon" :class="{ 'inactive': !badge.earned }">
              <ion-icon :icon="badge.icon" size="large"></ion-icon>
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
        <div v-if="selectedTab === 'challenges'" class="challenges-container">
          <ion-card v-for="(challenge, index) in challenges" :key="index" class="challenge-card">
            <ion-card-content>
              <div class="challenge-header">
                <div class="challenge-icon-title">
                  <div class="challenge-icon" :class="'challenge-' + index">
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
              <div class="challenge-progress-text">
                {{ challenge.current }}/{{ challenge.total }}
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        
        <!-- Rewards Content -->
        <div v-if="selectedTab === 'rewards'" class="rewards-container">
          <div class="rewards-coming-soon">
            <p>Rewards section coming soon!</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import useAchievementsPage from './AchievementsPage.js';
useAchievementsPage();
</script>

<style>
.container {
  max-width: 650px;
  margin: 0 auto;
  padding: 20px;
  padding-bottom: 70px;
}

h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1f2937;
}

.subtitle {
  font-size: 16px;
  font-weight: 400;
  color: #6b7280;
  margin-bottom: 24px;
  line-height: 1.5;
}

/* Level Card */
.level-card {
  background: white;
  margin-bottom: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.level-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.level-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
}

.level-icon {
  color: #22c55e;
  font-size: 24px;
}

.points-badge {
  background-color: #22c55e;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(34, 197, 94, 0.2);
}

.next-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
}

.highlight {
  color: #22c55e;
  font-weight: 600;
}

.current-points {
  color: #22c55e;
  font-weight: 600;
}

.progress-bar {
  height: 10px;
  background-color: #f3f4f6;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #22c55e, #3b82f6);
  border-radius: 10px;
}

.level-indicators {
  display: flex;
  justify-content: space-between;
}

.level-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  position: relative;
}

.level-indicator:last-child::after {
  display: none;
}

.indicator-icon {
  color: #22c55e;
  font-size: 24px;
  z-index: 1;
}

.indicator-circle {
  width: 24px;
  height: 24px;
  background-color: #e5e7eb;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  z-index: 1;
}

.level-indicator.current .indicator-circle {
  background-color: #22c55e;
  color: white;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
}

.indicator-level {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.level-indicator.completed .indicator-level {
  color: #22c55e;
  font-weight: 600;
}

/* Segment/Tabs */
.custom-segment {
  margin-bottom: 20px;
  border-radius: 12px;
  --background: #f3f4f6;
  overflow: hidden;
}

ion-segment-button {
  --color: #6b7280;
  --color-checked: #22c55e;
  --indicator-color: white;
  --indicator-height: 100%;
  --background-checked: white;
  --border-radius: 10px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  font-weight: 500;
  margin: 4px;
  min-height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Badges Section */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.badge-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #f3f4f6;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.badge-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  color: white;
  box-shadow: 0 4px 8px rgba(34, 197, 94, 0.2);
}

.badge-icon.inactive {
  background: #e5e7eb;
  color: #9ca3af;
  box-shadow: none;
}

.badge-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.badge-description {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
  line-height: 1.4;
}

.badge-earned {
  font-size: 12px;
  color: #22c55e;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}

.challenges-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.challenge-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 16px;
  border: 1px solid #f3f4f6;
}

.challenge-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.challenge-icon-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.challenge-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: linear-gradient(135deg, #22c55e, #16a34a);
}

.challenge-0 {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.challenge-1 {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.challenge-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.challenge-points {
  color: #22c55e;
  font-weight: 600;
  font-size: 16px;
}

.challenge-description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
  line-height: 1.4;
}

.challenge-progress-bar {
  height: 8px;
  background-color: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.challenge-progress-fill {
  height: 100%;
  background: linear-gradient(to right, #22c55e, #16a34a);
  border-radius: 4px;
}

.challenge-progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
}

.rewards-coming-soon {
  text-align: center;
  padding: 40px 0;
  color: #6b7280;
  font-size: 16px;
  background: white;
  border-radius: 16px;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  h1 {
    font-size: 24px;
  }
  
  .subtitle {
    font-size: 14px;
  }
  
  .level-badge {
    font-size: 16px;
  }
  
  .badges-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .badges-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .rewards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  
  .rewards-header {
    grid-column: 1 / -1;
  }
}
</style>