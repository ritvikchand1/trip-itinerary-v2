import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Itinerary } from '../types';

const COLLECTION_NAME = 'itineraries';

export const itineraryService = {
  async createItinerary(itineraryData: Partial<Itinerary>, userId: string): Promise<string> {
    if (!itineraryData.title || !itineraryData.destination || !itineraryData.startDate || !itineraryData.endDate) {
      throw new Error('Missing required fields');
    }

    const itineraryRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...itineraryData,
      userId,
      days: [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return itineraryRef.id;
  },

  async updateItinerary(id: string, itineraryData: Partial<Itinerary>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...itineraryData,
      updatedAt: Timestamp.now(),
    });
  },

  async deleteItinerary(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },

  async getItinerary(id: string): Promise<Itinerary | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Itinerary;
  },

  async getUserItineraries(userId: string): Promise<Itinerary[]> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Itinerary[];
  },
}; 