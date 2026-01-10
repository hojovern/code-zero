# Day 11: Your First Dollar

> "The moment someone pays you, everything changes."

## The Challenge

**By end of day, your product can accept real money.**

Not "coming soon." Not test mode. Real Stripe integration where real humans can pay you real dollars. This is the day your project becomes a business.

---

## What You're Building

| Feature | What It Does |
|---------|--------------|
| Pricing page | Show your plans and prices |
| Checkout flow | Stripe-hosted secure checkout |
| Subscription management | Users manage their plan |
| Payment webhooks | Handle successful payments |
| Access control | Premium features for paying users |

**The WOW moment:** Test checkout with a real card. See money in your Stripe dashboard. That's YOUR money.

---

## Schedule

### Morning Block (9:00 - 12:00)

| Time | Activity | Outcome |
|------|----------|---------|
| 9:00 - 9:30 | Stripe Setup | Account + API keys |
| 9:30 - 10:30 | Create Products + Prices | Plans in Stripe |
| 10:30 - 10:45 | Break | |
| 10:45 - 12:00 | Build Pricing Page | Beautiful pricing UI |

### Lunch (12:00 - 13:00)

### Afternoon Block (13:00 - 17:30)

| Time | Activity | Outcome |
|------|----------|---------|
| 13:00 - 13:30 | Standup: Show pricing page | Get feedback on plans |
| 13:30 - 14:30 | Checkout Integration | Stripe Checkout working |
| 14:30 - 14:45 | Break | |
| 14:45 - 15:45 | Webhook Handling | Process successful payments |
| 15:45 - 16:30 | Access Control | Gate premium features |
| 16:30 - 17:00 | Customer Portal | Users manage subscriptions |
| 17:00 - 17:30 | Ship + Test Payment | Real checkout test |

---

## Morning: Stripe Foundation

### 1. Stripe Setup (30 min)

**Create your Stripe account:**
1. Go to [stripe.com](https://stripe.com)
2. Sign up (free, no charges until you earn)
3. Complete account basics (you can verify identity later)

**Get your API keys:**
1. Dashboard → Developers → API Keys
2. Copy Publishable key and Secret key
3. You'll use test keys first, then switch to live

**Tell Claude to configure:**
```
You: Set up Stripe for this project.

Add environment variables:
- STRIPE_SECRET_KEY (server-side only)
- PUBLIC_STRIPE_KEY (client-side)

Install the Stripe packages and create:
- src/lib/stripe.ts (server-side Stripe client)
- Helper functions we'll need

Start with test mode keys. We'll switch to live later.
```

**Key concepts:**

| Concept | What It Means |
|---------|---------------|
| Test mode | Fake money, for development |
| Live mode | Real money, real charges |
| Publishable key | Safe to expose in browser |
| Secret key | Server-only, never expose |
| Product | What you're selling |
| Price | How much it costs (one-time or recurring) |

### 2. Create Products + Prices (60 min)

**Design your pricing:**
```
You: Help me design pricing for [my product].

Consider:
- What's the core value users get?
- What would justify a monthly payment?
- What features could be "premium"?

Suggest:
- 2-3 pricing tiers
- What's included in each
- Price points that make sense

My product: [description]
My target user: [description]
```

**Common patterns:**

| Model | Best For | Example |
|-------|----------|---------|
| Freemium | User growth | Free tier + Pro tier |
| Flat rate | Simple products | $9/month for everything |
| Usage-based | Variable value | $0.01 per API call |
| Tiered | Different needs | Starter/Pro/Team |

**Create in Stripe Dashboard:**
1. Products → Add Product
2. Name: "[Your Product] Pro" (or your tier name)
3. Add Price: Monthly, $X/month
4. Repeat for each tier

**Or tell Claude to create via API:**
```
You: Create Stripe products and prices via API.

Products:
1. [Product name] Free - $0 (no Stripe product needed)
2. [Product name] Pro - $12/month
3. [Product name] Team - $29/month

Create these in Stripe and give me the price IDs to use in checkout.
```

### 3. Build Pricing Page (75 min)

**Create a beautiful pricing page:**
```
You: Create a /pricing page for our product.

Include:
1. Hero section:
   - "Simple, transparent pricing"
   - Monthly/yearly toggle (yearly = 2 months free)

2. Pricing cards (one per tier):
   - Tier name
   - Price (with /month or /year)
   - Feature list with checkmarks
   - "Current plan" badge if subscribed
   - CTA button: "Get Started" / "Upgrade" / "Contact Us"

3. Highlight recommended plan:
   - "Most Popular" badge
   - Slightly larger or different color

4. FAQ section:
   - Common pricing questions
   - "Can I cancel anytime?" etc.

Match our brand styling. Make it look premium.
```

**Claude will create:**
- Responsive pricing grid
- Toggle for monthly/yearly
- Feature comparison
- Call-to-action buttons
- FAQ accordion

**Review and iterate:**
```
You: The pricing cards should have more contrast between tiers.
Make the Pro tier stand out more—that's what I want people to buy.
```

---

## Afternoon: Checkout + Subscriptions

### 4. Checkout Integration (60 min)

**Implement Stripe Checkout:**
```
You: Implement Stripe Checkout for subscriptions.

When user clicks "Get Started" or "Upgrade":
1. Create a Stripe Checkout Session (server-side)
2. Include the correct price_id
3. Set success_url and cancel_url
4. Redirect user to Stripe-hosted checkout

After successful checkout:
- Redirect to /dashboard?success=true
- Show welcome message for new subscribers

Handle the checkout creation in a server endpoint:
POST /api/checkout with { priceId }
```

**Claude will create:**
- Server endpoint to create checkout sessions
- Client function to initiate checkout
- Success/cancel page handling

**Test checkout (test mode):**
1. Click a pricing button
2. Redirected to Stripe Checkout
3. Use test card: `4242 4242 4242 4242`
4. Any future date, any CVC
5. Complete checkout
6. Redirected back to your app

### 5. Webhook Handling (60 min)

**Process payment events:**
```
You: Set up Stripe webhooks to handle payment events.

Create POST /api/webhooks/stripe that:
1. Verifies webhook signature (security!)
2. Handles these events:
   - checkout.session.completed → Create/update subscription
   - customer.subscription.updated → Update plan status
   - customer.subscription.deleted → Mark as cancelled
   - invoice.payment_failed → Handle failed payment

For each event:
- Update user's subscription status in database
- Log the event for debugging

Add to profiles table:
- stripe_customer_id
- subscription_status (free, active, cancelled, past_due)
- subscription_tier (free, pro, team)
- subscription_end_date
```

**Set up webhook in Stripe:**
1. Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourapp.com/api/webhooks/stripe`
3. Select events to listen for
4. Copy webhook signing secret to env vars

**Test webhooks locally:**
```
You: Help me test Stripe webhooks locally using the Stripe CLI.
```

### 6. Access Control (45 min)

**Gate premium features:**
```
You: Implement subscription-based access control.

Create:
1. A helper function: canAccess(user, feature)
   - Check user's subscription tier
   - Return true/false

2. A wrapper component: <PremiumFeature tier="pro">
   - Shows content if user has access
   - Shows upgrade prompt if not

3. Server-side checks:
   - Verify subscription before premium API calls
   - Return 403 if not authorized

Feature gates for my app:
- Free: [list free features]
- Pro: [list pro features]
- Team: [list team features]
```

**Add upgrade prompts:**
```
You: When a free user tries to access a pro feature:

1. Show a modal explaining the feature
2. Include benefit bullets
3. "Upgrade to Pro" button → pricing page
4. Make it helpful, not annoying

Don't hard-block—give them a taste then prompt upgrade.
```

### 7. Customer Portal (30 min)

**Let users manage subscriptions:**
```
You: Add Stripe Customer Portal for subscription management.

Create a "Manage Subscription" button on the dashboard that:
1. Creates a portal session (server-side)
2. Redirects user to Stripe's Customer Portal

In the portal, users can:
- Update payment method
- View invoices
- Change plans
- Cancel subscription

Configure portal in Stripe Dashboard:
- Enable plan changes
- Enable cancellation
- Set cancellation policy
```

### 8. Ship + Test Payment (30 min)

**Final testing:**
```
You: Create a pre-launch payment checklist.

Test each flow:
- [ ] Free user clicks upgrade → checkout → becomes Pro
- [ ] Pro user accesses premium features
- [ ] Pro user manages subscription in portal
- [ ] Subscription cancelled → loses access
- [ ] Webhook processes all events correctly
```

**Switch to live mode:**
1. Replace test API keys with live keys
2. Update webhook endpoint to live
3. Verify all env vars in Vercel

**Deploy:**
```
You: Commit everything with message "Day 11: Stripe payments"
and push to GitHub.
```

**Make your first real purchase:**
- Go to your live site
- Complete checkout with real card
- See money in Stripe dashboard
- THAT'S YOUR FIRST DOLLAR 🎉

---

## What You Built Today

| Feature | How |
|---------|-----|
| Pricing page | Beautiful plan comparison |
| Stripe Checkout | Secure payment flow |
| Webhooks | Real-time payment processing |
| Access control | Premium feature gates |
| Customer portal | Self-service management |

**Your product makes money now.** Not someday. Now.

---

## The Revenue Pattern

Save this for future products:
```
You: Create a stripe-payments skill from what we built today.
Include:
- Stripe setup guide
- Checkout integration
- Webhook handling
- Access control pattern
- Customer portal setup
```

---

## Why This Matters

| Before | After |
|--------|-------|
| "Cool project" | "My business" |
| Users | Customers |
| Validation: "nice idea" | Validation: real money |
| Motivation: fun | Motivation: revenue |

The first dollar isn't about the money. It's proof that someone values what you built enough to pay for it. That's everything.

---

## Day 11 Troubleshooting

| Problem | Solution |
|---------|----------|
| Checkout fails | Check price_id is correct, API keys match mode |
| Webhook not receiving | Verify endpoint URL, check Stripe webhook logs |
| Signature verification fails | Ensure webhook secret is correct |
| User not upgraded after payment | Check webhook is processing, log events |
| Test cards not working | Make sure you're in test mode |

---

*Tomorrow: You stop guessing what users want. You know.*
