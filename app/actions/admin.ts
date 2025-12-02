/**
 * Server actions for admin authentication
 */

'use server'

/**
 * Verify admin password
 * @param password - Password to verify
 * @returns true if password is correct, false otherwise
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin'
  return password === adminPassword
}

