function microLite(i) {

	var childNode = i.children[0],
		body = document.body,
		zoomPadding = 50,
		windowWidth = window.innerWidth - (zoomPadding * 2),
		windowHeight = window.innerHeight - (zoomPadding * 2),
		imgWidth = childNode.width,
		imgHeight = childNode.height,
		imgX = childNode.offsetLeft,
		imgY = parseInt(childNode.offsetTop - (document.documentElement.scrollTop || body.scrollTop)),
		scaleX = windowWidth / imgWidth,
		scaleY = windowHeight / imgHeight,
		scaleMax = Math.min(scaleX, scaleY),
		mlite = document.createElement('div');

	if (scaleX <= scaleY) {
		var zoomX = zoomPadding,
			zoomY = ((windowHeight - (imgHeight * scaleMax)) / 2) + zoomPadding;
	} else {
		var zoomX = ((windowWidth - (imgWidth * scaleMax)) / 2) + zoomPadding,
			zoomY = zoomPadding;
	}

	mlite.setAttribute('id', 'ml');
	mlite.setAttribute(
		'onclick',
		'this.className = " "; addEventListener("transitionend", function() { if (this.parentNode) { this.parentNode.removeChild(this); } });'
	);
	mlite.innerHTML = '<div class="mlbg"></div><div class="mli"></div><style>#ml{cursor:pointer;position:fixed;top:0;left:0;width:100%;height:100%}.mlbg{position:fixed;width:100%;height:100%;background:#0a0a0a;opacity:0;will-change:opacity;transition:opacity .4s ease}.mli{background:url(' + i.href + ')no-repeat center,url(' + childNode.src + ')no-repeat center;background-size:contain;width:' + childNode.width + 'px;height:' + childNode.height + 'px;transform:translate3d(' + imgX + 'px, ' + imgY + 'px, 0) scale(1);transform-origin:top left;will-change:transform;transition:transform .4s ease}.s .mlbg{opacity:0.8}.s .mli{transform: translate3d(' + zoomX + 'px, ' + zoomY + 'px, 0) scale(' + scaleMax + ')}</style>';
	body.appendChild(mlite);

	setTimeout(function() {
		mlite.className = 's';
	}, 20);

	window.addEventListener('wheel', function(e) {
		var mliteOpen = document.getElementById('ml');
		if (mliteOpen) {
			e.preventDefault();
		} else {
			window.onwheel = null;
		}
	});

	window.addEventListener('keydown', function(e) {
		var mliteOpen = document.getElementById('ml');
		var isEscape = false;
		if (mliteOpen) {
			if ("key" in e) {
				isEscape = (e.key == "Escape" || e.key == "Esc");
			} else {
				isEscape = (e.keyCode == 27);
			}
			if (isEscape) {
				mliteOpen.className = " ";
				addEventListener("transitionend", function() {
					if (mliteOpen.parentNode) {
						mliteOpen.parentNode.removeChild(mliteOpen);
					}
				});
			}
		} else {
			window.onkeydown = null;
		}
	});
}
