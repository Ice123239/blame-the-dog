const BlameTheDogGame = require('../src/gameLogic');

describe('BlameTheDogGame', () => {
  test('frames the cat when it hides after knocking an item', () => {
    const game = new BlameTheDogGame();

    game.knockItem(20);
    game.hideInBox();
    const result = game.ownerLooks();

    expect(result).toBe('FRAMED');
    expect(game.score).toBe(20);
    expect(game.combo).toBe(2);
    expect(game.isMessMade).toBe(false);
    expect(game.isCatHidden).toBe(false);
  });

  test('multiplies points by the combo for consecutive successful frames', () => {
    const game = new BlameTheDogGame();

    game.knockItem(10);
    game.hideInBox();
    game.ownerLooks();
    game.knockItem(20);
    game.hideInBox();
    game.ownerLooks();

    expect(game.score).toBe(50);
    expect(game.combo).toBe(3);
  });

  test('catches the cat and resets combo when it does not hide', () => {
    const game = new BlameTheDogGame();
    game.combo = 3;

    game.knockItem(10);
    const result = game.ownerLooks();

    expect(result).toBe('CAUGHT');
    expect(game.lives).toBe(2);
    expect(game.combo).toBe(1);
  });

  test('ends the game after three catches', () => {
    const game = new BlameTheDogGame();

    for (let attempt = 0; attempt < 3; attempt += 1) {
      game.knockItem();
      game.ownerLooks();
    }

    expect(game.status).toBe('GAME_OVER');
    expect(game.lives).toBe(0);
    expect(game.ownerLooks()).toBe('GAME_OVER');
  });
});