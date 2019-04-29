class Quad {
    constructor(name, point, corners, root, internal,children ) {
        this.name=name;
        this.point = point;
        this.corners = corners;
        this.isroot = root;
        this.isinternal = internal;
        this.children=children;
    
    }
    

    get_point(){

       return this.point;
    }

    set_point(){ 
        this.point=null;
        return;

    }

    get_area(){
      
        return ((corners.x2-corners.x1)*(corners.y2-corners.y1));

    }

    set_isinternal(){

        this.isinternal=true;
        return;
    }
    
    get_corner(){
     return this.corners;
    }

    isinRange(pointab){
       if((pointab.x>this.corners.x1) &&(pointab.x<this.corners.x2))
       {
           if ((pointab.y>this.corners.y1) &&(pointab.y<this.corners.y2))
               return true;
           else 
               return false;
       }

       else return false;
        
    }
    

    splitinfour(pNode){
        var c_x1= pNode.corners.x1;
        var c_y1= pNode.corners.y1;
        var c_x2= pNode.corners.x2;
        var c_y2= pNode.corners.y2;
        

        //create the corner poimts for subquads
        var c_t_le={};
        var c_t_ri={};
        var c_b_le={};
        var c_b_ri={};


        c_t_le.x1= c_x1;   c_t_le.y1= c_y1;   c_t_le.x2= c_x1+(c_x2-c_x1)/2;   c_t_le.y2= c_y1+(c_y2-c_y1)/2;  
        c_t_ri.x1= c_x1+(c_x2-c_x1)/2;     c_t_ri.y1= c_y1;    c_t_ri.x2= c_x2; c_t_ri.y2= c_y1+(c_y2-c_y1)/2;  
        c_b_le.x1= c_x1;   c_b_le.y1= c_y1+(c_y2-c_y1)/2;   c_b_le.x2= c_x1+(c_x2-c_x1)/2;   c_b_le.y2= c_y2;  
        c_b_ri.x1= c_x1+(c_x2-c_x1)/2;     c_b_ri.y1= c_y1+(c_y2-c_y1)/2;    c_b_ri.x2= c_x2; c_b_ri.y2= c_y2;  

        
        //create the subquads

        pNode.children[0]= new Quad("TL",null,c_t_le,false,false,[null,null,null,null]);
        pNode.children[1]= new Quad("TR",null,c_t_ri,false,false,[null,null,null,null]);
        pNode.children[2]= new Quad("BL",null,c_b_le,false,false,[null,null,null,null]);
        pNode.children[3]= new Quad("BR",null,c_b_ri,false,false,[null,null,null,null]);

        console.log(c_t_le);
        console.log(c_t_ri);
        console.log(c_b_le);     
        console.log(c_b_ri);

        //draw rectangle for these four
        drawRect(c_t_le.x1, c_t_le.y1,c_t_le.x2-c_t_le.x1, c_t_le.y2-c_t_le.y1);
        drawRect(c_b_le.x1, c_b_le.y1,c_b_le.x2-c_b_le.x1, c_b_le.y2-c_b_le.y1);
        drawRect(c_t_ri.x1, c_t_ri.y1,c_t_ri.x2-c_t_ri.x1, c_t_ri.y2-c_t_ri.y1);
        drawRect(c_b_ri.x1, c_b_ri.y1,c_b_ri.x2-c_b_ri.x1, c_b_ri.y2-c_b_ri.y1);


    }

    insert(newNode,pointIn){

       if(newNode.isinternal==false && newNode.point!=null)  //split in subsquads when it's a leaf  node and there is already a point in it
       {
         newNode.isinternal=true;
         newNode.splitinfour(newNode);


      //  move current point to one of the subquads
         if (newNode.children[0].isinRange(newNode.point))
         {
             newNode.children[0].point=newNode.point; 
             newNode.point=null;
         }
        else if (newNode.children[1].isinRange(newNode.point))
         {
             newNode.children[1].point=newNode.point; 
             newNode.point=null;
         }
        else if (newNode.children[2].isinRange(newNode.point))
         {
             newNode.children[2].point=newNode.point; 
             newNode.point=null;
         }
        else if (newNode.children[3].isinRange(newNode.point))
        {
             newNode.children[4].point=newNode.point;
             newNode.point=null;
        }
        else;
     // determine in which subquads the input point is gonna be
        if (newNode.children[0].isinRange(pointIn))
         {
            if(newNode.children[0].point==null){
                newNode.children[0].point=pointIn; 
            }
            else 
            {
                newNode.children[0].insert(newNode.children[0],pointIn);
            }
               
            
         }
        else if (newNode.children[1].isinRange(pointIn))
         {
            if(newNode.children[1].point==null){
                newNode.children[1].point=pointIn; 
            }
            else{
                newNode.children[1].insert(newNode.children[1],pointIn);
            }
           
            
         }
        else if (newNode.children[2].isinRange(pointIn))
         {
            if(newNode.children[2].point==null){
                newNode.children[2].point=pointIn; 
            }
            else
            {
                newNode.children[2].insert(newNode.children[2],pointIn);
            }

            
         }
        else if (newNode.children[3].isinRange(pointIn))
        {
            if(newNode.children[3].point!=null){
                newNode.children[3].point=pointIn; 
            }
            else
            {
                newNode.children[3].insert(newNode.children[3],pointIn);
            }
            
            
        }
        else;
        
       }

       else if(newNode.isinternal==true)      //if it's an internal node , call insert recursively
       {
        
  
            if(newNode.children[0].isinRange(pointIn))
            {
                newNode.children[0].insert(newNode.children[0],pointIn);
            }

            else if(newNode.children[1].isinRange(pointIn))
            {
                newNode.children[1].insert(newNode.children[1],pointIn);
            }

            else if(newNode.children[3].isinRange(pointIn))
            {
                newNode.children[3].insert(newNode.children[3],pointIn);
            }

            else if(newNode.children[2].isinRange(pointIn))
            {
                newNode.children[2].insert(newNode.children[2],pointIn);
            }

            else;

        
       }
   // simply add the point if it's a leaf node and there is no point in it
       else  if(newNode.isinternal==false && newNode.point==null)   
          newNode.point=pointIn;

       else;

   
        return;


    }

// function to display the tree
    display(currentNode,f1,f2,f3,f4,level){

        var gap= (1/level)*80;

        if((currentNode.isroot==true)&&(currentNode.isinternal==false) )//it's the 1st node
        {
            drawleafNode(280,25,10,10);
        }
        else if((currentNode.isroot==true)&&(currentNode.isinternal==true) )//root is now an interanal node 
        {
            drawInternalNode(280,30,5);
        }
        else if((currentNode.isroot==false)&&(currentNode.isinternal==true) )
        { 
            var gap= (1/level)*80;
              // nodes that are not root but internal
            if(f1==true)
            {
                drawInternalNode(500*(1/level),30*level,5);  
            }

            if(f2==true){
                drawInternalNode(500*(1/level)+gap,30*level,5);  
            }

            if(f3==true){
                drawInternalNode(500*(1/level)+gap*2,30*level,5);  
            }

            if(f4==true){
                drawInternalNode(500*(1/level)+gap*3,30*level,5);  
            }
        }

        else if((currentNode.isroot==false)&&(currentNode.isinternal==false) )  //leaf nodes
        {
            


            if(f1==true)
            {
                drawleafNode(500*(1/level),30*level,10,10);
            }

            if(f2==true){
                drawleafNode(500*(1/level)+gap,30*level,10,10);
            }

            if(f3==true){
                drawleafNode(500*(1/level)+gap*2,30*level,10,10);
            }

            if(f4==true){
                drawleafNode(500*(1/level)+gap*3,30*level,10,10);
            }
        }

        else;

        if(currentNode.top_left!=null)
        {
            currentNode.top_left.display(currentNode.top_left,true,false,false,false,level+1);
        }

        if(currentNode.top_right!=null)
        {
            currentNode.top_right.display(currentNode.top_right,false,true,false,false,level+1);
        }
        if(currentNode.bottom_right!=null)
        {
            currentNode.bottom_right.display(currentNode.bottom_right,false,false,false,true,level+1);
        }
        if(currentNode.bottom_left!=null)
        {
            currentNode.bottom_left.display(currentNode.bottom_left,false,false,true,false,level+1);
        }

    }

    //search function
    // search(){

    // }

}
