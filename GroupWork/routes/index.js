var express = require('express');
var router = express.Router();


// デフォルトルーティング

router.get('/', function (request, response) {
	response.render('index', { title: 'Sample Node.js', message: 'New game!', img: 'white.jpg' });
});


router.post('/game', function (request, response) {
	if (request.body.checkFlg == 'false') {
		response.render('missBoard', { title: 'Sample Node.js', message: '駒の数か位置がおかしいぞ！!', img: request.body.image.split(",") });
	} else {
		response.render('game', { title: 'Sample Node.js', message: 'New game!', img: request.body.image.split(",") });
	}
	//next();
});
/*
router.post('/game', function (request, response) {
	console.log("駒チェックsoto");
	console.log(request.body.checkFlg);
	if (request.body.checkFlg == 'false') {
		console.log("駒チェック");
		response.render('index', { title: 'Sample Node.js', message: '駒の数がおかしいぞ！!', img: request.body.image.split(",") });
	}
});
*/

module.exports = router;