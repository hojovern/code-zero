import { handle as authHandle } from "./auth"
import { sequence } from "@sveltejs/kit/hooks"
import type { Handle } from "@sveltejs/kit"

export const handle: Handle = sequence(authHandle)
