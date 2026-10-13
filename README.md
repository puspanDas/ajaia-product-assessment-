# SidelineReel — Product Manager Assessment (Ajaia)

**Candidate:** Puspan Das  
**Position:** Product Manager — SidelineReel (Ajaia)  
**Date:** October 2026  

---

## Overview

This repository contains the complete deliverables for the **Ajaia SidelineReel Product Manager Assessment**, covering:
1. **Task 1: The Roadmap Call** — Evidence-based candidate ranking, trade-off analysis, deep-dive into the 58% survey trap (Stated vs. Revealed Preference), and the strategic solution for Ridgeline’s $180k renewal.
2. **Task 2: Product Specification (PRD)** — Complete engineering, design, and operational spec for the **Roster Tagging Disambiguation Engine & 60-Second Coach Micro-Review**.
3. **Task 3: Interactive Working Prototype** — A full-fidelity web application built with HTML, Vanilla CSS, and modern JavaScript, demonstrating the coach micro-audit, smart thumbnail selector, parent mobile reel, and Ridgeline live hub.

---

## Quickstart: Running the Application

### Option A: Using the Python Runner (Recommended)
```bash
python run_app.py
```
* Automatically starts the Vite development server.
* Checks server health and prevents opening duplicate tabs.
* To check server health silently without opening a browser:
  ```bash
  python run_app.py --check
  ```
* To run integrity tests across all assets:
  ```bash
  python run_app.py --test
  ```

### Option B: Using Node / NPM
```bash
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## Core Assessment Highlights

### Task 1: The Roadmap Decision
* **#1 Priority (BUILD NEXT):** Roster Tagging Disambiguation Engine & 60-Second Coach Micro-Review.
  * **The Problem:** 30% of generated reels are NEVER opened because thumbnails display the wrong kid or notifications arrive at 2:00 AM.
  * **The Impact:** Eliminates wrong-kid false positives (#14 vs #4, #1 vs #11), restoring parent trust and immediately unlocking **+43% active reel viewership**.
* **DO NOT BUILD:** Reel Editing Controls (Trimming, Custom Music).
  * **The Survey Trap:** While 58% of parents requested editing tools, usage data reveals that **only 6% ever opened the editor, and fewer than 1% finished an edit**. Parents want zero-effort automation, not mobile video editing.
* **The Ridgeline $180k Renewal Defense:**
  * Rather than committing to native WebRTC streaming across cellularly congested youth sports parks in 6 weeks, we deliver **Sideline Live Hub** (partner camera ingest via Veo/RTMP with live scores and real-time AI moment bookmarks). Carla gets her board deliverable, Jamal closes the $180k contract, and engineering stays focused.

### Task 2: Product Specification (PRD)
* **Target Outcome:** Unopened reel rate reduced from 30% to < 9%; roster tagging precision elevated to 99.4%.
* **Human-in-the-Loop Architecture:**
  * AI auto-approves plays with $\ge 85\%$ confidence.
  * Flagged ambiguous clips (< 85% confidence) route to a **60-second micro-audit queue** on the coach's phone (avg 48 sec/game).
  * Parents have a 1-tap post-dispatch correction safety valve ("Wrong kid?").
* **Post-Ship Guardrails:**
  * Automated 12-hour SLA fallback prevents coach abandonment from stalling weekly recaps.
  * Roster substitution checks and real-time feedback rate limiting catch swapped-digit anomalies (#12 vs #21).

---

## Project Structure

```
├── index.html                 # Main application structure & assessment views
├── package.json               # Vite project configuration
├── run_app.py                 # Seamless Python runner & health monitor
├── src/
│   ├── app.js                 # Interactive logic, HITL engine, and metrics
│   └── style.css              # Custom sports broadcast design system (Vanilla CSS)
└── public/                    # 4K sports demonstration assets
    ├── soccer_highlight_action.jpg
    ├── soccer_player_four.jpg
    ├── team_recap_celebration.jpg
    └── youth_lacrosse_action.jpg
```
