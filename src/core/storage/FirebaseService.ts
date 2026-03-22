import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import type { GameSave } from '@core/types';
import { firebaseConfig } from '@/config/firebase';

// ============================================================
// FirebaseService — abstraction layer over Firebase
// Can be swapped for Supabase, Appwrite, etc.
// ============================================================

class FirebaseServiceClass {
  private app: FirebaseApp | null = null;
  private auth: Auth | null = null;
  private db: Firestore | null = null;
  private _user: User | null = null;
  private _initialized = false;

  get user() { return this._user; }
  get userId() { return this._user?.uid || null; }
  get initialized() { return this._initialized; }

  async init() {
    if (this._initialized) return;

    try {
      this.app = initializeApp(firebaseConfig);
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);

      // Sign in anonymously
      await signInAnonymously(this.auth);

      // Listen for auth changes
      onAuthStateChanged(this.auth, (user) => {
        this._user = user;
      });

      this._user = this.auth.currentUser;
      this._initialized = true;
    } catch (error) {
      console.warn('[Firebase] Init failed — running in offline mode:', error);
    }
  }

  // --- Game Saves ---

  async saveSave(storyId: string, save: GameSave): Promise<void> {
    if (!this.db || !this._user) return;
    try {
      const ref = doc(this.db, 'users', this._user.uid, 'saves', storyId);
      await setDoc(ref, {
        ...save,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.warn('[Firebase] Save failed:', error);
    }
  }

  async loadSave(storyId: string): Promise<GameSave | null> {
    if (!this.db || !this._user) return null;
    try {
      const ref = doc(this.db, 'users', this._user.uid, 'saves', storyId);
      const snap = await getDoc(ref);
      return snap.exists() ? (snap.data() as GameSave) : null;
    } catch (error) {
      console.warn('[Firebase] Load failed:', error);
      return null;
    }
  }

  async listSaves(): Promise<GameSave[]> {
    if (!this.db || !this._user) return [];
    try {
      const ref = collection(this.db, 'users', this._user.uid, 'saves');
      const snap = await getDocs(ref);
      return snap.docs.map((d) => d.data() as GameSave);
    } catch {
      return [];
    }
  }

  // --- User Profile ---

  async saveProfile(data: Record<string, unknown>) {
    if (!this.db || !this._user) return;
    const ref = doc(this.db, 'users', this._user.uid);
    await setDoc(ref, { profile: data }, { merge: true });
  }

  async saveSettings(data: Record<string, unknown>) {
    if (!this.db || !this._user) return;
    const ref = doc(this.db, 'users', this._user.uid);
    await setDoc(ref, { settings: data }, { merge: true });
  }
}

export const FirebaseService = new FirebaseServiceClass();
