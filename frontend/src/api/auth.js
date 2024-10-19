// frontend/src/api/auth.js

const API = process.env.REACT_APP_API || 'https://www.littleone.life/api'; // Your backend API URL

// Function to check if the user is still authenticated by checking the session
export const checkSession = async () => {
  // console.log(`Begin checkSession!`)
  try {
      const response = await fetch(`${API}/check-session`, {
          method: 'GET',
          credentials: 'include', // Ensure cookies (and hence session) are included
      });

      if (!response.ok) {
          throw new Error('Failed to check session');
      }

      const sessionData = await response.json();
      // console.log(`sessionData: `, sessionData)
      return sessionData; // Return the session data, which includes isAuthenticated
  } catch (error) {
      console.error('Error checking session:', error);
      return { isAuthenticated: false }; // Explicitly set to false in case of error
  }
};


export const signup = async (user) => {
  try {
    const response = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (error) {
    console.error('Error in signup:', error);
    throw error;
  }
};

export const checkUsernameAvailability = async (username, userId) => {
  try {
    const response = await fetch(`${API}/check-username`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, userId }),
    });
    return await response.json();
  } catch (err) {
    console.error('Error checking username availability:', err);
    return { error: 'Error checking username availability' };
  }
};

export const signin = async (user) => {
  try {
    const response = await fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (err) {
    console.error('Sign-In error:', err);
    return { error: 'Sign-In failed. Please try again.' };
  }
};

// Signout the user and clear the session on the server-side
export const signout = async () => {
  try {
    const response = await fetch(`${API}/signout`, {
      method: "POST",
      credentials: 'include', // Ensure cookies are included
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Signout failed');
    }
  } catch (err) {
    console.error('Signout error:', err);
    return { success: false };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API}/forgot-password`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    });
    return await response.json();
  } catch (err) {
    console.error('Forgot Password error:', err);
    throw err;
  }
};

export const resetPassword = async (resetInfo) => {
  try {
    const response = await fetch(`${API}/reset-password`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resetInfo),
    });
    return await response.json();
  } catch (err) {
    console.error('Reset Password error:', err);
    throw err;
  }
};

export const googleSignIn = async (token) => { // not the JWT token, the google token
  try {
      const response = await fetch(`${API}/google-login`, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure session cookie is included
          body: JSON.stringify({ idToken: token }),
      });
      return await response.json();
  } catch (err) {
      return { error: 'Google sign-in failed. Please try again.' };
  }
};


// export const googleSignup = async (token) => { // not the JWT token, the google token
//   if (token) {
//     try {
//       const response = await fetch(`${API}/google-signup`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Include cookies
//         body: JSON.stringify({ idToken: token }),
//       });
//       return await response.json();
//     } catch (err) {
//       console.error('Google Sign-Up error:', err);
//       return { error: 'Google sign-up failed. Please try again.' };
//     }
//   } else {
//     return { error: 'Google sign-up failed. Please try again.' };
//   }
// };

export const googleSignup = async (token, preferences) => { // Not the JWT token, the google token. Now accepts preferences as well
  if (token) {
    try {
      const response = await fetch(`${API}/google-signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify({ idToken: token, preferences }),  // Send both token and preferences
      });
      return await response.json();
    } catch (err) {
      console.error('Google Sign-Up error:', err);
      return { error: 'Google sign-up failed. Please try again.' };
    }
  } else {
    return { error: 'Google sign-up failed. Please try again.' };
  }
};


// Remove isTokenExpired, since session management will be handled by the server
