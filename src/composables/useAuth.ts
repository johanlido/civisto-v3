import { ref, onMounted } from 'vue';
import { supabase, getCurrentUser } from '@/services/supabase';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  createdAt: string;
  municipality?: string;
  avatarUrl?: string;
}

export function useAuth() {
  const user = ref<UserProfile | null>(null);
  const isLoading = ref(false);
  const authError = ref<string | null>(null);
  const isAuthenticated = ref(false);

  // Load user on mount
  onMounted(async () => {
    await loadUser();
  });

  // Load user data
  const loadUser = async () => {
    isLoading.value = true;
    authError.value = null;

    try {
      const { user: authUser, error } = await getCurrentUser();
      
      if (error || !authUser) {
        isAuthenticated.value = false;
        user.value = null;
        return;
      }

      isAuthenticated.value = true;
      
      // Create user profile from auth user data
      user.value = {
        id: authUser.id,
        email: authUser.email || '',
        firstName: authUser.user_metadata?.first_name || '',
        lastName: authUser.user_metadata?.last_name || '',
        age: authUser.user_metadata?.age || 0,
        gender: authUser.user_metadata?.gender || '',
        createdAt: authUser.created_at || new Date().toISOString(),
        municipality: authUser.user_metadata?.municipality || 'Stockholm',
        avatarUrl: authUser.user_metadata?.avatar_url
      };
    } catch (error: any) {
      authError.value = error.message;
      isAuthenticated.value = false;
      user.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  // Listen for auth state changes
  const setupAuthListener = () => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await loadUser();
      } else if (event === 'SIGNED_OUT') {
        isAuthenticated.value = false;
        user.value = null;
      }
    });
  };

  // Get user initials for avatar
  const getUserInitials = (): string => {
    if (!user.value) return '';
    
    const firstName = user.value.firstName || '';
    const lastName = user.value.lastName || '';
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Update user profile
  const updateUserProfile = async (profile: Partial<UserProfile>): Promise<{ success: boolean; error: string | null }> => {
    if (!user.value) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: profile.firstName,
          last_name: profile.lastName,
          age: profile.age,
          gender: profile.gender,
          municipality: profile.municipality,
          avatar_url: profile.avatarUrl
        }
      });

      if (error) throw error;

      // Update local user state
      user.value = {
        ...user.value,
        ...profile
      };

      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Initialize auth
  setupAuthListener();

  return {
    user,
    isLoading,
    authError,
    isAuthenticated,
    loadUser,
    getUserInitials,
    updateUserProfile
  };
}
