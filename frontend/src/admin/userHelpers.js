// src/admin/userHelpers.js

import { updateUserRole } from '../api/admin';

/**
 * Handles the change of a user's role.
 * @param {string} userId - The ID of the user whose role is being updated.
 * @param {number} newRole - The new role for the user (e.g., 0 for user, 1 for admin).
 * @param {Function} setUsers - Function to update the users state.
 */
export const handleRoleChange = async (userId, newRole, setUsers) => {
  try {
    await updateUserRole(userId, newRole);
    // Update user role in state after successful update
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
    console.log('User role updated successfully');
  } catch (error) {
    console.error('Failed to update user role:', error);
  }
};
