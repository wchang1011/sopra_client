import React from 'react';
import {handleError} from 'helpers/api';
import {NavLink, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Home.scss';
import BaseContainer from "components/ui/BaseContainer";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const Home = () => {
    const history = useHistory();
    const openLogin = async () => {
        try {
            history.push(`/login`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    const openRegister = async () => {
        try {
            history.push(`/register`);
        } catch (error) {
            alert(`Something went wrong during the register: \n${handleError(error)}`);
        }
    };


    return (
        <BaseContainer>
            <div className="home container">
                <h2 className="home title">Home</h2>
                <div className="login button-container">
                    <Button
                        width="100%"
                        onClick={() => openLogin()}
                    >
                        Login
                    </Button>
                </div>
                <div className="register button-container">
                    <Button
                        width="100%"
                        onClick={() => openRegister()}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Home;
