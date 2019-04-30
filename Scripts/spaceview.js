var rect={};
var all_rect=[];
var all_point=[];
var Nodes={};
var all_Nodes=[];
var QTree={};
var QTree_data={};


//function to draw points
function drawCircle(x, y, size) {
 //   console.log('Drawing circle at', x, y, size);
    svg.append("circle")
        .attr('class', 'click-circle')
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", size)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);
}


//functions to draw rectangle 

function drawRect(x,y,width,height){
   // console.log('Drawing new node at', x, y, width , height);
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


  // Create Event Handlers for mouse
  function handleMouseOver() {  // Add interactivity

    // Use D3 to select element, change color and size
    d3.select(this).attr("r", 5).style("fill", "orange");



    console.log(d3.select(this).attr("cx"));
    console.log(d3.select(this).attr("cy"));

    QTree.root.search(QTree.root,d3.select(this).attr("cx"),d3.select(this).attr("cy"));

  }

function handleMouseOut() {
    // Use D3 to select element, change color back to normal
    d3.select(this).attr("r", 2).style("fill", "black");
    QTree.root.de_search(QTree.root,d3.select(this).attr("cx"),d3.select(this).attr("cy"));

  }


var count=1;

var svg = d3.select('#svg1'); 

function init() {

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function isInArray( array,value) {
        return array.indexOf(value) > -1;
      }

    svg.on('click', function() {

    //draw the points on the spaceview svg
        var points={};
        var coords = d3.mouse(this);
        points.x=coords[0];
        points.y=coords[1];

        if(isInArray(all_point,points)==false){

    //    console.log(coords);
        drawCircle(coords[0], coords[1], 2);
       // addNode();

        all_point.push({point: points});
        }
  
     //   console.log(all_point);

    if(count==1)
    {   // read svg x,y,w,h
        var sizes   = document.getElementById("space_container"); // or other selector like querySelector()
        var container = sizes.getBoundingClientRect(); // get the bounding rectangle
        var corner_points={};
    

        //create the root node node
        Nodes.point=points;
        corner_points.x1= 0;
        corner_points.y1= 0;
        corner_points.x2=600;
        corner_points.y2= 600;
        Nodes.corners=corner_points;
        

        let root= new Quad(points, corner_points,true, false,false, null,null,null,null);
        console.log(root);



        drawRect(corner_points.x1, corner_points.y1, 600,600);
        //drawleafNode(280,80,20,20);

        QTree.root=root;
        draw_tree(QTree.root,false,false,false,false,1);

        all_Nodes.push({Nodes});

       // console.log(Nodes);
        console.log(QTree);
        count++;
    }
        
    //check if need to divide the space
    else if(count>1){         
        

        //let newNode= new Quad(points, null,false, false, null,null,null,null);
        QTree.root.insert(QTree.root,points);
        console.log(QTree.root);
        draw_tree(QTree.root,false,false,false,false,1);
        count++;
       


    }
    else ;
    
    //draw rect for space division
   

    });


}

init();

