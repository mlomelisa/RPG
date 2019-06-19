$(document).ready(function() {
  
  var playerChosen = false;
  var oponentChosen = false;
  var attackBttn = false;
  var playerAttacked = false;
  var oponentAttacked = false;
  var oponentNum = 0;
  var cardcharSe;
  var playerHealth;
  var oponentHealth;
  var playerIndex;
  var oponentIndex;
  var playerDamage;
  var oponentDamage;
  var playerDamageCh;
  var oponentDamageCh; 
 
  // Array with each character like an object
  let characterArray = [
    countD = {
      name:"Count Dooku",
      health: 500,
      damage: 40,
      damageChange: 10,
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
  ];

  // Generate the Characters from character Array
  for (let i = 0; i < characterArray.length; i++) {
     
    var charCard = $("<div>").addClass('card cardchar').attr('index',i);
    charCard.append($("<h3>").addClass('card-header').attr('name',characterArray[i].name).text(characterArray[i].name));
    charCard.append($("<img>").attr('src', characterArray[i].image));
    charCard.append(($("<div>").addClass('card-body')).append(($('<span>').addClass('card-text health')).text('Health: ' + characterArray[i].health)).append(($('<span>').addClass('card-text damage')).text('  Damage: ' + characterArray[i].damage)));
   $('#sectionOne').append(charCard);
  };

 // Generete Attack button
 function attackButton () {
      var attackbtn = $('<button>');
      attackbtn.addClass("btn btn-danger btn-attack").text('Attack');
      $('.jumbotron').append(attackbtn);
      attackBttn = true;
  };

  // Add comments of actions

  $('#sectionOne').prepend($('<h2>Choose a Player</h2>').addClass('titleSecOne'));


    // Function Choose a new oponent and delete the oponent defeated
    function newOponent () {
      $('#sectionTwo > .oponent').removeClass('oponent').remove();
      oponentChosen = false;
      if(oponentNum === 3){
        $('.titleSecOne').text('You win the combat!!');
        $('.jumbotron > .btn-attack').remove();
      }else{
        $('.titleSecOne').text('Choose an Oponent');
        oponentIndex;
        oponentHealth;
        oponentDamage;
        oponentDamageCh;
      }
    }  


 
 // Function select Player and Oponent, when click on card.
  
   $('.cardchar').on('click', function () {
    
    if (!playerChosen) {  // Chose player, verify no already chosen
     cardcharSe = $(this).addClass('player');
     $('#sectionTwo').append(cardcharSe);
     playerChosen = true;

     // variables set
     playerIndex = $('.player').attr('index');
     playerHealth = characterArray[playerIndex].health;
     playerDamage = characterArray[playerIndex].damage;
     playerDamageCh = characterArray[playerIndex].damageChange;
 
     
     $('.titleSecOne').text('Choose an Oponent');
     
    
    } else {
     
        if(!oponentChosen) { // Chose oponent, verify no already chosen
          cardcharSe = $(this).addClass('oponent');
              if (!attackBttn) {
              attackButton();
              attackBttn = true;
              }
              oponentNum++;
          $('#sectionTwo').append(cardcharSe);
          oponentChosen = true;
          $('.titleSecOne').text('Click "Attack" button to start the fight');
    
          // variables set
          oponentIndex = $('.oponent').attr('index');
          oponentHealth = characterArray[oponentIndex].health;
          oponentDamage = characterArray[oponentIndex].damage;
          oponentDamageCh = characterArray[oponentIndex].damageChange;
          console.log("1 PlayerHealth:" + playerHealth,"playerDamage" + playerDamage ); 
          console.log("1 OponentHealth:" + oponentHealth,"oponentDamage" + oponentDamage ); 
          
        } else{
          return false;
      } 

     }; 
      
     // Func click button attack
$('.btn-attack').unbind('click').click(function(event) {
    playerAttacked = false;
   if(!event.detail || event.detail == 1) {

  

         
         // Func player attack
              if(!playerAttacked) {
                playerAttacked = true
                if ( oponentHealth > 0 && playerHealth > 0) { // Validate both have positive health
            
                  oponentHealth -= playerDamage;
          
                $('.oponent > .card-body > .health').text('Health: ' + oponentHealth);
              
                $('.titleSecOne').text( "" + characterArray[playerIndex].name + "" + ' attacked ' + characterArray[oponentIndex].name + ' with ' + playerDamage);
                playerDamage += playerDamageCh;
                $('.player > .card-body > .damage').text(' Damage: ' + playerDamage);
              
                if (oponentHealth <= 0 ) {
                  $('.titleSecOne').text('Oponent Defeated!!!');
                  
                  console.log("Im here");
                setTimeout(newOponent, 2000);
                return false;
                };
          
              } else {
              
                $('.titleSecOne').text('Oponent Defeated!!!');
                setTimeout(newOponent, 2000);
                
              } 

            }; //-----------------------------   Player attack func
          oponentAttacked = false;    
        
        // Function Oponent attack player, rest health to player
        setTimeout(function() {

        
          if (!oponentAttacked ) {
            oponentAttacked = true;
            if ( oponentHealth > 0 && playerHealth > 0) { 
              if (playerHealth <= 0){

              
              $('.titleSecOne').text('Game Over!!!');
              
              $('.jumbotron > .btn-attack').remove();

                return false;
            } else {
              playerHealth -= oponentDamage;
              
              $('.player > .card-body > .health').text('Health: ' + playerHealth);
          
              $('.titleSecOne').text( characterArray[oponentIndex].name + ' attacked back ' + characterArray[playerIndex].name + ' with ' + oponentDamage + '.    Click "Atack"');
            
            oponentDamage += oponentDamageCh;
            $('.oponent > .card-body > .damage').text(' Damage: ' + oponentDamage);
            //Validate after opponent attack if player still with health
              if (playerHealth <= 0 ) {
                console.log("4.1 PlayerHealth:" + playerHealth,"playerDamage" + playerDamage );
                $('.titleSecOne').text('Game Over!!!');
                $('.jumbotron > .btn-attack').remove();
                return false;
              } 
            }      
          } 
        }; // ---------------------- Func Oponent Attack
      }, 2000);
          console.log("2 PlayerHealth:" + playerHealth,"playerDamage" + playerDamage ); 
          console.log("2 OponentHealth:" + oponentHealth,"oponentDamage" + oponentDamage );
        
        }
     }); //btn-attack
    
   }); //------------------------------------ Cardchar click

}); // Ready