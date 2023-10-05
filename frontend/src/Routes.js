import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MainPage from "./MainPage";
import AboutUs from "./AboutUs";
import SignIn from "./SignIn";
import SignUp from "./Signup";
import TermsOfService from "./TermsOfService";
import Contact from "./Contact";
import PrivacyPolicy from "./PrivacyPolicy";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>

                {/* Public */}
                <Route path="/" exact component={MainPage} />
                <Route path="/about" exact component={AboutUs} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/terms" exact component={TermsOfService} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/privacy" exact component={PrivacyPolicy} />
                
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
