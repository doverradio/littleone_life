const User = require("../models/user");
// const ReferralCodes = require("../models/referralcodes");
// const Inventories = require( "../models/inventories" )
const jwt = require("jsonwebtoken"); // to generate signed token
const { expressjwt: expressJwt } = require('express-jwt');
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");
// const e = require("express");
// const BraintreeVaultCustomers = require("../models/braintreevaultcustomers");
const log = console.log;


exports.signup = async ( req, res ) =>
{
    try {
        let user = new User(req.body);
        let userDoc = await user.save();
        
        // Manually pick the fields you want to include in the response
        const userResponse = {
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            role: userDoc.role,
            createdAt: userDoc.createdAt,
            updatedAt: userDoc.updatedAt
        };

        // let welcomeEmail = await sendSignupEmail(userDoc);
        // res.json({ userSaved: userResponse, welcomeEmail });
        res.json({ userSaved: userResponse });
    } catch ( e ) {
        log(`signup e: `, e)
        return
    }
}

exports.signin = async (req, res) => {
    try {
      const { email, password } = req.body;

      const userDoc = await User.findOne({ email });
  
      if (!userDoc) {
        return res.status(400).json({ error: "User with that email does not exist. Please sign up" });
      }
  
      if (!userDoc.authenticate(password)) {
        return res.status(401).json({ error: "Email and password don't match" });
      }
  
      const {
        _id,
        name,
        role,
      } = userDoc;
  
      const token = jwt.sign({ _id }, process.env.JWT_SECRET);
  
      res.cookie("t", token, { expire: new Date() + 9999 });
  
      return res.json({
        token,
        user: {
          _id,
          email,
          name,
          role,
        }
      });
    } catch (error) {
      console.log("Got an error in signin...", error);
      res.status(400).json({ error }); // removed ', report: a' from response for security purposes
    }
};
    
exports._signin = async ( req , res ) => // find the user based on email
{
    // log( `Beginning signin...` )
    let a = {}
    const { email, password } = req.body;
    a.email = email
    a.password = password
    a.errors = {}
    try 
    {
        a.userDoc = await User.findOne( { email: a.email } ).catch( e_findOneError => { console.log( `e_findOneError: `, e_findOneError ); a.errors.e_findOneError = e_findOneError} )
        // if ( a.userDoc ) { log( `Got a.userDoc... ` ) }
        if ( a.errors.e_findOneError || !a.userDoc ) { return res.status( 400 ).json( { error: "User with that email does not exist. Please signup" } ) }
        // log( `Past part 1` )
        if ( !a.userDoc.authenticate( a.password ) ) { return res.status( 401 ).json( { error: "Email and password dont match" } ) }
        const { _id, name, email, role, token_last_refresh, stripe_account_id, stripe_seller, stripeSession,
            refresh_token, // if this is here, then they have done ebay OAuth, else it will be empty
            chatgptkey_id, // if this is here, then they can do chatgpt
         } = a.userDoc // destructure userDoc
        a._id = _id // DESTRUCTURE PARAM
        a.name = name // DESTRUCTURE PARAM
        a.email = email // DESTRUCTURE PARAM
        a.role = role // DESTRUCTURE PARAM
        a.token_last_refresh = token_last_refresh // DESTRUCTURE PARAM
        a.token = jwt.sign( { _id: a._id }, process.env.JWT_SECRET); // generates a jwt signed token
        res.cookie( "t", a.token, { expire: new Date() + 9999 } ) // return response with user and token to frontend client
        // a.ebayToken = a.userDoc.token
        return res.json( { 
            token: a.token, 
            user: { 
                _id: a._id, 
                email: a.email, 
                name: a.name, 
                role: a.role, 
                stripe_account_id, 
                stripe_seller, 
                stripeSession,
                refresh_token,
                chatgptkey_id,
            }
        } )
    
    } catch ( e ) {
        console.log( `Got an error in signin... e`, e )
        res.status( 400 ).json( { error: e } ) // removed ', report: a' from response for security purposes
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

exports.isAuth = async ( req, res, next ) => 
{
    let a = {}
    a.user = req.profile && req.auth && req.profile._id == req.auth._id;
    try 
    {
        if ( !a.user ) { return res.status( 403 ).json( { error: "Access denied" } ) }
        next();
    } catch ( e ) {
        console.log( `Got an error in isAuth... e, a`, e, JSON.stringify( a ) )
        res.status( 400 ).json( { error: e, report: a } )
    }
    
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
