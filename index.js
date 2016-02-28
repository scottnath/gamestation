var express = require('express'),
	path = require('path'),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	exec = require('child_process').exec;
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'/public/index.html'));
});

app.use('/public', express.static('public'));

// app.use('/game/:id', function (req, res, next) {
//   console.log('Request Type:', req.params);

//   next();
// });

app.post('/game/:filename', function(req, res){
	var gamefilename = req.params.filename;
	console.log('body: ' + JSON.stringify(req.params));
	console.log('gameid: ' + gamefilename);
	gameKicker(gamefilename);
	res.send(req.body);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('GameStation listening at fuckin http://%s:%s', host, port);

});

function gameKicker(gamefilename){
//	exec('/opt/retropie/emulators/retroarch/bin/retroarch -L /opt/retropie/libretrocores/lr-imame4all/mame2000_libretro.so /home/pi/RetroPie/roms/mame-mame4all/' + gamefilename + '.zip --config /opt/retropie/configs/all/retroarch.cfg', function(error, stdout, stderr) {
//	
//	// NEED TO EXIT GAME FIRST
//	// BONUS ROUND: EXIT TO NODE APP!
	exec('/opt/retropie/supplementary/runcommand/runcommand.sh 0 _SYS_ mame-mame4all ' + gamefilename + '.zip', function(error, stdout, stderr) {
	  if (!error) {
	    console.log('// things worked!');
	  } else {
	    console.log('// things failed :(');
	  }
	});
}