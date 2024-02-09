// src/api/auth.js

const API = process.env.REACT_APP_API ? process.env.REACT_APP_API : 'https://www.littleone.life/api'; // Your backend API URL
const log = console.log;

// Function to handle user sign-up
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

export const signin = user => {
  log('signin API:', process.env.REACT_APP_API);

  return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  })
      .then(response => {
          return response.json();
      })
      .catch(err => {
          console.log(err);
      });
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
              console.log("signout", response);
          })
          .catch(err => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
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