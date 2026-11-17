(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BlameTheDogGame = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  class BlameTheDogGame {
    constructor() {
      this.score = 0;
      this.combo = 1;
      this.lives = 3;
      this.isMessMade = false;
      this.isCatHidden = false;
      this.pendingPoints = 0;
      this.status = 'IDLE';
    }

    knockItem(itemPoints = 10) {
      if (this.status === 'GAME_OVER') {
        return;
      }

      this.isMessMade = true;
      this.pendingPoints = Number.isFinite(itemPoints) ? itemPoints : 10;
      this.status = 'MESS_MADE';
    }

    hideInBox() {
      if (this.status !== 'GAME_OVER') {
        this.isCatHidden = true;
      }
    }

    ownerLooks() {
      if (this.status === 'GAME_OVER') {
        return 'GAME_OVER';
      }

      if (this.isMessMade && this.isCatHidden) {
        this.score += this.pendingPoints * this.combo;
        this.combo += 1;
        this.isMessMade = false;
        this.isCatHidden = false;
        this.pendingPoints = 0;
        this.status = 'FRAMED';
        return 'FRAMED';
      }

      if (this.isMessMade) {
        this.lives = Math.max(0, this.lives - 1);
        this.combo = 1;
        this.isMessMade = false;
        this.isCatHidden = false;
        this.pendingPoints = 0;
        this.status = this.lives === 0 ? 'GAME_OVER' : 'CAUGHT';
        return this.status;
      }

      return this.status;
    }
  }

  return BlameTheDogGame;
}));