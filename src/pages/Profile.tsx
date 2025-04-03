import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import CustomIcon from "../components/shared/Icon.tsx";
import ReviewCard from "../components/ReviewCard.tsx";

const Profile = () => {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <Card>
                <div className="flex items-start gap-12 ">
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200">

                    </div>

                    <div className="flex flex-col justify-start">
                        <h1>Rodrigo Arroyo</h1>
                        <span className="flex flex-row gap-3"><CustomIcon icon="ic:baseline-phone" /> <p className="text-basetext-gray-600">+51 995 728 530</p> </span>
                        <span className="flex flex-row gap-3"><CustomIcon icon="material-symbols:mail" /> <p className="text-base text-gray-600">sarah@gnail.com</p> </span>
                    </div>
                </div>
            </Card>
            <Divider />
            <h2>Hoteles Favoritos</h2>
            <Divider />
            <h2>Mis Comentarios</h2>
            <div className="flex flex-col gap-4">
                <ReviewCard hotelName="My house suite" review="Yo creo que le falto mayor iluminacion y limpieza al cuarto vip" date={new Date()} rating={3} />
                <ReviewCard hotelName="hola" review="hola" date={new Date()} rating={4} />
                <ReviewCard hotelName="hola" review="hola" date={new Date()} rating={5} />
            </div>
        </div>
    )
}

export default Profile;
