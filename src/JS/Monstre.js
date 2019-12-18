class Monstre{
    constructor(ctx,map){
        this.ctx = ctx;
        this.map = map;
        this.x = (Math.floor(Math.random() * 10))*80;
        this.y = (Math.floor(Math.random() * 10))*80;
    }
    move(){
        if (this.map.getMap()[this.x][this.y] == 0){
            var soonZ = this.y/80-1 == -1 ? 1 : this.y/80-1;
            var soonS = this.y/80+1 == 10 ? 1 : this.y/80+1;
            var soonQ = this.x/80-1 == -1 ? 1 : this.x/80-1;
            var soonD = this.x/80+1 == 10 ? 1 : this.x/80+1;

            var z = this.map.getMap()[soonZ][this.x/80];
            var s = this.map.getMap()[soonS][this.x/80];
            var q = this.map.getMap()[this.y/80][soonQ];
            var d = this.map.getMap()[this.y/80][soonD];

            if(this.x > 0 && (q == 0   q == 3  q == 4  q == 5)) {
                if(this.x < 720 && (d == 0  d == 3  d == 4  d == 5)){
                    this.x += 80;
                }
            else {
                    this.x -= 80;
                }
            }
        else {
                this.x = this.x

            }


            if(this.y > 0 && (z == 0  z == 3  z == 4  z == 5)){
                if(this.y < 720 && (s == 0  s == 3  z == 4  z == 5)){
                    this.y += 80;
                }
            else {
                    this.y -= 80;
                }

            }
        else {
                this.y = this.y;
            }

        }
    }
    draw(){
        this.ctx.save()
        var character = new Image();
        character.src ="./../MEDIA/monstre.png";
        ctx.drawImage(character,this.x,this.y);
        this.ctx.restore();

    }

}
