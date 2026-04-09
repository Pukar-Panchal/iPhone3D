export const animationWithGsap = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationPrps) => {

    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: "power2.inOut"
    })
    
    timeline.to(
        firstTarget, {
            ...animationPrps,
            ease: 'power2.inOut'
        },
        '<'
    )

    timeline.to(
        secondTarget, {
            ...animationPrps,
            ease: 'power2.inOut'
        },
        '<'
    )
}