import { useState, useEffect } from 'react';
import { User } from '../types';
import { auth } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  updatePassword as updateFirebasePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User as FirebaseUser,
  updateEmail as updateFirebaseEmail,
} from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const transformFirebaseUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || undefined,
    photoURL: firebaseUser.photoURL || undefined,
  });

  useEffect(() => {
    console.log('Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser?.email);
      if (firebaseUser) {
        setUser(transformFirebaseUser(firebaseUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with email:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user.email);
      setUser(transformFirebaseUser(userCredential.user));
      return userCredential.user;
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = 'Failed to sign in';
      
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later';
          break;
        default:
          errorMessage = error.message || 'Failed to sign in';
      }
      
      throw new Error(errorMessage);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      console.log('Attempting signup with email:', email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signup successful:', userCredential.user.email);
      setUser(transformFirebaseUser(userCredential.user));
      return userCredential.user;
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to create account';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters';
          break;
        default:
          errorMessage = error.message || 'Failed to create account';
      }
      
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting logout');
      await signOut(auth);
      setUser(null);
      console.log('Logout successful');
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const updateProfile = async ({ name, email }: { name: string; email: string }) => {
    try {
      if (!auth.currentUser) {
        throw new Error('No user is currently signed in');
      }

      await updateFirebaseProfile(auth.currentUser, {
        displayName: name,
      });

      if (email !== auth.currentUser.email) {
        await updateFirebaseEmail(auth.currentUser, email);
      }

      if (auth.currentUser) {
        setUser(transformFirebaseUser(auth.currentUser));
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error('No user is currently signed in');
      }

      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );

      await reauthenticateWithCredential(auth.currentUser, credential);
      await updateFirebasePassword(auth.currentUser, newPassword);
    } catch (error: any) {
      console.error('Update password error:', error);
      throw new Error(error.message || 'Failed to update password');
    }
  };

  return {
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    updatePassword,
  };
} 