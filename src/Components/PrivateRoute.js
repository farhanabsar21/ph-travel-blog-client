import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { userAuthData } from '../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [userLog, setUserLog] = useContext(userAuthData);
    return (
        <div>
           <Route
            {...rest}
            render={({ location }) =>
            userLog.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        /> 
        </div>
    );
};

export default PrivateRoute;