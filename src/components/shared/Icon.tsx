import { Icon } from '@iconify/react';

interface IconProps {
    icon: string;
    rotate?: number;
    className?: string;
}

const CustomIcon: React.FC<IconProps> = ({ icon, rotate = 0, className = "" }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <Icon icon={icon} rotate={rotate} />
        </div>
    );
};

export default CustomIcon;
