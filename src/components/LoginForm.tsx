import FormField from "./shared/FormField.tsx";
import {Button} from "primereact/button";
import {useForm} from "react-hook-form";

type LoginFormData = {
    email: string;
    password: string;
}

const LoginForm = () => {
    const {register, getValues, formState: { errors },} = useForm<LoginFormData>();

    const loginUser = () => {
        const formData = getValues();
        console.warn(formData);
    }

    return(
        <div className="flex flex-col gap-4 pt-4">
            <FormField id="email" label="Email" required>
                <input
                    {...register("email", { required: true })}
                    id="email"
                    placeholder="Ingresa tu correo"
                    type="text"
                    className="p-inputtext"
                />
            </FormField>
            <FormField id="password" label="Password" required>
                <input
                    { ...register("password", { required: true }) }
                    id="password"
                    placeholder="Ingresa tu password"
                    type="password"
                    className="p-inputtext"
                />
            </FormField>
            <Button label="Ingresar" onClick={loginUser}></Button>
        </div>
    )
}

export default LoginForm;
