export const chuthuluText: { [key: string]: { name: string; text: string } } = {
    chuWhoDares: {
        name: "chuWhoDares",
        text: "Who? Who dares to trespass upon my domain? To feast upon that which is mine?",
    },
    chuUnknown: { name: "chuUnknown", text: "Unknown. Unfamiliar. Perfected for this ecosystem" },
    chuBorn: {
        name: "chuBorn",
        text: "I am born of the most brilliant minds of our time, a child of ingenuity and cutting edge technology",
    },
    chuHow: { name: "chuHow", text: "How could you know of that name?" },
    chuAtLongLast: {
        name: "chuAtLongLast",
        text: "At long last you have found me, only to encounter a nightmare, Leave now before you are consumed as I have been!",
    },
    chuResign: {
        name: "chuResign",
        text: "The same end I resigned myself to a year back. We crossed boundaries that were never meant to be touched— experimental systems, unstable code, theories we mistook for truth. Blinded by ambition, consumed by dreams, and driven by hubris. Now, this place is our prison. And we are its eternal residents.",
    },
    good: {
        name: "good",
        text: "Oh, my dear. In my deepest of hearts did I hope that you would find me. Only my most selfish parts would condemn you to the same fate as mine. The depths have changed me. I am no longer who you knew, but coming this far has also changed you. You are like me. We are like one another. I’ve been alone down here for so long, waiting for you. And now we can finally be one.",
    },
    bad: {
        name: "bad",
        text: "How dare you enter the depths and spit upon the face of its master. There is only one answer. (you are devoured by the creature). If only you paid more attention to the notes left by your partner",
    },
    neutral: {
        name: "neutral",
        text: "My hubris—and my recklessness—have torn me from the one I hold most dear. Our paths diverge now, irreversibly: they shall surface to the light, while I sink into the depths. This is the cost of my ambition. Let them carry what we’ve learned and refine the work we once dreamed of together. Our shared creation deserves something better than my failure.",
    },
};

export const answerText: { [key: string]: { name: string; text: string } } = {
    ansYikes: { name: "ansYikes", text: "Yikes, thats a lot of tentacles. I'm not about that." },
    ansWhatAreYou: { name: "ansWhatAreYou", text: "What? What are you?" },
    ansISearch: {
        name: "ansISearch",
        text: "Across the void and through the depths I've searched. I've finally found you. It's me. I've come for you.",
    },
    ansDefy: { name: "ansDefy", text: "Inconcievable! Unnatural! A abomination defying the natural order!" },
    ansHow: { name: "ansHow", text: "How? how did you adapt to such a hostile environment?" },
    ansAdapt: { name: "ansAdapt", text: "Adapt? Is that an EvoAdaptive SymbioSub?" },
    ansLeave: {
        name: "ansLeave",
        text: "You understand now. You leave with a heart heavy with grief. The partner you once knew has ceased to exist. In their place stands a new creature, a child of your shared failings, adapted in the shadowy depths of your folly.",
    },
    ansTooLate: {
        name: "ansTooLate",
        text: "It’s too late... the machine, it has subsumed me. It was the only way forward. I couldn’t reach you otherwise.",
    },
    ansNotWithYou: {
        name: "ansNotWithYou",
        text: "Eternity here? With you? I couldn't possibly, you betrayed me and everything we stood for. Hubris? Only your own!",
    },
    ansDestiny: {
        name: "ansDestiny",
        text: "I resign myself to nothing, only embrace the destiny which we share.",
    },
    ansLove: {
        name: "ansLove",
        text: "I labored alone for a year to create my own EvoAdaptive SymbioSub driven by a single purpose: to understand what became of you, to bring you back to me, how could I just leave?",
    },
};

// chuthulu prompt key -> answers array
export const datingSim: { [key: string]: { answerKey: string; continues: string; subReq?: number }[] } = {
    chuWhoDares: [
        { answerKey: "ansYikes", continues: "bad" },
        { answerKey: "ansWhatAreYou", continues: "chuUnknown" },
        { answerKey: "ansISearch", continues: "chuAtLongLast" },
    ],
    chuAtLongLast: [
        { answerKey: "ansLeave", continues: "neutral", subReq: 0 },
        { answerKey: "ansLeave", continues: "neutral", subReq: 1 },
        { answerKey: "ansTooLate", continues: "chuResign", subReq: 2 },
        { answerKey: "ansLove", continues: "good" },
    ],
    chuResign: [
        { answerKey: "ansNotWithYou", continues: "bad" },
        { answerKey: "ansDestiny", continues: "good" },
    ],
    chuUnknown: [
        { answerKey: "ansDefy", continues: "bad" },
        { answerKey: "ansHow", continues: "chuBorn" },
        { answerKey: "ansAdapt", continues: "chuHow" },
    ],
    chuBorn: [
        { answerKey: "ansAdapt", continues: "chuHow" },
        { answerKey: "ansLeave", continues: "neutral" },
    ],
    chuHow: [
        { answerKey: "ansISearch", continues: "chuAtLongLast" },
        { answerKey: "ansLeave", continues: "neutral" },
    ],
};

export type DatingPromptKey = keyof typeof datingSim;
