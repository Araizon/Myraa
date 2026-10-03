import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set, get, Database } from 'firebase/database';
import { Category, ContactMessage, Product, Review } from '../types';
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS, DEFAULT_REVIEWS } from './defaultData';

const firebaseConfig = {
  apiKey: "AIzaSyCzscVpB0jNFcA1ZWBtIKka4equ5fkPZZE",
  authDomain: "evoran-admin.firebaseapp.com",
  databaseURL: "https://evoran-admin-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "evoran-admin",
  storageBucket: "evoran-admin.firebasestorage.app",
  messagingSenderId: "937959335179",
  appId: "1:937959335179:web:ea8519af33edf7568bee0e",
  measurementId: "G-1ZPFGQNWK6"
};

let db: Database | null = null;

try {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getDatabase(app);
} catch (error) {
  console.warn("Firebase initialization warning (using local fallback store):", error);
}

export { db };

// Fetch categories from Firebase with fallback
export async function fetchCategories(): Promise<Category[]> {
  if (!db) return DEFAULT_CATEGORIES;
  try {
    const snapshot = await get(ref(db, 'categories'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const list = Object.values(data) as Category[];
      return list.length > 0 ? list : DEFAULT_CATEGORIES;
    }
    return DEFAULT_CATEGORIES;
  } catch (err) {
    console.error("Failed to load categories from Firebase, using default:", err);
    return DEFAULT_CATEGORIES;
  }
}

// Fetch products from Firebase with fallback
export async function fetchProducts(): Promise<Product[]> {
  if (!db) return DEFAULT_PRODUCTS;
  try {
    const snapshot = await get(ref(db, 'products'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const list: Product[] = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
      return list.length > 0 ? list : DEFAULT_PRODUCTS;
    }
    return DEFAULT_PRODUCTS;
  } catch (err) {
    console.error("Failed to load products from Firebase, using default:", err);
    return DEFAULT_PRODUCTS;
  }
}

// Subscribe to live reviews
export function subscribeReviews(callback: (reviews: Review[]) => void): () => void {
  if (!db) {
    callback(DEFAULT_REVIEWS);
    return () => {};
  }

  try {
    const reviewsRef = ref(db, 'reviews');
    const unsubscribe = onValue(
      reviewsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const list: Review[] = Object.keys(data)
            .map(key => ({
              id: key,
              ...data[key]
            }))
            .reverse();
          callback(list.length > 0 ? list : DEFAULT_REVIEWS);
        } else {
          callback(DEFAULT_REVIEWS);
        }
      },
      (error) => {
        console.warn("Reviews live subscription error, showing defaults:", error);
        callback(DEFAULT_REVIEWS);
      }
    );
    return unsubscribe;
  } catch {
    callback(DEFAULT_REVIEWS);
    return () => {};
  }
}

// Submit a new review
export async function addReview(reviewData: Omit<Review, 'id'>): Promise<void> {
  if (!db) {
    return;
  }
  const reviewsRef = ref(db, 'reviews');
  const newRef = push(reviewsRef);
  await set(newRef, reviewData);
}

// Submit a contact transmission message
export async function sendContactMessage(messageData: ContactMessage): Promise<void> {
  if (!db) {
    return;
  }
  const messagesRef = ref(db, 'messages');
  const newMsgRef = push(messagesRef);
  await set(newMsgRef, messageData);
}
