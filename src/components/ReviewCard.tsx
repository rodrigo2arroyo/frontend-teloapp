import {Rating} from "primereact/rating";
import {classNames} from "primereact/utils";

type ReviewCardProps = {
    hotelName: string;
    rating: number;
    review: string;
    date: Date;
};

const ReviewCard = ({hotelName, rating, review, date} : ReviewCardProps) => {
    return (
        <div className="p-3 border-2 shadow-xl border-solid border-gray-300 rounded-md bg-white flex flex-col gap-4">
            <div className="flex justify-between items-start">
                <h2 className="text-base font-semibold text-gray-900">
                    {hotelName}
                </h2>
                <div className="flex gap-1 text-yellow-500">
                    <Rating
                        value={rating}
                        readOnly
                        cancel={false}
                        onIcon={(options) => (
                            <i
                                className={classNames(
                                    'pi pi-star-fill',
                                    'text-yellow-500 text-base',
                                    options.className
                                )}
                            />
                        )}
                        offIcon={(options) => (
                            <i
                                className={classNames(
                                    'pi pi-star',
                                    'text-gray-300 text-base',
                                    options.className
                                )}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <span>{review}</span>
                <span>{date.toDateString()}</span>
            </div>
        </div>
    );
};

export default ReviewCard;
