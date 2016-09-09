<?php
//This gets the random Person generated for the passport
$.ajax({
    url: "",
    data: {
        item1:'Image'
    },
    success: function(response){
        $('#imageField').html(response) //probably print to notes
    }
    error: function(response){
        alert('ajax is being poo');
    }
});
?>
