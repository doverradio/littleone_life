// src/api/auth.js

const API = process.env.REACT_APP_API || 'https://www.littleone.life/api'; // Your backend API URL

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

// export const checkUsernameAvailability = async (username) => {
//   try {
//     const response = await fetch(`${API}/check-username`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username }),
//     });
//     return await response.json();
//   } catch (error) {
//     console.error('Error in checking username availability:', error);
//     throw error;
//   }
// };

export const checkUsernameAvailability = async (username, userId) => {
  try {
      const response = await fetch(`${API}/check-username`, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, userId })
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
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.error('Sign-In error:', err);
    return { error: 'Sign-In failed. Please try again.' };
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "POST"
    })
      .then(response => {
        // console.log("signout", response);
      })
      .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const forgotPassword = email => {
  return fetch(`${API}/forgot-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const resetPassword = resetInfo => {
  return fetch(`${API}/reset-password`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resetInfo)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
export const googleSignIn = async (token) => {
  if (token) {
    try {
      const response = await fetch(`${API}/google-login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: token }),
      });
      return await response.json();
    } catch (err) {
      console.error('Google Sign-In error:', err);
      return { error: 'Google sign-in failed. Please try again.' };
    }
  } else {
    return { error: 'Google sign-in failed. Please try again.' };
  }
};

export const googleSignup = async (token) => {
  if (token) {
    try {
      const response = await fetch(`${API}/google-signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: token }),
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
