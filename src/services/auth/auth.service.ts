import { db } from '../db';
import { UserProfile } from '../../types/user';
import { AuthResponse, AuthError } from './types';
import { validateCredentials, generateAuthToken } from './utils';

export async function login(username: string, password: string): Promise<AuthResponse> {
  try {
    // Validate credentials
    validateCredentials(username, password);

    // Get users from database
    const users = await db.users.toArray();
    const user = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      u.password === password
    );

    if (!user) {
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
    }

    // Update user's last login
    const now = new Date().toISOString();
    await db.users.update(user.id, {
      lastLogin: now,
      lastActive: now
    });

    // Generate auth token
    const token = generateAuthToken();

    return { user, token };
  } catch (error) {
    const authError: AuthError = {
      message: error instanceof Error ? error.message : 'حدث خطأ أثناء تسجيل الدخول',
      code: 'AUTH_ERROR'
    };
    throw authError;
  }
}

export async function refreshUserData(userId: string): Promise<UserProfile> {
  try {
    const user = await db.users.get(userId);
    if (!user) {
      throw new Error('لم يتم العثور على المستخدم');
    }
    return user;
  } catch (error) {
    throw new Error('فشل تحديث بيانات المستخدم');
  }
}

export async function updateLastActive(userId: string): Promise<void> {
  try {
    await db.users.update(userId, {
      lastActive: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating last active:', error);
  }
}