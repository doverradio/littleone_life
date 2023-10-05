import React, { useState, useEffect } from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";

const SignIn = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can handle the sign-in logic here
        console.log("Email:", email, "Password:", password);
    };

    return(
        <>
            <NavbarMain />
            <h2 className="m-1 p-1">Sign In</h2>
            <div className="signin-container d-flex justify-content-center main-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group m-1 p-1">
                        <label htmlFor="email">Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <br />
                    <div className="form-group m-1 p-1">
                        <label htmlFor="password">Password:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input 
                            type="password" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-primary btn-sm m-1" type="submit">Sign In</button>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default SignIn