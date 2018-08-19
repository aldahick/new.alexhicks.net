import * as React from "react";
import * as ReactRouter from "react-router-dom";
import UserState from "components/auth/UserState";

interface PrivateRouteProps extends ReactRouter.RouteProps {
    component: React.ComponentType<any>;
    authenticated: boolean;
}

export default ({ component, ...rest }: PrivateRouteProps) => {
    const Component = component;
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
