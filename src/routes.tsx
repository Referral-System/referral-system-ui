import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
// import { MyBonus } from "./views/bonus";
import { NotFound } from "./views/not-found";
import { ReferralCreateEdit, Referrals } from "./views/referrals";
import { Users } from './views/users';

const switchDashboardRoutes = (
    <Switch>
        {/*<Route strict exact path="/" render={ () => <Redirect to={ "/referrals" }/> }/>*/}
        {/*<Route strict exact path="/bonus" component={ MyBonus }/>*/}
        <Route strict exact path="/referrals" component={ Referrals }/>
        <Route strict exact path="/referrals/create" component={ ReferralCreateEdit }/>
        <Route strict exact path="/referrals/edit/:id" component={ ReferralCreateEdit }/>
        <Route path="/users" component={ Users } />
        <Route path="*" component={ NotFound }/>
    </Switch>
);

export default switchDashboardRoutes;
