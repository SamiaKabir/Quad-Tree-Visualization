var tree_view=d3.select("#svg2");

//function to draw internal nodes which are circle
function drawInternalNode(x, y, size) {
    console.log('Drawing circle at', x, y, size);
    tree_view.append("circle")
        .attr('class', 'click-circle')
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", size)
        .attr("fill","green");
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
        .attr("fill","grey");
}