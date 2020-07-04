const date = new Date();


// cheks if the given time is before endtime or not 
// if before or same  returns true else returns false
// parameter:  date object


let is_before_endTime = endTime =>{

    let   now = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(); 

   

    const date_now = new Date(now);
    

    if( endTime > date_now){
        
        return true;
    }
    else{
        
        return false;
    }

     

}

module.exports = is_before_endTime;