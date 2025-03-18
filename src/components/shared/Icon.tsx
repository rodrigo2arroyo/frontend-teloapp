import { Icon } from '@iconify/react';

interface IconProps {
    icon: string;
    rotate?: number;
    className?: string;
}

const CustomIcon: React.FC<IconProps> = ({ icon, rotate = 0, className = "" }) => {
    return (
        <span className={`flex items-center justify-center ${className}`}>
            <Icon icon={icon} rotate={rotate} />
        </span>
    );
};

export default CustomIcon;
