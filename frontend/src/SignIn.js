import React, { useState } from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Email:", email, "Password:", password);
    };

    return(
        <>
            <NavbarMain />
            
            <div className="container-fluid" style={{ backgroundColor: "white", color: "black", height: "80vh" }}>
                <div className="row h-90 justify-content-center align-items-center">
                    <div className="col-md-6 col-lg-4">
                        <h2 className="text-center m-1 p-1">Sign In</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group m-1 p-1">
                                <label htmlFor="email">Email:</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="form-control"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group m-1 p-1">
                                <label htmlFor="password">Password:</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    className="form-control"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="btn btn-primary btn-sm m-1 w-100" type="submit">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SignIn;
