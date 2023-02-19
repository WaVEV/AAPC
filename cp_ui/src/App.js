import React from "react"
import { connect } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import "./App.css";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import getEditions from 'redux/actions/getEditions'

import Home from 'components/home/Home.js';
import TcArg from 'components/tcarg/TcArg.js'
import ICPCArg from 'components/icpcarg/ICPCArg.js'
import TAP from 'components/tap/TAP.js'


class App extends React.Component{

    componentDidMount() {
      this.props.getEditions();
    }

    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/icpc-arg" component={ICPCArg} />
                    <Route path="/tap" component={TAP} />
                    <Route path="/tc-arg" component={TcArg} />
                    <Route path="/">
                        <Redirect to="/tc-arg" />
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = dispatch => {
  return {
    getEditions: () => {
      dispatch(getEditions());
    }
  };
};

const ConnectedApp = connect(null, mapDispatchToProps)(App);

const ProvidedApp = () => <Provider store={store}> <ConnectedApp /> </Provider>;

export default ProvidedApp;
