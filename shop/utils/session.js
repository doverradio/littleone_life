// shop/utils/session.js

export async function getSession() {
    const res = await fetch('/api/check-session', {
      credentials: 'include', // Include credentials (cookies) in the request
    });
  
    if (res.ok) {
      return res.json();
    }
  
    return null;
  }
  
  export async function signOut() {
    const res = await fetch('/api/signout', {
      method: 'POST',
      credentials: 'include',
    });
  
    if (res.ok) {
      return true;
    }
  
    return false;
  }
  