var rect={};
var points={};
var all_rect=[];
var all_point=[];
var Nodes={};
var all_Nodes=[];

var count=1;

var svg = d3.select('svg'); 

function init() {

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function drawCircle(x, y, size) {
        console.log('Drawing circle at', x, y, size);
        svg.append("circle")
            .attr('class', 'click-circle')
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", size);
    }




    function drawRect(x,y,width,height){
        console.log('Drawing new node at', x, y, width , height);
        svg.append("rect")
            .attr('class', 'node-rect')
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr("height",height)
            .attr("fill", 'none')
            .attr("stroke","black")
            .attr("stroke-width",0.5);
    }


    svg.on('click', function() {

    //draw the points on the spaceview svg
        var coords = d3.mouse(this);
        console.log(coords);
        drawCircle(coords[0], coords[1], 5);
        points.x=coords[0];
        points.y=coords[1];
        points.id=count;
        all_point.push({point: points});
  
        console.log(all_point);

    if(count==1)
    {   // read svg x,y,w,h
        var sizes   = document.getElementById("space_container"); // or other selector like querySelector()
        var container = sizes.getBoundingClientRect(); // get the bounding rectangle

        console.log( container.width );
        console.log( container.height);


        //create the 1st node
        Nodes.id=1;
        Nodes.puoint=points;
        rect.x=container.x;
        rect.y=container.y;
        rect.width=container.width;
        rect.height=container.height;
        Nodes.square=rect;
        all_Nodes.push({Nodes});
        console.log(Nodes);
        count++;
    }
        
    //check if need to divide the space
    if(count>1){
         var sizes   = document.getElementById("space_container"); // or other selector like querySelector()
         var container = sizes.getBoundingClientRect(); // get the bounding rectangle

         drawRect(0, 0, (container.width)/2,(container.height)/2);
         drawRect(0, 300, (container.width)/2,(container.height)/2);
         drawRect(300, 0, (container.width)/2,(container.height)/2);
         drawRect(300, 300, (container.width)/2,(container.height)/2);




         count++;

    }
    
    //draw rect for space division

    });


}

init();