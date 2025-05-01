import { useState } from "react";
import { ConfirmSchema, getErrors, getFieldError } from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router";

function RegisterPage() {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchema.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
            console.log(errors);
        } else {
            let { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.username
                    }
                }
            });
            if (error) {
                alert("Signing up error 👎🏻!");
            } else {
                alert("Signed up 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 500));
                navigate("/");
            }
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property]);
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        setTouchedFields((prev) => ({ ...prev, [property]: true }));
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedFields[property]) {
            return !!formErrors[property];
        }
        return undefined;
    }

    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value,
        }));
    };


    return (
        <div className="container-fluid p-5 mt-5 d-flex justify-content-center">
            
            <form onSubmit={onSubmit} noValidate className=" form-register">
            <h1 className="text-center pb-4">Register</h1>
                <label htmlFor="email">Email:</label>
                <input className="inputRegister"
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={setField("email")}
                    onBlur={onBlur("email")}
                    aria-invalid={isInvalid("email")}
                    required
                />
                {formErrors.email && <small className="text-danger fw-bold my-1">{formErrors.email}</small>}

                <label htmlFor="firstName" className="mt-3">First Name:</label>
                <input className="inputRegister"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={setField("firstName")}
                    onBlur={onBlur("firstName")}
                    aria-invalid={isInvalid("firstName")}
                    required
                />
                {formErrors.firstName && <small className="text-danger fw-bold my-1">{formErrors.firstName}</small>}

                <label htmlFor="lastName" className="mt-3">Last Name:</label>
                <input className="inputRegister"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={setField("lastName")}
                    onBlur={onBlur("lastName")}
                    aria-invalid={isInvalid("lastName")}
                    required
                />
                {formErrors.lastName && <small className="text-danger fw-bold my-1">{formErrors.lastName}</small>}

                <label htmlFor="username" className="mt-3">Username:</label>
                <input className="inputRegister"
                    type="text"
                    id="username"
                    name="username"
                    value={formState.username}
                    onChange={setField("username")}
                    onBlur={onBlur("username")}
                    aria-invalid={isInvalid("username")}
                    required
                />
                {formErrors.username && <small className="text-danger fw-bold my-1">{formErrors.username}</small>}

                <label htmlFor="password" className="mt-3">Password:</label>
                <input className="inputRegister"
                    type="password"
                    id="password"
                    name="password"
                    value={formState.password}
                    onChange={setField("password")}
                    onBlur={onBlur("password")}
                    aria-invalid={isInvalid("password")}
                    required
                />
                {formErrors.password && <small className="text-danger fw-bold my-1">{formErrors.password}</small>}

                
                <button type="submit" className="btn btn-outline-success btnRegister">Sign Up</button>

            </form>
        </div>
    );
}

export default RegisterPage;