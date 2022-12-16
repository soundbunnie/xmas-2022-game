// customize the appearance of the bullets
bullet = '&ast;';

// keep track of examined items

var itemsExamined = [];

// variables to be used later
var isBitten = false;
var isBleeding = false;
var timesPepperTaken = 0;
var isBandaged = false;
var toiletUsed = false;

// customize the help menu
help = () => println(`LOOK :: repeat room description
LOOK AT [OBJECT NAME] e.g. 'look at key'
TAKE [OBJECT NAME] e.g. 'take book'
GO [DIRECTION] e.g. 'go north'
USE [OBJECT NAME] e.g. 'use door'
INV :: list inventory items
HELP :: this help menu`);

commands[0].help = help;

// switch to the retro style
document.getElementById('styles').setAttribute('href', 'styles/retro.css');

// change font color and title
document.body.style.color = "#00FFFF";
document.title = "Cassidy's Christmas Adventure!"

const cassidyDisk = () => ({
  roomId: 'playerLivingRoom',        // The room the player is currently in. Set this to the room you want the player to start in.
  inventory: [],             // You can add any items you want the player to start with here.
  rooms: [
    {
      name: 'LIVING ROOM',     // This will be displayed each time the player enters the room.
      id: 'playerLivingRoom',        // The unique identifier for this room. Entering a room will set the disk's roomId to this.
      img: `
            ░█████╗░░█████╗░░██████╗░██████╗██╗██████╗░██╗░░░██╗██╗░██████╗
            ██╔══██╗██╔══██╗██╔════╝██╔════╝██║██╔══██╗╚██╗░██╔╝╚█║██╔════╝
            ██║░░╚═╝███████║╚█████╗░╚█████╗░██║██║░░██║░╚████╔╝░░╚╝╚█████╗░
            ██║░░██╗██╔══██║░╚═══██╗░╚═══██╗██║██║░░██║░░╚██╔╝░░░░░░╚═══██╗                                
            ╚█████╔╝██║░░██║██████╔╝██████╔╝██║██████╔╝░░░██║░░░░░░██████╔╝
            ░╚════╝░╚═╝░░╚═╝╚═════╝░╚═════╝░╚═╝╚═════╝░░░░╚═╝░░░░░░╚═════╝░

        ░█████╗░██╗░░██╗██████╗░██╗░██████╗████████╗███╗░░░███╗░█████╗░░██████╗
        ██╔══██╗██║░░██║██╔══██╗██║██╔════╝╚══██╔══╝████╗░████║██╔══██╗██╔════╝
        ██║░░╚═╝███████║██████╔╝██║╚█████╗░░░░██║░░░██╔████╔██║███████║╚█████╗░
        ██║░░██╗██╔══██║██╔══██╗██║░╚═══██╗░░░██║░░░██║╚██╔╝██║██╔══██║░╚═══██╗
        ╚█████╔╝██║░░██║██║░░██║██║██████╔╝░░░██║░░░██║░╚═╝░██║██║░░██║██████╔╝
        ░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═════╝░░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═════╝░

      ░█████╗░██████╗░██╗░░░██╗███████╗███╗░░██╗████████╗██╗░░░██╗██████╗░███████╗
      ██╔══██╗██╔══██╗██║░░░██║██╔════╝████╗░██║╚══██╔══╝██║░░░██║██╔══██╗██╔════╝
      ███████║██║░░██║╚██╗░██╔╝█████╗░░██╔██╗██║░░░██║░░░██║░░░██║██████╔╝█████╗░░
      ██╔══██║██║░░██║░╚████╔╝░██╔══╝░░██║╚████║░░░██║░░░██║░░░██║██╔══██╗██╔══╝░░
      ██║░░██║██████╔╝░░╚██╔╝░░███████╗██║░╚███║░░░██║░░░╚██████╔╝██║░░██║███████╗
      ╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚══╝░░░╚═╝░░░░╚═════╝░╚═╝░░╚═╝╚══════╝
                                                                                                            
      `,
      desc: `
        You are sitting on your new couch watching TV. It took quite a lot of waiting and coordinating to get the damn thing here, but your patience has finally paid off.

        To your right sits an immaculately decorated Christmas tree. Underneath it lies an adorable little kitten named Pepper.
      `,
      items: [ // Declare items for the living room
        { name: ['TV', 'Television'], 
        desc: 'It\'s playing Scooby Doo: Mystery Incorporated.',
        onLook(){
            let room = getRoom(disk.roomId); // Check if player has examined 3 items in room, if so prompt player to let them know they can move on.
            if (!itemsExamined.includes('Television')){
                itemsExamined.push("Television")};
            if (itemsExamined.length === 3){
                const exit = getExit('north', room.exits);
                delete exit.block;
                println('You freeze as you suddenly recall what you\'ve forgotten- \
                \n Pepper doesn\'t have a festive costume for the holiday! \
                \n You cannot seem to remember what the date is, though you know that you have a calendar in your room, located north.')
            }},
        onTake(){println('Where are you going to put it? Your pockets?')}},
        {name: ['couch', 'sofa'],
        desc: 'Comfy.',
        onTake(){
          println('If only.')
        }},
        {name: ['pepper', 'cat', 'kitten', 'asshole'],
        desc: 'He\'s sleeping peacefully under the tree.',
        onLook(){
            let room = getRoom(disk.roomId);
            if (isBitten){
                println('Even if he\'s an asshole, seeing his tiny, sleeping face makes it hard to stay mad at him.')
            }
            if (!itemsExamined.includes('Pepper')){
                itemsExamined.push("Pepper")}
            if (itemsExamined.length === 3){
                const exit = getExit('north', room.exits);
                delete exit.block;
                println('You freeze as you suddenly recall what you\'ve forgotten- \
                \n Pepper doesn\'t have a festive costume for the holiday! \
                \n You cannot seem to remember what the date is, though you know that you have a calendar in your room, located north.')
            }},
        onTake(){
          if (timesPepperTaken === 0){
            println('As you pick him up, he sinks his teeth into your skin. You yelp and put him down, but the damage is done. Your hand now has a bite mark with a tiny bit of blood on it.')
            isBitten = true;
            isBleeding = true;
          }
          else if (timesPepperTaken === 1){
            println('Pepper squirms and wriggles away, managing to scratch you on the way down. You are bleeding.');
            isBitten = true;
            isBleeding = true;
          }
          else if (timesPepperTaken === 2){
            println("Pepper will not stop screaming as you once again try to pick him up. Your hand is now thoroughly fucked up.");
            isBitten = true;
            isBleeding = true;
          }
          else if (timesPepperTaken >= 3){
            println("As valiant as your past attempts have been, Pepper figures you should probably do something else.");
          }
            timesPepperTaken ++}},
        {name: ['tree', 'christmas tree'],
        desc: "Its warm lights are comforting to you.",
        onLook(){
            let room = getRoom(disk.roomId);
            if (!itemsExamined.includes('Christmas Tree')){
                itemsExamined.push("Christmas Tree")}
                if (itemsExamined.length === 3){
                    const exit = getExit('north', room.exits);
                    delete exit.block;
                    println('You freeze as you suddenly recall what you\'ve forgotten- \
                    \n Pepper doesn\'t have a festive costume for the holiday! \
                    \n You cannot seem to remember what the date is, though you know that you have a calendar in your room, located north.')}},
        onTake(){println('A noble idea.')}}
      ],
      exits: [
        { dir: ['north', 'bedroom'], id: 'bedroom', block: "You feel as though you're forgetting something...", },     // "dir" can be anything. If it's north, the player will type "go north" to get to the room called "endOfTheWorld".
        { dir: ['east', 'bathroom'], id: 'bathroom'}
      ]
    },
    {
      name: 'BATHROOM',
      id: 'bathroom',
      desc: 'Your bathroom. It\'s a little cramped with the litterbox in there, but the shower is nice and you still love that new bathmat you bought.\
       \n Above the toilet is a shelf holding your paper towels and a first aid kit.\
       \nThere is also, naturally, a sink with a mirror above it.',
      items: [ // Declare items for the bathroom
        {name: 'first aid kit',
        desc: 'It\'s green and has a sticker of a very nervous looking dog on it.',
        isTakeable: true,
        onUse(){
          if (isBleeding && timesPepperTaken < 2){
            println('You patch yourself up using a bandaid.')
            isBleeding = false;
          }
          else if (isBleeding && timesPepperTaken >= 3){
            println('You patch yourself up using an assortment of things you find in the first aid kit. Your hand still hurts like hell.')
            isBleeding = false;
            isBandaged = true;
          }
          else{
            println('Thankfully, you see no reason that you would need anything from in there.')
          }
        }},
        {name: 'toilet',
        desc: 'It sure is a toilet.',
        onTake(){
          println('Now that would be impressive.')
        },
        onUse(){
          println('You feel a bit of relief as the toilet flushes.')
          toiletUsed = true;
        }
        },
        {name: ['paper towel', 'paper towels'],
        desc: 'Always runs out too soon.',
        isTakeable: true,
        onTake(){
          println('Could come in handy.')
        }},
        {name: ['litter box', 'litter', 'litterbox'],
        desc: 'It\'s clean.',
        onTake(){
          println('You decide your time could be better spent.')
        },
        onUse(){
          println('Um... You can if you really want to, I suppose.')
        }},
        {name: ['shower', 'bath'],
        desc: 'Two loofahs are hung on the wall and lines of various shampoos and conditioners line the rims of the bathtub.',
        onTake(){
          println('Now\'s probably not the time for a shower.')
        },
        onUse(){
          println('Now\'s probably not the time for a shower.')
        }},
        {name: 'mirror',
        desc: 'You stare at your reflection. Looking good.',
        onTake(){
          println('It\'s not that kind of mirror.')
        }},
        {name: 'sink',
        desc: 'You can tell it wasn\'t built this decade, but it works just fine.',
        onTake(){
          println('Feeling ambitious, are we?')
        },
        onUse(){
          if (toiletUsed === true){
            println('They say cleanliness is among godliness.')
          }
          else{
            println('Your hands aren\'t dirty, but washing them couldn\'t hurt.')
          }
        }},
        {name: ['bathmat', 'mat', 'bath mat'],
        desc: 'The cat depicted on the bathmat is very cute and good. You wonder if Pepper would be jealous.',
        onTake(){
          println('You\'re not sure that it\'s worth the effort.')
        }},
        {name: 'shelf',
        desc: 'It holds up pretty good.'},
      ],
      exits: [
        {dir: ['west', 'living room'], id: 'playerLivingRoom'}
      ]
    },
    {
      name: 'BEDROOM',
      id: 'bedroom',
      desc: `
        This is your bedroom. Home sweet home. \
        \nOn the wall to the right of your desk, you see your trusty calendar.\
        \nYou hear aggressive snorthing coming from your bed.
      `,
    }],
  characters: [
    {
    name: ['pepper', 'cat', 'kitten'],
    roomId: 'playerLivingRoom',
    desc: 'issa cat',
    onTalk(){
      println('\"mrreeoww...\"')
    },
    topics: [
      {
        option: '**PET** him',
        line: 'He bites you gently before going back to what he was doing.',
      },
      {
        option: 'Ask him about his **DAY**',
        line: 'He stares at you blankly.'
      },
      {
        option: 'Ask if he was responsible for the **1978** oil crisis.',
        line: 'Actually, you figure that you\'d rather not know.',
        removeOnRead: true
      }
    ]
  }
  ]
});
