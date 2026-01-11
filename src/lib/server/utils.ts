// Generate a random password
export function generatePassword(length = 12): string {
	const lowercase = 'abcdefghijklmnopqrstuvwxyz';
	const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numbers = '0123456789';
	const special = '!@#$%&*';
	const allChars = lowercase + uppercase + numbers + special;

	// Ensure at least one of each type
	let password = '';
	password += lowercase[Math.floor(Math.random() * lowercase.length)];
	password += uppercase[Math.floor(Math.random() * uppercase.length)];
	password += numbers[Math.floor(Math.random() * numbers.length)];
	password += special[Math.floor(Math.random() * special.length)];

	// Fill the rest
	for (let i = 4; i < length; i++) {
		password += allChars[Math.floor(Math.random() * allChars.length)];
	}

	// Shuffle the password
	return password.split('').sort(() => Math.random() - 0.5).join('');
}

// Generate username from email
export function generateUsername(email: string): string {
	const localPart = email.split('@')[0];
	// Remove special characters, keep alphanumeric and underscores
	return localPart.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
}

// Validate username format
export function isValidUsername(username: string): boolean {
	return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}
