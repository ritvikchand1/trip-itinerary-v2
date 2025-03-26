import { db } from '../lib/firebase';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { Itinerary } from '../types';

class ItineraryService {
  private collection = collection(db, 'itineraries');

  async getItineraries(userId: string): Promise<Itinerary[]> {
    const q = query(this.collection, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Itinerary));
  }

  async getItinerary(id: string): Promise<Itinerary | null> {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Itinerary;
  }

  async createItinerary(itinerary: Omit<Itinerary, 'id'>): Promise<string> {
    const docRef = await addDoc(this.collection, itinerary);
    return docRef.id;
  }

  async updateItinerary(id: string, itinerary: Partial<Itinerary>): Promise<void> {
    const docRef = doc(this.collection, id);
    await updateDoc(docRef, itinerary);
  }

  async deleteItinerary(id: string): Promise<void> {
    const docRef = doc(this.collection, id);
    await deleteDoc(docRef);
  }
}

export const itineraryService = new ItineraryService(); 