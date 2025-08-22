import { z } from 'zod';

// Input validation schemas
export const emailSchema = z.string().email('Invalid email address').min(1, 'Email is required');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');

export const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .optional();

export const companyNameSchema = z.string()
  .min(2, 'Company name must be at least 2 characters')
  .max(100, 'Company name must be less than 100 characters')
  .regex(/^[a-zA-Z0-9\s\-&.,]+$/, 'Company name contains invalid characters');

export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s\-']+$/, 'Name contains invalid characters');

// File upload validation
export const validateFileUpload = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'image/webp'];
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'File size must be less than 10MB' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'File type not allowed. Please upload JPEG, PNG, GIF, WebP, or PDF files only' };
  }
  
  return { isValid: true };
};

// XSS protection utility
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Rate limiting check
export const checkRateLimit = (action: string, maxRequests: number = 10, windowMs: number = 60000): boolean => {
  const key = `rate_limit_${action}`;
  const now = Date.now();
  const requests = JSON.parse(localStorage.getItem(key) || '[]') as number[];
  
  // Remove old requests outside the window
  const validRequests = requests.filter(timestamp => now - timestamp < windowMs);
  
  if (validRequests.length >= maxRequests) {
    return false; // Rate limit exceeded
  }
  
  // Add current request
  validRequests.push(now);
  localStorage.setItem(key, JSON.stringify(validRequests));
  
  return true;
};

// Secure headers utility
export const getSecureHeaders = (): Record<string, string> => {
  return {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://cautkcuzwiwfvixzsuyh.supabase.co;",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
};