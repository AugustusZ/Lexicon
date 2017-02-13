
$(function() {
    canvas = document.getElementById("canvas") // cannot use $("#") here
    canvas.width = 800;
    canvas.height = 800;
    ctx = canvas.getContext('2d');
    cW = canvas.width;
    cH = canvas.height;

    // background
    bk = new Image();
    bk.src = "img/bk800.jpg";
    bk.onload = function() {
        bk.crossOrigin = 'anonymous';
        ctx.drawImage(bk, 0, 0, cW, cH);
    }

    // font 
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "rgba(255,215,0," + 0.85 + ")";
});

$('#textbox').keyup(function() {
    ctx.drawImage(bk, 0, 0, cW, cH);

    var textArr = $('#textbox').val().trim().split('\n').map(s => s.trim());
    var maxLineLength = Math.max.apply(null, textArr.map(s => s.length));
    var fontSize = getFontSizePx(0.75, maxLineLength);

    ctx.font = fontSize + 'px Lexy';
    drawMultilineText(textArr, fontSize * 0.75);

    document.getElementById("saveanchor").href = canvas.toDataURL('image/jpeg', 1);
    document.getElementById("saveanchor").download = textArr.join('_') + '.jpg';
    document.getElementById("saveanchor").crossOrigin = "Anonymous";
});

drawMultilineText = function(textArr, h) {
    var numLine = textArr.length;
    // var h = lineHeight + lineSpacing
    for (var i = 0; i < numLine; i++) {
        var offset = h * (i - (numLine - 1) / 2.0);
        ctx.fillText(textArr[i], cW / 2, cH / 2 + offset);
    }
}

getFontSizePx = function(portion, maxLineLength) {
    return cW * portion * 1.5 / maxLineLength;
}