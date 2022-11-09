import { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button-component";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user);
            
            await createUserDocumentFromAuth(user, { displayName });
           
            resetFormFields();
        } catch(error) {
            switch (error.code){    
                case 'auth/email-already-in-use':
                    alert('Email already registered');
                    break;
                case 'auth/weak-password':
                    alert('Weak password');
                    break;
                default:
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" inputOptions = {{
                    type: "text",
                    required: true,
                    onChange: handleChange,
                    name: "displayName",
                    value: displayName
                }} />

                <FormInput label="Email" inputOptions = {{
                    type: "email",
                    required: true,
                    onChange: handleChange,
                    name: "email",
                    value: email
                }}/>

                <FormInput label="Password" inputOptions = {{
                    type: "password",
                    required: true,
                    onChange: handleChange,
                    name: "password",
                    value: password
                }}/>

                <FormInput label="Confirm Password" inputOptions = {{
                    type: "password",
                    required: true,
                    onChange: handleChange,
                    name: "confirmPassword",
                    value: confirmPassword
                }}/>

                <Button children="Sign Up" inputOption = {{
                    type: "submit"
                }}/>
            </form>
        </div>
    );
};

export default SignUpForm;