import { vi } from 'vitest';

// Mock Firebase environment variables for testing
vi.mock('$env/static/public', () => ({
	PUBLIC_FIREBASE_API_KEY: 'test-api-key',
	PUBLIC_FIREBASE_AUTH_DOMAIN: 'test.firebaseapp.com',
	PUBLIC_FIREBASE_PROJECT_ID: 'test-project-id',
	PUBLIC_FIREBASE_STORAGE_BUCKET: 'test.appspot.com',
	PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '123456789',
	PUBLIC_FIREBASE_APP_ID: 'test-app-id',
}));

// Mock Firebase modules to avoid actual Firebase initialization during tests
vi.mock('firebase/app', () => ({
	initializeApp: vi.fn(),
	getApps: vi.fn(() => []),
}));

vi.mock('firebase/firestore', () => ({
	getFirestore: vi.fn(() => ({})),
	collection: vi.fn(),
	doc: vi.fn(),
	getDoc: vi.fn(),
	getDocs: vi.fn(),
	addDoc: vi.fn(),
	updateDoc: vi.fn(),
	deleteDoc: vi.fn(),
	query: vi.fn(),
	where: vi.fn(),
	orderBy: vi.fn(),
	limit: vi.fn(),
	onSnapshot: vi.fn(),
	serverTimestamp: vi.fn(() => new Date()),
}));

vi.mock('firebase/auth', () => ({
	getAuth: vi.fn(() => ({})),
}));
