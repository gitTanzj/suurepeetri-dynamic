export const pageTransitionToRight = {
    initial: { x: "100%", transition: { duration: 0.5, ease: [0.43, 0.23, 0.23, 0.96]}},
    animate: { x: 0, transition: { duration: 0.5, ease: [0.43, 0.23, 0.23, 0.96]} },
    exit: { x: "100%", transition: { duration: 0.5, ease: [0.43, 0.23, 0.23, 0.96]}},
}

export const pageTransitionToLeft = {
    initial: { x: "-100%", transition: { duration: 0.5, ease: [0.43, 0.23, 0.23, 0.96]}},
    animate: { x: 0, transition: { duration: 0.5, ease: [0.43, 0.23, 0.23, 0.96]}},
    exit: { x: "-100%", transition: { duration: 0.5, ease: [0.43, 0.23, 0.23, 0.96]}}
}