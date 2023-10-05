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
            
            <div className="signin-container d-flex justify-content-center main-content" style={{ backgroundColor: "black", color: "white" }}>
                <h2 className="m-1 p-1">Sign In</h2>
                <form onSubmit={handleSubmit} className="mt-5">
                    <div className="form-group m-1 p-1">
                        <br />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        <br />
                        <label htmlFor="email">Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
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