 window.onload = function()
 {



//--------------------------------------------------------VARIABLES GLOBALES ---------------------------------------------------------------

    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx ;
    var delay = 150;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth/blockSize;
    var heightInBlocks = canvasHeight/blockSize;
    var score;
    var timeout;
    
    init();

//--------------------------------------------------------Fonction d'initialisation  ---------------------------------------------------------------

    // cette fonction permet d'intialiser le canvas (emplacement du jeu)
    function init(){

        // creer un canvas (rectangle) ou va se positionner notre jeu 
        var canvas = document.createElement('canvas');
        //largeur
        canvas.width=canvasWidth;
        //hauteur
        canvas.height=canvasHeight;
        //bordure
        canvas.style.border="30px solid gray"
        canvas.style.margin="50px auto";
        canvas.style.display="block" ;
        canvas.style.backgroundColor="#ddd";
        //relier le body de index.html au anvas
        document.body.appendChild(canvas);
        
        //pour dessiner dans notre canvas en 2 demension
        ctx = canvas.getContext('2d');

        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");
        applee= new Apple([10,10]);
        score=0;
        refreshCanvas();
            
    }


//--------------------------------------------------------controlle le serpent et la pomme ---------------------------------------------------------------

    // cette fonction cree un rectangle dans le canvas 
    function refreshCanvas(){
        

        
        snakee.advance();
        if(snakee.checkCollision()){
            gameOver();
        }

       
        else {
            
            if(snakee.isEatingApple(applee))
            {
                score++;
                snakee.ateApple=true;

                do{
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(snakee))

            }
            // effacer le rectangle precedent
            ctx.clearRect(0,0,canvasWidth,canvasHeight);
            
            drawScore();
            snakee.draw();
            applee.draw();
           
            timeout=setTimeout(refreshCanvas,delay);
       
        }
        

    }

//----------------------------------- ---------------------dessine les blocs ---------------------------------------------------------------


    function drawBlock(ctx ,position){
        //definir les coordonner du bloc a dessiner 
        var x = position[0] * blockSize ;
        var y = position[1] * blockSize ;

        //dessiner le bloc(rectangle :une partie du serpent)
        ctx.fillRect(x,y,blockSize,blockSize);
    }

    function drawScore(){
        ctx.save();
        ctx.font="bold 200px sans-serif";
        ctx.fillStyle ="gray";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        var centreX= canvasWidth/2;
        var centreY=canvasHeight/2;


        ctx.fillText(score.toString(),centreX,centreY);
        ctx.restore();

    }


    function gameOver(){
        ctx.save();

        ctx.font="bold 70px sans-serif";
        ctx.fillStyle ="#000";
        ctx.textAlign="center";
        ctx.textBaseline="middle";
        ctx.strokeStyle="white";
        ctx.lineWidth=5;

        var centreX= canvasWidth/2;
        var centreY=canvasHeight/2;


        ctx.strokeText("Maria Molfix",centreX,centreY-180);
        ctx.fillText("Maria Molfix",centreX,centreY-180);

        ctx.font="bold 30px sans-serif";

        ctx.strokeText("Appuyer sur la touche Espace pour rejouer",centreX,centreY - 120);
        ctx.fillText("Appuyer sur la touche Espace pour rejouer",centreX,centreY - 120);
        ctx.restore();
    }

    function restart(){
        snakee = new Snake([[6,4],[5,4],[4,4],[3,4],[2,4]],"right");
        applee= new Apple([10,10]);
        score=0;
        clearTimeout(timeout);
        refreshCanvas();
            

    }
//--------------------------------------------------------LE Serpent ---------------------------------------------------------------

    function Snake(body,direction)
    {

        // le corps du serpent
        this.body=body;
        this.direction=direction;
        this.ateApple=false;

  
        // permet de dessiner le serpent
        this.draw=function()
        {

            //enregistre le dessin
            ctx.save();
            //definir la couleur 
            ctx.fillStyle = "#ff0000";

            //dessine chauqe blocs du serpent
            for(var i=0;i<this.body.length;i++)
            {
                drawBlock(ctx,this.body[i]);
            }
            //restore le bloc deja dessiner
            ctx.restore();
        };


        //permet de faire avancer le serpent 
        this.advance=function()
        {   
            //copier la valeur du 1er element (correspond a la tete du serpent) de body dans la variable nextPosition
            var nextPosition = this.body[0].slice();
            switch(this.direction){
                case "left":
                    nextPosition[0]-=1;
                    break;
                case "right":
                    nextPosition[0]+=1;
                    break;
                case "down":
                    nextPosition[1]+=1;
                    break;
                case "up" :
                    nextPosition[1]-=1;
                    break;
                default :
                    throw("Invalid Direction");
            }
           
            //ajoute la nouvelle position (tete du serpent) au body (le corps du serpent)
            this.body.unshift(nextPosition);
            //supprime la queu du serpent

            if(! this.ateApple){
                this.body.pop();
            }
            else{
                this.ateApple=false;
            }
        };

       
        // definie la direction a prendre
        this.setDirection = function(newDirection)
        {
              //defini les directions autorisées
              var allowedDirection;

              switch(this.direction)
              {
                  case "left" :
                  case "right":
                      allowedDirection=["up","down"];
                      break;
                  case "down":
                  case "up" :
                      allowedDirection=["left","right"];
                      break;
                  default :
                      throw("Invalid Direction");
              }
  
              if(allowedDirection.indexOf(newDirection)>-1){
                  this.direction=newDirection;
              }
        };


        this.checkCollision = function(){

            var wallCollision  = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0 ;
            var minY = 0;
            var maxX = widthInBlocks -1 ;
            var maxY =heightInBlocks -1 ;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

            if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls){
                wallCollision = true;
            }

            for (var i=0; i<rest.length ;i++){
                if(snakeX === rest[i][0]  && snakeY === rest[i][1]){
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision ;

        };

        this.isEatingApple =function(appleToEat){

            var head = this.body[0];

            if(head[0]=== appleToEat.position[0] && head[1]=== appleToEat.position[1]){
                return true;
            }
            return false;
        }

    
    }

//--------------------------------------------------------fonction qui cree la pomme ----------------------------------------------------------------------------------

    function Apple(position)
    {
        //sauvegarde la position de la pomme
        this.position = position;

        //dessine la pomme
        this.draw = function()
        {
            ctx.save();

            //definie la couleur
            ctx.fillStyle = "#33cc33";
            //entamme le chemin
            ctx.beginPath();
            //le rayon
            var radius = blockSize/2;
            //la position du centre de la pomme
            var x = this.position[0] * blockSize + radius;
            var y = this.position[1] * blockSize + radius;
            //dessinela pomme(cercle)
            ctx.arc(x,y,radius,0,Math.PI*2,true);
            //remplie la pomme
            ctx.fill();
            ctx.restore();
        };

        this.setNewPosition = function(){
            var newX =Math.round(Math.random() * (widthInBlocks - 1));
            var newY =Math.round(Math.random() * (heightInBlocks- 1));
            this.position=[newX,newY];

        };

        this.isOnSnake=function(snakeToCheck){
            var isOnSnake =false;

            for(var i=0;i<snakeToCheck.body.length;i++){
                if(this.position[0]=== snakeToCheck.body[i][0] && this.position[1]===snakeToCheck.body[i][1]){
                    isOnSnake=true;
                }
            }
            return isOnSnake;
        };



    }
//--------------------------------------------------------fonction qui recupére la direction transmis par le joueur ---------------------------------------------------------------


    document.onkeydown =function handleKeyDown(e){

        //recupere le code de la touche qui a été appuyé
        var key = e.keyCode;

        //sauvegarde la direction choisi par l'utuliateur
        var newDirection ;
        switch(key){
            case 37:
                newDirection="left";
                break;
            case 38:
                newDirection="up";
                break;
            case 39:
                newDirection="right";
                break;
            case 40:
                newDirection="down";
                break;
            case 32 :
                restart();
                return;
            default :
                return ;
        }
        snakee.setDirection(newDirection);


    }
  
   
    
 }
