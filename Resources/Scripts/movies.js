ScrollTrigger.create({
    animation: gsap.from("header", {
        y: "45vh",
        scale: 1.5,
        yPercent: -50,
    }),
    scrub: true,
    trigger: "ul",
    start: "top bottom",
    endTrigger: "ul",
    end: "top center",
})

ScrollTrigger.create({
    animation: gsap.from(".head", {
        color: '#141414',
    }),
    scrub: true,
    trigger: "ul",
    start: "top bottom",
    endTrigger: "ul",
    end: "top center",
})

ScrollTrigger.create({
    animation: gsap.from("nav", {
        background: 'transparent',
    }),
    scrub: true,
    trigger: "ul",
    start: "top bottom",
    endTrigger: "ul",
    end: "top center",
})