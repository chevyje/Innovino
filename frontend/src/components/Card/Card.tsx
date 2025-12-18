import type {ReactNode, HTMLAttributes} from 'react';
import Style from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export default function Card({ children, className, ...rest }: CardProps) {
    return (
        <div
            className={`${Style.cardContainer} ${className ?? ''}`}
            {...rest}
        >
            {children}
        </div>
    );
}
