import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button-component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = () => {
        console.log('passou aqui');
        signInWithGooglePopup();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            switch (error.code){    
                case 'auth/wrong-password':
                    alert('Wrong password');
                    break;
                case 'auth/user-not-found':
                    alert('User not found');
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
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
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

                <div className="buttons-container">
                    <Button children="Sign In" inputOptions = {{
                        type: "submit"
                    }}/>

                    <Button onClick={ signInWithGoogle } children="Google Sign In" buttonType="google"
                        inputOptions = {{
                        type: "button"
                    }}
                    />
                </div>
            </form>
        </div>
    );
};

export default SignInForm;