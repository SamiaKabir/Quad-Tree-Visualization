var rect={};
var all_rect=[];
var all_point=[];
var Nodes={};
var all_Nodes=[];
var QTree={};

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
        var points={};
        var coords = d3.mouse(this);
    //    console.log(coords);
        drawCircle(coords[0], coords[1], 5);
       // addNode();
        points.x=coords[0];
        points.y=coords[1];
        all_point.push({point: points});
  
     //   console.log(all_point);

    if(count==1)
    {   // read svg x,y,w,h
        var sizes   = document.getElementById("space_container"); // or other selector like querySelector()
        var container = sizes.getBoundingClientRect(); // get the bounding rectangle
        var corner_points={};
       // console.log( container.width );
       // console.log( container.height);
    

        //create the 1st node
        Nodes.id=1;
        Nodes.point=points;
        Nodes.top_left= null;
        Nodes.bottom_left= null;
        Nodes.top_right= null;
        Nodes.bottom_right= null;
        Nodes.isroot= true; 
        Nodes.isinternal=false;
        corner_points.x1= 0;
        corner_points.y1= 0;
        corner_points.x2=600;
        corner_points.y2= 600;
        Nodes.corners=corner_points;


        QTree.root=Nodes;

        all_Nodes.push({Nodes});
       // console.log(Nodes);
        console.log(QTree);
        count++;
    }
        
    //check if need to divide the space
    else if(count>1){
         var sizes   = document.getElementById("space_container"); // or other selector like querySelector()
         var container = sizes.getBoundingClientRect(); // get the bounding rectangle

        //  drawRect(0, 0, (container.width)/2,(container.height)/2);
        //  drawRect(0, 300, (container.width)/2,(container.height)/2);
        //  drawRect(300, 0, (container.width)/2,(container.height)/2);
        //  drawRect(300, 300, (container.width)/2,(container.height)/2);

        var Node={}; 

        Node.id=count;
        Node.point=points;
        Node.top_left= null;
        Node.bottom_left= null;
        Node.top_right= null;
        Node.bottom_right= null;
        Node.isroot= false; 
     
        console.log(Node)


        updateTree(QTree.root,Node);
 

        all_Nodes.push({Nodes});
       // console.log(Nodes);
        console.log(QTree);
        count++;




         count++;

    }
    else ;
    
    //draw rect for space division

    });


}

init();