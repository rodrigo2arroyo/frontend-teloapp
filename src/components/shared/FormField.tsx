import PropTypes from "prop-types";

const FormField = ({ id, label, required = false, children }) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={id} className="flex items-center gap-1 text-xs font-medium text-primary">
                    {label}
                    {required && <div className="after:text-red-500 after:content-['*']" />}
                </label>
            )}
            {children}
        </div>
    );
};

FormField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default FormField;
