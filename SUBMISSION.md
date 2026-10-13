# SidelineReel: Strategic Roadmap Call & Product Specification

**Candidate:** Puspan Das  
**Role:** Product Manager, SidelineReel (Ajaia)  
**Date:** October 13, 2026  

---

## Executive Summary

SidelineReel delivers automated delight in youth sports: transforming raw match footage into personalized player reels and weekly team recaps. Evaluating Materials 1 through 5 reveals a critical tension between **enterprise sales pressure** (Carla’s $180k renewal threat), **misleading survey requests** (58% asking for editing tools), and **an existential product health leak** (30% of generated reels are never opened). 

Our primary decision is to build the **Roster Tagging Disambiguation Engine & 60-Second Coach Micro-Review**. This directly resolves the 30% unopened funnel leak, eliminates wrong-kid clips, and expands active viewership by **+43%**. Concurrently, we reject complex video editors as a classic stated-preference trap and solve Carla’s livestreaming demand through a partner-ingest **Sideline Live Hub**, protecting our $180k renewal without derailing engineering.

---

## Task 1: The Roadmap Call

### 1. Data Diagnostic & Evidence Synthesis

| Source | Key Observation | PM Diagnostic & Root Cause |
| :--- | :--- | :--- |
| **Material 1 & 4 (Carla Reyes / Sales)** | $180k club renewal at risk in 6 weeks unless live streaming is committed. | Real-time viewing is demanded for grandparents and scouts. However, building native video streaming across remote sports parks in 6 weeks is an operational trap. |
| **Material 2 (Survey vs. Usage)** | 58% of parents asked for editing controls (trimming, music). | **Stated vs. Revealed Preference:** Only 6% of parents ever opened the editor, and <1% completed an edit. Meanwhile, 90% use 1-click recap sharing. |
| **Material 3 (Support Tickets)** | Repeated jersey mix-ups: #14 got clip of #4; swapped digits (#12 vs #21); #1 got #11. | Emotional breach of trust. When a child sees someone else's goal, the emotional magic collapses. |
| **Material 5 (Product Health Dashboard)** | 92% share rate on opened reels, but **30% of reels are NEVER opened**. | Funnel leak caused by late-night dispatches (2 AM) and ambiguous thumbnails displaying the wrong child due to visually similar jersey digits. |

---

### 2. Ranked Roadmap Candidates

1. **Rank 1 (BUILD NEXT): Roster Tagging Disambiguation & 60-Second Coach Micro-Review**  
   * **Why:** Unlocks the front-of-funnel leak. 30% of reels sit unopened because thumbnails show the wrong kid or arrive late. Fixing jersey ambiguity and enforcing front-facing verified keyframes restores parent trust and immediately increases active reel viewership by +43%.
2. **Rank 2: Delivery Window Optimizer (Sunday 9:30 AM Push)**  
   * **Why:** Replaces 2:00 AM batch dispatches with peak family engagement timing. Low effort, high immediate lift.
3. **Rank 3: Sideline Live Hub (Partner Embed & RTMP Link-In)**  
   * **Why:** Strategic commercial pivot to secure Ridgeline’s $180k renewal without building custom streaming infrastructure.
4. **Rank 4 (DO NOT BUILD): Advanced Video Trimming & Custom Music Controls**  
   * **Why:** Phantom demand. Usage data proves parents do not want to edit videos on their phones; they want zero-effort automation.
5. **Rank 5 (DO NOT BUILD NOW): Native WebRTC/RTMP Live Broadcast Streaming Network**  
   * **Why:** High technical and operational risk.

---

### 3. What We Do NOT Build & The Ridgeline Enterprise Defense

#### Why We Reject Reel Editing Controls
Material 2 illustrates the classic PM survey trap: **Stated vs. Revealed Preference**. While 58% of parents *claim* they want trimming and music tools, **only 6% ever opened the editor, and fewer than 1% finished an edit**. In contrast, 90% share the automated recap with one click. Youth sports parents are time-starved. Adding video editing controls is high-cost, low-yield engineering that fails to move retention or referral metrics.

#### Why We Reject Native Livestreaming (And How We Save the $180k Account)
Jamal Whitfield (VP Sales) warns that Carla Reyes will shop around if livestreaming isn't promised in 6 weeks. However, committing our engineering team to build proprietary broadcast streaming is suicide:
1. **Field Connectivity Bottlenecks:** Municipal youth sports turf fields have congested cellular towers on Saturday mornings. Consumer cameras will freeze, drop frames, and trigger angry parent tickets.
2. **Margin Erosion:** Low-latency video transcoding and CDN egress shift SidelineReel from high-margin AI SaaS to low-margin video infrastructure.

**The Solution — "Sideline Live Hub":**  
We deconstruct Carla’s true Job-to-be-Done: *"so grandparents and college scouts can watch in real time."*  
We commit a **6-week deliverable**: a branded Game Day Live Hub inside SidelineReel that embeds existing field camera feeds (Veo, Hudl, YouTube Live, RTMP). SidelineReel overlays live match scores and tags real-time **AI Instant Moment Bookmarks**.  
*Outcome:* Carla receives a concrete deliverable for her board, Jamal closes the $180k renewal, and our core engineering team stays focused on AI highlight accuracy.

---

## Task 2: Product Specification (PRD)

### Top Priority: Roster Tagging Disambiguation Engine & Coach Micro-Review

```
Feature Name:    Roster Tagging Disambiguation & Smart Keyframe Selector
Target Release:  Sprint 26.4 (4-Week Delivery)
PM Lead:         Puspan Das
Target Personas: Volunteer Coaches (Verifiers) & Families (End Consumers)
```

### 1. Outcomes & Target Metrics
* **Unopened Reel Rate:** Reduce from **30% to < 9%**.
* **Roster Tagging Precision:** Increase from **82% to > 99%**.
* **Support Ticket Volume:** Deflect **> 90%** of jersey mix-up tickets.
* **Active Weekly Viewers:** Expand active family reach by **+43%**.

---

### 2. Scope Boundaries
* **Explicitly IN Scope:**
  * Multi-digit OCR segmentation pipeline handling folded fabric and single vs. double-digit pairings (#14 vs #4, #1 vs #11).
  * Confidence thresholding: Auto-approve $\ge 85\%$, flag $< 85\%$ for coach review.
  * 60-second mobile/tablet Coach Micro-Audit UI with high-contrast jersey crops and 1-tap confirmation/split actions.
  * Smart Keyframe Selector enforcing front-facing jersey digits and facial clarity.
  * Parent 1-tap post-dispatch correction safety valve ("Wrong kid in this clip?").
  * Scheduled dispatch engine (default: Sunday 9:30 AM local time).
* **Explicitly OUT of Scope:**
  * Mobile video trimming, soundtrack mixing, or timeline editors.
  * Proprietary live video broadcast streaming infrastructure.
  * Facial recognition without jersey verification (COPPA compliance boundary).

---

### 3. Where a Human Stays in the Loop (HITL)

```
[ Match Footage 4K Ingest ]
             │
             ▼
[ AI OCR & Roster Matching ]
             │
     ┌───────┴───────┐
     ▼               ▼
[ Conf >= 85% ]   [ Ambiguous / Fold / Swap ]
     │               │
     │               ▼
     │       [ Coach Micro-Audit Queue ] ──> Coach reviews 1-2 plays
     │       (Phone / Tablet Interface)      in < 60s before Sunday push
     │               │
     └───────┬───────┘
             ▼
[ Smart Keyframe Thumbnail Scoring ]
             │
             ▼
[ Scheduled Sunday 9:30 AM Delivery ]
             │
             ▼
[ Parent Mobile Experience ] ───────────────> Fallback: 1-Tap "Wrong Kid?"
```

1. **Coach (Pre-Dispatch Loop):** AI auto-tags 85%+ of plays. Flagged ambiguous clips (1–3 per match) route to the coach's phone. Coaches spend an average of **48 seconds** confirming candidate players (#14 Emma vs #4 Sophie) before reels render.
2. **Parent (Post-Dispatch Safety Valve):** A discrete 1-tap feedback option inside the reel player allows parents to flag misidentified clips, instantly regenerating the reel and retraining OCR weights.

---

### 4. Testable Acceptance Criteria

* **AC-01 (Digit Occlusion Disambiguation):**  
  *Given* a roster containing Player A (#4) and Player B (#14),  
  *When* OCR detects digit '4' with $> 35\%$ fabric fold occlusion on the left edge,  
  *Then* the system must assign confidence $< 80\%$ and route the clip to the Coach Audit Queue rather than auto-assigning to #4.
* **AC-02 (Coach Audit Performance):**  
  *Given* a flagged play displaying Emma Diaz (#14) and Sophie Clark (#4),  
  *When* the coach taps "Confirm as Emma Diaz (#14)",  
  *Then* Emma's personal reel must attach the clip in $< 3.0$ seconds, decrement the review count, and record resolution latency telemetry.
* **AC-03 (Smart Keyframe Selection):**  
  *Given* an approved 8-second highlight clip,  
  *When* keyframes are evaluated for the notification thumbnail,  
  *Then* the system must require `Jersey_Number_Visibility > 0.90` and `Face_Detected == True`, explicitly rejecting back-of-jersey or turf slide frames.
* **AC-04 (Delivery Scheduling):**  
  *Given* match processing finishes at 2:15 AM on Sunday,  
  *When* dispatch notifications are queued,  
  *Then* notifications must be held until 9:30 AM local time unless an explicit coach override is enabled.

---

### 5. Top Two Failure Modes & Detection Mechanisms

1. **Failure Mode 1: Coach Queue Abandonment / Fatigue**  
   * *Risk:* Coaches fail to review flagged plays before Sunday morning.  
   * *Mitigation & SLA:* If unreviewed after 12 hours (or by Sunday 8:00 AM), plays with 70%–84% confidence are released with a *"Pending Coach Confirmation"* badge so delivery is never blocked. Plays $< 70\%$ are archived for coach review.
2. **Failure Mode 2: Swapped Digit False Positives (#12 vs #21)**  
   * *Risk:* Rapid lateral motion creates inverted digit pairs that achieve false-high confidence ($> 85\%$) and bypass the queue.  
   * *Mitigation & Circuit Breaker:* Roster substitution checks cross-reference playing time. If $> 1$ parent on a team taps "Wrong Kid" within 30 minutes of delivery, further dispatches are automatically paused for priority review.

---

## Task 3: Working Prototype Overview

The accompanying web application (`http://localhost:5173/`) demonstrates this specification live:
* **Task 1 View:** Visual roadmap matrix, stated vs. revealed preference analysis, and the Carla Reyes strategy memo.
* **Task 2 View:** Interactive PRD, 4-step HITL workflow diagram, and acceptance criteria.
* **Task 3 Views:**
  * **Coach AI Studio:** Interactive 4K match pipeline, live OCR bounding boxes, 60-second micro-audit queue resolving Emma Diaz #14 vs Sophie Clark #4, and the Smart Thumbnail comparison.
  * **Parent Mobile Reel:** Smartphone simulator with playable highlight reel, verified shield badge, and 1-click viral sharing.
  * **Ridgeline Live Hub:** Integrated broadcast view demonstrating the $180k renewal solution.
