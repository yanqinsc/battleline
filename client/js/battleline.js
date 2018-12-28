$(function () {
    function log(v) {
        console.log(v)
    }

    const RESOURCES = 'resources/';
    const IMAGES = RESOURCES + 'images/';

    let BattleLine = function (canvas) {
        this.backgroundImages = {
            LesChoristes: IMAGES + 'bg/LesChoristes.jpg'
        };
        this.ctx = canvas;
        this.run = function (width) {
            let stage = new Stage(this.ctx, width);
            stage.setBackground(this.backgroundImages.LesChoristes).drawFlag();

        }
    };

    let Stage = function (ctx, width) {
        this.width = width;
        this.setBackground = function (images) {
            ctx.drawImage({
                index: 0,
                layer: true,
                source: images,
                x: this.width / 2, y: this.width / 3.55,
                width: this.width
            });
            return this;
        };

        this.drawFlag = function () {
            for (let i = 0; i < 8; i++) {
                ctx.drawArc({
                    layer: true,
                    fillStyle: '#f00',
                    strokeWidth: 5,
                    x: 100 + i*40, y: 100,
                    radius: 20
                });
            }
            return this;
        }
    };

    let width = window.screen.width,
        canvas = $('<canvas width="' + width + '" height="' + width + '"></canvas>');
    $('body').append(canvas);
    let battleLine = new BattleLine(canvas);
    battleLine.run(width);
});
