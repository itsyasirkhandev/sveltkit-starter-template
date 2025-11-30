const DEFAULT_HOST = process.env.DEV_HOST ?? 'http://localhost';
const DEFAULT_PORT = process.env.DEV_PORT ?? '5173';

const baseUrlFromArg = process.argv[2];
const baseUrl = baseUrlFromArg || `${DEFAULT_HOST}:${DEFAULT_PORT}`;

// Update this list as you add more important routes.
const ROUTES = ['/', '/login', '/dashboard', '/todos'];

const TIMEOUT_MS = Number(process.env.DEV_CHECK_TIMEOUT ?? '5000');

function nowMs() {
	if (typeof performance !== 'undefined' && 'now' in performance) {
		return performance.now();
	}
	return Date.now();
}

async function checkRoute(path) {
	const url = new URL(path, baseUrl).toString();
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
	const start = nowMs();

	try {
		const res = await fetch(url, { signal: controller.signal });
		const duration = Math.round(nowMs() - start);

		if (!res.ok) {
			const text = await res.text().catch(() => '');
			console.error(
				`[RUNTIME-CHECK-FAIL] GET ${path} -> ${res.status} in ${duration}ms`,
			);
			if (text) {
				console.error(
					`[RUNTIME-CHECK-DETAIL] First 200 chars of body: ${text.slice(0, 200)}`,
				);
			}
			return false;
		}

		console.log(
			`[RUNTIME-CHECK-OK] GET ${path} -> ${res.status} in ${duration}ms`,
		);
		return true;
	} catch (error) {
		const duration = Math.round(nowMs() - start);
		const message =
			error && typeof error === 'object' && 'message' in error
				? String(error.message)
				: String(error);
		console.error(
			`[RUNTIME-CHECK-FAIL] GET ${path} -> network error after ${duration}ms: ${message}`,
		);
		return false;
	} finally {
		clearTimeout(timeoutId);
	}
}

async function main() {
	console.log(
		`[RUNTIME-CHECK] Checking dev server at ${baseUrl} for routes: ${ROUTES.join(
			', ',
		)}`,
	);

	if (typeof fetch === 'undefined') {
		console.error(
			'[RUNTIME-CHECK-FAIL] global fetch is not available in this Node runtime.',
		);
		process.exitCode = 1;
		return;
	}

	let allOk = true;
	for (const path of ROUTES) {
		const ok = await checkRoute(path);
		if (!ok) allOk = false;
	}

	if (!allOk) {
		process.exitCode = 1;
	}
}

void main();
