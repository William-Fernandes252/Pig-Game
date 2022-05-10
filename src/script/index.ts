import $ from 'jquery';
import '../style/style.scss';

// Define player, UI and game properties
interface Player {
    readonly scoreEl: JQuery<HTMLElement>;
    readonly currentScoreEl: JQuery<HTMLElement>;
    readonly sectionEl: JQuery<HTMLElement>;
    score: number;
}
interface UI {
    readonly diceEl: JQuery<HTMLElement>;
    readonly holdBtn: JQuery<HTMLElement>;
    readonly newBtn: JQuery<HTMLElement>;
    readonly rollBtn: JQuery<HTMLElement>;
    readonly playersSections: JQuery<HTMLElement>;
}
interface PigGame {
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

// Declare game instance
const game: PigGame = {
    players: [
        {
            scoreEl: $('#score--0'),
            currentScoreEl: $('#current--0'),
            sectionEl: $('.player--0'),
            score: 0,
        },
        {
            scoreEl: $('#score--1'),
            currentScoreEl: $('#current--1'),
            sectionEl: $('.player--1'),
            score: 0,
        },
    ],
    activePlayer: 0,
    currentScore: 0,
    lastWinner: undefined,
    interface: {
        diceEl: $('.dice'),
        holdBtn: $('.btn--hold'),
        newBtn: $('.btn--new'),
        rollBtn: $('.btn--roll'),
        playersSections: $('.player'),
    },
    togglePlayer: function () {
        this.players[game.activePlayer].currentScoreEl.text('0');
        this.activePlayer = game.activePlayer === 0 ? 1 : 0;
        this.currentScore = 0;
        this.interface.playersSections.toggleClass('player--active');
    },
    toggleControls: function (on: boolean) {
        this.interface.holdBtn.prop('disabled', !on);
        this.interface.rollBtn.prop('disabled', !on);
    },
    setWinner: function (playerId: number) {
        this.players[playerId].sectionEl.addClass('player--winner');
        this.lastWinner = playerId;
        this.toggleControls(false);
    },
    reset: function (firstPlayer: number = 0) {
        this.players.forEach(player => {
            player.score = 0;
            player.scoreEl.text('0');
            player.currentScoreEl.text('0');
        });
        this.activePlayer = firstPlayer;
        this.currentScore = 0;
        this.interface.diceEl.addClass('hidden');
        this.interface.playersSections.removeClass('player--winner');
        this.toggleControls(true);
    },
};

// Rolling dice functionality
game.interface.rollBtn.on({
    click: function () {
        const dice = Math.trunc(Math.random() * 6) + 1;
        game.interface.diceEl.removeClass('hidden');
        game.interface.diceEl.attr('src', `./img/dice-${dice}.png`);
        if (dice !== 1) {
            game.currentScore += dice;
            game.players[game.activePlayer].currentScoreEl.text(
                game.currentScore
            );
        } else {
            game.togglePlayer();
        }
    },
});

// Hold points functionality
game.interface.holdBtn.on({
    click: function () {
        game.players[game.activePlayer].score += game.currentScore;
        if (game.players[game.activePlayer].score >= 100) {
            game.setWinner(game.activePlayer);
        } else {
            game.players[game.activePlayer].scoreEl.text(
                game.players[game.activePlayer].score
            );
            game.togglePlayer();
        }
    },
});

// Reset game functionality
game.interface.newBtn.on({
    click: () => game.reset(game.lastWinner),
});

// Close rules modal
$('.close-modal, .overlay').on('click', () =>
    $('.modal, .overlay').addClass('hidden')
);

// Starting conditions
game.reset();
