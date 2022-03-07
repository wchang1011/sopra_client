import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {NavLink, useHistory, useLocation, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Home.scss';
import BaseContainer from "components/ui/BaseContainer";
import user from "../../models/User";
import {Spinner} from "../ui/Spinner";
import PropTypes from "prop-types";
import "styles/views/Profile.scss";
import User from "../../models/User";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const Profile = () => {

    const history = useHistory();
    const params = useParams();
    console.log(params);
    console.log(params["id"]);
    const [user, setUser] = useState(null);

    const logout = () => {

        const response = api.put(`/logout/${localStorage.getItem('id')}`);

        localStorage.removeItem('token');
        localStorage.removeItem('id');
        history.push('/home');
    }

    const edit = () => {

        history.push('/game/profile/'+user.id+'/edit');
    }

    const usersList = () => {

        history.push('/game');
    }

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {

                const response = await api.get(`/users/${params["id"]}`);

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                setUser(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);

    let content = <Spinner/>;
    const PlayerProfile = ({user}) => (
        <div className="playerProfile container">
            <div className="playerProfile username">username: {user.username}</div>
            <div className="playerProfile status">logged_in: {user.status.toString()}</div>
            <div className="playerProfile createTime">createTime: {user.createTime}</div>
            <div className="playerProfile birthDate">birthDate: {user.birthDate}</div>
        </div>
    );

    PlayerProfile.propTypes = {
        user: PropTypes.object
    };

    if (user) {
        content = (
            <div className="profile">
                <ul className="profile user-list">
                    <PlayerProfile user={user}
                                   key={user.status}
                                   key={user.createTime}
                                   key={user.birthDate}/>
                </ul>
                <Button
                    width="100%"
                    onClick={() => logout()}
                >
                    Logout
                </Button>

                <Button
                    width="100%"
                    onClick={() => edit()}
                    disabled={localStorage.getItem('id')!=params["id"]}
                >
                    Edit
                </Button>

                <Button
                    width="100%"
                    onClick={() => usersList()}
                >
                    Users List
                </Button>
            </div>
        );
    }

    return (
        <BaseContainer className="profile container">
            <h2>Profile</h2>
            <p className="profile paragraph">
                Get user profile from secure endpoint:
            </p>
            {content}
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Profile;
