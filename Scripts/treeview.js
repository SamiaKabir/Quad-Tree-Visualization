var tree_view=d3.select("#svg2")
.call(d3.zoom().scaleExtent([1 , 8]).on("zoom", function () {
    tree_view.attr("transform", d3.event.transform)
 }));

//function to draw internal nodes which are circle
function drawInternalNode(x, y, size) {
  //  console.log('Drawing circle at', x, y, size);
    tree_view.append("circle")
        .attr('class', 'click-circle')
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 3)
        .attr("fill","darkgreen");
}


//functions to draw leaf node 

function drawleafNode(x,y,width){
  //  console.log('Drawing new node at', x, y, width);
    tree_view.append("circle")
        .attr('class', 'leaf-circle')
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 3)
        .attr("fill","blue");
 }
//function to highlight node

function drawhighlightnode(x, y, size){

    tree_view.append("circle")
    .attr('class', 'h-circle')
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 3)
    .attr("fill","orange");
}
 //function to draw linking lines
 function drawLine(x_1,y_1,x_2,y_2){

    tree_view.append("line")          // attach a line
    .style("stroke", "black")  // colour the line
    .attr("x1", x_1)     // x position of the first end of the line
    .attr("y1", y_1+3)      // y position of the first end of the line
    .attr("x2", x_2)     // x position of the second end of the line
    .attr("y2", y_2-3)    // y position of the second end of the line
    .attr("stroke-width",0.5);
 }





function depth_offset(level){
    return 100+(level-1)*70;

}

function start_level(level){
    var sl= 100-((level)*50);
    console.log(sl);
    return sl;
}

function end_level(level){
    var el=400+((level)*50);
    console.log(el);
    return el;
}

function width_offset(level){


    var exp=level;
    var start= 0;
    var end= 650;

    var num_nodes= Math.pow(4,exp);

    var offset= (end-start)/num_nodes;
    console.log(offset);

    return offset;


}



// function to draw tree from QTree
function draw_tree(QNode,f1,f2,f3,f4,l){

    // var tree=d3.tree()
    //           .size(550,550);

    // var Tnodes=tree(QNode);

    tree_view.selectAll("*").remove();
    tree_view.selectAll(".h-circle") .style("fill","blue");

   QTree.root.display(QNode,300,30,f1,f2,f3,f4,l);

    

}

