function centerTextXY(context, text, colour, size, bounds, offset) {
	context.fillStyle = colour;
	context.font = size + "px Arial";
	var newLocation = {
		x: ((bounds.x2 - bounds.x1) / 2) - (context.measureText(text).width / 2),
		y: (bounds.y2 / 2) - (size / 2)
	}
	if(offset != null) {
		if(offset.x != null) newLocation.x += offset.x;
		if(offset.y != null) newLocation.y += offset.y;
	}
	context.fillText(text, newLocation.x, newLocation.y);
}
