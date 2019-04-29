var tree_view=d3.select("#svg2");

//function to draw internal nodes which are circle
function drawInternalNode(x, y, size) {
    console.log('Drawing circle at', x, y, size);
    tree_view.append("circle")
        .attr('class', 'click-circle')
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", size)
        .attr("fill","#ccffcc");
}


//functions to draw leaf node 

function drawleafNode(x,y,width,height){
    console.log('Drawing new node at', x, y, width , height);
    tree_view.append("rect")
        .attr('class', 'node-rect')
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height",height)
        .attr("fill","#efeff5");
 }

// function to draw tree from QTree
function draw_tree(QNode,f1,f2,f3,f4,l){

    // var tree=d3.tree()
    //           .size(550,550);

    // var Tnodes=tree(QNode);

    tree_view.selectAll("*").remove();

   QTree.root.display(QNode,f1,f2,f3,f4,l);

    

}

