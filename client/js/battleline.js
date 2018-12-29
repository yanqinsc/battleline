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
            stage.drawFlag().drawCardHead()
            .setBackground(this.backgroundImages.LesChoristes);

        }
    };

    let Stage = function (ctx, width) {
        this.setBackground = function (images) {
            ctx.drawImage({
                index: 0,
                layer: true,
                source: images,
                x: width / 2, y: width / 3.55,
                width: width
            });
            return this;
        };

        this.flags = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.drawFlag = function () {
            for (let i = 0; i < this.flags.length; i++) {
                ctx.drawArc({
                    layer: true,
                    index: 1,
                    fillStyle: '#f00',
                    strokeWidth: 5,
                    x: width / 5 + i * width * 0.09, y: width / 4,
                    radius: 15
                });
            }
            return this;
        };

        this.drawCard = function () {
            ctx.drawImage({
                index: 2,
                layer: true,
                source: IMAGES + 'cards/soldiers.jpg',
                x: 100, y: width / 5.5,
                width: width * 0.08,
                height: width * 0.11
            }).drawImage({
                index: 2,
                layer: true,
                source: IMAGES + 'cards/strategies.jpg',
                x: 100, y: width / 3.3,
                width: width * 0.08,
                height: width * 0.11
            });
            return this;
        }
    };

    let width = window.screen.width,
        canvas = $('<canvas width="' + width + '" height="' + width + '"></canvas>');
    $('body').append(canvas);
    let battleLine = new BattleLine(canvas);
    battleLine.run(width);
});
