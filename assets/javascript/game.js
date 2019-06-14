$(document).ready(function() {

  let characterObj = [
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
      name:"Grand Master Yoda",
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


   for (let i = 0; i < characterObj.length; i++) {
     console.log(characterObj.length);
     var charCard = $("<div>").addClass('card');
     charCard.append($("<h3>").addClass('card-header').text(characterObj[i].name));
     charCard.append($("<img>").attr('src', characterObj[i].image));
     charCard.append(($("<div>").addClass('card-body')).append(($('<p>').addClass('card-text')).text(characterObj[i].health)));
   
    $('#sectionOne').append(charCard);

   }


});
