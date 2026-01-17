import { fail } from '@sveltejs/kit';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

export const actions = {
    runScheduler: async () => {
        try {
            const schedulerPath = path.resolve('/Users/jv/Coding/code-zero/projects/gizmo-persona-writer/scripts/scheduler.ts');
            const projectPath = path.resolve('/Users/jv/Coding/code-zero/projects/gizmo-persona-writer');
            
            // Execute the scheduler script
            const { stdout, stderr } = await execPromise(`cd ${projectPath} && npx tsx ${schedulerPath}`);
            
            console.log('Scheduler Output:', stdout);
            if (stderr) console.error('Scheduler Error:', stderr);

            return { success: true, message: 'Gizmo staff is now active and writing.' };
        } catch (error: any) {
            console.error('Failed to wake up staff:', error);
            return fail(500, { message: 'Failed to wake up staff. Check server logs.' });
        }
    }
};
