import * as React from "react";
import axios from "axios";
import * as MaterialStyles from "@material-ui/core/styles";
import * as ReactRouter from "react-router-dom";
import * as scenes from "scenes";
import Navbar from "components/Navbar";
import PrivateRoute from "components/auth/PrivateRoute";
import "components/auth/UserState";
import "typeface-open-sans";

axios.defaults.baseURL = "http://localhost:3001";
(window as any).axios = axios;

const theme = MaterialStyles.createMuiTheme({
    typography: {
        fontFamily: "Open Sans",
        caption: {
            fontSize: "14px"
        }
    }
});

interface AppState {
    isAuthenticated: boolean;
}

export default class App extends React.Component<object, AppState> {
    readonly state = {
        isAuthenticated: false
    };

    public render() {
        return (
            <ReactRouter.BrowserRouter>
                <MaterialStyles.MuiThemeProvider theme={theme}>
                    <Navbar />
                    <ReactRouter.Switch>
                        <ReactRouter.Route path="/" exact component={scenes.index} />
                        <ReactRouter.Route path="/login" exact component={scenes.login} />
                        <PrivateRoute path="/media" component={scenes.media} authenticated={this.state.isAuthenticated} />
                    </ReactRouter.Switch>
                </MaterialStyles.MuiThemeProvider>
            </ReactRouter.BrowserRouter>
        );
    }
}
