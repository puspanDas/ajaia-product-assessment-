# SidelineReel PM Assessment — Video Presentation Script
**Candidate:** Puspan Das  
**Role:** Product Manager, SidelineReel (Ajaia)  
**Target Duration:** 5 to 10 Minutes (Screen + Camera Recording)

---

## Preparation Checklist
1. Open **`http://localhost:5173/`** in your browser in full screen.
2. Position your camera / webcam at eye level.
3. Keep this script on your secondary screen or printed in front of you.
4. When recording your screen, click through the tabs on screen as directed by the **[Screen Action]** prompts.

---

## 🎙️ Minute-by-Minute Speaking Script

### [0:00 – 2:30] Part 1: The Roadmap Call (Task 1)
**[Screen Action: Start on the `TASK 1: The Roadmap Call` tab]**

> "Hi everyone, I'm Puspan Das, Product Manager for SidelineReel at Ajaia. Today, I'm presenting my evidence-based roadmap call, the product specification for our top priority, and a live demonstration of our working prototype.
> 
> Looking at our situation across Materials 1 through 5, our #1 priority to build next is **Roster Tagging Disambiguation and the 60-Second Coach Micro-Audit**.
> 
> Here is why the data makes this decision unambiguous:
> 
> First, our internal Product Health dashboard reveals a massive funnel leak: **30% of our generated reels are NEVER opened at all**. When reels *are* opened, our share rate is phenomenal at 92%. But roughly one-third of our user base drops off before even viewing the product.
> 
> Why? Support tickets from Material 3 tell the exact story: notifications arrive at 2:00 AM, and more importantly, the video thumbnail displays the wrong child due to jersey number ambiguity—such as #14 mistaken for #4, or single vs. double-digit confusion like #1 and #11. In youth sports, this is deeply emotional. When a 9-year-old child opens her reel and sees someone else's goal, the magic is broken and trust collapses.
> 
> Fixing jersey disambiguation and generating verified front-facing thumbnails directly unlocks that 30% unopened cohort—instantly expanding our active audience by **+43%**.
> 
> Now, what do we **NOT** build next?
> 
> 1. **We do NOT build the Reel Editing Controls**, despite 58% of parents requesting it in our quarterly survey. This is the classic PM **Stated vs. Revealed Preference trap**. Our usage data proves that only 6% of parents ever opened the editor, and fewer than 1% completed an edit. Meanwhile, 90% use the 1-click recap share button. Parents are time-starved; they don't want to edit video on their phones—they want zero-effort automation.
> 
> 2. **We do NOT build native broadcast livestreaming infrastructure in 6 weeks**. Carla Reyes at Ridgeline—our biggest account at $180k—is threatening to shop around if livestreaming isn't locked in before renewal. But building proprietary WebRTC/RTMP streaming across remote youth sports complexes with congested 4G/5G cell towers in 6 weeks is operational suicide. Saturday morning streams will freeze, and support will collapse.
> 
> **How we save Ridgeline's $180k renewal:**  
> We deconstruct Carla's true Job-to-be-Done: *'so grandparents and college scouts can watch in real time.'* Instead of rebuilding Twitch, we offer **Sideline Live Hub**: embedding existing sideline cameras (like Veo, Hudl, YouTube Live) into SidelineReel, overlaid with our live score and real-time **AI Instant Moment Bookmarks**. Carla gets her board deliverable locked in today, Jamal closes the $180k renewal, and our engineering team stays 100% focused on core highlight accuracy."

---

### [2:30 – 5:00] Part 2: The Product Spec (Task 2)
**[Screen Action: Click on `TASK 2: The Product Spec (PRD)` tab]**

> "Moving to Task 2, let's look at the product specification for our Disambiguation Engine.
> 
> **Target Outcomes:**  
> Our primary goal is reducing unopened reels from 30% to under 9%, elevating roster tagging precision from ~82% to 99.4%, and deflecting 95% of jersey mix-up tickets.
> 
> **Scope Boundaries:**  
> In scope: a two-pass multi-digit OCR segmentation pipeline, smart keyframe thumbnail scoring, the 60-second coach micro-audit queue, and scheduled 9:30 AM delivery. Explicitly out of scope: complex trimming tools and proprietary streaming infra.
> 
> **Human-in-the-Loop (HITL) Architecture:**  
> *(Scroll to the 4-step workflow diagram on screen)*  
> Notice our human-in-the-loop philosophy: SidelineReel never asks a coach to build a reel by hand.
> - Clips with confidence at or above 85% are auto-approved.
> - Clips below 85% route to the **Coach Micro-Audit Queue**. Coaches receive 1 to 2 flagged plays on their phone and spend an average of **48 seconds** confirming the player before Sunday delivery.
> - Post-dispatch, parents have a discrete safety valve: a 1-tap 'Wrong kid in this clip?' button that instantly updates the reel and retrains OCR weights.
> 
> **Acceptance Criteria & Failure Modes:**  
> We defined four strict testable criteria covering single-versus-double digit occlusion (AC-01) and 3-second reel regeneration latency (AC-02).
> 
> And to protect against failure post-launch:
> 1. **Coach Fatigue:** An automated 12-hour SLA fallback ensures that if a coach is unresponsive, high-confidence plays are released with a 'Pending Coach Confirmation' badge so weekly recaps are never blocked.
> 2. **Digit Inversion (#12 vs #21):** Roster substitution anomaly checks cross-reference playing time, and real-time parent feedback rate-limiting acts as a circuit breaker if multiple reports trigger on a single match."

---

### [5:00 – 8:00] Part 3: Live Working Prototype Demo (Task 3)
**[Screen Action: Click on `TASK 3: Coach AI Studio` tab]**

> "Now let's see the working prototype in action.
> 
> **1. Coach AI Studio:**  
> Here is Saturday's 4K match between Ridgeline U12 and Seattle Thunder FC. The AI extracted 14 highlights and auto-approved 12.
> 
> Look at clip #2 on the timeline: the AI detected a jersey fold and flagged #14 Emma Diaz versus #4 Sophie Clark at 64% confidence—exactly mirroring the Ridgeline support ticket from Material 3.
> 
> On the right, the coach sees the high-contrast jersey crop and OCR diagnosis. With one click:  
> *(Click '✓ Confirm as Emma Diaz (#14)')*  
> Emma is verified. The bounding box turns green at 99.4%, and our flagged queue updates.
> 
> Now on card #2, representing our Cobblestone Little League ticket: single vs. double digit #11 vs #1:  
> *(Click '✓ Confirm Liam Cole (#11)')*  
> Both items are resolved.
> 
> *(Scroll down to Smart Thumbnail Selector)*  
> Look at this comparison: previously, the default keyframe picked the back of Sophie #4's jersey, causing parents to think 'that's not my kid' and driving the 30% unopened drop. Our new Smart Keyframe selector verifies front-facing digits and facial clarity, boosting immediate opens to 92%.
> 
> *(Click 'Send 18 Verified Reels to Ridgeline Families')*  
> The batch is scheduled for Sunday 9:30 AM."

**[Screen Action: Click on `TASK 3: Parent Mobile Reel` tab]**

> "**2. Parent Mobile Experience:**  
> Here is what Emma Diaz's family experiences on Sunday morning:
> 
> The push notification arrives with Emma's verified thumbnail. In the mobile player:  
> *(Click the Play button on the phone screen)*  
> Emma's reel plays with a verified #14 shield badge and goal markers.
> 
> When parents love a highlight:  
> *(Click 'Share Emma's Reel')*  
> They share directly to family WhatsApp groups and Instagram Stories—fueling our 92% viral share engine that drives next season's signups.
> 
> And notice the safety valve: if an edge case ever slips through, parents can tap 'Wrong kid or clip?' to reassign in seconds."

**[Screen Action: Click on `TASK 3: Ridgeline Live Hub` tab]**

> "**3. Ridgeline Live Hub (Carla's Solution):**  
> Finally, here is our commercial defense for Carla Reyes and her board:
> 
> An integrated live broadcast stage embedding Ridgeline's field camera feeds (Veo, RTMP, YouTube Live) with real-time score overlays and AI Instant Moment bookmarks. Grandparents and college scouts can watch live from anywhere, Carla secures her board approval, and Jamal closes the $180k contract."

---

### [8:00 – 9:00] Part 4: Conclusion & Business Impact
**[Screen Action: Click on `DATA: Metrics & Simulator` tab]**

> "To conclude: by looking beyond superficial survey requests and focusing on our core funnel leak, we turn a 30% unopened loss into an unassailable retention moat.
> 
> We achieve:
> - **+42% increase in active family viewership**
> - **99.4% roster tagging precision**
> - **$180,000 renewal secured for Ridgeline**
> - **-94% reduction in emotional support tickets**
> 
> This is how SidelineReel wins youth sports: zero-effort magic for coaches, and verified joy for families.
> 
> Thank you, and I look forward to your questions."
