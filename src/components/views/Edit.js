import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormFieldInput = props => {
    return (
        <div className="register field">
            <label className="register label">
                {props.label}
            </label>
            <input
                className="register input"
                placeholder="enter here.."
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormFieldInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Edit = props => {
    const history = useHistory();
    const params = useParams();
    const [birthDate, setBirthDate] = useState(null);
    const [username, setUsername] = useState(null);

    const doEdit = async () => {
        try {
            const requestBody = JSON.stringify({username, birthDate});
            const response = await api.put(`/users/${params["id"]}`, requestBody);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push('/game/profile/'+params["id"]);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    const backToProfile = () => {
        history.push('/game/profile/'+params["id"]);
    }

    return (
        <BaseContainer>
            <div className="edit container">
                <h3 className="edit title">Edit Here.</h3>
                <div className="edit form">
                    <FormFieldInput
                        label="Username"
                        value={username}
                        onChange={un => setUsername(un)}
                    />
                    <FormFieldInput
                        label="BirthDate (format:YYYY-MM-DD)"
                        value={birthDate}
                        onChange={n => setBirthDate(n)}
                    />
                    <Button
                        disabled={!username&!birthDate}
                        width="100%"
                        onClick={() => doEdit()}
                    >
                        Save
                    </Button>
                    <Button
                        width="100%"
                        onClick={() => backToProfile()}
                    >
                        Back to Profile
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
export default Edit;
