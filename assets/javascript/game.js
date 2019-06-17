$(document).ready(function() {

  var playerChosen = false;
  var oponentChosen = false;
  var attackBttn = false;
  var playerHealth;
  var oponentHealth;
  var playerIndex;
  var oponentIndex;
  var playerDamage;
  var oponentDamage;
  var playerDamageCh;
  var oponentDamageCh; 

   

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
      damageChange: 15,
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
    attackbtn.addClass("btn btn-danger btn-attack").text('Attack');
    $('#sectionTwo').append(attackbtn);
   
    }

   

 // Generate the Characters from character Array
   for (let i = 0; i < characterArray.length; i++) {
     
     var charCard = $("<div>").addClass('card cardchar').attr('index',i);
     charCard.append($("<h3>").addClass('card-header').attr('name',characterArray[i].name).text(characterArray[i].name));
     charCard.append($("<img>").attr('src', characterArray[i].image));
     charCard.append(($("<div>").addClass('card-body')).append(($('<span>').addClass('card-text health')).text('Health: ' + characterArray[i].health)).append(($('<span>').addClass('card-text damage')).text('  Damage: ' + characterArray[i].damage)));
    $('#sectionOne').append(charCard);
   }



   $('#sectionOne').prepend($('<h2>Choose a Player</h2>').addClass('titleSecOne'));

   // Function select Oponent

   function oponentChosenFun(cardcharSe) {
        
    if(!oponentChosen) { // Chose oponent, verify no already chosen
     
     if (!attackBttn) {
      attackButton();
      attackBttn = true;
     }
     
     $('#sectionTwo').append(cardcharSe);
     oponentChosen = true;
     $('.titleSecOne').text('Click "Attack" button to start the fight');

     // variables set
     oponentIndex = $('.oponent').attr('index');
     oponentHealth = characterArray[oponentIndex].health;
     oponentDamage = characterArray[oponentIndex].damage;
     oponentDamageCh = characterArray[oponentIndex].damageChange;
       

     
    } else{
      return false;
    } 
   };     


   $('.cardchar').on('click', function () {
       if (!playerChosen) {  // Chose player, verify no already chosen
        var cardcharSe = $(this).addClass('player');
        $('#sectionTwo').append(cardcharSe);
        playerChosen = true;

        // variables set
        playerIndex = $('.player').attr('index');
        playerHealth = characterArray[playerIndex].health;
        playerDamage = characterArray[playerIndex].damage;
        playerDamageCh = characterArray[playerIndex].damageChange;
        
        $('.titleSecOne').text('Choose an Oponent');
       
       } else {
        var cardcharSe = $(this).addClass('oponent');
        oponentChosenFun(cardcharSe);
   
       }; 

      // Function Choose a new oponent and delete the oponent defeated
       function newOponent () {
        $('#sectionTwo > .oponent').remove();
        oponentChosen = false;
        $('.titleSecOne').text('Choose an Oponent');


        console.log('is comming here');
      }

       // Function Player attack oponent, rest health to oponent
       function playerAttack() {
        if ( oponentHealth > 0 ){
        oponentHealth -= playerDamage;

        $('.oponent > .card-body > .health').text('Health: ' + oponentHealth);
  
        $('.titleSecOne').text( "" + characterArray[playerIndex].name + "" + ' attacked ' + characterArray[oponentIndex].name + ' with ' + characterArray[playerIndex].damage);
        playerDamage += playerDamageCh;
      } else {
        
        $('.titleSecOne').text('Oponent Defeated!!!');
        setTimeout(newOponent(), 2000);
        
      }
    }

      // Function Oponent attack player, rest health to player
      function oponentAttack() {
        if (playerHealth <= 0 ){
          return $('.titleSecOne').text('Game Over!!!');
        } else {
          playerHealth -= oponentDamage;
        
        $('.player > .card-body > .health').text('Health: ' + playerHealth);


        $('.titleSecOne').text( characterArray[oponentIndex].name + ' attacked back ' + characterArray[playerIndex].name + ' with ' + characterArray[oponentIndex].damage);
        oponentDamage += oponentDamageCh;
       
        }
          if (playerHealth <= 0 ) {
          return $('.titleSecOne').text('Game Over!!!');
        }
      };

    

     

      $('.btn-attack').on('click', function () {
          if (playerHealth > 0 && oponentHealth > 0 ) {
            playerAttack();
            if (oponentHealth > 0) {
              setTimeout( oponentAttack, 1000);
            } else {
             
              $('.titleSecOne').text('Oponent Defeated!!!');
              newOponent();
              
              }              
          
          
          $('.oponent > .card-body > .damage').text(' Damage: ' + oponentDamage);

         
          $('.player > .card-body > .damage').text(' Damage: ' + playerDamage);


          } else {
            return false;
          }

           
    }); //btn-attack
  });

 



}); // Ready

