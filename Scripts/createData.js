class Quad {
    constructor(point, corners, root, internal, t_l, t_r, b_l, b_r) {
        this.point = point;
        this.corners = corners;
        this.isroot = root;
        this.isinternal = internal;
        this.top_left=t_l;
        this.top_right=t_r;
        this.bottom_left=b_l;
        this.bottom_right=b_r;
    
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

        pNode.top_left= new Quad(null,c_t_le,false,false,null,null,null,null);
        pNode.top_right= new Quad(null,c_t_ri,false,false,null,null,null,null);
        pNode.bottom_left= new Quad(null,c_b_le,false,false,null,null,null,null);
        pNode.bottom_right= new Quad(null,c_b_ri,false,false,null,null,null,null);

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
         if (newNode.top_left.isinRange(newNode.point))
         {
             newNode.top_left.point=newNode.point; 
             newNode.point=null;
         }
        else if (newNode.top_right.isinRange(newNode.point))
         {
             newNode.top_right.point=newNode.point; 
             newNode.point=null;
         }
        else if (newNode.bottom_left.isinRange(newNode.point))
         {
             newNode.bottom_left.point=newNode.point; 
             newNode.point=null;
         }
        else if (newNode.bottom_right.isinRange(newNode.point))
        {
             newNode.bottom_right.point=newNode.point;
             newNode.point=null;
        }
        else;
     // determine in which subquads the input point is gonna be
        if (newNode.top_left.isinRange(pointIn))
         {
            if(newNode.top_left.point==null){
                newNode.top_left.point=pointIn; 
            }
            else 
            {
                newNode.top_left.insert(newNode.top_left,pointIn);
            }
               
            
         }
        else if (newNode.top_right.isinRange(pointIn))
         {
            if(newNode.top_right.point==null){
                newNode.top_right.point=pointIn; 
            }
            else{
                newNode.top_right.insert(newNode.top_right,pointIn);
            }
           
            
         }
        else if (newNode.bottom_left.isinRange(pointIn))
         {
            if(newNode.bottom_left.point==null){
                newNode.bottom_left.point=pointIn; 
            }
            else
            {
                newNode.bottom_left.insert(newNode.bottom_left,pointIn);
            }

            
         }
        else if (newNode.bottom_right.isinRange(pointIn))
        {
            if(newNode.bottom_right.point!=null){
                newNode.bottom_right.point=pointIn; 
            }
            else
            {
                newNode.bottom_right.insert(newNode.bottom_right,pointIn);
            }
            
            
        }
        else;
        
       }

       else if(newNode.isinternal==true)      //if it's an internal node , call insert recursively
       {
        
  
            if(newNode.top_left.isinRange(pointIn))
            {
                newNode.top_left.insert(newNode.top_left,pointIn);
            }

            else if(newNode.top_right.isinRange(pointIn))
            {
                newNode.top_right.insert(newNode.top_right,pointIn);
            }

            else if(newNode.bottom_right.isinRange(pointIn))
            {
                newNode.bottom_right.insert(newNode.bottom_right,pointIn);
            }

            else if(newNode.bottom_left.isinRange(pointIn))
            {
                newNode.bottom_left.insert(newNode.bottom_left,pointIn);
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
    display(currentNode,cx1,cx2,f1,f2,f3,f4,level){

        var temp1= cx1-(150/level);
        var temp2= cx2+100;
        var temp3= width_offset(level);
        if((currentNode.isroot==true)&&(currentNode.isinternal==false) )//it's the 1st node
        {
            drawleafNode(cx1,cx2,2.5);
        }
        else if((currentNode.isinternal==true) )//root is now an interanal node 
        {
    
            drawInternalNode(cx1,cx2,2.5);

            drawleafNode(temp1,temp2,2.5); 
            drawleafNode(temp1+temp3,temp2,2.5); 
            drawleafNode(temp1+2*(temp3),temp2,2.5);  
            drawleafNode(temp1+3*(temp3),temp2,2.5);  

            drawLine(cx1,cx2,temp1,temp2);
            drawLine(cx1,cx2,temp1+temp3,temp2);
            drawLine(cx1,cx2,temp1+2*(temp3),temp2);
            drawLine(cx1,cx2,temp1+3*(temp3),temp2);

        }
        else;

        if(currentNode.top_left!=null)
        {
            currentNode.top_left.display(currentNode.top_left,temp1,temp2,true,false,false,false,level+1);
        }

        if(currentNode.top_right!=null)
        {
            currentNode.top_right.display(currentNode.top_right,temp1+temp3,temp2,false,true,false,false,level+1);
        }
        if(currentNode.bottom_right!=null)
        {
            currentNode.bottom_right.display(currentNode.bottom_right,temp1+3*(temp3),temp2,false,false,false,true,level+1);
        }
        if(currentNode.bottom_left!=null)
        {
            currentNode.bottom_left.display(currentNode.bottom_left,temp1+2*(temp3),temp2,false,false,true,false,level+1);
        }

    }

    //search function
    search(){

    }

}
