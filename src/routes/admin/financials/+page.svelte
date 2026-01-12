<script lang="ts">
	const projections = [
		{ month: 'Jan', students: 10, revenue: 148000, expenses: 45000, profit: 103000 },
		{ month: 'Feb', students: 12, revenue: 177600, expenses: 48000, profit: 129600 },
		{ month: 'Mar', students: 12, revenue: 215600, expenses: 50000, profit: 165600 },
		{ month: 'Apr', students: 15, revenue: 260000, expenses: 55000, profit: 205000 },
		{ month: 'May', students: 15, revenue: 260000, expenses: 55000, profit: 205000 },
		{ month: 'Jun', students: 20, revenue: 350000, expenses: 65000, profit: 285000 },
		{ month: 'Jul', students: 20, revenue: 350000, expenses: 65000, profit: 285000 },
		{ month: 'Aug', students: 24, revenue: 420000, expenses: 75000, profit: 345000 },
		{ month: 'Sep', students: 24, revenue: 420000, expenses: 75000, profit: 345000 },
		{ month: 'Oct', students: 30, revenue: 520000, expenses: 90000, profit: 430000 },
		{ month: 'Nov', students: 30, revenue: 520000, expenses: 90000, profit: 430000 },
		{ month: 'Dec', students: 30, revenue: 520000, expenses: 90000, profit: 430000 }
	];

	const totalRevenue = projections.reduce((sum, p) => sum + p.revenue, 0);
	const totalExpenses = projections.reduce((sum, p) => sum + p.expenses, 0);
	const totalProfit = projections.reduce((sum, p) => sum + p.profit, 0);
	const maxRevenue = Math.max(...projections.map(p => p.revenue));

	function formatCurrency(amount: number) {
		return new Intl.NumberFormat('en-MY', {
			style: 'currency',
			currency: 'MYR',
			maximumFractionDigits: 0
		}).format(amount);
	}
</script>

<div class="financials-container">
	<header class="page-header">
		<div>
			<h1 class="page-title">Financial Projections 2026</h1>
			<p class="page-subtitle">Strategic growth and revenue forecast</p>
		</div>
		<div class="header-actions">
			<button class="btn btn-outline">Export PDF</button>
			<button class="btn btn-primary">Update Targets</button>
		</div>
	</header>

	<!-- Summary Stats -->
	<div class="stats-grid">
		<div class="stat-card">
			<span class="stat-label">Total Revenue</span>
			<span class="stat-value">{formatCurrency(totalRevenue)}</span>
			<span class="stat-trend up">↑ 24% vs last year</span>
		</div>
		<div class="stat-card">
			<span class="stat-label">Total Expenses</span>
			<span class="stat-value">{formatCurrency(totalExpenses)}</span>
			<span class="stat-trend">Managed growth</span>
		</div>
		<div class="stat-card highlight">
			<span class="stat-label">Projected Net Profit</span>
			<span class="stat-value">{formatCurrency(totalProfit)}</span>
			<span class="stat-trend up">↑ 81% margin</span>
		</div>
		<div class="stat-card">
			<span class="stat-label">Total Students</span>
			<span class="stat-value">242</span>
			<span class="stat-trend up">↑ 15% capacity</span>
		</div>
	</div>

	<!-- Chart Area -->
	<div class="chart-section">
		<div class="chart-header">
			<h2 class="chart-title">Revenue & Profit Forecast</h2>
			<div class="chart-legend">
				<div class="legend-item"><span class="dot revenue"></span> Revenue</div>
				<div class="legend-item"><span class="dot profit"></span> Profit</div>
			</div>
		</div>
		<div class="bar-chart">
			{#each projections as p}
				<div class="bar-group">
					<div class="bar-wrapper">
						<div class="bar revenue-bar" style="height: {(p.revenue / maxRevenue) * 100}%">
							<span class="tooltip">{formatCurrency(p.revenue)}</span>
						</div>
						<div class="bar profit-bar" style="height: {(p.profit / maxRevenue) * 100}%">
							<span class="tooltip">{formatCurrency(p.profit)}</span>
						</div>
					</div>
					<span class="bar-label">{p.month}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Detailed Data -->
	<div class="data-section">
		<h2 class="section-title">Monthly Breakdown</h2>
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Month</th>
						<th>Students</th>
						<th>Revenue</th>
						<th>Expenses</th>
						<th>Profit</th>
						<th>Margin</th>
					</tr>
				</thead>
				<tbody>
					{#each projections as p}
						<tr>
							<td class="font-bold">{p.month}</td>
							<td>{p.students}</td>
							<td class="text-green-500">{formatCurrency(p.revenue)}</td>
							<td class="text-red-400">{formatCurrency(p.expenses)}</td>
							<td class="font-bold text-white">{formatCurrency(p.profit)}</td>
							<td>{Math.round((p.profit / p.revenue) * 100)}%</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.financials-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.page-title {
		font-size: 1.875rem;
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.page-subtitle {
		color: var(--text-muted);
	}

	.header-actions {
		display: flex;
		gap: var(--space-3);
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: var(--space-4);
	}

	.stat-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		padding: var(--space-6);
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.stat-card.highlight {
		border-color: var(--color-primary);
		background: rgba(4, 164, 89, 0.05);
	}

	.stat-label {
		font-size: 0.875rem;
		color: var(--text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stat-trend {
		font-size: 0.75rem;
		color: var(--text-muted);
	}

	.stat-trend.up {
		color: #10B981;
	}

	/* Chart */
	.chart-section {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		padding: var(--space-8);
		border-radius: var(--radius-xl);
	}

	.chart-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-12);
	}

	.chart-title {
		font-size: 1.25rem;
		font-weight: 600;
	}

	.chart-legend {
		display: flex;
		gap: var(--space-6);
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 3px;
	}

	.dot.revenue { background: rgba(4, 164, 89, 0.6); }
	.dot.profit { background: var(--color-primary); }

	.bar-chart {
		height: 300px;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-2);
		padding-top: var(--space-8);
	}

	.bar-group {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-4);
		height: 100%;
	}

	.bar-wrapper {
		flex: 1;
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 2px;
		position: relative;
	}

	.bar {
		width: 12px;
		border-radius: 4px 4px 0 0;
		transition: all 0.3s ease;
		position: relative;
		cursor: pointer;
	}

	.revenue-bar {
		background: rgba(4, 164, 89, 0.3);
		border: 1px solid rgba(4, 164, 89, 0.5);
	}

	.profit-bar {
		background: var(--color-primary);
		box-shadow: 0 4px 12px rgba(4, 164, 89, 0.2);
	}

	.bar:hover {
		filter: brightness(1.2);
		transform: scaleX(1.1);
	}

	.tooltip {
		position: absolute;
		top: -30px;
		left: 50%;
		transform: translateX(-50%);
		background: #000;
		color: #fff;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.7rem;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s;
		z-index: 10;
	}

	.bar:hover .tooltip {
		opacity: 1;
	}

	.bar-label {
		font-size: 0.75rem;
		color: var(--text-muted);
		font-weight: 500;
	}

	/* Table */
	.data-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 600;
	}

	.table-container {
		background: var(--bg-elevated);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		text-align: left;
	}

	th {
		background: rgba(255, 255, 255, 0.02);
		padding: var(--space-4);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-muted);
		border-bottom: 1px solid var(--border-subtle);
	}

	td {
		padding: var(--space-4);
		font-size: 0.875rem;
		border-bottom: 1px solid var(--border-subtle);
		color: var(--text-secondary);
	}

	tr:last-child td {
		border-bottom: none;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		border-radius: var(--radius-md);
		font-weight: 600;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
		border: none;
	}

	.btn-outline {
		background: transparent;
		border: 1px solid var(--border-default);
		color: var(--text-primary);
	}

	.text-green-500 { color: #10B981; }
	.text-red-400 { color: #F87171; }
	.font-bold { font-weight: 700; }
	.text-white { color: white; }
</style>
