export default {
    component: {
        width: '100%',
        display: 'inline-block',
        verticalAlign: 'top',
        padding: '10px',
        '@media (max-width: 640px)': {
            width: '100%',
            display: 'block'
        }
    },
    node: {
        base: {
            position: 'relative'
        },
        link: {
            cursor: 'pointer',
            position: 'relative',
            padding: '0px 5px',
            display: 'block'
        },
        activeLink: {
            background: 'gray'
        }
    }
};