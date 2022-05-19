import $ from 'jquery';
import './assets/style/style.scss';
import * as dice1 from './assets/img/dice-1.png';
import * as dice2 from './assets/img/dice-2.png';
import * as dice3 from './assets/img/dice-3.png';
import * as dice4 from './assets/img/dice-4.png';
import * as dice5 from './assets/img/dice-5.png';
import * as dice6 from './assets/img/dice-6.png';

// Store icon paths in array
const dices = new Array(dice1, dice2, dice3, dice4, dice5, dice6);

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
        game.interface.diceEl.removeClass('hidden');
        const diceValue = Math.trunc(Math.random() * 6) + 1;
        const diceIconPath = dices[diceValue - 1];
        game.interface.diceEl.prop('src', diceIconPath.default);
        if (diceValue !== 1) {
            game.currentScore += diceValue;
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
