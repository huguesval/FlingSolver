/* Globals */

var ROWS = 8;
var COLS = 7;
var NORTH = 0;
var SOUTH = 1;
var WEST = 2;
var EAST = 3;
var ALLDIR = 4;
var solution = new Array();
var curStep = 0;


function init(){
	initGraph();
	addMouseListener();
}


function initGraph(){
	for(var i = 0;i<ROWS;i++){
		for(var j = 0;j<COLS;j++){
			if((i+j)%2 == 0)
				var div = '<div id="'+i+j+'" class="backlight"></div>';
			else
				var div = '<div id="'+i+j+'" class="backdark"></div>';
			
			$(div).appendTo("#board");
		}
	}
}

function solve(){
	var balls = getArrayOfBalls();
	

	/* Array tests //*/
	//balls = [[0,0,1,1,0,0,0],[0,0,0,0,0,1,0],[1,0,0,0,0,1,0],[0,0,0,0,0,0,0],[0,0,0,0,1,0,0],[0,0,0,0,1,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
	//balls=[[1,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
	//balls = [[0,0,1,1,0,0,0,],[0,0,0,0,0,1,0,],[1,0,0,0,0,1,0,],[0,0,0,0,0,0,0,],[1,0,0,0,1,0,0,],[0,0,0,0,1,0,0,],[0,0,0,0,0,0,0,],[1,0,0,0,0,0,0,]];
	//balls = [[1,0,0,0,1,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,1,1],[0,0,1,0,0,0,0],[0,0,0,1,0,0,1]];
	//balls = [[0,0,0,0,0,0,1,],[0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,],[1,0,0,0,0,0,1,],[0,0,0,1,1,1,0,],[1,0,0,1,1,0,0,],[0,0,0,0,0,0,1,],[0,0,0,0,0,0,0,]];
	//balls = [[0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,],[0,1,0,0,0,0,0,],[0,0,0,1,1,1,0,],[1,0,0,1,0,1,0,],[0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,]];


	/*for(var i = 0;i<ROWS;i++){
		for(var j = 0;j<COLS;j++){
			removeBallFrom($('#'+i+j));
			if(balls[i][j])
				addBallTo($('#'+i+j), false);
		}
	}//*/
	//debugArray2(balls);
	var result = "";
	if(sumBalls(getArrayOfBalls()) == 0)
		result = 'Add at least two balls!<br /> <input type="button" value="solve" onclick="javascript:solve();" /><input type="button" value="clear" onclick="javascript:clearBoard();" />';
	else if(depthFirst(balls) === false)
		result = 'No Solution! <br /> <input type="button" value="solve" onclick="javascript:solve();" /><input type="button" value="clear" onclick="javascript:clearBoard();" />';
	else{
		result = 'Solution found! With '+solution.length+' steps<br /><input disabled="disabled" id="prev" type="button" value="prev" onclick="javascript:prevStep()" /><input id="next" type="button" value="next" onclick="javascript:nextStep()" /><input type="button" value="clear" onclick="javascript:clearBoard();" />';
	}
	$("#result").html(result);
	
}

function clearBoard(){
		
	curStep = 0;
	solution = new Array();

	for(var i = 0;i<ROWS;i++)
		for(var j = 0;j<COLS;j++)
			removeBallFrom($('#'+i+j));

	var h = 'Fling Solver<br /><input type="button" value="solve" onclick="javascript:solve();" /><input type="button" value="clear" onclick="javascript:clearBoard()" />';

	$("#result").html(h);
}

function nextStep(){
	if(curStep >= solution.length) $("#next").prop('disabled', true);

	if(curStep == 0)
		balls = getArrayOfBalls();
	else
		balls = solution[curStep-1].balls;
	var src = "";

	for(var i = 0;i<ROWS;i++){
		for(var j = 0;j<COLS;j++){
			if(!balls[i][j] && $('#'+i+j).children('img').length !== 0){
				src = $('#'+i+j).children('img').attr('src');
				removeBallFrom($('#'+i+j));
			}
		}
	}

	for(var i = 0;i<ROWS;i++){
		for(var j = 0;j<COLS;j++){
			if(balls[i][j] && $('#'+i+j).children('img').length === 0)
				addBallTo($('#'+i+j), src);
		}
	}//*/
	
	if(solution[curStep].dir==NORTH){
		var style= '-webkit-transform: rotate('+0*90+'deg);-moz-transform:rotate('+0*90+'deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation='+0+');';
	}
	else if(solution[curStep].dir==SOUTH){
		var style= '-webkit-transform: rotate('+2*90+'deg);-moz-transform:rotate('+2*90+'deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation='+2+');';
	}
	else if(solution[curStep].dir==WEST){
		var style= '-webkit-transform: rotate('+3*90+'deg);-moz-transform: rotate('+3*90+'deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation='+3+');';
	}
	else if(solution[curStep].dir==EAST){
		var style= '-webkit-transform: rotate('+1*90+'deg);-moz-transform: rotate('+1*90+'deg);filter: progid:DXImageTransform.Microsoft.BasicImage(rotation='+1+');';
	}
	

	var arrow = '<img src="img/arrow.png" alt="arrow" class="arrow" style="'+style+'" />';
	
	$(arrow).appendTo("#"+solution[curStep].row+solution[curStep].col);

	animateArrow(solution[curStep].dir,false);

	curStep++;
	if(curStep > 0) $("#prev").prop('disabled', false);
}

function prevStep(){
	$("#next").prop('disabled', false);
	if(curStep <= 1) $("#prev").prop('disabled', true);
	if(curStep == 1) curStep--;
	else curStep = curStep-2;
	nextStep();
}

function animateArrow(dir,comeback){
	
	if(comeback === false){
		if(dir == NORTH) $('.arrow').animate( { top:'+=20px' }, 200, function() { animateArrow(dir, true) });
		else if(dir == EAST) $('.arrow').animate( { left: '-=20px' }, 200, function() { animateArrow(dir, true) });
		else if(dir == SOUTH) $('.arrow').animate( { top:'-=20px' }, 200, function() { animateArrow(dir, true) });
		else if(dir == WEST) $('.arrow').animate( { left: '+=20px' }, 200, function() { animateArrow(dir, true) });
		
	}
	else{
		if(dir == NORTH) $('.arrow').animate( { top:'-=20px' }, 200);
		else if(dir == EAST) $('.arrow').animate( { left: '+=20px' }, 200);
		else if(dir == SOUTH) $('.arrow').animate( { top:'+=20px' }, 200);
		else if(dir == WEST) $('.arrow').animate( { left: '-=20px' }, 200);
	}
}

function depthFirst(balls){
	if(sumBalls(balls) == 1) return true;
	
	for(var i = 0;i<ROWS;i++){
		for(var j = 0;j<COLS;j++){
			if(balls[i][j]){
				for(dir=NORTH;dir<ALLDIR;dir++){
					
					if(isNextActionPossible(balls,i,j,dir)){
						
						var move = testNextMove(balls,i,j,dir);

						var solutionSteps = new Object();
						solutionSteps.dir = dir;
						solutionSteps.balls = move;

						if(move != null){
							if(depthFirst(move)){
								dir = solutionSteps.d;
								solutionSteps.row = i;
								solutionSteps.col = j;
								solution.splice(0,0,solutionSteps);
								//console.debug(solution);
								return true;
							}
							else{dir = solutionSteps.dir;}
						}
						
					}
					
				}
				
			}
			
		}
	}
	return false;
}

function getDir(dir){
	if(dir == NORTH)
		return "NORTH";
	else if(dir == SOUTH)
		return "SOUTH";
	else if(dir == WEST)
		return "WEST";
	else if(dir == EAST)
		return "EAST";
	return "ALLDIR";
}


function nextMove(balls, i, j, dir, firstMove){
	if(dir == NORTH){
		if(firstMove){
			if(balls[i-1][j]) return null;
			else{
				var nextBall = -1;
				for(var k = i-1;k> -1;k--){
					if(balls[k][j]){
						nextBall = k;
						break;
					}
				}
				if(nextBall != -1){
					balls[i][j] = false;
					balls[nextBall+1][j] = true;
					return nextMove(balls,nextBall,j,dir, false);
				}
				else return null;
			}
		}
		if(!firstMove){
			if(i == 0){
				balls[i][j] = false;
				return balls;
			}
			else if(balls[i-1][j]){
				return nextMove(balls,i-1,j,dir, false);
			}
			else{
				if(!isNextActionPossible(balls, i, j, dir)){
					balls[i][j] = false;
					return balls;
				}
				else{
					return nextMove(balls,i,j,dir, true);
				}
			}
		}
	}
	else if(dir == SOUTH){
		if(firstMove){
			if(balls[i+1][j]) return null;
			else{
				var nextBall = -1;
				for(var k = i+1;k< ROWS;k++){
					if(balls[k][j]){
						nextBall = k;
						break;
					}
				}
				if(nextBall != -1){
					balls[i][j] = false;
					balls[nextBall-1][j] = true;
					return nextMove(balls,nextBall,j,dir, false);
				}
				else return null;
			}
		}
		if(!firstMove){
			if(i == ROWS-1){
				balls[i][j] = false;
				return balls;
			}
			else if(balls[i+1][j]){
				return nextMove(balls,i+1,j,dir, false);
			}
			else{
				if(!isNextActionPossible(balls, i, j, dir)){
					balls[i][j] = false;
					return balls;
				}
				else{
					return nextMove(balls,i,j,dir, true);
				}
			}
		}
	}
	else if(dir == EAST){
		if(firstMove){
			if(balls[i][j+1]) return null;
			else{
				var nextBall = -1;
				for(var k = j+1;k< COLS;k++){
					if(balls[i][k]){
						nextBall = k;
						break;
					}
				}
				if(nextBall != -1){
					balls[i][j] = false;
					balls[i][nextBall-1] = true;
					return nextMove(balls,i,nextBall,dir, false);
				}
				else return null;
			}
		}
		if(!firstMove){
			if(j == COLS-1){
				balls[i][j] = false;
				return balls;
			}
			else if(balls[i][j+1]){
				return nextMove(balls,i,j+1,dir, false);
			}
			else{
				if(!isNextActionPossible(balls, i, j, dir)){
					balls[i][j] = false;
					return balls;
				}
				else{
					return nextMove(balls,i,j,dir, true);
				}
			}
		}
	}
	else if(dir == WEST){
		if(firstMove){
			if(balls[i][j-1]) return null;
			else{
				var nextBall = -1;
				for(var k = j-1;k> -1;k--){
					if(balls[i][k]){
						nextBall = k;
						break;
					}
				}
				if(nextBall != -1){
					balls[i][j] = false;
					balls[i][nextBall+1] = true;
					return nextMove(balls,i,nextBall,dir, false);
				}
				else return null;
			}
		}
		if(!firstMove){
			if(j == 0){
				balls[i][j] = false;
				return balls;
			}
			else if(balls[i][j-1]){
				return nextMove(balls,i,j-1,dir, false);
			}
			else{
				if(!isNextActionPossible(balls, i, j, dir)){
					balls[i][j] = false;
					return balls;
				}
				else{
					return nextMove(balls,i,j,dir, true);
				}
			}
		}
	}
	return balls;
}

function testNextMove(balls, i,j,dir){
	var d = dir;
	return nextMove(cloneOf(balls),i,j,d,true)
}

function isNextActionPossible(balls,i,j,dir){
	// Look at the four direction and tells if it can move.
	if(dir == ALLDIR){
		for(var k = 0;k<ROWS;k++)
			if(balls[k][j] && k != i)
				return true;
		for(var k = 0;k<COLS;k++)
			if(balls[i][k] && k != j)
				return true;
		return false;
	}
	else if(dir == NORTH){
		if(i == 0) return false;
		for(var k=i-1;k > -1;k--)
			if(balls[k][j])
				return true;
		return false;
	}
	else if(dir == SOUTH){
		if(i == ROWS - 1) return false;
		for(var k = i+1;k<ROWS;k++)
			if(balls[k][j])
				return true;
		return false;
	}
	else if(dir == EAST){
		if(j == COLS - 1) return false;
		for(var k=j+1;k<COLS;k++)
			if(balls[i][k])
				return true;
		return false;
	}
	else if(dir == WEST){
		if(j == 0) return false;
		for(var k=j-1;k>-1;k--)
			if(balls[i][k])
				return true;
		return false;
	}
	return false;
}


function cloneOf(arrayOfArray){
	var result = [];
	for(var i=0;i<arrayOfArray.length;i++) result[i] = [];

	for (var i=0; i<arrayOfArray.length; i++) {
		for(var j= 0;j<arrayOfArray[i].length;j++)
			result[i][j] = arrayOfArray[i][j];
	}
	return result;
}

function sumBalls(balls){
	var add = 0;
	for(var i=0;i<ROWS;i++)
		for(var j=0;j<COLS;j++)
			if(balls[i][j])
				add++;
	return add;
}

function getArrayOfBalls(){
	/* Store all balls in array */
	var balls = [];
	for(var i=0;i<ROWS;i++) balls[i] = [];
	for(var i=0;i<ROWS;i++)
		for(var j=0;j<COLS;j++)
			balls[i][j] = false


	$( "img" ).each(function() {
  		balls[getRowFrom($(this).parent())][getColFrom($(this).parent())] = true;
	});

	return balls;
}

function debugArray(balls){
	//var output = "[[";
	var output = "";
	for(var i = 0;i<ROWS;i++){
		for(var j=0;j<COLS;j++){
			if(balls[i][j])
				output += "1";
			else
				output += "0";
			//output +=",";
		}
		//output += "],[";
		output += "\n";
	}
	//output += "]";
	console.log(output);
}

function debugArray2(balls){
	var output = "[[";
	//var output = "";
	for(var i = 0;i<ROWS;i++){
		for(var j=0;j<COLS;j++){
			if(balls[i][j])
				output += "1";
			else
				output += "0";
			output +=",";
		}
		output += "],[";
		//output += "\n";
	}
	output = output.substr(0,output.length-2);
	output += "]";
	console.log(output);
}


function moveBall(start,end){
	rowStart = getRowFrom(start);
	colStart = getColFrom(start);
	rowEnd = getRowFrom(end);
	colEnd = getColFrom(end);
	if(rowStart != rowEnd && colStart != colEnd)
		alert("Impossible");

	var ball = '<div id="ball"><img src="img/blue.png" alt="" width="39px" height="39px" /></div>';
	$(ball).prependTo("#board");
	$(ball).css('left',46*colStart+3);
	$(ball).css('top',46*rowStart+3);
	
		$('#ball').animate({
	    	left: '+='+((rowStart-rowEnd)*46),
	    	top: '+='+((colStart-colEnd)*46)
	  	}, 500, function() {
	    	// Animation complete.
	  	});
}

function getRowFrom(container){
	return container.attr('id').substr(0,1);
}

function getColFrom(container){
	return container.attr('id').substr(1,2);
}

function addBallTo(container, src){
	if(src === false)
		var src = 'img/'+pickColor()+'.png';
	var ball = '<img src="'+src+'" alt="ball" title="ball {'+getRowFrom(container)+';'+getColFrom(container)+'}" class="ball" />';
	container.html(ball);
}

function removeBallFrom(container){
	container.html('');
}


function ballExists(container){
	if(container.has('img').length > 0) return true;	
	else return false;
}


function pickColor(){
	var i = Math.floor((Math.random()*8)+1);
	var color;
	switch(i){
		case 1:
			color = 'blue';
			break;
		case 2:
			color = 'red';
			break;
		case 3:
			color = 'yellow';
			break;
		case 4:
			color = 'orange';
			break;
		case 5:
			color = 'light_blue';
			break;
		case 6:
			color = 'light_purple';
			break;
		case 7:
			color = 'green';
			break;
		case 8:
			color = 'purple';
			break;
		default:
			color = 'blue';
	}
	return color;
}

function addMouseListener(){
	$(".backlight, .backdark").hover(function () {
			$(this).addClass('hover');
		}, function () {
			$(this).removeClass('hover');
	});

	$(".backlight, .backdark").click(function () {
		ballExists($(this));
		if(!ballExists($(this)))
			addBallTo($(this),false);
		else
			removeBallFrom($(this));
	});

}