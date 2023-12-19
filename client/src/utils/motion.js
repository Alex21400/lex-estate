export const slideIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === 'left' ? '-100vw' : direction === 'right' ? '100vw' : 0,
            y: direction === 'up' ? '100vh' : direction === 'down' ? '-100vh' : 0
        },
        show: {
            x: 0,
            y: 0,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: 'easeOut'
            }
        }
    }
}

export const fadeIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === 'left' ? '-100wv' : direction === 'right' ? '100wv' : 0,
            y: direction === 'up' ? '-100vh' : direction === 'down' ? '100vh' : 0
        },
        show: {
            x: 0,
            y: 0,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: 'easeOut'
            }
        }
    }
}