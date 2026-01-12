<script lang="ts">
	// Scenario State
	let currentScenario = $state('investor'); 

	const worseCaseData = [
		{ month: 'Jan', students: 0, revenue: 0, expenses: 22000, profit: -22000 },
		{ month: 'Feb', students: 6, revenue: 96600, expenses: 32000, profit: 64600 },
		{ month: 'Mar', students: 0, revenue: 0, expenses: 22000, profit: -22000 },
		{ month: 'Apr', students: 6, revenue: 96600, expenses: 32000, profit: 64600 },
		{ month: 'May', students: 0, revenue: 0, expenses: 22000, profit: -22000 },
		{ month: 'Jun', students: 6, revenue: 96600, expenses: 32000, profit: 64600 },
		{ month: 'Jul', students: 0, revenue: 0, expenses: 22000, profit: -22000 },
		{ month: 'Aug', students: 6, revenue: 96600, expenses: 32000, profit: 64600 },
		{ month: 'Sep', students: 0, revenue: 0, expenses: 22000, profit: -22000 },
		{ month: 'Oct', students: 6, revenue: 96600, expenses: 32000, profit: 64600 },
		{ month: 'Nov', students: 0, revenue: 0, expenses: 22000, profit: -22000 },
		{ month: 'Dec', students: 6, revenue: 96600, expenses: 32000, profit: 64600 }
	];

	const investorData = [
		{ month: 'Jan', students: 0, revenue: 0, expenses: 10000, profit: -10000 }, 
		{ month: 'Feb', students: 6, revenue: 96600, expenses: 20000, profit: 76600 },
		{ month: 'Mar', students: 0, revenue: 0, expenses: 10000, profit: -10000 },
		{ month: 'Apr', students: 6, revenue: 96600, expenses: 20000, profit: 76600 },
		{ month: 'May', students: 0, revenue: 0, expenses: 10000, profit: -10000 },
		{ month: 'Jun', students: 6, revenue: 96600, expenses: 20000, profit: 76600 },
		{ month: 'Jul', students: 0, revenue: 0, expenses: 22000, profit: -22000 }, 
		{ month: 'Aug', students: 6, revenue: 96600, expenses: 32000, profit: 64600 },
		{ month: 'Sep', students: 0, revenue: 0, expenses: 22000, profit: -22000 },
		{ month: 'Oct', students: 6, revenue: 96600, expenses: 32000, profit: 64600 },
		{ month: 'Nov', students: 0, revenue: 0, expenses: 22000, profit: -22000 },
		{ month: 'Dec', students: 6, revenue: 96600, expenses: 32000, profit: 64600 }
	];

	const projections = $derived(currentScenario === 'investor' ? investorData : worseCaseData);

	const expenses = [
		{ name: 'Core Team', amount: 12000, type: 'Fixed' },
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

	// Payback tracking
	const targetPayback = 90000;
	const currentPayback = $derived.by(() => {
		let total = 0;
		for (const p of projections) {
			if (p.profit > 0) total += p.profit;
			if (total >= targetPayback) return targetPayback;
		}
		return total;
	});
	const paybackMonth = $derived.by(() => {
		let total = 0;
		for (const p of projections) {
			if (p.profit > 0) total += p.profit;
			if (total >= targetPayback) return p.month;
		}
		return 'June'; 
	});

	function formatCurrency(amount: number) {
		const isNegative = amount < 0;
		const formatted = new Intl.NumberFormat('en-MY', {
			style: 'currency', currency: 'MYR', maximumFractionDigits: 0
		}).format(Math.abs(amount));
		return isNegative ? `(${formatted})` : formatted;
	}

	// Interactivity state
	let selectedMetric = $state('monthly_burn');
</script>

<div class="financials-container">
	<header class="page-header">
		<div>
			<div class="scenario-badge" class:investor={currentScenario === 'investor'}>
				{currentScenario === 'investor' ? 'Investor Scenario' : 'Worse Case Scenario'}
			</div>
			<h1 class="page-title">Financial Projections 2026</h1>
			<p class="page-subtitle">
				{#if currentScenario === 'investor'}
					Goal: RM 90k Payback | Founder Pay: RM 0 until Debt Free
				{:else}
					Conservative baseline: 6 students every 2 months
				{/if}
			</p>
		</div>
		<div class="header-actions">
			<button 
				class="btn btn-primary"
				onclick={() => currentScenario = currentScenario === 'investor' ? 'worse' : 'investor'}
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
					<h2 class="section-title">Debt Payback Progress</h2>
					<span class="payback-target">Target: {formatCurrency(targetPayback)}</span>
				</div>
				<div class="tracker-milestone">
					<span>Projected Payback:</span>
					<strong>April 2026</strong>
				</div>
			</div>
			
			<div class="tracker-timeline-simple">
				<div class="timeline-months-row">
					{#each projections as p}
						<div class="m-tick">
							<span class="m-label">{p.month}</span>
							<div class="m-dot" class:filled={['Jan', 'Feb', 'Mar', 'Apr'].includes(p.month)}></div>
						</div>
					{/each}
				</div>
				<div class="tracker-bar-bg">
					<div class="tracker-bar-fill" style="width: 33.3%"></div> <!-- Ends at April (4th month of 12 = 33.3%) -->
				</div>
			</div>

			<div class="tracker-labels">
				<span>RM 0 Initial</span>
				<span>{formatCurrency(targetPayback)} Cleared in 4 Months</span>
				<span>Fully Paid</span>
			</div>
		</div>
	{/if}

	<!-- Summary Stats -->
	<div class="stats-grid">
		<button 
			class="stat-card" 
			class:active={selectedMetric === 'monthly_profit'}
			onclick={() => selectedMetric = 'monthly_profit'}
		>
			<span class="stat-label">Monthly Profit (Active)</span>
			<span class="stat-value text-green-500">{currentScenario === 'investor' ? 'RM 76,600' : 'RM 64,600'}</span>
			<span class="stat-trend">Click for sales breakdown</span>
		</button>
		<button 
			class="stat-card"
			class:active={selectedMetric === 'monthly_burn'}
			onclick={() => selectedMetric = 'monthly_burn'}
		>
			<span class="stat-label">Monthly Burn (Fixed)</span>
			<span class="stat-value text-red-400">{currentScenario === 'investor' ? 'RM 10,000' : 'RM 22,000'}</span>
			<span class="stat-trend">Standard overhead</span>
		</button>
		<button 
			class="stat-card highlight"
			class:active={selectedMetric === 'yearly_revenue'}
			onclick={() => selectedMetric = 'yearly_revenue'}
		>
			<span class="stat-label">Yearly Revenue</span>
			<span class="stat-value">{formatCurrency(totalRevenue)}</span>
			<span class="stat-trend">12-Month Projection</span>
		</button>
		<button 
			class="stat-card highlight"
			class:active={selectedMetric === 'yearly_profit'}
			onclick={() => selectedMetric = 'yearly_profit'}
		>
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
					<h2 class="section-title">Active Month Revenue Breakdown</h2>
					<div class="sale-item">
						<div class="sale-info"><span>Full Stack Web Dev (6 Students)</span><strong>RM 88,800</strong></div>
						<div class="sale-bar-bg"><div class="sale-bar-fill fs" style="width: 92%"></div></div>
					</div>
					<div class="sale-item">
						<div class="sale-info"><span>CEO AI Command (1 Session)</span><strong>RM 7,800</strong></div>
						<div class="sale-bar-bg"><div class="sale-bar-fill ceo" style="width: 8%"></div></div>
					</div>
				</div>
				<div class="drilldown-summary">
					<div class="summary-box success">
						<span>Active Revenue</span>
						<strong>RM 96,600</strong>
					</div>
					<p class="insight-text">Every student added beyond 6 is pure profit as fixed costs are already covered.</p>
				</div>
			</div>
		{:else if selectedMetric === 'monthly_burn'}
			<div class="drilldown-grid">
				<div class="drilldown-info">
					<h2 class="section-title">Monthly Fixed Expense Structure</h2>
					<div class="expense-list-compact">
						{#each expenses.filter(e => e.type === 'Fixed') as exp}
							<div class="exp-item-mini">
								<span>{exp.name}</span>
								<strong>{formatCurrency(exp.amount)}</strong>
							</div>
						{/each}
					</div>
				</div>
				<div class="drilldown-summary">
					<div class="summary-box alert">
						<span>Total Monthly Burn</span>
						<strong>{currentScenario === 'investor' ? 'RM 10,000' : 'RM 22,000'}</strong>
					</div>
					<p class="insight-text">In Investor mode, founder pay is RM 0, reducing fixed burn by 55% during payback phase.</p>
				</div>
			</div>
		{:else if selectedMetric === 'yearly_revenue'}
			<div class="drilldown-grid">
				<div class="drilldown-info">
					<h2 class="section-title">12-Month Sales Composition</h2>
					<div class="sale-item">
						<div class="sale-info"><span>Full Stack Total</span><strong>RM 532,800</strong></div>
						<div class="sale-bar-bg"><div class="sale-bar-fill fs" style="width: 92%"></div></div>
					</div>
					<div class="sale-item">
						<div class="sale-info"><span>CEO AI Total</span><strong>RM 46,800</strong></div>
						<div class="sale-bar-bg"><div class="sale-bar-fill ceo" style="width: 8%"></div></div>
					</div>
				</div>
				<div class="drilldown-summary">
					<div class="summary-box highlight">
						<span>Projected Yearly Rev</span>
						<strong>RM 579,600</strong>
					</div>
					<p class="insight-text">FS is the engine. CEO AI covers 2 months of facility rent every time one session is sold.</p>
				</div>
			</div>
		{:else}
			<div class="drilldown-grid">
				<div class="drilldown-info">
					<h2 class="section-title">Annual Net Performance</h2>
					<div class="performance-math">
						<div class="math-row"><span>Total Projected Revenue</span><span class="text-green-500">+ RM 579,600</span></div>
						<div class="math-row"><span>Total Annual Expenses</span><span class="text-red-400">- RM 324,000</span></div>
						<div class="math-divider"></div>
						<div class="math-row final"><span>Net Projected Profit</span><strong>RM 255,600</strong></div>
					</div>
				</div>
				<div class="drilldown-summary">
					<div class="summary-box success">
						<span>Annual Net Margin</span>
						<strong>44%</strong>
					</div>
					<p class="insight-text"><strong>Affordability:</strong> You can safely draw RM 15,000/mo after debt payback is complete.</p>
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
					<span class="insight-label">Salary:</span>
					<span class="insight-text"><strong>Safe Founder Draw: RM 15,000/mo.</strong> Resumes in July 2026. This covers a premium lifestyle.</span>
				</div>
				<div class="insight-row">
					<span class="insight-label">Strategy 1:</span>
					<span class="insight-text"><strong>Aggressive Ad Spend.</strong> Reinvest RM 5k of profit into Meta/LinkedIn ads to scale beyond 6 students.</span>
				</div>
				<div class="insight-row">
					<span class="insight-label">Strategy 2:</span>
					<span class="insight-text"><strong>Test Pricing Ceiling.</strong> Increase Early Bird to RM 16,800 immediately.</span>
				</div>
				<div class="insight-row">
					<span class="insight-label">Strategy 3:</span>
					<span class="insight-text"><strong>Automate CEO Delivery.</strong> Record the CEO Command as a workshop to scale volume.</span>
				</div>
			</div>
		</div>

		<!-- Sales by Course (Visual) -->
		<div class="sales-section card">
			<h2 class="section-title">Total Sales (Units)</h2>
			<div class="sales-breakdown">
				<div class="sale-item">
					<div class="sale-info"><span>Full Stack Web Dev</span><span class="course-units">36 units</span></div>
					<div class="sale-bar-bg"><div class="sale-bar-fill fs" style="width: 92%"></div></div>
				</div>
				<div class="sale-item">
					<div class="sale-info"><span>CEO AI Command</span><span class="course-units">6 units</span></div>
					<div class="sale-bar-bg"><div class="sale-bar-fill ceo" style="width: 8%"></div></div>
				</div>
			</div>
		</div>
	</div>

	<div class="bottom-grid">
		<div class="data-section card">
			<h2 class="section-title">Monthly Log</h2>
			<div class="table-container">
				<table>
					<thead><tr><th>Month</th><th>FS</th><th>CEO</th><th>Revenue</th><th>Profit</th></tr></thead>
					<tbody>
						{#each projections as p}
							<tr>
								<td class="font-bold">{p.month}</td>
								<td>{p.students}</td>
								<td>{p.revenue > 0 ? 1 : 0}</td>
								<td class="text-green-500">{formatCurrency(p.revenue)}</td>
								<td class="font-bold" class:text-red-400={p.profit < 0}>{formatCurrency(p.profit)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="expense-section card">
			<h2 class="section-title">Annual Overview</h2>
			<div class="expense-list">
				<div class="expense-item"><span>Total Revenue</span><strong>{formatCurrency(totalRevenue)}</strong></div>
				<div class="expense-item"><span>Total Burn</span><strong>{formatCurrency(totalExpenses)}</strong></div>
				<div class="expense-divider"></div>
				<div class="expense-item total"><span>Yearly Profit</span><strong>{formatCurrency(totalProfit)}</strong></div>
			</div>
		</div>
	</div>
</div>

<style>
	.financials-container { display: flex; flex-direction: column; gap: var(--space-6); width: 100%; }
	.card { background: var(--bg-elevated); border: 1px solid var(--border-subtle); padding: var(--space-6); border-radius: var(--radius-lg); }
	.scenario-badge { display: inline-block; padding: 2px 8px; background: #ef4444; color: white; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; border-radius: 4px; margin-bottom: 4px; }
	.scenario-badge.investor { background: #3b82f6; }

	.payback-tracker { border-color: #3b82f6; background: rgba(59, 130, 246, 0.05); margin-bottom: var(--space-2); }
	.tracker-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: var(--space-4); }
	
	/* Simple Timeline UI */
	.tracker-timeline-simple {
		position: relative;
		padding: 0 10px;
		margin-bottom: var(--space-2);
	}

	.timeline-months-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
		position: relative;
		z-index: 2;
	}

	.m-tick {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		flex: 1;
	}

	.m-label {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--text-muted);
	}

	.m-dot {
		width: 8px;
		height: 8px;
		background: var(--bg-surface);
		border-radius: 50%;
		border: 2px solid var(--border-subtle);
	}

	.m-dot.filled {
		background: #3b82f6;
		border-color: #3b82f6;
		box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
	}

	.tracker-bar-bg { height: 8px; background: var(--bg-surface); border-radius: var(--radius-full); overflow: hidden; margin-top: -12px; position: relative; z-index: 1; }
	.tracker-bar-fill { height: 100%; background: #3b82f6; box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); border-radius: var(--radius-full); transition: width 1s ease-out; }
	.tracker-labels { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: var(--space-4); }

	.page-title { font-size: 1.5rem; font-weight: 700; color: var(--text-primary); }
	.page-subtitle { color: var(--text-muted); font-size: 0.875rem; }

	.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }
	.stat-card { background: var(--bg-elevated); border: 1px solid var(--border-subtle); padding: var(--space-4); border-radius: var(--radius-lg); display: flex; flex-direction: column; gap: 4px; text-align: left; cursor: pointer; transition: all 0.2s ease; border: 1px solid var(--border-subtle); }
	.stat-card:hover { border-color: var(--color-primary); background: rgba(255, 255, 255, 0.02); }
	.stat-card.active { border-color: var(--color-primary); box-shadow: 0 0 20px rgba(4, 164, 89, 0.1); background: rgba(4, 164, 89, 0.03); }
	.stat-label { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
	.stat-value { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
	.stat-trend { font-size: 0.7rem; color: var(--text-muted); }

	.metric-drilldown { background: linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-base) 100%); border: 1px solid var(--color-primary); padding: var(--space-6); margin-top: calc(-1 * var(--space-2)); animation: slideDown 0.3s ease-out; min-height: 200px; }
	.drilldown-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-10); align-items: start; }
	.summary-box { background: var(--bg-surface); padding: var(--space-4); border-radius: var(--radius-lg); display: flex; flex-direction: column; border-left: 4px solid var(--text-muted); }
	.summary-box strong { font-size: 1.5rem; color: var(--text-primary); }
	.summary-box.alert { border-left-color: #ef4444; }
	.summary-box.highlight { border-left-color: #3b82f6; }
	.summary-box.success { border-left-color: var(--color-primary); }
	.insight-text { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; padding: var(--space-3); background: rgba(255, 255, 255, 0.02); border-radius: var(--radius-md); }
	.expense-list-compact { display: flex; flex-direction: column; gap: var(--space-2); }
	.exp-item-mini { display: flex; justify-content: space-between; font-size: 0.85rem; padding: var(--space-1) 0; border-bottom: 1px solid rgba(255, 255, 255, 0.03); }
	.performance-math { display: flex; flex-direction: column; gap: var(--space-2); }
	.math-row { display: flex; justify-content: space-between; font-size: 0.9rem; }
	.math-divider { height: 1px; background: var(--border-subtle); margin: var(--space-2) 0; }
	.math-row.final { font-size: 1.1rem; color: var(--text-primary); }

	.middle-grid, .bottom-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-6); }
	.section-title { font-size: 0.9rem; font-weight: 700; margin-bottom: var(--space-6); color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

	.insights-list { display: flex; flex-direction: column; gap: var(--space-3); }
	.insight-row { display: flex; gap: var(--space-2); font-size: 0.85rem; line-height: 1.4; padding: var(--space-2) 0; border-bottom: 1px solid rgba(255, 255, 255, 0.03); }
	.insight-label { font-weight: 700; color: var(--text-muted); min-width: 80px; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.05em; }
	.insight-text strong { color: var(--color-primary); }

	.sales-breakdown { display: flex; flex-direction: column; gap: var(--space-6); }
	.sale-item { display: flex; flex-direction: column; gap: var(--space-2); }
	.sale-info { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-primary); }
	.sale-bar-bg { height: 8px; background: var(--bg-surface); border-radius: var(--radius-full); overflow: hidden; }
	.sale-bar-fill { height: 100%; border-radius: var(--radius-full); }
	.sale-bar-fill.fs { background: var(--color-primary); }
	.sale-bar-fill.ceo { background: #3b82f6; }
	.sale-amount { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-top: 2px; }

	.expense-list { display: flex; flex-direction: column; gap: var(--space-3); }
	.expense-item { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-secondary); }
	.expense-divider { height: 1px; background: var(--border-subtle); margin: var(--space-2) 0; }
	.expense-item total { color: var(--text-primary); font-size: 1rem; }

	table { width: 100%; border-collapse: collapse; text-align: left; }
	th { font-size: 0.7rem; color: var(--text-muted); padding: var(--space-2); border-bottom: 1px solid var(--border-subtle); text-transform: uppercase; }
	td { font-size: 0.85rem; padding: var(--space-2); border-bottom: 1px solid var(--border-subtle); color: var(--text-secondary); }

	.text-green-500 { color: #10B981; }
	.text-red-400 { color: #F87171; }
	.font-bold { font-weight: 700; }
	.btn { padding: 0.6rem 1.2rem; border-radius: var(--radius-md); font-weight: 600; font-size: 0.85rem; cursor: pointer; border: none; background: var(--color-primary); color: white; transition: 0.2s; }
	.btn-outline { background: transparent; border: 1px solid var(--border-default); color: var(--text-primary); }
	.btn:hover { filter: brightness(1.1); transform: translateY(-1px); }

	@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
</style>
