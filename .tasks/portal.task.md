# Task Portal Enhancement - AI-Powered Task Execution

## Overview

Enhance the Task Portal static site to enable AI-powered autonomous task execution. This feature will add an "Execute with AI" button next to each task in the task table, allowing users to trigger an AI agent that will automatically complete the task by writing code, creating documents, running commands, and performing any other necessary actions.

---

## Plan: AI-Powered Task Execution for Task Portal

Add autonomous AI execution capability to Task Portal, enabling users to click a button and have AI agents complete tasks automatically—generating code, writing docs, running commands, and validating against Definition of Done criteria.

### Architecture Options

#### Option 1: GitHub Copilot Integration (RECOMMENDED) ✅
**Approach:** Use existing Task Portal VS Code extension to send prompts to GitHub Copilot Chat
- **Pros:** $0 additional cost (already paying for Copilot), native VS Code integration, access to workspace context, mature API
- **Cons:** Requires VS Code, limited to Copilot capabilities
- **Cost:** $0/month (included in GitHub Copilot subscription)

#### Option 2: Google Gemini API (FREE TIER)
**Approach:** Backend service using free Gemini API
- **Pros:** Free tier (60 requests/minute), good code generation, supports tool use
- **Cons:** Rate limits, requires backend service, less VS Code integration
- **Cost:** $0/month (free tier), paid tier available if needed

#### Option 3: Anthropic Claude (PAID)
**Approach:** Backend service using Claude API
- **Pros:** Best-in-class code generation, large context window, excellent tool use
- **Cons:** Additional cost, requires backend service
- **Cost:** $30-100/month for moderate usage

### Recommended Approach: GitHub Copilot + VS Code Extension

### Steps

1. **[TASK-FEAT-028]** Design system architecture: evaluate integration approaches (Copilot Chat API vs Language Model API vs Chat Participants), design prompt construction from task context, and plan execution workflow
2. **[TASK-FEAT-029]** Enhance Task Portal extension with "Execute with AI" button that opens VS Code chat with pre-filled prompt
3. **[TASK-FEAT-027]** Implement AI agent coordinator: gather task context, construct comprehensive prompt, send to Copilot, handle response with tool execution
4. **[TASK-API-010]** (Optional) Build lightweight backend for task queue and progress tracking if needed
5. **[TASK-TEST-009]** Test with simple/medium/complex tasks, validate Copilot integration, error recovery, and security
6. **[TASK-DOC-017]** Document user guide, developer guide, extension API usage, and best practices

### Further Considerations

1. **Cost Management:** GitHub Copilot already paid ($10-19/month), no additional cost. Gemini free tier as fallback.
2. **Safety & Rollback:** Git feature branches automatically created by extension, user approves changes before commit
3. **Deployment:** VS Code extension marketplace, no backend infrastructure needed (unless using Gemini option)

---

## Detailed Task Specifications

### TASK-FEAT-028: Design AI Task Execution Architecture

**Status:** PENDING  
**Priority:** HIGH  
**Estimated Time:** 6-8 hours  
**Dependencies:** none

**Description:**  
Design the architecture for AI-powered task execution using GitHub Copilot integration with the Task Portal VS Code extension. Evaluate Copilot API options (Chat API vs Language Model API vs Chat Participants), design prompt construction from task context, and plan execution workflow.

**Key Decisions:**
- **Approach:** VS Code extension using GitHub Copilot Chat API [Recommended]
- **AI Provider:** GitHub Copilot (already paid) with Gemini as free fallback
- **Execution:** Extension triggers Copilot chat with auto-generated prompt from task
- **Safety:** Git feature branches, user approval before applying changes, VS Code native undo

**Architecture Option 1 (GitHub Copilot - Recommended):**
```
Task Portal Static Site
    ↓ Click "Execute with AI"
Task Portal VS Code Extension
    ↓ Gather context + construct prompt
GitHub Copilot Chat API
    ↓ Generate code/docs/commands
Extension Agent
    ↓ Execute actions with user approval
Workspace + Git
```

**Architecture Option 2 (Google Gemini - Free):**
```
Task Portal Static Site
    ↓ Click "Execute with AI"
VS Code Extension
    ↓ Send task to backend
Node.js Backend Service
    ↓ Gemini API (free tier)
AI Agent
    ↓ Stream results to extension
Workspace + Git
```

**VS Code Extension Integration:**
- Use `vscode.chat` API or `vscode.lm` (Language Model API)
- Register chat participant: `@taskportal-executor`
- Auto-populate chat with task context
- Parse Copilot responses for code/file changes
- Apply changes through VS Code edit APIs

**Deliverables:**
- Architecture diagram for both options
- Copilot Chat API vs Language Model API comparison
- Prompt engineering strategy
- Context gathering specification
- Safety mechanisms (git branches, user approval flow)
- Technical specification document

---

### TASK-API-010: Build Backend Service for AI Task Execution (OPTIONAL)

**Status:** PENDING  
**Priority:** MEDIUM  
**Estimated Time:** 8-12 hours  
**Dependencies:** TASK-FEAT-028

**Description:**  
(OPTIONAL - Only needed if using Gemini API instead of GitHub Copilot)

Build lightweight Node.js/Express backend service for Gemini API integration. Handles task execution requests, manages API calls to Gemini, and provides progress updates to VS Code extension.

**Key Components:**

**REST API Endpoints:**
- `POST /api/tasks/:taskId/execute` - Start task execution with Gemini
- `GET /api/tasks/:taskId/status` - Check execution status
- `POST /api/tasks/:taskId/cancel` - Cancel execution
- `GET /api/tasks/:taskId/logs` - Get execution logs

**Server-Sent Events (SSE) for Progress:**
- Stream progress updates to extension
- File change events
- Command execution output
- Completion status

**Stack:**
- Express + TypeScript
- `@google/generative-ai` for Gemini
- Simple queue (in-memory or BullMQ)
- Minimal infrastructure

**Deliverables:**
- Lightweight backend service
- Gemini API integration with free tier
- SSE streaming to extension
- Rate limiting for free tier
- Optional: Deploy to Vercel/Railway or run locally

---

### TASK-FEAT-027: Implement AI Agent Coordinator in VS Code Extension

**Status:** PENDING  
**Priority:** HIGH  
**Estimated Time:** 16-20 hours  
**Dependencies:** TASK-FEAT-028, TASK-FEAT-029

**Description:**  
Implement AI agent coordinator within the Task Portal VS Code extension. Handles context gathering, prompt construction, GitHub Copilot interaction, response parsing, and action execution with user approval.

**Agent Flow:**
1. **Parse Task:** Extract from TASK_REGISTRY.json
2. **Gather Context:** Collect related files, dependencies, guidelines, existing code
3. **Construct Prompt:** Build comprehensive prompt for Copilot with task details, DoD, context
4. **Send to Copilot:** Use Chat API or Language Model API to get AI response
5. **Parse Response:** Extract code changes, file operations, commands from Copilot output
6. **User Approval:** Show diff preview, request confirmation
7. **Execute Actions:** Apply changes via VS Code API
8. **Validate:** Check DoD criteria, run tests if specified
9. **Commit:** Create feature branch, commit changes with task reference

**GitHub Copilot Integration Options:**

**Option A: Chat Participants API**
```typescript
vscode.chat.registerChatParticipant('@taskportal', async (request, context, stream, token) => {
  // Handle task execution request
});
```

**Option B: Language Model API**
```typescript
const models = await vscode.lm.selectChatModels({ family: 'gpt-4' });
const chatResponse = await model[0].sendRequest(messages, {}, token);
```

**Option C: Chat View API (Auto-populate)**
```typescript
await vscode.commands.executeCommand('workbench.action.chat.open', {
  query: constructedPrompt,
  autoSend: true
});
```

**Context Gathering:**
- Task details from TASK_REGISTRY.json
- Related .task files for dependencies
- Existing files mentioned in task
- Project structure and conventions
- Definition of Done criteria
- Test requirements

**Action Execution (with User Approval):**
- `createFile` - Use VS Code workspace API
- `modifyFile` - Show diff, apply edit
- `deleteFile` - Confirm and delete
- `runCommand` - Execute in integrated terminal
- `runTests` - Trigger test runner

**Safety Layer:**
- Git feature branch auto-created
- All changes shown in diff view before apply
- User approval required for each action
- Command execution in terminal (user visible)
- VS Code native undo/redo
- Rollback via git reset

**Deliverables:**
- Context gatherer functional
- Prompt constructor optimized for Copilot
- Copilot API integration (Chat or Language Model)
- Response parser extracting actions
- User approval flow with diff preview
- Action executor using VS Code APIs
- DoD validator
- Git workflow with feature branches

---

### TASK-FEAT-029: Add AI Execution Button to Task Portal Extension

**Status:** PENDING  
**Priority:** HIGH  
**Estimated Time:** 10-14 hours  
**Dependencies:** TASK-FEAT-028

**Description:**  
Enhance Task Portal VS Code extension with "Execute with AI" button in tree view and webview. Clicking button triggers AI execution workflow: gathers context, opens Copilot chat with pre-filled prompt, and coordinates action execution.

**Extension UI Components:**

**Tree View Execute Button:**
- Add context menu item: "Execute with AI" for PENDING tasks
- Add inline button (⚡ icon) next to each task
- Disabled if dependencies incomplete
- Show progress indicator during execution

**Webview Enhancements:**
- Add "Execute with AI" button to task detail view
- Show AI provider selection (Copilot/Gemini)
- Display execution progress panel
- Real-time status updates

**Execution Flow UI:**
1. Click "Execute with AI" button
2. Show preparation dialog: "Gathering context..."
3. Open Copilot chat with pre-filled prompt
4. Option A: Auto-send prompt
5. Option B: Let user review/edit before sending
6. Stream Copilot responses to output channel
7. Show diff preview for file changes
8. User approval dialog for each action
9. Apply changes and show results
10. Offer to commit with task reference

**Progress Tracking:**
- VS Code progress notification
- Output channel for detailed logs
- Status bar item showing current step
- Webview progress panel

**Configuration Settings:**
```json
"taskPortal.aiExecution.provider": "copilot" | "gemini",
"taskPortal.aiExecution.autoSendPrompt": true | false,
"taskPortal.aiExecution.requireApproval": true | false,
"taskPortal.aiExecution.autoCommit": true | false,
"taskPortal.aiExecution.geminiApiKey": "optional"
```

**Copilot Chat Integration:**
- Register chat participant `@taskportal`
- Auto-populate chat with constructed prompt
- Parse Copilot responses
- Extract code blocks and file changes
- Apply via workspace edit API

**Deliverables:**
- Execute button in tree view and webview
- Context gathering and prompt construction
- Copilot chat integration
- Progress tracking UI
- User approval flow for changes
- Diff preview before apply
- Configuration settings
- Git commit workflow

---

### TASK-TEST-009: Test AI Task Execution System

**Status:** PENDING  
**Priority:** MEDIUM  
**Estimated Time:** 6-8 hours  
**Dependencies:** TASK-FEAT-027, TASK-FEAT-029

**Description:**  
Comprehensively test GitHub Copilot integration with simple/medium/complex tasks. Document success rates, execution times, error scenarios. Test prompt engineering effectiveness, user approval flow, and git safety mechanisms.

**Test Task Suite:**

**Simple (Target: >80% success with Copilot):**
- Create a new TypeScript file
- Modify existing function
- Write README documentation
- Add unit test for existing function

**Medium (Target: >60% success):**
- Implement React component with props
- Create Express API endpoint with validation
- Refactor code to use new pattern
- Add integration test

**Complex (Target: >40% success):**
- Build feature with multiple files (component + API + tests)
- Database schema migration
- Full dashboard widget with state management

**Test Scenarios:**

**Copilot Integration:**
- Prompt construction quality
- Context gathering completeness
- Response parsing accuracy
- Code suggestion quality

**User Experience:**
- Button click → chat opens with prompt
- Diff preview shows changes correctly
- Approval flow works smoothly
- Commit message includes task ID

**Error Handling:**
- Missing dependencies detected
- Invalid requirements → helpful error
- Copilot API timeout → graceful fallback
- User cancellation works
- Git rollback functional

**Gemini Fallback (if implemented):**
- Gemini API integration works
- Free tier rate limits handled
- Quality comparison: Copilot vs Gemini

**Security:**
- No destructive commands executed without approval
- Workspace path validation
- Git branch isolation

**Deliverables:**
- Test results documented
- Success rate by complexity and provider (Copilot/Gemini)
- Prompt engineering recommendations
- User approval flow validation
- Error scenarios tested
- Security verified
- Comparison: Copilot vs Gemini (if both implemented)
- Improvement backlog created

---

### TASK-DOC-017: Document AI Task Execution Feature

**Status:** PENDING  
**Priority:** MEDIUM  
**Estimated Time:** 4-6 hours  
**Dependencies:** TASK-TEST-009

**Description:**  
Create user guide, developer guide, extension API usage, troubleshooting guide, and best practices for AI task execution feature using GitHub Copilot and Task Portal extension.

**Documentation Sections:**

**User Guide:**
- Prerequisites (GitHub Copilot subscription, VS Code, Task Portal extension)
- How to execute task with AI
- Understanding the execution flow
- Reviewing and approving changes
- Using Gemini as alternative (if implemented)
- Troubleshooting common issues

**Developer Guide:**
- System architecture (Extension → Copilot Chat API)
- Context gathering implementation
- Prompt engineering strategies
- VS Code Chat API / Language Model API usage
- Response parsing logic
- Action execution via workspace API
- Git integration patterns

**Extension Configuration:**
- Settings reference
- AI provider selection (Copilot/Gemini)
- Auto-send vs manual review
- Approval requirements
- Auto-commit settings

**Prompt Engineering Best Practices:**
- Writing AI-friendly task descriptions
- Optimal Definition of Done format
- Including sufficient context
- Specifying test requirements
- Examples of good vs bad task specs

**When to Use AI vs Manual:**
- Best for: Simple file creation, boilerplate code, documentation
- Use caution: Complex refactoring, architecture changes
- Manual recommended: Security-critical code, production configs

**Deliverables:**
- Complete user documentation
- Developer guide for extending
- VS Code API usage examples
- Prompt engineering guide
- Troubleshooting FAQ
- Video walkthrough (optional)
- Example tasks optimized for AI execution

---

## Implementation Roadmap

### Phase 1: Architecture & Design (Week 1)
- Design VS Code extension architecture
- Evaluate Copilot Chat API vs Language Model API
- Design prompt engineering strategy
- Plan user approval workflow
- Finalize specifications

### Phase 2: Extension Core (Week 2-3)
- Implement "Execute with AI" button in tree view
- Build context gathering logic
- Implement prompt constructor
- Add extension configuration settings

### Phase 3: Copilot Integration (Week 3-4)
- Integrate GitHub Copilot Chat API
- Implement response parser
- Build diff preview UI
- Add user approval flow
- Implement action executor (workspace API)

### Phase 4: Git & Validation (Week 4-5)
- Implement git feature branch workflow
- Add DoD validation logic
- Implement rollback mechanism
- Add commit with task reference

### Phase 5: Testing & Polish (Week 5-6)
- Test with simple/medium/complex tasks
- Validate prompt engineering
- Test user approval flow
- Security testing
- Performance optimization

### Phase 6: Documentation & Launch (Week 6)
- User guide
- Developer guide
- Prompt engineering best practices
- Video walkthrough
- Publish extension update

### Optional: Gemini Integration (Additional 2-3 weeks)
- Build lightweight backend service
- Integrate Gemini API
- Add provider selection UI
- Test Gemini vs Copilot quality

**Total Duration (Copilot only):** 6 weeks  
**Total Effort:** 46-62 hours  
**Additional for Gemini:** +2-3 weeks, +16-24 hours

---

## Cost Estimation

### Option 1: GitHub Copilot (RECOMMENDED) ✅
- **GitHub Copilot Individual:** $10/month (already paying)
- **GitHub Copilot Business:** $19/user/month (already paying)
- **Additional cost for AI execution:** $0/month
- **Infrastructure:** $0/month (VS Code extension, no backend needed)

**Total Monthly Cost: $0** (Already included in Copilot subscription)

### Option 2: Google Gemini (FREE TIER)
- **Gemini API Free Tier:** 
  - 60 requests/minute
  - 1500 requests/day
  - $0/month
- **Gemini API Paid Tier (if needed):**
  - Input: $0.35 / 1M tokens
  - Output: $1.05 / 1M tokens
  - ~$0.01-0.03/task
  - 100 tasks: ~$1-3/month
  - 500 tasks: ~$5-15/month
- **Infrastructure (optional backend):** 
  - Vercel free tier: $0/month
  - Railway: $5/month (if using)

**Total Monthly Cost:** 
- **Free tier:** $0/month
- **Paid tier (500 tasks):** $5-20/month

### Option 3: Anthropic Claude (NOT RECOMMENDED)
- **Per task:** ~$0.03-0.10 (10k input + 5k output tokens)
- **100 tasks/month:** $3-10/month
- **500 tasks/month:** $15-50/month
- **Infrastructure:** $5-20/month (Railway backend)

**Total Monthly Cost:** $20-70/month (unnecessary when already paying for Copilot)

---

## Cost Comparison Summary

| Provider             | Monthly Cost | Pros                                     | Cons                              |
| -------------------- | ------------ | ---------------------------------------- | --------------------------------- |
| **GitHub Copilot** ✅ | **$0**       | Already paid, VS Code native, no backend | Requires Copilot subscription     |
| **Google Gemini**    | $0-20        | Free tier available, good quality        | Rate limits, optional backend     |
| **Anthropic Claude** | $20-70       | Best quality                             | Additional cost, requires backend |

---

## Risk Assessment & Mitigation

### Technical Risks

**HIGH: AI generates incorrect/destructive code**
- *Mitigation:* Safety layer (command whitelist, path validation), git feature branches with rollback, DoD validation, human review option

**MEDIUM: API rate limits/timeouts**
- *Mitigation:* Queue system for throttling, retry logic, progress checkpointing

**LOW: WebSocket connection issues**
- *Mitigation:* Auto-reconnect, fallback to polling, comprehensive error handling

### Business Risks

**HIGH: API costs spiral with overuse**
- *Mitigation:* Rate limiting per user/API key, usage monitoring dashboard, cost alerts

**MEDIUM: Over-reliance on AI quality**
- *Mitigation:* Validation layer, test requirements, human review workflow, quality metrics tracking

---

## Success Criteria

### MVP Success Metrics
- ✅ AI successfully completes >80% of simple tasks (file creation, basic code)
- ✅ AI successfully completes >60% of medium tasks (API endpoints, functions with tests)
- ✅ Average execution time <5 minutes for simple tasks
- ✅ Error recovery works 100% of the time (rollback functional)
- ✅ Security layer blocks 100% of dangerous commands
- ✅ Real-time progress updates <500ms latency
- ✅ Monthly cost <$50 for moderate usage (500 tasks)

### Long-term Goals
- Expand to complex tasks (>40% success rate)
- Self-improvement through learning from successful executions
- Multi-file refactoring capabilities
- Database migration automation
- Full feature implementation (multiple components)

---

**Created:** 2025-12-26  
**Status:** Ready for Architecture Design Phase  
**Next Step:** TASK-FEAT-025 - Design AI Task Execution Architecture
