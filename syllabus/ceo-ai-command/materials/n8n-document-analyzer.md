# n8n Workflow: Document Analyzer

> Drop a document in a folder. AI reads it, extracts key points, adds to your knowledge base.

---

## What It Does

```
File uploaded → Text extracted → AI analyzes → Summary saved → You're notified
```

**Result:** Build a searchable knowledge base from every document without reading them all.

---

## The Workflow

```
┌─────────────────────────┐
│  1. File Trigger        │
│  New file in folder     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  2. Extract Text        │
│  PDF/DOCX/TXT parser    │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  3. AI Analyze          │
│  Summarize & extract    │
└───────────┬─────────────┘
            │
            ├──────────────────────┐
            ▼                      ▼
┌──────────────────────┐ ┌──────────────────────┐
│  4a. Save to Database│ │  4b. Notify          │
│  Notion / Airtable   │ │  Slack message       │
└──────────────────────┘ └──────────────────────┘
```

---

## Node Configuration

### Node 1: File Trigger

**Option A: Google Drive**
- Type: Google Drive Trigger
- Event: File created
- Folder: "To Analyze" (create this folder)

**Option B: Dropbox**
- Type: Dropbox Trigger
- Event: File added
- Folder: "/To Analyze"

**Option C: Local/FTP**
- Type: Watch folder
- Path: /path/to/watch

---

### Node 2: Extract Text

**For PDFs:**
```
Type: HTTP Request
URL: https://api.pdf.co/v1/pdf/convert/to/text
Method: POST
Body: {
  "url": "{{file_url}}",
  "apiKey": "{{pdf_co_api_key}}"
}
```

**For DOCX:**
```
Type: Code node (JavaScript)
// Use mammoth.js or docx-parser
```

**For TXT:**
```
Type: Read Binary File + Move Binary Data
// Direct text extraction
```

**Alternative: Use n8n's built-in PDF/Doc extractors**

---

### Node 3: AI Analyze

**Type:** OpenAI / Claude node

**Prompt:**
```
Analyze this document and extract key information.

**Document Name:** {{file_name}}
**Document Type:** {{file_type}}

**Document Content:**
"""
{{extracted_text}}
"""

---

Provide:

## Summary
One paragraph (3-4 sentences) capturing the essence of this document.

## Key Points
- [Key point 1]
- [Key point 2]
- [Key point 3]
- [Key point 4]
- [Key point 5]
(Maximum 5 points)

## Action Items
- [ ] [Action item if any]
- [ ] [Action item if any]
(Leave empty if no actions required)

## Category
[Contract / Report / Research / Legal / Financial / Operations / HR / Other]

## Related To
[Project name, client name, or topic this relates to]

## Follow-up Date
[If document mentions a deadline or follow-up needed, note it here. Otherwise: "None"]

## Tags
[Comma-separated relevant keywords for searching]

---

Keep output concise. Focus on what's actionable or important.
```

---

### Node 4a: Save to Database

**Notion Configuration:**

| Property | Type | Value |
|----------|------|-------|
| Title | Title | {{file_name}} |
| Summary | Text | {{ai_summary}} |
| Key Points | Text | {{ai_key_points}} |
| Category | Select | {{ai_category}} |
| Related To | Text | {{ai_related_to}} |
| Source File | URL | {{file_link}} |
| Date Added | Date | Today |
| Tags | Multi-select | {{ai_tags}} |
| Follow-up | Date | {{ai_follow_up_date}} |

**Airtable Configuration:**

| Field | Type | Value |
|-------|------|-------|
| Document | Attachment | {{file}} |
| Name | Single line | {{file_name}} |
| Summary | Long text | {{ai_summary}} |
| Key Points | Long text | {{ai_key_points}} |
| Category | Single select | {{ai_category}} |
| Tags | Multiple select | {{ai_tags}} |
| Added | Date | Today |

---

### Node 4b: Slack Notification

**Type:** Slack node

**Channel:** #documents or DM

**Message:**
```
:page_facing_up: *New Document Analyzed*

*File:* {{file_name}}
*Category:* {{category}}

*Summary:*
{{one_paragraph_summary}}

*Key Points:*
{{bullet_points}}

{{#if action_items}}
*Action Items:*
{{action_items}}
{{/if}}

_View in knowledge base: {{notion_link}}_
```

---

## Supported File Types

| Type | Extension | Extraction Method |
|------|-----------|------------------|
| PDF | .pdf | PDF.co API or pdfjs |
| Word | .docx | mammoth.js |
| Text | .txt | Direct read |
| Markdown | .md | Direct read |
| Presentation | .pptx | pptx parser |
| Spreadsheet | .xlsx | SheetJS |

---

## Required Accounts

| Service | What You Need |
|---------|---------------|
| Cloud storage | Google Drive, Dropbox, or OneDrive |
| n8n | Cloud or self-hosted |
| PDF.co | API key (free tier: 100 credits/mo) |
| OpenAI/Claude | API key |
| Notion/Airtable | For knowledge base |
| Slack | For notifications |

---

## Setup Checklist

- [ ] Create "To Analyze" folder in cloud storage
- [ ] Connect storage account to n8n
- [ ] Get PDF.co API key
- [ ] Connect AI API
- [ ] Create Notion database or Airtable base
- [ ] Set up Slack notification channel
- [ ] Test with sample document
- [ ] Share "To Analyze" folder with relevant people

---

## Use Cases

**Board materials:**
Drop board deck → Get summary + key decisions needed

**Contracts:**
Drop contract → Extract key terms, deadlines, obligations

**Reports:**
Drop analyst report → Get key findings and recommendations

**Meeting materials:**
Drop pre-read → Get summary before the meeting

**Research:**
Drop competitor analysis → Extract insights and action items

---

## Customization Options

**Category-specific prompts:**
```javascript
if (category === "contract") {
  prompt = "Extract: parties, terms, obligations, deadlines, risks";
} else if (category === "financial") {
  prompt = "Extract: key metrics, variances, trends, concerns";
}
```

**Auto-routing:**
- Contracts → Legal team Slack channel
- Financial → CFO notification
- HR → People team inbox

**OCR for scanned documents:**
- Add OCR step before text extraction
- Use Google Vision API or Tesseract

---

## Common Issues

| Problem | Solution |
|---------|----------|
| PDF extraction fails | Try different PDF library or OCR |
| Summary too long | Add word limit to prompt |
| Wrong category | Provide category examples in prompt |
| Missing action items | Prompt: "Look specifically for..." |

---

## Cost Estimate

| Component | Cost |
|-----------|------|
| n8n Cloud | ~$20/mo |
| PDF.co | Free for 100 docs/mo |
| OpenAI API | ~$0.05 per document |
| **Total** | ~$25/mo for typical usage |

---

## Building Your Knowledge Base

Over time, your Notion/Airtable becomes searchable:

**Search by tag:**
"Show me all documents tagged 'competitor'"

**Search by category:**
"All contracts from 2024"

**Search by content:**
Full-text search across summaries

**Weekly review:**
Filter by "Added this week" to see everything new

This becomes your second brain for documents.
