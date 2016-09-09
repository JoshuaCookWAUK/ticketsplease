<?php
//This gets the random Person generated for the passport
    $.ajax({
        url: "",
        data: {
            item1:'Image'
        },
        success: function(data){
            $('#imageField').html(data) //probably print to notes
        }
        error: function(data){
            alert('ajax is being poo');
        }
    });
?>
