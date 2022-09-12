import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import MyBonus from "./views/bonus";
import MyReferral from "./views/referrals";
import OpenPosition from "./views/positions";
import Page404 from "./views/notFound";
import ReferralEdit from './views/referraledit';

const switchDashboardRoutes = (
    <Switch>
            <Route strict exact path="/" render={() => <Redirect to="/referrals"/>}/>
            <Route strict exact path="/bonus" component={MyBonus} />
            <Route strict exact path="/referrals" component={MyReferral} />
            <Route strict exact path="/referrals/create" component={ReferralEdit} />
            <Route strict exact path="/positions" component={OpenPosition} />
            <Route path="/referrals/edit/:id" component={ReferralEdit} />
            <Route path="*" component={Page404} />
    </Switch>
);

export default switchDashboardRoutes;
