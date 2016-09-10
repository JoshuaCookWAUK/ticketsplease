function getCanvasSize(canvas) {
    return {
        width: (canvas.getBounds().x2 - canvas.getBounds().x1),
        height: (canvas.getBounds().y2 - canvas.getBounds().y1)
    };
}
