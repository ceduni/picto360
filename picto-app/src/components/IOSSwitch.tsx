import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 32,
    height: 18,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(14px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#1c73fa',
                opacity: 1,
                border: 0,
                ...theme.applyStyles('dark', { backgroundColor: '#1c73fa' }),
            },
            '&.Mui-disabled + .MuiSwitch-track': { opacity: 0.5 },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': { color: '#33cf4d', border: '6px solid #fff' },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', { color: theme.palette.grey[600] }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', { opacity: 0.3 }),
        },
    },
    '& .MuiSwitch-thumb': { boxSizing: 'border-box', width: 14, height: 14 },
    '& .MuiSwitch-track': {
        borderRadius: 18 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], { duration: 500 }),
        ...theme.applyStyles('dark', { backgroundColor: '#39393D' }),
    },
}));

export default IOSSwitch;
