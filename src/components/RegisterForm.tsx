import FormField from "./shared/FormField.tsx";
import {Button} from "primereact/button";
import {useForm} from "react-hook-form";

type RegisterFormData = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone_number: string;
    confirmationCode: string;
};

const RegisterForm = () => {
    const {register, getValues, formState: { errors },} = useForm<RegisterFormData>();

    const registerUser = () => {
        const formData = getValues();
        console.log("Form Data:", formData);
    }

    return(
        <div className="flex flex-col gap-4 pt-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <FormField id="name" label="Nombre" required>
                        <input
                            {...register("name", { required: true })}
                            id="name"
                            placeholder="Ingresa tu nombre"
                            type="text"
                            className="p-inputtext"
                        />
                    </FormField>
                </div>
                <div className="flex flex-col gap-1">
                    <FormField id="lastName" label="Apellido" required>
                        <input
                            {...register("lastName", { required: true })}
                            id="lastName"
                            placeholder="Ingresa tu apellido"
                            type="text"
                            className="p-inputtext"
                        />
                    </FormField>
                </div>
            </div>
            <FormField id="email" label="Email" required>
                <input
                    {...register("email", {required: true}) }
                    id="email"
                    placeholder="Ingresa tu correo"
                    type="email"
                    className="p-inputtext"
                />
            </FormField>
            <FormField id="phonenumber" label="Numero de telefono">
                <input
                    {...register("phone_number")}
                    id="phone_number"
                    placeholder="Ingresa tu número de teléfono"
                    type="text"
                    className="p-inputtext"
                />
            </FormField>
            <FormField id="password" label="Password" required>
                <input
                    {...register("password", { required: true })}
                    id="password"
                    placeholder="Ingresa tu password"
                    type="password"
                    className="p-inputtext"
                />
            </FormField>
            <FormField id="confirmedpassword" label="Confirmar password" required>
                <input
                    {...register("password_confirmation", { required: true })}
                    id="password_confirmation"
                    placeholder="Ingresa tu password nuevamente"
                    type="password"
                    className="p-inputtext"
                />
            </FormField>
            <Button onClick={registerUser} label="Crear cuenta"></Button>
        </div>
    )
}

export default RegisterForm;
