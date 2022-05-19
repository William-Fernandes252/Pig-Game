// Define player, UI and game properties

declare interface Player {
    readonly scoreEl: JQuery<HTMLElement>;
    readonly currentScoreEl: JQuery<HTMLElement>;
    readonly sectionEl: JQuery<HTMLElement>;
    score: number;
}

declare interface UI {
    readonly diceEl: JQuery<HTMLElement>;
    readonly holdBtn: JQuery<HTMLElement>;
    readonly newBtn: JQuery<HTMLElement>;
    readonly rollBtn: JQuery<HTMLElement>;
    readonly playersSections: JQuery<HTMLElement>;
}

declare interface PigGame {
    readonly players: Player[];
    activePlayer: number;
    currentScore: number;
    lastWinner: number | undefined;
    reset: CallableFunction;
    togglePlayer: CallableFunction;
    setWinner: CallableFunction;
    interface: UI;
    toggleControls: CallableFunction;
}

declare module '*.png' {
    const value: any;
    export = value;
}
