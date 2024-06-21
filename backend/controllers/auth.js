const User = require("../models/user");
const jwt = require("jsonwebtoken"); // to generate signed token
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto');
const { expressjwt: expressJwt } = require('express-jwt');
const _ = require("lodash");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const log = console.log;


exports.checkUsernameAvailability = async (req, res) => {
    const { username } = req.body;

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.json({ isAvailable: false });
        }
        return res.json({ isAvailable: true });
    } catch (error) {
        log('Error in checking username availability:', error);
        return res.status(500).json({ error: 'Server error while checking username' });
    }
};

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
        user.password = password; // Set the password, which will automatically hash it and set hashed_password
        let userDoc = await user.save();

        // Manually pick the fields you want to include in the response
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
    } catch (e) {
        console.error(`Signup error: `, e);
        res.status(500).send('Error in signup process');
    }
};

// GOOGLE SIGN UP
exports.googleSignup = async (req, res) => {
    const { idToken } = req.body;
    let email;

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email_verified, name, email } = payload;

        if (email_verified) {
            let user = await User.findOne({ email });
            if (user) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                const { _id, email, username, role } = user;
                return res.json({
                    token,
                    user: { _id, email, username, role }
                });
            } else {
                // email = 'wikiwick151@gmail.com';
                // let password = email + process.env.JWT_SECRET;
                let password = 'wikiwick151@gmail.com' + process.env.JWT_SECRET;
                user = new User({ username: name, email, password });
                await user.save();
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                const { _id, email, username, role } = user;
                return res.json({
                    token,
                    user: { _id, email, username, role }
                });
            }
        } else {
            return res.status(400).json({
                error: 'Google login failed. Try again'
            });
        }
    } catch (error) {
        console.log('GOOGLE SIGNIN ERROR', error);
        return res.status(400).json({
            error: 'Google login failed. Try again'
        });
    }
};



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

        const {
            _id,
            role,
            firstName,
            lastName
        } = userDoc;

        const token = jwt.sign({ _id }, process.env.JWT_SECRET);

        res.cookie("t", token, { expire: new Date() + 9999 });

        return res.json({
            token,
            user: {
                _id,
                username,
                firstName,
                lastName,
                role
            }
        });
    } catch (error) {
        console.log("Got an error in signin...", error);
        res.status(400).json({ error }); // removed ', report: a' from response for security purposes
    }
};

exports.googleLogin0 = async (req, res) => {
    const { token }  = req.body;
  
    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      // Check if user exists in database or create a new one
      let user = await User.findOne({ googleId: userid });
      if (!user) {
        // Create a new user in your database
        user = new User({
          // Fill user details from Google payload
          googleId: userid,
          email: payload.email,
          name: payload.name,
          // ... other user data ...
        });
        await user.save();
      }
      // Generate your JWT token
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
      // Return your JWT token or session data
      res.json({token, user});
    }
  
    try {
      await verify();
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
};
 
// GOOGLE SIGN IN
exports.googleSignIn = async (req, res) => {
    const { token } = req.body;

    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, sub: googleId } = payload;

        let user = await User.findOne({ googleId });
        if (user) {
            // User exists, log them in
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            return res.json({ token, user });
        } else {
            // User does not exist, send email and name for further processing
            return res.json({ email, name: payload.name, googleId });
        }
    }

    try {
        await verify();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: "Google login failed. Try again." });
    }
};

exports.signout = async ( req, res ) =>  // a 
{
    let a = {}
    try 
    {
        a.message = { message: "Signout success" } // create the response message
        res.clearCookie( "t" ) // clear out the cookie with the key of "t"
        res.json( a.message )
    } catch ( e ) {
        console.log( `Got an error in signout... e, a`, e, a )
        res.status( 400 ).json( { error: e, report: a } )
    }
};

exports.requireSignin = expressJwt( {
    secret: process.env.JWT_SECRET,
    algorithms: [ "HS256" ], // added later
    userProperty: "auth",
} );

exports.authMiddleware = async (req, res, next) => {
    const authUserId = req.auth._id;
    
    try {
        const user = await User.findById({ _id: authUserId });
        if (!user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    } catch (err) {
        console.error("Error in authMiddleware:", err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
};


exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.user._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: 'Admin resource. Access denied'
            });
        }

        req.profile = user;
        next();
    });
};


exports.isAuth = (req, res, next) => {
    const userIsAuthenticated = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
    if (!userIsAuthenticated) {
        return res.status(403).json({ error: "Access denied" });
    }
    next();
};


exports.isAdmin = async ( req, res, next ) => // a
{
    let a = {}
    try 
    {
        a.errorMessage = { error: "Admin resourse! Access denied" }
        if ( req.profile.role === 0 ) { return res.status( 403 ).json( a.errorMessage ) }
        next();
    } catch ( e ) {
        console.log( `Got an error in isAdmin... e, a`, e, JSON.stringify( a ) )
        res.status( 400 ).json( { error: e, report: a } )
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
            https://superstoreglobal.com
        `
        }
        a.updatedUserDoc =  await a.userDoc.updateOne( { resetPasswordLink: a.token } ).catch(  error_userDoc_updateOne => { a.errors.error_userDoc_updateOne = error_userDoc_updateOne; console.log( `error_userDoc_updateOne: `, error_userDoc_updateOne ) } ) // populating the db > user > resetPasswordLink
        a.endpoint = `${ process.env.API_URL }/api/email/sendemail`
        a.method = `POST`
        a.headers = { Accept: "application/json", "Content-Type": "application/json" }
        a.body = JSON.stringify( a.emailData )
        a.message = { message: `Email has been sent to ${ a.email }. Follow the instructions to reset your password. Link expires in 10min.` }
        a.response = await fetch( a.endpoint, { method: a.method, headers: a.headers, body: a.body } )
        a.response = await a.response.json()
        
        // try {
        //     await fetch( `${process.env.API_URL}/email/sendemail`, {
        //         method: "POST",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({ subject, text })
        //     })
        // } catch (e) { console.log(`Unable to send email due to this error...`, e);  }
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
