/**
 * Email template rendering with variable substitution
 */

export interface TemplateVariables {
	[key: string]: string | number | undefined;
}

/**
 * Replace template variables in content
 * Variables are in the format {{variableName}}
 */
export function renderTemplate(content: string, variables: TemplateVariables): string {
	return content.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
		const value = variables[varName];
		return value !== undefined ? String(value) : match;
	});
}

/**
 * Extract variable names from a template
 */
export function extractVariables(content: string): string[] {
	const matches = content.match(/\{\{(\w+)\}\}/g) || [];
	const varNames = matches.map((m) => m.replace(/\{\{|\}\}/g, ''));
	return [...new Set(varNames)]; // Remove duplicates
}

/**
 * Default email wrapper template
 */
export function wrapEmailHtml(content: string, previewText?: string): string {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>code:zero</title>
  ${previewText ? `<span style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${previewText}</span>` : ''}
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #1a1d23;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background: #ffffff;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
    .logo {
      text-align: center;
      margin-bottom: 32px;
    }
    .logo img {
      height: 32px;
    }
    .logo-text {
      font-size: 24px;
      font-weight: 700;
      color: #04A459;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 0 0 16px 0;
      color: #1a1d23;
    }
    h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 24px 0 12px 0;
      color: #1a1d23;
    }
    p {
      margin: 0 0 16px 0;
    }
    a {
      color: #04A459;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(135deg, #04A459 0%, #038f4d 100%);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      margin: 16px 0;
    }
    .button:hover {
      background: linear-gradient(135deg, #038f4d 0%, #027a42 100%);
    }
    .footer {
      text-align: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e5e5e5;
      color: #666;
      font-size: 14px;
    }
    .footer a {
      color: #666;
    }
    .unsubscribe {
      color: #999;
      font-size: 12px;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="logo">
        <span class="logo-text">code:zero</span>
      </div>
      ${content}
      <div class="footer">
        <p>code:zero - Build your freedom</p>
        <p><a href="https://codezero.my">codezero.my</a></p>
        <p class="unsubscribe">
          <a href="{{unsubscribeUrl}}">Unsubscribe</a> from these emails
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`.trim();
}

/**
 * Generate plain text version from HTML
 */
export function htmlToPlainText(html: string): string {
	return html
		// Remove style tags and content
		.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
		// Remove script tags and content
		.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
		// Replace <br> and </p> with newlines
		.replace(/<br\s*\/?>/gi, '\n')
		.replace(/<\/p>/gi, '\n\n')
		// Replace links with text and URL
		.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/gi, '$2 ($1)')
		// Remove all other tags
		.replace(/<[^>]+>/g, '')
		// Decode HTML entities
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		// Clean up whitespace
		.replace(/\n\s*\n\s*\n/g, '\n\n')
		.trim();
}
