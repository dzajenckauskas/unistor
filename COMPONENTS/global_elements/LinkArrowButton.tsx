import EastIcon from '@mui/icons-material/East';
import Button from "@mui/material/Button";
import { useState } from "react";
import WestIcon from '@mui/icons-material/West';

type Props = {
    onClick?: () => void;
    variant?: 'contained' | 'outlined';
    direction?: 'next' | 'back';
}

export const LinkArrowButton = ({ onClick, variant = 'contained', direction = 'next' }: Props) => {
    const [active, setActive] = useState(false)
    return (
        <Button
            aria-label="expand button"
            variant={variant}
            color='secondary'
            onClick={() => {
                onClick && onClick()
            }}
            onMouseEnter={() => {
                setActive(!active)
            }}
            onMouseLeave={() => {
                setActive(!active)
            }}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
                width: '36px',
                minWidth: 36,
                height: '36px',
                cursor: 'pointer',
            }}>
            {direction === 'next' &&
                <EastIcon sx={{
                    width: 18,
                    height: 18,
                    transition: 'transform .8s ease',
                    transform: active ? 'scale(1.2)' : 'scale(1)'
                }} />}
            {direction === 'back' &&
                <WestIcon sx={{
                    width: 18,
                    height: 18,
                    transition: 'transform .8s ease',
                    transform: active ? 'scale(1.2)' : 'scale(1)'
                }} />}
        </Button>
    )
}