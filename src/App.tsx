import * as React from "react";
import axios from "axios";
import * as MaterialStyles from "@material-ui/core/styles";
import * as ReactRouter from "react-router-dom";
import * as scenes from "scenes";
import Navbar from "components/Navbar";
import PrivateRoute from "components/auth/PrivateRoute";
import "components/auth/UserState";
import "typeface-open-sans";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";
(window as any).axios = axios;

const theme = MaterialStyles.createMuiTheme({
    typography: {
        fontFamily: "Open Sans",
        caption: {
            fontSize: "14px"
        }
    }
});

export default class App extends React.Component {
    public render() {
        return (
            <ReactRouter.BrowserRouter>
                <MaterialStyles.MuiThemeProvider theme={theme}>
                    <Navbar />
                    <ReactRouter.Switch>
                        <ReactRouter.Route path="/" exact component={scenes.IndexScene} />
                        <ReactRouter.Route path="/login" exact component={scenes.LoginScene} />
                        <PrivateRoute path="/media" component={scenes.MediaScene} />
                        <PrivateRoute path="/notes" component={scenes.NotesListScene} />
                        <PrivateRoute path="/note/:id" component={scenes.NoteEditScene} />
                    </ReactRouter.Switch>
                </MaterialStyles.MuiThemeProvider>
            </ReactRouter.BrowserRouter>
        );
    }
}
