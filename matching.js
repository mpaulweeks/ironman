function compare(x, y) {
  if (x === y) {
	return 0;
  }
  return x > y ? 1 : -1;
}

function main(){
	var players = [
		{ name: "orzhov", first: "w", second: "b" },
		{ name: "gruul", first: "r", second: "g" },
		{ name: "azorius", first: "w", second: "u" },
		{ name: "simic", first: "g", second: "u" },
// 		{ name: "boros", first: "r", second: "w" },
// 		{ name: "selesnya", first: "g", second: "w" },
// 		{ name: "dimir", first: "u", second: "b" },
// 		{ name: "izzet", first: "u", second: "r" },
	];
	
	players.sort(function(a,b){
		return compare(a.name, b.name);
	});
	
	var pairs = [];
	for(i1 = 0; i1 < players.length; i1++){
		for(i2 = i1 + 1; i2 < players.length; i2++){
			var p1 = players[i1];
			var p2 = players[i2];
			if(p1.name != p2.name){
				score = 0;
				if(p1.first == p2.first){
					score += 3;
				}
				if(p1.second == p2.first){
					score += 2;
				}
				if(p1.first == p2.second){
					score += 2;
				}
				if(p1.second == p2.second){
					score += 1;
				}
				pairs.push({ players: [p1, p2], score: score });
			}
		};
	};
	
	pairs.sort(function(a,b){
		return compare(a.score, b.score);
	});	
	
	pairs = pairs.filter(function (p){ return p.score > 0 });	
	
	pairs.forEach(function (p){
		$('#out').append('<br/>' + p.score + ': ' + p.players[0].name +',' + p.players[1].name);
	});
	
// 	return;
	
	
	var onlyUnique = function(value, index, self) { 
		return self.indexOf(value) === index;
	};
	
	var solutions = [];
	for(i1 = 0; i1 < pairs.length; i1++){
		for(i2 = i1 + 1; i2 < pairs.length; i2++){
			for(i3 = i2 + 1; i3 < pairs.length; i3++){
				for(i4 = i3 + 1; i4 < pairs.length; i4++){
					p1 = pairs[i1];
					p2 = pairs[i2];
					p3 = pairs[i3];
					p4 = pairs[i4];
					var peeps = p1.players
						.concat(p2.players)
						.concat(p3.players)
						.concat(p4.players);						
					if(peeps.filter(onlyUnique).length == players.length){
						var minscore = p1.score;
						if(p2.score < minscore){
							minscore = p2.score;
						}
						if(p3.score < minscore){
							minscore = p3.score;
						}
						if(p4.score < minscore){
							minscore = p4.score;
						}
						solutions.push({ pairs: [p1,p2,p3,p4], minscore: minscore});
					}
				};
			};
		};
	};

	solutions.sort(function(a,b){
		return compare(b.minscore, a.minscore);
	});	

	function printSol(sol){
		var names = '';
		sol.pairs.forEach(function (p){
			names += '[' + p.players[0].name + ',' + p.players[1].name + ']';
		});
		return '<br/>' + sol.minscore + ':' + names;
	};

	solutions.forEach(function(sol){
		$('#out').append(printSol(sol));
	});
}