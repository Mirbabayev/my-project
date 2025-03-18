import { supabase } from './supabase';

// Simulated local storage of users for demo purposes
const LOCAL_STORAGE_USERS_KEY = 'e-parfum-users';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'e-parfum-current-user';

interface LocalUser {
  id: string;
  email: string;
  password: string;
  createdAt: string;
}

// Helper to get users from local storage
const getLocalUsers = (): LocalUser[] => {
  const users = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Helper to save users to local storage
const saveLocalUsers = (users: LocalUser[]): void => {
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
};

export async function signUp(email: string, password: string) {
  try {
    // Try to use Supabase first
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error) {
      return data;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');

    // Check if user already exists
    const users = getLocalUsers();
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser: LocalUser = {
      id: `local-${Date.now()}`,
      email,
      password, // In a real app, this would be hashed!
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveLocalUsers(users);

    return { user: { id: newUser.id, email: newUser.email }};
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    // Try to use Supabase first
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      return data;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');

    // Find user
    const users = getLocalUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid login credentials');
    }

    // Store current user
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return { 
      user: userWithoutPassword,
      session: { 
        access_token: `fake-token-${Date.now()}`,
        user: userWithoutPassword
      }
    };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    // Try Supabase first
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
      return;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    // Try Supabase first
    const { data, error } = await supabase.auth.getSession();
    
    if (!error && data.session) {
      return data.session.user;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');
    const user = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

export async function deleteAccount() {
  try {
    // Try Supabase first
    const { error } = await supabase.auth.admin.deleteUser((await getCurrentUser())?.id);
    
    if (!error) {
      await signOut();
      return;
    }

    // If Supabase fails, fallback to local simulation
    console.log('Using local auth simulation instead');
    
    // Get current user
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      throw new Error('No user is logged in');
    }
    
    // Remove user from the users list
    const users = getLocalUsers();
    const updatedUsers = users.filter(user => user.id !== currentUser.id);
    saveLocalUsers(updatedUsers);
    
    // Sign out and clear local storage
    localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    
    // Explicitly clear token and any other auth data
    localStorage.removeItem('token');
    localStorage.removeItem('supabase.auth.token');
    
    // Force clear session
    supabase.auth.signOut();
  } catch (error) {
    console.error('Delete account error:', error);
    throw error;
  }
}