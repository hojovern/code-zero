<script lang="ts">
	// Scenario State
	let currentScenario = $state('investor'); 

	const standardData = [
		{ month: 'Jan', students: 0, fs_rev: 0, ceo_rev: 0, revenue: 0, expenses: 18000, profit: -18000 },
		{ month: 'Feb', students: 6, fs_rev: 88800, ceo_rev: 7800, revenue: 96600, expenses: 28000, profit: 68600 },
		{ month: 'Mar', students: 6, fs_rev: 88800, ceo_rev: 7800, revenue: 96600, expenses: 28000, profit: 68600 },
		{ month: 'Apr', students: 0, fs_rev: 0, ceo_rev: 0, revenue: 0, expenses: 18000, profit: -18000 },
		{ month: 'May', students: 6, fs_rev: 88800, ceo_rev: 7800, revenue: 96600, expenses: 28000, profit: 68600 },
		{ month: 'Jun', students: 6, fs_rev: 88800, ceo_rev: 7800, revenue: 96600, expenses: 28000, profit: 68600 },
		{ month: 'Jul', students: 0, fs_rev: 0, ceo_rev: 0, revenue: 0, expenses: 18000, profit: -18000 },
		{ month: 'Aug', students: 6, fs_rev: 88800, ceo_rev: 7800, revenue: 96600, expenses: 28000, profit: 68600 },
		{ month: 'Sep', students: 6, fs_rev: 88800, ceo_rev: 7800, revenue: 96600, expenses: 28000, profit: 68600 },
		{ month: 'Oct', students: 0, fs_rev: 0, ceo_rev: 0, revenue: 0, expenses: 18000, profit: -18000 },
		{ month: 'Nov', students: 6, fs_rev: 88800, ceo_rev: 7800, revenue: 96600, expenses: 28000, profit: 68600 },
		{ month: 'Dec', students: 6, fs_rev: 88800, ceo_rev: 7800, revenue: 96600, expenses: 28000, profit: 68600 }
	];

	// In Investor Scenario, founder pay is already RM 0, so investor logic stays same as standard for expenses
	const investorData = standardData.map((m, i) => {
		return { ...m }; // expenses are already optimized
	});

	const projections = $derived(currentScenario === 'investor' ? investorData : standardData);

	const expenses = [
		{ name: 'Mentors (2)', amount: 8000, type: 'Fixed' },
		{ name: 'Facility Rent', amount: 5000, type: 'Fixed' },
		{ name: 'Instructor Fees', amount: 6000, type: 'Variable' },
		{ name: 'Marketing', amount: 3000, type: 'Fixed' },
		{ name: 'Events/Catering', amount: 3000, type: 'Variable' },
		{ name: 'Software/SaaS', amount: 2000, type: 'Fixed' },
		{ name: 'Course Materials', amount: 1000, type: 'Variable' }
	];

	// Calculations
	const totalRevenue = $derived(projections.reduce((sum, p) => sum + p.revenue, 0));
	const totalExpenses = $derived(projections.reduce((sum, p) => sum + p.expenses, 0));
	const totalProfit = $derived(projections.reduce((sum, p) => sum + p.profit, 0));
	const targetPayback = 90000;

	function formatCurrency(amount: number) {
		const isNegative = amount < 0;
		const formatted = new Intl.NumberFormat('en-MY', {
			style: 'currency', currency: 'MYR', maximumFractionDigits: 0
		}).format(Math.abs(amount));
		return isNegative ? `(${formatted})` : formatted;
	}

	// Interactivity state
	let selectedMetric = $state('yearly_profit');
</script>

<div class="financials-container">
	<header class="page-header">
		<div>
			<div class="scenario-badge highlight">8-Intake Model</div>
			<h1 class="page-title">High-Efficiency Financials</h1>
			<p class="page-subtitle">2-week gap cycle | 48 Students/Year | RM 428k Net Profit</p>
		</div>
		<div class="header-actions">
			<button 
				class="btn btn-primary"
				onclick={() => currentScenario = currentScenario === 'investor' ? 'standard' : 'investor'}
			>
				Switch to {currentScenario === 'investor' ? 'Standard' : 'Investor'} View
			</button>
		</div>
	</header>

	{#if currentScenario === 'investor'}
		<!-- Payback Tracker -->
		<div class="payback-tracker card">
			<div class="tracker-header">
				<div class="tracker-info">
					<h2 class="section-title">Investment Payback Status</h2>
					<span class="payback-target">Target: {formatCurrency(targetPayback)}</span>
				</div>
				<div class="tracker-milestone">
					<span>Projected Payback:</span>
					<strong>Mid-March 2026</strong>
				</div>
			</div>
			
			<div class="tracker-timeline-simple">
				<div class="timeline-months-row">
					{#each projections as p, i}
						{@const cumProfit = projections.slice(0, i+1).reduce((sum, m) => sum + m.profit, 0)}
						{@const isPaybackMonth = p.month === 'Mar'}
						<div class="m-tick">
							{#if isPaybackMonth}
								<div class="payback-flag">Debt Free 🚀</div>
							{/if}
							<span class="m-label">{p.month}</span>
							<span class="m-revenue">{formatCurrency(cumProfit)}</span>
							<div class="m-dot" class:filled={cumProfit >= targetPayback || (i < 3)} class:milestone={isPaybackMonth}></div>
						</div>
					{/each}
				</div>
				<div class="tracker-bar-bg">
					<div class="tracker-bar-fill" style="width: 22.5%"></div> <!-- Precisely aligned with March center -->
				</div>
			</div>

			<div class="tracker-labels">
				<span>RM 0 Initial</span>
				<span>{formatCurrency(targetPayback)} Cleared by Intake 2</span>
				<span>Fully Paid</span>
			</div>
		</div>
	{/if}

	<!-- Summary Stats -->
	<div class="stats-grid">
		<button class="stat-card" class:active={selectedMetric === 'monthly_profit'} onclick={() => selectedMetric = 'monthly_profit'}>
			<span class="stat-label">Avg Monthly Profit</span>
			<span class="stat-value text-green-500">{formatCurrency(totalProfit / 12)}</span>
			<span class="stat-trend">Resilient cashflow</span>
		</button>
		<button class="stat-card" class:active={selectedMetric === 'monthly_burn'} onclick={() => selectedMetric = 'monthly_burn'}>
			<span class="stat-label">Monthly Burn (Fixed)</span>
			<span class="stat-value text-red-400">RM 18,000</span>
			<span class="stat-trend">Standard overhead</span>
		</button>
		<button class="stat-card highlight" class:active={selectedMetric === 'yearly_revenue'} onclick={() => selectedMetric = 'yearly_revenue'}>
			<span class="stat-label">Yearly Revenue</span>
			<span class="stat-value">{formatCurrency(totalRevenue)}</span>
			<span class="stat-trend">8-Intake Total</span>
		</button>
		<button class="stat-card highlight" class:active={selectedMetric === 'yearly_profit'} onclick={() => selectedMetric = 'yearly_profit'}>
			<span class="stat-label">Yearly Profit</span>
			<span class="stat-value">{formatCurrency(totalProfit)}</span>
			<span class="stat-trend up">Net after all burn</span>
		</button>
	</div>

	<!-- Metric Drill-down Panel -->
	<div class="metric-drilldown card">
		{#if selectedMetric === 'monthly_profit'}
			<div class="drilldown-grid">
				<div class="drilldown-info">
					<h2 class="section-title">Intake Economic Power</h2>
					<div class="sale-item">
						<div class="sale-info"><span>Revenue per Intake (6 pax)</span><strong>RM 96,600</strong></div>
						<div class="sale-bar-bg"><div class="sale-bar-fill fs" style="width: 100%"></div></div>
					</div>
					<div class="sale-item">
						<div class="sale-info"><span>Variable Costs</span><strong class="text-red-400">- RM 10,000</strong></div>
						<div class="sale-bar-bg"><div class="sale-bar-fill ceo" style="width: 10%"></div></div>
					</div>
				</div>
				<div class="drilldown-summary">
					<div class="summary-box success">
						<span>Contribution margin</span>
						<strong>RM 86,600</strong>
					</div>
					<p class="insight-text">One intake now covers **nearly 5 months** of your RM 18k monthly burn.</p>
				</div>
			</div>
		{:else if selectedMetric === 'monthly_burn'}
			<div class="drilldown-grid">
				<div class="drilldown-info">
					<h2 class="section-title">Fixed Monthly Expenses</h2>
					<div class="expense-list-compact">
						{#each expenses.filter(e => e.type === 'Fixed') as exp}
							<div class="exp-item-mini"><span>{exp.name}</span><strong>{formatCurrency(exp.amount)}</strong></div>
						{/each}
					</div>
				</div>
				<div class="drilldown-summary">
					<div class="summary-box alert">
						<span>Fixed Burn</span>
						<strong>RM 18,000</strong>
					</div>
					<p class="insight-text">You only need **1.2 students** to cover mentors, rent, and software for the entire month.</p>
				</div>
			</div>
		{:else if selectedMetric === 'yearly_revenue'}
			<div class="drilldown-grid">
				<div class="drilldown-info">
					<h2 class="section-title">Annual Sales Composition</h2>
					<div class="sale-item">
						<div class="sale-info"><span>Full Stack (48 Students)</span><strong>RM 710,400</strong></div>
						<div class="sale-bar-bg"><div class="sale-bar-fill fs" style="width: 92%"></div></div>
					</div>
					<div class="sale-item">
						<div class="sale-info"><span>CEO AI (8 Sessions)</span><strong>RM 62,400</strong></div>
						<div class="sale-bar-bg"><div class="sale-bar-fill ceo" style="width: 8%"></div></div>
					</div>
				</div>
				<div class="drilldown-summary">
					<div class="summary-box highlight">
						<span>Yearly Revenue</span>
						<strong>RM 772,800</strong>
					</div>
					<p class="insight-text">Moving from 6 to 8 intakes per year increases annual revenue by **RM 193,200**.</p>
				</div>
			</div>
		{:else}
			<div class="drilldown-grid">
				<div class="drilldown-info">
					<h2 class="section-title">Annual Net Summary</h2>
					<div class="performance-math">
						<div class="math-row"><span>Total Revenue</span><span class="text-green-500">+ RM 772,800</span></div>
						<div class="math-row"><span>Total Burn (Fixed + Var)</span><span class="text-red-400">- RM 296,000</span></div>
						<div class="math-divider"></div>
						<div class="math-row final"><span>Annual Net Profit</span><strong>RM 476,800</strong></div>
					</div>
				</div>
				<div class="drilldown-summary">
					<div class="summary-box success">
						<span>Net Margin</span>
						<strong>62%</strong>
					</div>
					<p class="insight-text"><strong>Financial Freedom:</strong> With 2 mentors hired and a 18k monthly burn, the business generates <strong>RM 476k surplus</strong> without requiring your daily instruction.</p>
				</div>
			</div>
		{/if}
	</div>

	<div class="middle-grid">
		<!-- AI Insights -->
		<div class="insights-section card">
			<h2 class="section-title">AI Insights: Next Steps</h2>
			<div class="insights-list">
				<div class="insight-row">
					<span class="insight-label">Mentorship:</span>
					<span class="insight-text"><strong>Delegation Model Active.</strong> 2 mentors @ 8k/mo are fully funded. Your role is now purely strategic growth and positioning.</span>
				</div>
				<div class="insight-row">
					<span class="insight-label">Surplus:</span>
					<span class="insight-text"><strong>Annual Surplus: RM 476,800.</strong> You can safely draw <strong>RM 20,000/mo</strong> and still have RM 236k cash for expansion.</span>
				</div>
				<div class="insight-row">
					<span class="insight-label">Strategy 1:</span>
					<span class="insight-text"><strong>Aggressive Ad Spend.</strong> Reinvest RM 5k of monthly surplus into Meta/LinkedIn ads to ensure 6-student minimums.</span>
				</div>
				<div class="insight-row">
					<span class="insight-label">Strategy 2:</span>
					<span class="insight-text"><strong>Premium Pricing.</strong> You break even at student 1.2. Increase Early Bird to RM 16,800 immediately to test the ceiling.</span>
				</div>
			</div>
		</div>

		<!-- Monthly Log -->
		<div class="data-section card">
			<h2 class="section-title">Monthly Log</h2>
			<div class="table-container">
				<table>
					<thead><tr><th>Month</th><th>FS</th><th>Revenue</th><th>Expenses</th><th>Profit</th></tr></thead>
					<tbody>
						{#each projections as p}
							<tr>
								<td class="font-bold">{p.month}</td>
								<td>{p.students}</td>
								<td class="text-green-500">{formatCurrency(p.revenue)}</td>
								<td>{formatCurrency(p.expenses)}</td>
								<td class="font-bold" class:text-red-400={p.profit < 0}>{formatCurrency(p.profit)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<style>
	.financials-container { display: flex; flex-direction: column; gap: var(--space-6); width: 100%; }
	.card { background: var(--bg-elevated); border: 1px solid var(--border-subtle); padding: var(--space-6); border-radius: var(--radius-lg); }
	.scenario-badge { display: inline-block; padding: 2px 8px; background: #ef4444; color: white; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; border-radius: 4px; margin-bottom: 4px; }
	.scenario-badge.highlight { background: var(--color-primary); }
	.scenario-badge.investor { background: #3b82f6; }

	.payback-tracker { border-color: #3b82f6; background: rgba(59, 130, 246, 0.05); margin-bottom: var(--space-2); }
	.tracker-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-4); }
	.tracker-milestone strong { color: #3b82f6; }
	
	.tracker-timeline-simple { position: relative; padding: 0 10px; margin-bottom: var(--space-2); }
	.timeline-months-row { display: flex; justify-content: space-between; margin-bottom: 8px; position: relative; z-index: 2; }
	.m-tick { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; }
	.m-label { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); }
	.m-revenue { font-size: 0.6rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 2px; }
	.m-dot { width: 8px; height: 8px; background: var(--bg-surface); border-radius: 50%; border: 2px solid var(--border-subtle); }
	.m-dot.filled { background: #3b82f6; border-color: #3b82f6; box-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
	
	.m-dot.milestone {
		background: #2ECC71 !important;
		border-color: #2ECC71 !important;
		transform: scale(1.5);
		box-shadow: 0 0 20px rgba(46, 204, 113, 0.6);
		z-index: 10;
	}

	.payback-flag {
		position: absolute;
		top: -30px;
		background: #2ECC71;
		color: white;
		font-size: 0.6rem;
		font-weight: 800;
		padding: 2px 6px;
		border-radius: 4px;
		white-space: nowrap;
		animation: bounce 2s infinite;
	}

	.payback-flag::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -4px;
		border-width: 4px;
		border-style: solid;
		border-color: #2ECC71 transparent transparent transparent;
	}

	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
		40% {transform: translateY(-5px);}
		60% {transform: translateY(-3px);}
	}

	.tracker-bar-bg { height: 8px; background: var(--bg-surface); border-radius: var(--radius-full); overflow: hidden; margin-top: -12px; position: relative; z-index: 1; }
	.tracker-bar-fill { height: 100%; background: #3b82f6; box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); border-radius: var(--radius-full); transition: width 1s ease-out; }
	.tracker-labels { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: var(--space-4); }

	.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); }
	.page-subtitle { color: var(--text-muted); font-size: 0.875rem; }

	        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }
	        .stat-card { background: var(--bg-elevated); border: 1px solid var(--border-subtle); padding: var(--space-4); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 4px; text-align: left; cursor: pointer; transition: all 0.2s ease; border: 1px solid var(--border-subtle); color: var(--text-primary); }
	        .stat-card:hover { border-color: var(--color-primary); background: rgba(255, 255, 255, 0.02); }
	        .stat-card.active { border-color: var(--color-primary); box-shadow: 0 0 20px rgba(4, 164, 89, 0.1); background: rgba(4, 164, 89, 0.03); }
	        .stat-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
	        .stat-value { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
	        .stat-trend { font-size: 0.7rem; color: var(--text-muted); }
		.metric-drilldown { background: linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-base) 100%); border: 1px solid var(--color-primary); padding: var(--space-6); margin-top: calc(-1 * var(--space-2)); animation: slideDown 0.3s ease-out; min-height: 180px; }
	.drilldown-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-10); }
	.summary-box { background: var(--bg-surface); padding: var(--space-4); border-radius: var(--radius-lg); display: flex; flex-direction: column; border-left: 4px solid var(--text-muted); }
	.summary-box strong { font-size: 1.5rem; color: var(--text-primary); }
	.summary-box.success { border-left-color: var(--color-primary); }
	.summary-box.alert { border-left-color: #ef4444; }
	.summary-box.highlight { border-left-color: #3b82f6; }
	.insight-text { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-top: 12px; }

	.middle-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-6); }
	.section-title { font-size: 0.9rem; font-weight: 700; margin-bottom: var(--space-6); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

	.insights-list { display: flex; flex-direction: column; gap: var(--space-3); }
	.insight-row { display: flex; gap: var(--space-2); font-size: 0.85rem; line-height: 1.4; padding: var(--space-2) 0; border-bottom: 1px solid rgba(255, 255, 255, 0.03); }
	.insight-label { font-weight: 700; color: var(--text-muted); min-width: 80px; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.05em; }
	.insight-text strong { color: var(--color-primary); }

	.sale-item { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
	.sale-info { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-primary); }
	.sale-bar-bg { height: 6px; background: var(--bg-surface); border-radius: 3px; overflow: hidden; }
	.sale-bar-fill { height: 100%; border-radius: 3px; }
	.sale-bar-fill.fs { background: var(--color-primary); }
	.sale-bar-fill.ceo { background: #3b82f6; }

	.expense-list-compact { display: flex; flex-direction: column; gap: 4px; }
	.exp-item-mini { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-secondary); }
	
	.performance-math { display: flex; flex-direction: column; gap: 4px; }
	.math-row { display: flex; justify-content: space-between; font-size: 0.9rem; }
	.math-divider { height: 1px; background: var(--border-subtle); margin: 4px 0; }

	table { width: 100%; border-collapse: collapse; text-align: left; }
	th { font-size: 0.7rem; color: var(--text-muted); padding: 4px; border-bottom: 1px solid var(--border-subtle); }
	td { font-size: 0.8rem; padding: 4px; border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary); }

	.text-green-500 { color: #10B981; }
	.text-red-400 { color: #F87171; }
	.font-bold { font-weight: 700; }
	.btn { padding: 0.6rem 1.2rem; border-radius: var(--radius-md); font-weight: 600; font-size: 0.85rem; cursor: pointer; border: none; background: var(--color-primary); color: white; transition: 0.2s; }
	.btn:hover { transform: translateY(-1px); filter: brightness(1.1); }

	@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
</style>