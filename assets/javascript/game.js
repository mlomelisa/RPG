$(document).ready(function() {

  var playerChosen = false;
  var oponentChosen = false;

  let characterArray = [
    countD = {
      name:"Count Dooku",
      health: 300,
      damage: 40,
      damageChange: 0,
      missChange: 30,
      
      image: "./assets/images/CountDooku-2.png"},
      
    anakinS = {
      name:"Anakin Skywalker",
      health: 250,
      damage: 40,
      damageChange: 10,
      missChange:20,
      
      image: "./assets/images/AnakinSkywalker-2.png"
    },
    yoda = {
      name:"Grandmaster Yoda",
      health: 200,
      damage: 25,
      missChange: 0,
      image: "./assets/images/Yoda-2.png"
    },
    darthM = {
      name:"Darth Maul",
      health: 350,
      damage: 80,
      damageChange: -10,
      missChange: 50,
      image: "./assets/images/DarthMaul-2.png"
    }
  ]
   // Generete Attack button
  function attackButton () {
    var attackbtn = $('<button>');
    attackbtn.addClass("btn btn-danger btn-attack").text('Attak');
    $('#sectionTwo').append(attackbtn);
    }

 // Generate the Characters from character Array
   for (let i = 0; i < characterArray.length; i++) {
     
     var charCard = $("<div>").addClass('card cardchar');
     charCard.append($("<h3>").addClass('card-header').text(characterArray[i].name));
     charCard.append($("<img>").attr('src', characterArray[i].image));
     charCard.append(($("<div>").addClass('card-body')).append(($('<p>').addClass('card-text')).text(characterArray[i].health)));
    $('#sectionOne').append(charCard);

   }
  // Move a character when click on it

   $('.cardchar').on('click', function () {
       if (!playerChosen) {
        var cardcharSe = $(this).addClass('player');
        $('#sectionTwo').append(cardcharSe);
        playerChosen = true;
        attackButton();
       } else {
         if(!oponentChosen) {
          var cardcharSe = $(this).addClass('oponent');
          $('#sectionTwo').append(cardcharSe);
          oponentChosen = true;
         } else{
           return false;
         }
              
       }
  });

 



}); // Ready

