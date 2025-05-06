import { useState } from "react"
import { useNavigate } from "react-router"
import supabase from "../../supabase/supabase-client"
import { FormSchemaLogin, ConfirmSchemaLogin, getErrors, getFieldError } from "../../lib/validationForm"

function LoginPage() {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedFields, setTouchedFields]  = useState({});
    const [formState, setFormState] = useState({
        email:"",
        password:"",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const { error, data } = ConfirmSchemaLogin.safeParse(formState);
        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors)
            console.log(errors);
        } else {
            
            let { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password
            });
            if (error) {
                alert("Signign in error 👎!");
            } else {
                alert("Signed in 👍!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }   
        }
    };

    const onBlur = (property) => () => {
        const message = getFieldError( property, formState[property]);
        setFormErrors((prev) => ({...prev, [property]: message}));
        setTouchedFields((prev) => ({...prev, [property]: true}));
    }

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
    }

    return(
        <div className="container-fluid p-5 mt-5 d-flex justify-content-center">
        <form onSubmit={onSubmit} noValidate className="form-login">
        <h1 className="text-center pb-4">Login</h1>
            <label htmlFor="email">Email:</label>
            <input className="inputLogin"
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={setField("email")}
                onBlur={onBlur("email")}
                aria-invalid={isInvalid("email")}
                required
                autoComplete="username"
            />
            {formErrors.email && <small className="text-danger fw-bold my-1">{formErrors.email}</small>}

            <label htmlFor="password"  className="mt-3">Password:</label>
            <input className="inputLogin"
                type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={setField("password")}
                onBlur={onBlur("password")}
                aria-invalid={isInvalid("password")}
                required
                autoComplete="current-password"
            />
            {formErrors.password && <small className="text-danger fw-bold my-1">{formErrors.password}</small>}

            <br />
            <button type="submit" className="btn btn-outline-success btnlogin">Sign in</button>

        </form>
    </div>
    )
}

export default LoginPage