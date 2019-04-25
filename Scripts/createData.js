class Node {
    constructor(x, y, corners, root, internal, leaf, t_l, t_r, b_l, b_r) {
        this.point = {
            x: x,
            y: y
        };
        this.corners = corners;
        this.isroot = root;
        this.isinternal = internal;
        this.isleaf = leaf;
        top_left=t_l;
        top_right=t_r;
        bottom_left=b_l;
        bottom_right=b_r;
    
    }
}




function addNode(tree,node)
{
    
    console.log(tree.point.x);
    console.log(node.point.x);
    if(node.point.x>tree.point.x)
    {
        if(node.point.y<tree.point.y)
        {
           //for drawing purpose
            var c_p={};
            c_p.x1= (tree.corners.x2-tree.corners.x1)/2;
            c_p.x2= tree.corners.x2;
            c_p.y1= tree.corners.y1;
            c_p.y2= (tree.corners.y2-tree.corners.y1)/2;
            node.corners= c_p;
    

            //add the new node
            tree.top_right=node;
        }

        else 
        {
            var c_p={};

            c_p.x1= (tree.corners.x2-tree.corners.x1)/2;
            c_p.x2= tree.corners.x2;
            c_p.y2= tree.corners.y2;
            c_p.y1= (tree.corners.y2-tree.corners.y1)/2;
            node.corners= c_p;

            tree.bottom_right=node;
        }
           
    }

    else{

        if(node.point.y<tree.point.y)
        {
            var c_p={};

            c_p.x2= (tree.corners.x2-tree.corners.x1)/2;
            c_p.x1= tree.corners.x1;
            c_p.y1= tree.corners.y1;
            c_p.y2= (tree.corners.y2-tree.corners.y1)/2;  
            node.corners= c_p;
           
            tree.top_left=node;
        }

        else 
        {
            var c_p={};

            c_p.x2= (tree.corners.x2-tree.corners.x1)/2;
            c_p.x1= tree.corners.x1;
            c_p.y2= tree.corners.y2;
            c_p.y1= (tree.corners.y2-tree.corners.y1)/2;
            node.corners= c_p;

            tree.bottom_left=node;
        }
          

    }


}


function updateTree(tree,node)
{


    if(tree.isroot){
        if(tree.bottom_left==null && tree.top_left==null && tree.top_right==null && tree.bottom_right==null){
            tree.isinternal=true;
             
            var temp_node={}

            var c_p={};

            c_p.x2= (tree.corners.x2-tree.corners.x1)/2;
            c_p.x1= tree.corners.x1;
            c_p.y1= tree.corners.y1;
            c_p.y2= (tree.corners.y2-tree.corners.y1)/2;  
            temp_node.corners= c_p;
            tree.top_left=temp_node;


            c_p.x1= (tree.corners.x2-tree.corners.x1)/2;
            c_p.x2= tree.corners.x2;
            c_p.y1= tree.corners.y1;
            c_p.y2= (tree.corners.y2-tree.corners.y1)/2;
            temp_node.corners= c_p;
            tree.top_right=temp_node;
    
            c_p.x2= (tree.corners.x2-tree.corners.x1)/2;
            c_p.x1= tree.corners.x1;
            c_p.y2= tree.corners.y2;
            c_p.y1= (tree.corners.y2-tree.corners.y1)/2;
            temp_node.corners= c_p;
            tree.bottom_left=temp_node;


            c_p.x1= (tree.corners.x2-tree.corners.x1)/2;
            c_p.x2= tree.corners.x2;
            c_p.y2= tree.corners.y2;
            c_p.y1= (tree.corners.y2-tree.corners.y1)/2;
            temp_node.corners= c_p;
            tree.bottom_right=temp_node;

            addNode(tree,node);
        }

        else
        {
            addNode(tree,node);
        }
    }

    else ;


}

