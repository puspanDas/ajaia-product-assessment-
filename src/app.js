/**
 * SidelineReel Interactive Application Logic
 * Implements Task 1 (Roadmap Call), Task 2 (Product Spec PRD),
 * Task 3 (Coach AI Studio, Parent Mobile Reel, Ridgeline Live Hub),
 * and the 5-10 Minute Video Recording Teleprompter with Stopwatch.
 */

// Application State
const state = {
  activeClub: 'ridgeline',
  activeView: 'view-task1',
  isPlaying: false,
  playInterval: null,
  currentTimeSec: 14 * 60 + 32, // 14:32
  totalTimeSec: 50 * 60,
  flaggedCount: 2,
  item1Resolved: false,
  item2Resolved: false,
  item1SelectedPlayer: 14,
  item2SelectedPlayer: 11,
  deliveryTiming: 'smart',
  coachParticipation: 85,
  mobilePlaying: false,
  mobilePlayInterval: null,
  activeStoryIndex: 0,
  // Teleprompter Timer
  timerRunning: false,
  timerSeconds: 0,
  timerInterval: null
};

// Club-specific data dictionaries
const clubData = {
  ridgeline: {
    name: 'Ridgeline Youth Soccer Club (U12)',
    tier: '$180k Renewal in 6 weeks',
    match: 'Ridgeline U12 Wildcats vs Seattle Thunder FC (2 - 1)',
    meta: 'Saturday 9:00 AM • Turf Field 3 • Full 50m 4K Sideline Ingest',
    sportIcon: '⚽'
  },
  brightwater: {
    name: 'Brightwater Youth Lacrosse (U14 Boys)',
    tier: 'Multi-Sport Partner Account',
    match: 'Brightwater Lax U14 vs Eastside Warriors (8 - 6)',
    meta: 'Saturday 11:30 AM • Memorial Stadium • 4K Sideline Ingest',
    sportIcon: '🥍'
  },
  cobblestone: {
    name: 'Cobblestone Little League (Major Division)',
    tier: 'Multi-Sport Partner Account',
    match: 'Cobblestone Red Sox vs Valley Yankees (5 - 3)',
    meta: 'Sunday 1:00 PM • Field B • Sideline Cam Ingest',
    sportIcon: '⚾'
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupCoachAudit();
  setupVideoScrubber();
  setupDeliveryTiming();
  setupParentMobile();
  setupCarlaHub();
  setupMetricsSimulator();
  setupClubSelector();
});

/* =====================================================================
   1. NAVIGATION & TAB SWITCHING (Task 1, Task 2, Task 3 Views)
   ===================================================================== */
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panels = {
    'view-task1': document.getElementById('viewTask1'),
    'view-task2': document.getElementById('viewTask2'),
    'view-coach-studio': document.getElementById('viewCoachStudio'),
    'view-parent': document.getElementById('viewParent'),
    'view-carla': document.getElementById('viewCarla'),
    'view-metrics': document.getElementById('viewMetrics')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetView = tab.getAttribute('data-view');
      switchView(targetView);
    });
  });

  // Shortcut from Task 1 Memo to Carla Hub
  const btnGoToCarlaHub = document.getElementById('btnGoToCarlaHub');
  if (btnGoToCarlaHub) {
    btnGoToCarlaHub.addEventListener('click', () => {
      switchView('view-carla');
    });
  }

  // Shortcut from Carla Hub to Task 2 Spec
  const btnViewTask2Shortcut = document.getElementById('btnViewTask2Shortcut');
  if (btnViewTask2Shortcut) {
    btnViewTask2Shortcut.addEventListener('click', () => {
      switchView('view-task2');
    });
  }
}

function switchView(viewKey) {
  state.activeView = viewKey;
  
  // Update Tab States
  document.querySelectorAll('.nav-tab').forEach(tab => {
    const isTarget = tab.getAttribute('data-view') === viewKey;
    tab.classList.toggle('active', isTarget);
    tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // Update Panels
  const panels = {
    'view-task1': document.getElementById('viewTask1'),
    'view-task2': document.getElementById('viewTask2'),
    'view-coach-studio': document.getElementById('viewCoachStudio'),
    'view-parent': document.getElementById('viewParent'),
    'view-carla': document.getElementById('viewCarla'),
    'view-metrics': document.getElementById('viewMetrics')
  };

  Object.keys(panels).forEach(key => {
    if (panels[key]) {
      panels[key].classList.toggle('active', key === viewKey);
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* =====================================================================
   3. COACH AI STUDIO & 60-SEC QUICK AUDIT
   ===================================================================== */
function setupCoachAudit() {
  // Item 1: Emma #14 vs Sophie #4
  const btnAssignEmma = document.getElementById('btnAssignEmma');
  const btnAssignSophie = document.getElementById('btnAssignSophie');
  const btnConfirmItem1 = document.getElementById('btnConfirmItem1');
  const btnSplitItem1 = document.getElementById('btnSplitItem1');
  const resolvedBanner1 = document.getElementById('resolvedBanner1');
  const auditItem1 = document.getElementById('auditItem1');

  if (btnAssignEmma && btnAssignSophie) {
    btnAssignEmma.addEventListener('click', () => {
      state.item1SelectedPlayer = 14;
      btnAssignEmma.classList.add('selected');
      btnAssignSophie.classList.remove('selected');
      btnConfirmItem1.textContent = '✓ Confirm as Emma Diaz (#14)';
    });

    btnAssignSophie.addEventListener('click', () => {
      state.item1SelectedPlayer = 4;
      btnAssignSophie.classList.add('selected');
      btnAssignEmma.classList.remove('selected');
      btnConfirmItem1.textContent = '✓ Reassign to Sophie Clark (#4)';
    });
  }

  if (btnConfirmItem1) {
    btnConfirmItem1.addEventListener('click', () => {
      if (state.item1Resolved) return;
      state.item1Resolved = true;
      btnConfirmItem1.classList.add('hidden');
      if (btnSplitItem1) btnSplitItem1.classList.add('hidden');
      resolvedBanner1.classList.remove('hidden');
      auditItem1.classList.remove('active-audit');
      auditItem1.style.borderColor = 'var(--accent-green)';

      // Update Bounding box confidence
      const box14Conf = document.getElementById('box14Conf');
      if (box14Conf) {
        box14Conf.textContent = '99.4% Verified';
        box14Conf.classList.remove('warning-conf');
        box14Conf.classList.add('success-conf');
      }

      // Update clip badge
      const pillClipFlagged = document.getElementById('pillClipFlagged');
      if (pillClipFlagged) {
        pillClipFlagged.classList.remove('flagged');
        pillClipFlagged.classList.add('approved');
        pillClipFlagged.querySelector('.clip-badge').textContent = 'Coach Verified';
        pillClipFlagged.querySelector('.clip-badge').classList.remove('flagged-badge');
      }

      decrementFlaggedBadge();
      showToast('✓ Verified play assigned to Emma Diaz (#14). Model confidence elevated.');
      recalculateKPIs();
    });
  }

  if (btnSplitItem1) {
    btnSplitItem1.addEventListener('click', () => {
      if (state.item1Resolved) return;
      state.item1Resolved = true;
      btnConfirmItem1.classList.add('hidden');
      btnSplitItem1.classList.add('hidden');
      resolvedBanner1.innerHTML = '<span class="resolved-check">✓</span><span>Clip added to BOTH Emma Diaz & Sophie Clark reels.</span>';
      resolvedBanner1.classList.remove('hidden');
      decrementFlaggedBadge();
      showToast('✂️ Clip assigned to both players\' weekly reels.');
      recalculateKPIs();
    });
  }

  // Item 2: Lacrosse / Single vs Double Digit (Liam Cole #11 vs Jack Vance #1)
  const btnConfirmItem2 = document.getElementById('btnConfirmItem2');
  const resolvedBanner2 = document.getElementById('resolvedBanner2');
  const auditItem2 = document.getElementById('auditItem2');
  const btnAssignLiam = document.getElementById('btnAssignLiam');
  const btnAssignJack = document.getElementById('btnAssignJack');

  if (btnAssignLiam && btnAssignJack) {
    btnAssignLiam.addEventListener('click', () => {
      state.item2SelectedPlayer = 11;
      btnAssignLiam.classList.add('selected');
      btnAssignJack.classList.remove('selected');
      btnConfirmItem2.textContent = '✓ Confirm Liam Cole (#11)';
    });

    btnAssignJack.addEventListener('click', () => {
      state.item2SelectedPlayer = 1;
      btnAssignJack.classList.add('selected');
      btnAssignLiam.classList.remove('selected');
      btnConfirmItem2.textContent = '✓ Reassign to Jack Vance (#1)';
    });
  }

  if (btnConfirmItem2) {
    btnConfirmItem2.addEventListener('click', () => {
      if (state.item2Resolved) return;
      state.item2Resolved = true;
      btnConfirmItem2.classList.add('hidden');
      resolvedBanner2.classList.remove('hidden');
      auditItem2.style.borderColor = 'var(--accent-green)';
      decrementFlaggedBadge();
      showToast('✓ Item 2 resolved. 0 flagged plays remaining!');
      recalculateKPIs();
    });
  }

  // Publish / Dispatch Button
  const btnPublishBatch = document.getElementById('btnPublishBatch');
  const sendConfirmation = document.getElementById('sendConfirmation');
  if (btnPublishBatch) {
    btnPublishBatch.addEventListener('click', () => {
      btnPublishBatch.disabled = true;
      btnPublishBatch.innerHTML = '<span>Processing Dispatch Pipeline...</span>';
      
      setTimeout(() => {
        btnPublishBatch.innerHTML = '<span>✓ 18 Reels & Team Recap Dispatched</span>';
        btnPublishBatch.style.background = 'var(--accent-green)';
        btnPublishBatch.style.color = '#000';
        sendConfirmation.classList.remove('hidden');
        showToast('🎉 Dispatched! Ridgeline families scheduled for Sunday 9:30 AM delivery.');
      }, 800);
    });
  }
}

function decrementFlaggedBadge() {
  state.flaggedCount = Math.max(0, state.flaggedCount - 1);
  const badge = document.getElementById('badgeFlaggedCount');
  if (badge) {
    if (state.flaggedCount === 0) {
      badge.textContent = '✓ 0 Flagged';
      badge.classList.remove('tab-pill', 'coral-pill');
      badge.classList.add('tab-pill', 'green-pill');
    } else {
      badge.textContent = `${state.flaggedCount} Flagged`;
    }
  }
}

/* =====================================================================
   4. VIDEO SCRUBBER & CLIP CAROUSEL
   ===================================================================== */
function setupVideoScrubber() {
  const btnTogglePlay = document.getElementById('btnTogglePlay');
  const playIcon = document.getElementById('playIcon');
  const scrubberFill = document.getElementById('scrubberFill');
  const timeDisplay = document.getElementById('timeDisplay');
  const mainVideoImage = document.getElementById('mainVideoImage');
  const aiBox14 = document.getElementById('aiBox14');
  const aiBox4 = document.getElementById('aiBox4');

  if (btnTogglePlay) {
    btnTogglePlay.addEventListener('click', () => {
      state.isPlaying = !state.isPlaying;
      if (state.isPlaying) {
        playIcon.textContent = '⏸';
        state.playInterval = setInterval(() => {
          state.currentTimeSec += 1;
          if (state.currentTimeSec >= state.totalTimeSec) {
            state.currentTimeSec = 0;
          }
          updateTimeUI();
        }, 1000);
      } else {
        playIcon.textContent = '▶';
        clearInterval(state.playInterval);
      }
    });
  }

  function updateTimeUI() {
    const mins = Math.floor(state.currentTimeSec / 60);
    const secs = state.currentTimeSec % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')} / 50:00`;
    if (timeDisplay) timeDisplay.textContent = formatted;
    
    const pct = (state.currentTimeSec / state.totalTimeSec) * 100;
    if (scrubberFill) scrubberFill.style.width = `${pct}%`;
  }

  // Clip pill switcher
  const clipPills = document.querySelectorAll('.clip-pill');
  clipPills.forEach(pill => {
    pill.addEventListener('click', () => {
      clipPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const clipId = pill.getAttribute('data-clip');

      if (clipId === '1') {
        mainVideoImage.src = '/soccer_highlight_action.jpg';
        aiBox14.style.display = 'block';
        aiBox4.style.display = 'none';
        state.currentTimeSec = 12 * 60;
      } else if (clipId === '2') {
        mainVideoImage.src = '/soccer_highlight_action.jpg';
        aiBox14.style.display = 'block';
        aiBox4.style.display = 'block';
        state.currentTimeSec = 34 * 60;
      } else if (clipId === '3') {
        mainVideoImage.src = '/soccer_player_four.jpg';
        aiBox14.style.display = 'none';
        aiBox4.style.display = 'block';
        state.currentTimeSec = 41 * 60;
      } else if (clipId === '4') {
        mainVideoImage.src = '/team_recap_celebration.jpg';
        aiBox14.style.display = 'none';
        aiBox4.style.display = 'none';
        state.currentTimeSec = 48 * 60;
      }
      updateTimeUI();
    });
  });
}

/* =====================================================================
   5. DELIVERY TIMING OPTIMIZATION
   ===================================================================== */
function setupDeliveryTiming() {
  const deliveryTimeSelect = document.getElementById('deliveryTimeSelect');
  if (deliveryTimeSelect) {
    deliveryTimeSelect.addEventListener('change', (e) => {
      state.deliveryTiming = e.target.value;
      recalculateKPIs();
    });
  }
}

/* =====================================================================
   6. PARENT MOBILE PHONE EXPERIENCE
   ===================================================================== */
function setupParentMobile() {
  const btnShareParent = document.getElementById('btnShareParent');
  const btnTeamRecapShare = document.getElementById('btnTeamRecapShare');
  const btnParentReportWrong = document.getElementById('btnParentReportWrong');
  const btnSimulateParentFix = document.getElementById('btnSimulateParentFix');
  const parentFixToast = document.getElementById('parentFixToast');
  const btnMobilePlay = document.getElementById('btnMobilePlay');
  const storyBars = document.querySelectorAll('.story-bar');

  if (btnShareParent) {
    btnShareParent.addEventListener('click', () => {
      showToast('🔗 Emma\'s 1080p Reel link copied! Simulated share to WhatsApp Family group.');
    });
  }

  if (btnTeamRecapShare) {
    btnTeamRecapShare.addEventListener('click', () => {
      showToast('🏆 Ridgeline U12 Team Recap shared with full family roster!');
    });
  }

  if (btnParentReportWrong) {
    btnParentReportWrong.addEventListener('click', () => {
      const box = document.getElementById('parentFeedbackBox');
      if (box) {
        box.scrollIntoView({ behavior: 'smooth' });
        box.style.borderColor = 'var(--accent-gold)';
      }
    });
  }

  if (btnSimulateParentFix) {
    btnSimulateParentFix.addEventListener('click', () => {
      if (parentFixToast) {
        parentFixToast.classList.remove('hidden');
        showToast('✓ Parent correction processed: clip reassigned in seconds.');
      }
    });
  }

  if (btnMobilePlay) {
    btnMobilePlay.addEventListener('click', () => {
      state.mobilePlaying = !state.mobilePlaying;
      btnMobilePlay.innerHTML = state.mobilePlaying ? '<span>⏸</span>' : '<span>▶</span>';

      if (state.mobilePlaying) {
        state.mobilePlayInterval = setInterval(() => {
          state.activeStoryIndex = (state.activeStoryIndex + 1) % storyBars.length;
          storyBars.forEach((bar, idx) => {
            bar.classList.toggle('active', idx === state.activeStoryIndex);
          });
          const events = ['14\' Top Corner Goal ⚽', '32\' Slide Tackle Assist 🎯', '44\' Defensive Clear 🛡️'];
          const currentEventText = document.getElementById('currentEventText');
          if (currentEventText) currentEventText.textContent = events[state.activeStoryIndex];
        }, 2500);
      } else {
        clearInterval(state.mobilePlayInterval);
      }
    });
  }
}

/* =====================================================================
   7. CARLA'S RIDGELINE LIVE HUB
   ===================================================================== */
function setupCarlaHub() {
  const btnCopyLiveLink = document.getElementById('btnCopyLiveLink');
  if (btnCopyLiveLink) {
    btnCopyLiveLink.addEventListener('click', () => {
      navigator.clipboard?.writeText('https://sidelinereel.com/live/ridgeline-u12-fall26');
      showToast('📡 Grandparent & Scout Live Hub link copied to clipboard!');
    });
  }
}

/* =====================================================================
   8. PM STRATEGY & METRICS SIMULATOR
   ===================================================================== */
function setupMetricsSimulator() {
  const coachAuditSlider = document.getElementById('coachAuditSlider');
  const sliderValueText = document.getElementById('sliderValueText');
  const simulationFeedback = document.getElementById('simulationFeedback');

  if (coachAuditSlider) {
    coachAuditSlider.addEventListener('input', (e) => {
      state.coachParticipation = parseInt(e.target.value, 10);
      if (sliderValueText) sliderValueText.textContent = `${state.coachParticipation}% Coach Adoption`;

      if (simulationFeedback) {
        if (state.coachParticipation < 40) {
          simulationFeedback.textContent = `At ${state.coachParticipation}% coach participation, automated fallbacks prevent delivery blocking, but ~4% of edge-case jerseys require parent post-dispatch correction.`;
        } else if (state.coachParticipation < 80) {
          simulationFeedback.textContent = `At ${state.coachParticipation}% coach participation (approx. 40 sec/game), 97.2% of ambiguous plays are verified before parent push. Support tickets drop by 78%.`;
        } else {
          simulationFeedback.textContent = `At ${state.coachParticipation}% coach participation (approx. 48 sec/game), 99.4% of all ambiguous jerseys are resolved before parent dispatch. Zero disappointed kids!`;
        }
      }

      recalculateKPIs();
    });
  }
}

function recalculateKPIs() {
  const kpiOpenRate = document.getElementById('kpiOpenRate');
  const kpiTagAccuracy = document.getElementById('kpiTagAccuracy');

  let openRate = 91.6;
  if (state.deliveryTiming === 'legacy') {
    openRate = 68.2;
  } else if (state.deliveryTiming === 'immediate') {
    openRate = 81.4;
  }

  let accuracy = 94.0;
  if (state.item1Resolved && state.item2Resolved) {
    accuracy = 99.5;
  } else if (state.item1Resolved || state.item2Resolved) {
    accuracy = 97.2;
  }
  accuracy = (accuracy * (state.coachParticipation / 100) + 91.0 * (1 - state.coachParticipation / 100)).toFixed(1);

  if (kpiOpenRate) {
    kpiOpenRate.querySelector('.chip-val').textContent = `${openRate.toFixed(1)}%`;
    kpiOpenRate.querySelector('.chip-sub').textContent = state.deliveryTiming === 'legacy' ? '30% Drop (2 AM)' : '+30% Unlocked';
  }

  if (kpiTagAccuracy) {
    kpiTagAccuracy.querySelector('.chip-val').textContent = `${accuracy}%`;
  }
}

/* =====================================================================
   9. CLUB SWITCHER
   ===================================================================== */
function setupClubSelector() {
  const clubSelect = document.getElementById('clubSelect');
  const matchHeadline = document.getElementById('matchHeadline');

  if (clubSelect) {
    clubSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      state.activeClub = selected;
      const data = clubData[selected];
      if (!data) return;

      if (matchHeadline) matchHeadline.textContent = data.match;
      showToast(`Switched account to: ${data.name}`);
    });
  }
}

/* =====================================================================
   10. GLOBAL TOAST UTILITY
   ===================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove('hidden');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}
