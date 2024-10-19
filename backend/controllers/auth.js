// backend/controllers/auth.js

const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto');
const { expressjwt: expressJwt } = require('express-jwt');
const _ = require("lodash");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { generateRandomPassword } = require('../utils/password'); // Adjust the path if necessary
const log = console.log; 


// GOOGLE SIGN IN
// Updated googleSignin controller
exports.googleSignin = async (req, res) => {
    const { idToken } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        // log(`6. Verify ID Token - `, payload)
        const { name: username, email_verified, email } = payload;

        if (email_verified) {
            let user = await User.findOne({ username });
            // log(`7. Check User in Database: `, user._id)

            if (user) {
                req.session.userId = user._id; // Set the user ID in the session
                req.session.cookie.maxAge = 2 * 60 * 60 * 1000; // Session expiration: 2 hours
                req.session.username = username; // Set the username in the session

                // console.log('Session ID after setting userId:', req.session.id); // Log the session ID

                req.session.save(err => { // Save the session explicitly to ensure it's stored
                    if (err) {
                        console.error('Session save error:', err);
                        return res.status(500).json({ error: 'Failed to save session' });
                    }
                    // log(`8. Session Creation`)

                    return res.json({
                        user: { _id: user._id, username, role: user.role, email: user.email }
                    });
                });
            } else {
                return res.status(400).json({
                    error: 'Google login failed. Try again'
                });
            }
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again'
            });
        }
    } catch (error) {
        console.error('GOOGLE SIGNIN ERROR', error);
        return res.status(400).json({
            error: 'Google login failed. Try again.'
        });
    }
};

// The checkSession function
exports.checkSession = async (req, res) => {
    log(`Begin checkSession!  req.session: `, req.session)
    if (req.session.userId) {
        try {
            // Optionally, you can retrieve more user details from the database
            const user = await User.findById(req.session.userId).select('-hashed_password -salt');
            if (!user) {
                return res.status(404).json({
                    isAuthenticated: false,
                    message: 'User not found'
                });
            }
            return res.json({
                isAuthenticated: true,
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    // Include other fields as needed
                }
            });
        } catch (error) {
            console.error('Error retrieving user from session:', error);
            return res.status(500).json({
                isAuthenticated: false,
                message: 'Internal server error'
            });
        }
    } else {
        // If there's no userId in the session, the user is not authenticated
        return res.json({
            isAuthenticated: false
        });
    }
};

const generateUniqueUsername = async (username) => {
    let uniqueUsername = username;
    let user = await User.findOne({ username: uniqueUsername });
    while (user) {
        uniqueUsername = `${username}_${Math.floor(Math.random() * 10000)}`;
        user = await User.findOne({ username: uniqueUsername });
    }
    return uniqueUsername;
};

exports.checkUsernameAvailability = async (req, res) => {
    const { username, userId } = req.body;

    try {
        // Find any user with the given username excluding the current user's ID
        const userExists = await User.findOne({ username, _id: { $ne: userId } });
        if (userExists) {
            return res.json({ isAvailable: false });
        }
        return res.json({ isAvailable: true });
    } catch (error) {
        console.error('Error in checking username availability:', error);
        return res.status(500).json({ error: 'Server error while checking username' });
    }
};

// USERNAME / PASSWORD SIGN UP
exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Proceed with creating a new user
        let user = new User(req.body);
        user.password = password;
        let userDoc = await user.save();

        req.session.userId = userDoc._id;

        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Failed to save session' });
            }

            const userResponse = {
                username: userDoc.username,
                firstName: userDoc.firstName,
                lastName: userDoc.lastName,
                email: userDoc.email,
                phone: userDoc.phone,
                role: userDoc.role,
                createdAt: userDoc.createdAt,
                updatedAt: userDoc.updatedAt
            };

            res.json({ userSaved: userResponse });
        });
    } catch (e) {
        console.error(`Signup error: `, e);
        res.status(500).send('Error in signup process');
    }
};

// GOOGLE SIGN UP
// In your auth controller
exports.googleSignup = async (req, res) => {
    const { idToken, preferences } = req.body;  // Add preferences

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, email_verified, name: username, sub: googleId } = payload;

        if (email_verified) {
            let user = await User.findOne({ email });

            if (!user) {
                user = new User({
                    username,
                    email,
                    googleId,
                    preferences,  // Save preferences here
                    preferredLoginType: 'google'
                });
                await user.save();
            } else if (!user.googleId) {
                user.googleId = googleId;
                user.preferences = preferences;  // Update preferences
                await user.save();
            }

            req.session.userId = user._id;
            req.session.save(err => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.status(500).json({ error: 'Failed to save session' });
                }

                const { _id, username, role } = user;
                return res.json({
                    user: { _id, username, role },
                });
            });
        } else {
            return res.status(400).json({
                error: 'Google sign-up failed. Email not verified.',
            });
        }
    } catch (error) {
        console.error('GOOGLE SIGNUP ERROR', error);
        return res.status(400).json({
            error: 'Google sign-up failed. Try again.',
        });
    }
};



// USERNAME / PASSWORD SIGN IN
exports.signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userDoc = await User.findOne({ username });

        if (!userDoc) {
            return res.status(400).json({ error: "User with that username does not exist. Please sign up" });
        }

        if (!userDoc.authenticate(password)) {
            return res.status(401).json({ error: "Username and password don't match" });
        }

        req.session.userId = userDoc._id;

        req.session.save(err => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ error: 'Failed to save session' });
            }

            return res.json({
                user: {
                    _id: userDoc._id,
                    username: userDoc.username,
                    firstName: userDoc.firstName,
                    lastName: userDoc.lastName,
                    role: userDoc.role,
                    email: userDoc.email,
                }
            });
        });
    } catch (error) {
        console.log("Signin error:", error);
        res.status(400).json({ error: 'Error signing in' });
    }
};

// Signout controller in your backend (e.g., authController.js)
exports.signout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid'); // Default cookie name for express-session
        return res.json({ message: "Signout success" });
    });
};

exports.requireSignin = (req, res, next) => {
    if (req.session && req.session.userId) {
        next(); // User is signed in, proceed to the next middleware
    } else {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
};

exports.isAuth = (req, res, next) => {
    const userId = req.params.userId || req.body.userId; // Check both params and body

    if (req.session.userId && req.session.userId === userId) {
        next();
    } else {
        return res.status(403).json({ error: 'Access denied' });
    }
};

exports.authMiddleware = async (req, res, next) => {
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId);
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }
            req.profile = user;
            next();
        } catch (err) {
            console.error("Error in authMiddleware:", err);
            return res.status(500).json({ error: 'Server error' });
        }
    } else {
        return res.status(401).json({ error: 'Access denied. Please sign in.' });
    }
};

exports.adminMiddleware = async (req, res, next) => {
    if (req.profile && req.profile.role === 1) {
        next();
    } else {
        return res.status(403).json({ error: 'Admin resource. Access denied' });
    }
};



exports.isAdmin = async (req, res, next) => {
    // log(`Begin isAdmin!` )
    // log(`Begin isAdmin!  req.body: `, req.body )
    let a = {};
    try {
        if (!req.profile || req.profile.role === undefined) {
            console.log('req.profile is not defined');
            return res.status(400).json({
                error: "Admin resource! Access denied"
            });
        }

        if (req.profile.role !== 1) {
            return res.status(403).json({
                error: 'Admin resource. Access denied'
            });
        }

        next();
    } catch (e) {
        console.log(`Got an error in isAdmin... e, a`, e, JSON.stringify(a));
        res.status(400).json({ error: e, report: a });
    }
};

exports.forgotPassword = async ( req, res ) =>  // a 
{
    let a = {}
    const { email } = req.body
    a.email = email // PARAM
    a.errors = {}
    try 
    {
        a.userDoc = await User.findOne( { email: a.email } ).catch(  error_User_findOne => { a.errors.error_User_findOne = error_User_findOne; console.log( `error_User_findOne: `, error_User_findOne ) } )
        if ( !a.userDoc ) { return res.status( 401 ).json( { error: 'User with that email does not exist' } ) }
        a.token = jwt.sign( { _id: a.userDoc._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' } )
        a.emailData = { // email
            from: process.env.EMAIL_FROM,
            send_to: a.email,
            subject: `Password reset link`,
            text: `
            Please use the following link to reset your password:
            ${ process.env.CLIENT_URL }/auth/password/reset/${ a.token }
            
            This email may contain sensitive information.
            https://superstoreglobal.com`
        
        }
        a.updatedUserDoc =  await a.userDoc.updateOne( { resetPasswordLink: a.token } ).catch(  error_userDoc_updateOne => { a.errors.error_userDoc_updateOne = error_userDoc_updateOne; console.log( `error_userDoc_updateOne: `, error_userDoc_updateOne ) } ) // populating the db > user > resetPasswordLink
        a.endpoint = `${ process.env.API_URL }/api/email/sendemail`
        a.method = POST
        a.headers = { Accept: "application/json", "Content-Type": "application/json" }
        a.body = JSON.stringify( a.emailData )
        a.message = { message: `Email has been sent to ${ a.email }. Follow the instructions to reset your password. Link expires in 10min.` }
        a.response = await fetch( a.endpoint, { method: a.method, headers: a.headers, body: a.body } )
        a.response = await a.response.json()
        
        // try {
        //     await fetch( ${process.env.API_URL}/email/sendemail, {
        //         method: "POST",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({ subject, text })
        //     })
        // } catch (e) { console.log(Unable to send email due to this error..., e);  }
        res.json( a.message )
    } catch ( e ) { 
        console.log( `Got an error in forgotPassword... e`, e )
        res.status( 400 ).json( { error: e } )
    }

        

        
};

exports.resetPassword1 = async ( req, res ) => 
{
    let a = {}
    const { resetPasswordLink, newPassword } = req.body;
    a.resetPasswordLink = resetPasswordLink // PARAMS
    a.newPassword = newPassword // PARAMS
    a.error = {}
    try 
    {
        if ( a.resetPasswordLink ) 
        {
            a.decoded = await jwt.verify( resetPasswordLink, process.env.JWT_RESET_PASSWORD )
            .catch( 
                error_jwt_verify => { 
                    a.error.error_jwt_verify = error_jwt_verify
                    console.log( `error_jwt_verify: `, error_jwt_verify )
                    return res.status( 401 ).json( { error: 'Expired link. Try again' } )
                } )
            a.userDoc = await User.findOne({ resetPasswordLink } ).catch( 
                error_User_findOne => {
                    a.error.error_User_findOne = error_User_findOne
                    console.log( `a.error.error_User_findOne: `, a.error.error_User_findOne )
                    return res.status( 401 ).json( { error: 'Something went wrong. Try later' } )
                } )
            a.updatedFields = { password: newPassword, resetPasswordLink: '' }
            a.userDoc = _.extend( a.userDoc, a.updatedFields )
            a.savedUserDoc = await user.save().catch(
                error_user_save => {
                    a.error.error_user_save = error_user_save
                    console.log( `a.error.error_user_save: `, a.error.error_user_save )
                    return res.status( 400 ).json( {
                        error: error_user_save
                    })
                }
            )
            res.json({
                message: `Great! Now you can login with your new password`
            });
        }
        else { res.status( 400 ).json( { message: `Missing resetPasswordLink!` } ) }
    } catch ( e ) {
        console.log( `Got an error in resetPassword... e`, e )
        res.status( 400 ).json( { error: e } )
    }
}

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    error: 'Expired link. Try again'
                });
            }
            User.findOne({ resetPasswordLink }, (err, user) => {
                if (err || !user) {
                    return res.status(401).json({
                        error: 'Something went wrong. Try later'
                    });
                }
                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: err //  errorHandler(err)
                        });
                    }
                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });
        });
    }
};

// Added 8/15/2024 - to keep the logged in user logged in as long as they remain active on the site for the last 2 hours.
exports.refreshToken = (req, res) => {
    // log(Begin refreshToken! req.headers: , req.headers);
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }
  
    try {
    //   console.log('Received token:', token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Validate the token
      const newToken = jwt.sign({ _id: decoded._id, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '2h' }); // Generate a new token
      return res.json({ token: newToken }); // Send the new token back to the client
    } catch (err) {
      console.error('Token verification failed:', err.message);
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
