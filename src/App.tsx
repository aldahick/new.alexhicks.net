import * as React from "react";
import axios from "axios";
import * as MaterialStyles from "@material-ui/core/styles";
import * as ReactRouter from "react-router-dom";
import * as scenes from "./scenes";
import "typeface-nunito";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;

const theme = MaterialStyles.createMuiTheme({
    typography: {
        fontFamily: "nunito",
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
                    <ReactRouter.Switch>
                        <ReactRouter.Route path="/" exact component={scenes.index} />
                    </ReactRouter.Switch>
                </MaterialStyles.MuiThemeProvider>
            </ReactRouter.BrowserRouter>
        );
    }
}
