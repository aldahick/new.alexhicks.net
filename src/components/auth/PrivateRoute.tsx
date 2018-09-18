import * as React from "react";
import * as ReactRouter from "react-router-dom";
import UserState from "components/auth/UserState";

export default ({ component, ...rest }: ReactRouter.RouteProps) => {
    const Component = component!;
    return (
        <ReactRouter.Route
            {...rest}
            render={props => UserState.isAuthenticated
                ? <Component {...props} />
                : <ReactRouter.Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }}
                />
            }
        />
    );
};
