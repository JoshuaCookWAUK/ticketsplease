<?php
//This gets the random notes for the person generated in the passport
    $.ajax({
        url: "",
        data: {
            item1:'Surname',
            item2:'Names',
            item3:'Gender',
            item4:'Race',
            item5:'otherNotes'
        },
        success: function(data){
            $('#notesfield').html(data) //probably print to notes
        }
        error: function(data){
            alert('ajax is being poo');
        }
    });



?>
