import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { MyBonus } from "./views/bonus";
import { MyReferral } from "./views/myreferrals";
import { NotFound } from "./views/notfound";
import { Referral } from "./views/referral";

const switchDashboardRoutes = (
    <Switch>
            <Route strict exact path="/" render={ () => <Redirect to={ "/referrals" }/> }/>
            <Route strict exact path="/bonus" component={MyBonus} />
            <Route strict exact path="/referrals" component={MyReferral} />
            <Route strict exact path="/referrals/create" component={Referral} />
            <Route path="/referrals/edit/:id" component={Referral} />
            <Route path="*" component={NotFound} />
    </Switch>
);

export default switchDashboardRoutes;
