import { makeStyles, tokens } from '@fluentui/react-components';

export const MaskedColumnStyles = makeStyles({
    root: {
        position: 'relative',
        width: '100%',
    },
    input: {
        width: '100%',
        paddingRight: '48px',
    },
    toggleButton: {
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        minWidth: '24px',
        height: '24px',
        padding: '0',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        zIndex: 1,
        '&:hover': {
            backgroundColor: tokens.colorNeutralBackground1Hover,
            borderRadius: '4px',
        },
        '&:active': {
            backgroundColor: tokens.colorNeutralBackground1Pressed,
        },
    }
});