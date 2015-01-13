$(document).ready(function(){
    $("#red").mouseover(function(){
        $(this).animate( {
           'height': '+=20px' 
        });
    });
    $("#red").mouseout(function(){
        $(this).animate( {
           'height': '-=20px' 
        });
    });
    $("#red").click(function(){
        $(this).toggle(1000);
    });
    
    $("#green").mouseover(function(){
        $(this).animate( {
           'height': '+=20px' 
        });
    }); 
    $("#green").mouseout(function(){
        $(this).animate( {
           'height': '-=20px'
        });
    });
    $("#green").click(function(){
        $(this).toggle(1000);
    }); 
    
    
    $("#blue").mouseover(function(){
        $(this).animate( {
           'height': '+=20px'
        });
    }); 
    $("#blue").mouseout(function(){
        $(this).animate( {
           'height': '-=20px'
        });
    }); 
    $("#blue").click(function(){
        $(this).toggle(1000);
    }); 
    
    $("#black").mouseover(function(){
        $(this).animate( {
           'height': '+=20px'
        });
    });
    $("#black").mouseout(function(){
        $(this).animate( {
           'height': '-=20px'
        });
    });
    $("#black").click(function(){
        $(this).toggle(1000);
    });
    
}); 