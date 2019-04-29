var rect={};
var all_rect=[];
var all_point=[];
var Nodes={};
var all_Nodes=[];
var QTree={};
var QTreeData={};


//function to draw points
function drawCircle(x, y, size) {
    console.log('Drawing circle at', x, y, size);
    svg.append("circle")
        .attr('class', 'click-circle')
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", size);
}


//functions to draw rectangle 

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

var count=1;

var svg = d3.select('#svg1'); 

function init() {

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }



    svg.on('click', function() {

    //draw the points on the spaceview svg
        var points={};
        var coords = d3.mouse(this);
    //    console.log(coords);
        drawCircle(coords[0], coords[1], 2);
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
    

        //create the root node node
        Nodes.point=points;
        corner_points.x1= 0;
        corner_points.y1= 0;
        corner_points.x2=600;
        corner_points.y2= 600;
        Nodes.corners=corner_points;
        

        let root= new Quad("root",points, corner_points,true, false, [null,null,null,null]);
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