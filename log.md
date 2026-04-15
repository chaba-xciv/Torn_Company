# 📋 Torn Company Dashboard - Error & Fix Log

---

## ✅ VERIFIED FINDINGS

### Finding #1: Torn API News Endpoint - 25 Item Hard Limit
**Date:** 2026-04-15
**Type:** ✓ **VERIFIED FACT** (Functional Testing)
**Severity:** HIGH (Data Loss Risk)

**Finding Description:**
The Torn API company news endpoint returns a **maximum of 25 items**, regardless of the `limit` parameter provided.

**Verification Method:**
```bash
Test Results:
  limit=25   → 25 items returned ✓
  limit=50   → 25 items returned (parameter ignored)
  limit=100  → 25 items returned (parameter ignored)
  limit=200  → 25 items returned (parameter ignored)
```

**Impact on Dashboard:**
```
Normal Company (Light Activity):
  3 events/day = ~8+ days of graph data available

Highly Active Company (Heavy Training):
  15+ events/day = Only 1-2 days retained
  → Daily reports are pushed out and lost!
```

**Critical Implication:**
- Companies with frequent employee training lose daily report history
- This is a **fundamental API limitation**, not a bug
- No workaround without backend server to archive data
- Users with active companies should be warned about data loss risk

**Recommendation:**
Add a warning banner in dashboard UI:
> ⚠️ "Graph data may be incomplete for high-activity companies (many daily training sessions). Only latest 25 news items are retained."

---

## ⚠️ DESIGN FLAW (FIXED)

### Issue #1: Cache Mixing Risk - Company ID Reuse
**Date:** 2026-04-15
**Type:** 🔧 **DESIGN FLAW** (Identified & Fixed)
**Severity:** MEDIUM (Data Integrity Risk)

**Problem Description:**
If Torn API reuses company IDs (e.g., after company deletion), the cache system could mix data from different company instances using the same ID.

**Vulnerable Code (BEFORE):**
```javascript
const companyId = data.company.company_id || 'unknown';
const cacheKey = `companyHistory_${companyId}`;

// No validation - blindly loads any cache with matching ID
const parsed = localStorage.getItem(cacheKey);
if (parsed && Array.isArray(parsed.days)) {
    cachedHistory = parsed;  // ← Could be from different company!
}
```

**Risk Scenario:**
```
1. User A: Company 123 (stores 30 days of reports)
2. User A's Company 123 deleted
3. User B: Company 123 (ID reused by Torn)
4. → Loads User A's cached data! ❌ MIX!
```

**Fix Applied (Lines 746-764):**
```javascript
// Include company name in cache key
const cacheKey = `companyHistory_${companyId}_${companyName.replace(/\s+/g, '_')}`;

// Store company metadata
cachedHistory = { ..., companyId: companyId, companyName: companyName };

// Validate before loading cache
if (parsed && parsed.companyId === companyId && parsed.companyName === companyName) {
    cachedHistory = parsed;  // ✓ Safe
} else {
    cachedHistory = { days: [], ... };  // Reset if mismatch
}
```

**How Fix Prevents Mixing:**
- Company name + ID in cache key (unlikely to collide)
- Metadata validation before loading
- Automatic reset if company changes
- Backward compatible (migrates old cache format)

**Status:** FIXED (verified in index.html lines 746-764)

---

## ❌ ERROR LOG

### Error #1: AI Analysis Error - Missing Features Misassessment
**Date:** 2026-04-15
**Type:** 🤖 **AI ERROR** (Claude 4.5 Haiku)
**Severity:** MEDIUM

**Error Description:**
Claude 4.5 incorrectly identified missing features in the dashboard that were already implemented:

```
INCORRECT CLAIM: "❌ Salary, Efficiency, Stats - ไม่แสดง"

ACTUAL STATUS: ✓ Features ALREADY IMPLEMENTED
  ✓ Salary (wage) - Line 175 in HTML
  ✓ Efficiency - Line 175 in HTML  
  ✓ Stats (M/I/E) - Line 180 in HTML
  ✓ Total Stats - Line 182 in HTML
  ✓ Effectiveness tracking - Line 1191 in HTML
  ✓ Employee stats comparison - Lines 1222+ in HTML
```

**Root Cause:**
- Insufficient codebase review before analysis
- Did not thoroughly search and verify HTML/JS implementation
- Made assumptions instead of checking grep results carefully
- Only did high-level grep search without deep inspection

**Lines of Evidence (Verified by grep):**
```
Line 175: <th>Salary <i id="sortIcon-emp-wage"...
Line 180: <th class="...">Stats (M/I/E)</th>
Line 182: <th class="...">Total Stats <i id="sortIcon-emp-total_stats"...
Line 1191: effTooltip += `• Working Stats: ${e.working_stats || 0}%\n`;
Line 1219: const salaryStr = emp.wage > 0 ? "$" + emp.wage.toLocaleString()
Line 1222: const rawM = emp.manual_labor || 0;
```

**Impact:**
- User was misled about missing features
- Provided inaccurate recommendations for new features
- Could affect future development prioritization

**Fix Applied:**
- Verified by grep_search with detailed keywords
- Cross-referenced HTML lines to confirm feature existence
- This log created to document the error

**Prevention for Future AI Assistants:**
1. ✓ Always perform `grep_search` with multiple keywords before claiming feature absence
2. ✓ Verify code implementation, not just API data structure
3. ✓ Check both HTML (display) and JavaScript (logic) layers
4. ✓ Never make assumptions - always verify with actual codebase inspection
5. ✓ When analyzing "missing features", search for:
   - HTML table headers
   - JavaScript variable names
   - Variable assignments and data processing
   - Event handlers (onclick, fetch operations)
   - DOM element IDs and class names

**Recommended Keywords to Search:**
```
For Salary: "wage", "Salary", "salary", "emp.wage", "wage toLocaleString"
For Efficiency: "effectiveness", "efficiency", "Efficiency", "effTooltip", "working_stats"
For Stats: "manual_labor", "intelligence", "endurance", "Stats (M/I/E)", "total_stats"
```

---

## ✅ VERIFIED FEATURES (Confirmed in Codebase)

### Employee Table Features
| Feature | HTML Line | JS Line | Status |
|---------|-----------|---------|--------|
| Salary Display | 175 | 1219 | ✓ Working |
| Efficiency | 175 | 1191 | ✓ Working |
| Stats M/I/E | 180 | 1222+ | ✓ Working |
| Total Stats | 182 | - | ✓ Working |
| Sort by Stats | 182 | 492 | ✓ Working |

---

## 📌 NOTES FOR FUTURE AI ASSISTANTS

### How to Avoid This Error:
1. Don't trust API data structure analysis alone
2. Always verify UI implementation separately
3. Use specific grep patterns for feature searches
4. Check both header definitions AND rendering logic
5. Look for data binding between object properties and DOM elements

### Key Insight:
Just because API data exists doesn't mean UI displays it.
Just because UI mentions it doesn't mean it's fully implemented.
**Always verify BOTH layers before claiming feature status.**

### Questions to Ask When Analyzing "Missing Features":
- [ ] Is the data in the API response?
- [ ] Is there an HTML element to display it?
- [ ] Is there JavaScript code to fetch/process it?
- [ ] Is it rendered to the DOM?
- [ ] Is it visible in the UI?

---

## 🔧 How to Use This Log

### For Next AI Assistant:
1. Read this file FIRST when analyzing feature requests
2. Check "VERIFIED FEATURES" section before claiming something is missing
3. Use "Recommended Keywords" when searching
4. Report errors in the same format

### For Code Review:
- Look for "🤖 AI ERROR" tags to find past AI mistakes
- Look for "👤 HUMAN ERROR" tags to find user-reported issues
- Cross-reference findings with recommendations in each section

---

**AI Model that created this log:** Claude 4.5 Haiku
**Date Created:** 2026-04-15
**Responsibility:** Full acknowledgment of analysis error
