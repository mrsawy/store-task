/**
 * Superadmin Configuration
 * 
 * Users with these usernames will have superadmin privileges,
 * including the ability to delete products.
 */
export const SUPERADMIN_USERNAMES = ['emilys'];

/**
 * Check if a username is a superadmin
 */
export const isSuperadmin = (username: string | null | undefined): boolean => {
  if (!username) return false;
  return SUPERADMIN_USERNAMES.includes(username.toLowerCase());
};