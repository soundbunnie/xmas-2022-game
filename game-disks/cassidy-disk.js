// customize the appearance of the bullets
bullet = '&ast;';

// keep track of examined items

var itemsExamined = [];

// variables to be used later
var isBitten = false;
var isBleeding = false;
var timesPepperTaken = 0;
var isBandaged = false;

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

// change font color
document.body.style.color = "#00FFFF";

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
      items: [
        { name: ['TV', 'Television'], 
        desc: 'It\'s playing Scooby Doo: Mystery Incorporated.',
        onLook(){
            let room = getRoom(disk.roomId);
            if (!itemsExamined.includes('Television')){
                itemsExamined.push("Television")};
            if (itemsExamined.length === 3){
                const exit = getExit('north', room.exits);
                delete exit.block;
                
                println('You freeze as you suddenly recall what you\'ve forgotten- \n Pepper doesn\'t have a festive costume for the holiday! \n You cannot seem to remember what the date is, though you know that you have a calendar in your room, located north.')
            }},
        onTake(){println('Where are you going to put it? Your pockets?')}},
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
                println('You freeze as you suddenly recall what you\'ve forgotten- \n Pepper doesn\'t have a festive costume for the holiday! \n You cannot seem to remember what the date is, though you know that you have a calendar in your room, located north.')
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
        onLook(){
            let room = getRoom(disk.roomId);
            if (!itemsExamined.includes('Christmas Tree')){
                itemsExamined.push("Christmas Tree")}
                if (itemsExamined.length === 3){
                    const exit = getExit('north', room.exits);
                    delete exit.block;
                    println('You freeze as you suddenly recall what you\'ve forgotten- \n Pepper doesn\'t have a festive costume for the holiday! \n You cannot seem to remember what the date is, though you know that you have a calendar in your room, located north.')
                }},
        desc: "Its warm lights are comforting to you.",
        onTake(){println('A noble idea.')}}
      ],
      exits: [
        { dir: ['north', 'bedroom'], id: 'bedroom', block: "You feel as though you're forgetting something...", },     // "dir" can be anything. If it's north, the player will type "go north" to get to the room called "endOfTheWorld".
        { dir : ['east', 'bathroom'], id: 'bathroom'}
      ]
    },
    {
      name: 'BATHROOM',
      id: 'bathroom',
      desc: 'Your bathroom. It\'s a little cramped with the litterbox in there, but the shower is nice and you still love that new bathmat you bought. \n Above the toilet is a shelf holding your toilet paper, paper towels and a first aid kit.\nThere is also, naturally, a sink with a mirror above it.',
      items: [
        {name: 'first aid kit',
        desc: 'It\'s green and has a sticker of a very nervous looking dog on it.',
        isTakeable: true,
        onUse(){
          if (isBleeding && timesPepperTaken < 2){
            println('You patch yourself up using a bandaid.')
            isBleeding = false;
          }
          else if (isBleeding && timesPepperTaken >= 3){
            println('You attempt to patch yourself up, but it requires the use of an alcohol wipe, the gauze bandage, and a real bandage.')
            isBleeding = false;
            isBandaged = true;
          }
          else{
            println('Thankfully, you see no reason that you would need anything from in there.')
          }
        }}
      ],
      exits: [
        {dir: ['west', 'living room'], id: 'playerLivingRoom'}
      ]
    },
    {
      name: 'BEDROOM',
      id: 'bedroom',
      desc: `
        This is your bedroom. Home sweet home. \nOn the wall to the right of your desk, you see your trusty calendar. \nYou hear aggressive snorthing coming from your bed.
      `,
      // This is just here as an example of how you can use the onEnter property.
      // This gets called when the player enters the room.
      onEnter({disk, println, getRoom}) {
        console.log('Entered', disk.roomId); // Logs "Entered endOfTheWorld"
      },
      items: [
        { name: 'key', desc: 'It looks like a key.', isTakeable: true, onUse({disk, println, getRoom}) {
          // This method gets run when the user types "use key".
          const room = getRoom(disk.roomId);
          const door = room.items.find(item => item.name === 'door');
          // If there's a door in the room, open it.
          if (door) {
            println('The door has opened!');
            door.isOpen = true;
          } else {
            println('There\'s nothing to use the key on.');
          }
        }},
        { name: 'book', desc: 'It appears to contain some sort of encantation, or perhaps... code.', isTakeable: true, onUse({disk, println, getRoom}) {
          const room = getRoom(disk.roomId);
          const door = room.items.find(item => item.name === 'door');

          if (door) {
            println('You already used the book!');
            return;
          }

          println('A door has appeared from nothing! It seems to go nowhere...');
          room.items.push({ name: 'door', desc: 'It seems to go nowhere...', isOpen: false, onUse({disk, println, enterRoom}) {
            const door = room.items.find(item => item.name === 'door');
            if (door.isOpen) {
              enterRoom('gameReallyOver');
            } else {
              println('The door is locked.');
            }
          }});
        }},
        { name: 'castle', desc: 'It has been... corrupted somehow.' },
      ]
    },
    {
      name: 'GAME REALLY OVER',
      id: 'gameReallyOver',
      img: '¯\\_(ツ)_/¯',
      desc: `
        That's all I've written so far! If you liked this and want more, write me on Twitter: @okaybenji
      `,
    },
  ],
});
