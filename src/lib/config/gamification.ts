// XP thresholds for each level
export const LEVEL_THRESHOLDS = [
	0,      // Level 1
	500,    // Level 2
	1200,   // Level 3
	2100,   // Level 4
	3200,   // Level 5
	4500,   // Level 6
	6000,   // Level 7
	7700,   // Level 8
	9600,   // Level 9
	12000,  // Level 10
];

// Default achievements to seed
export const DEFAULT_ACHIEVEMENTS = [
	{
		id: 'first_lesson',
		name: 'First Steps',
		icon: '👶',
		description: 'Complete your first lesson',
		xpBonus: 50
	},
	{
		id: 'week_complete',
		name: 'Week Warrior',
		icon: '⚔️',
		description: 'Complete an entire week',
		xpBonus: 200
	},
	{
		id: 'course_complete',
		name: 'Graduate',
		icon: '🎓',
		description: 'Complete an entire course',
		xpBonus: 500
	},
	{
		id: 'five_lessons',
		name: 'Getting Serious',
		icon: '💪',
		description: 'Complete 5 lessons',
		xpBonus: 100
	},
	{
		id: 'ten_lessons',
		name: 'Dedicated Learner',
		icon: '📚',
		description: 'Complete 10 lessons',
		xpBonus: 150
	},
	{
		id: 'level_5',
		name: 'Rising Star',
		icon: '⭐',
		description: 'Reach Level 5',
		xpBonus: 250
	},
	{
		id: 'level_10',
		name: 'Master Builder',
		icon: '🏆',
		description: 'Reach Level 10',
		xpBonus: 500
	},
];

// Calculate level from XP
export function calculateLevel(xp: number): number {
	for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
		if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
	}
	return 1;
}

// Get XP progress within current level
export function getLevelProgress(xp: number, level: number): { current: number; needed: number; percentage: number } {
	const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
	const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold + 1000;
	const xpInLevel = xp - currentThreshold;
	const xpNeeded = nextThreshold - currentThreshold;

	return {
		current: xpInLevel,
		needed: xpNeeded,
		percentage: Math.min((xpInLevel / xpNeeded) * 100, 100)
	};
}
