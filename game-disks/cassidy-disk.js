// customize the appearance of the bullets
bullet = '&ast;';

// variables to be used later
var isBitten = false;
var isBleeding = false;
var timesPepperTaken = 0;
var isBandaged = false;
var hasBandaid = false;
var toiletUsed = false;
var bedroomPromptDisplayed = false;
var timeExamined = false;

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
        
        Your bathroom is to the east and your bedroom is north.
      `,
      items: [ // Declare items for the living room
        { name: ['TV', 'Television'], 
        desc: 'It\'s playing Scooby Doo: Mystery Incorporated.',
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
            if (!bedroomPromptDisplayed){
              const exit = getExit('north', room.exits);
              delete exit.block;
              println(`==================================================
              
              You freeze as you suddenly recall something- 
  
              Pepper doesn't have a festive costume for the holiday!
              
              You cannot seem to remember what the date is, though you have a digital clock lying around somewhere.`)
              bedroomPromptDisplayed = true;
            }
            },
        onTake(){
          if (timesPepperTaken === 0){
            println(`As you pick him up, he sinks his teeth into your skin. You yelp and put him down, but the damage is done. 
            
            Your hand now has a bite mark with a tiny bit of blood on it.`)
            isBitten = true;
            isBleeding = true;
          }
          else if (timesPepperTaken === 1){
            println(`Pepper squirms and wriggles away, managing to scratch you on the way down. 
            
            You are bleeding.`);
            isBitten = true;
            isBleeding = true;
          }
          else if (timesPepperTaken === 2){
            println(`Pepper will not stop screaming as you once again try to pick him up. 
            
            Your hand is now thoroughly fucked up.`);
            isBitten = true;
            isBleeding = true;
          }
          else if (timesPepperTaken >= 3){
            println("As valiant as your past attempts have been, Pepper figures you should probably do something else.");
          }
            timesPepperTaken ++}},
        {name: ['tree', 'christmas tree'],
        desc: "Its warm lights are comforting to you.",
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
      desc: `Your bathroom. It\'s a little cramped with the litterbox in there, but the shower is nice and you still love that new bathmat you bought.

       Above the toilet is a shelf holding your paper towels and a first aid kit.

       here is also, naturally, a sink with a mirror above it.`,
      items: [ // Declare items for the bathroom
        {name: 'first aid kit',
        desc: 'It\'s green and has a sticker of a very nervous looking dog on it.',
        isTakeable: true,
        onUse(){
          if (isBleeding && timesPepperTaken < 3){
            println('You patch yourself up using a bandaid.')
            isBleeding = false;
            hasBandaid = true;
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
          println(`Could come in handy.
          
          Paper Towels taken.`)
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
        This is your bedroom. Home sweet home.

        In the corner farthest from your bed is a shelf holding one of your many plants.

        On the right side of your desk next to your computer and your phone, you see a digital clock.

        You hear aggressive snorting coming from your bed.
      `,
      items: [ // Declare items for bedroom
        {name: ['digital clock', 'clock'],
      desc: `It's a mushroom shaped digital clock that displays the time. 

      You don't really remember having this, but it sure comes in handy now that the newest update on your phone made it so you can't use it to check the date.`,
      isTakeable: true,
      onLook(){
        const date = new Date();
        currentDate = date.toLocaleString();
        println(`It is currently ${currentDate}
        
        Damn! All of the stores you know of that would be able to help you right now are closed, except for one. Hats n' Such, which isn't within walking distance.`);
        timeExamined = true;
        
      },
      onUse(){
        const date = new Date();
        currentDate = date.toLocaleString();
        currentDate = date.toLocaleString();
        println(`It is currently ${currentDate}
        
        Damn! All of the stores you know of that would be able to help you right now are closed, except for one. Hats n' Such, which isn't within walking distance.`);
        timeExamined = true;
      },
      onTake(){
        println('You took the digital clock. \
        \n It fits nicely in your backpack. Better be careful not to break it, though.')
      }
      },
      {name: 'bed',
    desc: `Comfy and cozy.
    A compelling force makes you want to crawl under the covers and fall asleep, but you know that you wouldn't wake up for hours,
    at which point the stores would all be closed.

    But you wouldn't do that. Right?

    As you think about how bad of an idea it would be to use your bed right now, you see a very good girl wagging her tail, now on top of the covers.`,
    onUse(){
      println(`zzzzz
      ＜⌒／ヽ-､_＿_ 
      ／＜_/＿＿＿＿／
      ￣￣￣￣￣￣￣
      "Only five more minutes," you say countless times over the next 5 days.
      Christmas has passed.
      GAME OVER.`
      )},
    onTake(){
      println('In a perfect world, maybe.');
      }
    },
    {
      name: ['computer', 'pc', 'laptop', 'monitor'],
      desc: `Your laptop is pretty high quality overall.
      
      It would be nice to have a full desktop setup, but for now the laptop and the monitor it's hooked up to will do.`,
      isTakeable: true,
      onUse(){
        println(`Trina snorts loudly. She thinks you should do something else.`)
      },
      onTake(){
        println(`You can't figure out how to take the monitor with you, but you shove your laptop into your bag.
        
        Laptop taken.`)
      }
    },
    {
      name: 'shelf',
      desc: `It's in a bit of an awkward location, but it's the only place that this plant can actually get decent light in.`
    },
    {
      name: 'plant',
      desc: `It's coming along nicely!`,
    },
    {
      name: ['cellphone', 'cell phone', 'cell', 'phone', 'iphone'],
      desc: `Small but effective. 
      
      The backside of your phone case is holding a plethora of assorted cards, making it almost as big as the phone itself.`,
      isTakeable: true,
      onUse(){
        if (timeExamined){
          println(`You open the Uber app on your phone  and book one to Hats n' Such. 
          
          Strangely, the app tells you to type in "Uber" to confirm.`);
        }
        else{
          println(`The only app on your phone that stands out to you right now is Uber.`)
        }
      }
    },
    {
      name: ['trina', 'dog', 'doggy', 'puppy'],
      desc: 'doggy!',
      onTake(){
        println('If only.')
      }
    }
    ],
   exits: [{ dir: 'uber', id: 'uber'}]
    },
  {
    name: 'UBER RIDE',
    id: 'uber',
    desc: `The car you enter has a sleek black exterior and comfy grey seats.
    `,
    onEnter(){
      if (isBleeding){
        println(`The driver looks at his mirror and his eyes widen. He turns toward you.
        
        "Uh. Do you need a bandage? You're kind of like, bleeding all over my seats."
        
        You look down at your hand, which is still bleeding from Peppers bite. Oops.
        
        "Actually, nevermind," he says. "I don't care."`)
      }
      else if (hasBandaid){
        println(`The driver glances over at your hand and says, "Cute bandaid."`)
      }
      if (isBandaged){
        println(`The driver looks at his mirror and his eyes widen very slightly. He turns toward you.
        
        "Woah, what happened there?"
        
        You look down at your hand, which is heavily bandaged.
        
        "Actually, nevermind," he says. "I don't care."`)
      }
      println(`================================================
      
      You arrive at your destination after a bit of waiting. Type leave to get out.`)
    },
    exits: [{dir: 'leave', id: 'store'}]
  },
  {
    name: `HATS N' SUCH`,
    id: 'store',
    desc: `Hats N' Such is an amazing store with a big variety of objects that are very well described but not interactable for a perfectly valid reason.
    
    With incredible focus, you head to the section labeled "Cool christmas hats for pets". You decide to close your eyes and randomly pick two out, then head to the counter.
    
    You explain to the person at the register that you're trying to surprise yourself and don't want to know what you got. They nod their head and hand you a bag.
    
    You decide this experience has been sufficiently cool and interactive and decide to type "HOME" to go home with the costumes.`,
  exits:[{dir: 'home', id: 'homeAgain'}],
  },
  {name: 'LIVING ROOM AGAIN.',
  id: 'homeAgain',
  desc: `As you enter your living room, you see the two animals conveniently lined up waiting for you. Trina is holding some kind of card.
  
  You take it from her, then proceed to put on their hats, as pictured above. 
`,
  img: `
            ooo        ooooo oooooooooooo ooooooooo.   ooooooooo.   oooooo   oooo                  
            88.       .888'  888'      8  888    Y88.  888    Y88.   888.   .8'                   
            888b     d'888   888          888   .d88'  888   .d88'    888. .8'                    
            8 Y88. .P  888   888oooo8     888ooo88P'   888ooo88P'      888.8'                     
            8   888'   888   888    "     888 88b.     888 88b.         888'                      
            8    Y     888   888       o  888   88b.   888   88b.       888                       
          o8o        o888o o888ooooood8 o888o  o888o o888o  o888o     o888o                      
          ooooooo  ooooo ooo        ooooo       .o.        .oooooo..o                            
            8888    d8'   88.       .888'      .888.      d8P'     Y8                            
              Y888..8P     888b     d'888      .8"888.     Y88bo.                                 
                8888'      8 Y88. .P  888     .8'  888.      "Y8888o.                             
              .8PY888.     8   888'   888    .88ooo8888.         "Y88b                            
            d8'   888b    8    Y     888   .8'      888.  oo     .d8P                            
          o888o  o88888o o8o        o888o o88o     o8888o 8""88888P'                             
            .oooooo.         .o.        .oooooo..o  .oooooo..o ooooo oooooooooo.   oooooo   oooo 
            d8P'   Y8b       .888.      d8P'     Y8 d8P'     Y8  888'  888'    Y8b    888.   .8'  
          888              .8"888.     Y88bo.      Y88bo.       888   888      888    888. .8'   
          888             .8'  888.      "Y8888o.    "Y8888o.   888   888      888     888.8'    
          888            .88ooo8888.         "Y88b       "Y88b  888   888      888      888'     
            88b    ooo   .8'      888.  oo     .d8P oo     .d8P  888   888     d88'      888      
            Y8bood8P'  o88o     o8888o 8""88888P'  8""88888P'  o888o o888bood8P'       o888o     
                                                                                        

            =======================================================================================
            __                                           _                   ___
          _                  _     _                  ___                     _
          __                       _                   _                      _ _
                                          ,▄▄▄▄▄▄▄                          _
                                        ,▄█╢▓▓▓▓▓▓▓╢█▀   ▀_
                                      █▓▓▓▓▓▓▓▓▓▓▓█▌     ▌
                                    ╒█▓▓▓▓▓▓▓▓▓▓▓█_▀▄▄▄▄▀
                    ▄∞▄▄           ,█▓▓▓▓▓▓▓▓▓▓▓▓╢█           ▄▄∞▄
                    ▌     ▀∞▄_     ███▓▓▓▓▓▓▓█▓█████_    ▄∞▀▀    └▄
                    █          ▀▄_ █_                ▐,▄▀-         █
                    ▌             ▀▌_    ,,,,,,      ▐▌_           ▐_           __
          _           ▌            _ ▀▀▀-          - ▀▀▀_ _ __       ▐_         __
          _          ▌          _ _                   _  _ _        ▐        _ _
          _         ▐_         __                                  █        _
                    ▌                                            ╒_
                    ▐⌐                                           ▌
                      ▐_                                         █
                      ▌       ,▄▄▄,                  ,▄▄▄,       ▐⌐
                    ▐_     ▐  ▄████▀▄_           ▄▀████▄ -█      ▌
                    █       ▀▄▀████  █_         █  █████▄▀       █
            _       ▐          ▀▀▀M▀▀            ▀▀ⁿ▀▀▀          █
          ___       ▐▄                                 _ _       ▌         __  __
            .¬══^ⁿ""" █"  """^*══¬.__     ,▄▄,_      .⌐∞═^*""""  █ """ⁿ^^═∞w
                    ,.⌐█══^*ⁿ"""""ⁿ^      ▀██▀      ^ⁿ""""""*^^═█¬.,_         __
              ═" _      ▀,,,⌐══^""         ▐▌          "ⁿ^═¬., ▀        "═
                    .═ⁿ   ▄_          *w▄∞²  ═▄▄▄═           ▄▀  ⁿ═._
                ═"          ▀▄                            ,Æ▀         "*_
                              ▀N▄                      ▄Æ▀
                                  ▀▀∞▄▄,        ,▄▄∞ⁿ▀-
                                        -    -
                                    _
          _ _                     _ _                  __                     _ _
            _                  ___                        _                _ _
            
            
            ===================================================================================
            
            
            _        ___ __ __ _________________░____░__░░░░
            ░────────────────────────────────────────────────────────────────────────░░░░
            ░                                                                         ░░░
            ░                                                                         ░░░
            ░                                                                         ░░░
            ░                                                                         ░░░
            ░                                                                         ░░░
            ░                                                                         ░░░
            ░                                                                         ░░░
            ░             ▄▄▄▄,            ,▄@▓▓╣╢╢╣▓█▄,      ███▄                    ░░░
            ░             ▐▄ ▀▀██▀▄▄     ▄▓╢▓▓▓▓╢╢▓▓▓▓▓╢█▄    ▀█▌█▄                   ░░░
            ░              █      ▀▄▀█▄ █╢▓▓▓▓██▓▓▓▓╢▓▓▓▓▓█_   █" █                   ░░░
            ░              ▐▌       "▀▄█╢▓▓▓╢██▓▀▀      ¬¬¬.▐_▄▀ ▐▌                   ░░░
            ░               █⌐        ▐╣▓▓▓▓▀'    ▄∞ⁿ""ⁿⁿ∞▄_ ▐   █                    ░░░
            ░                █_       █▓▓▓█▀ _ ▄▀           ⁿ▀   █_                   ░░░
          _ _░                 █▄╒▄   ▐╣▓▓██Γ ▄▀                  █_                   ░░░
          _  ░                  ▀████P▀▀▀▓▀ ╒▀                    █                    ░░░
          _ _░                   ▐▌       █ª  ▄                  "▀▄_                  ░░░
          _  ░                    ▀█_     ▌  █                      █_                 ░░░
          ___░                      "▀═▄Γ    ▀▄▄█████▄▄,⌐     ¬▄▄████▌                 ░░░
          _ ░                         ▐▌      ▀▀██▀██▀-       ▐█████                  ░░░
          ___░                         ▐▌          ▀▀           ▀██▀                   ░░░
          ___░                         ▐▌                        "█▄,▌                 ░░░
          ___░                          ▀█,                  ╓█▀▀▀▀██Γ                j░░░
          ___░                            "█_▄▄_             "██████-                 j░░░
          ___░                              ▀█████▄▄▄, ▀═▄▄   ▀████▀                  j░░░
          ___░                                -▀▀█▀  "██▄▄  ▀▀▄▄▀▀                    j░░░
          ___░                                   █▄   █▌ - ▀                          j░░░
          ___░                                    '▀▀▀                                j░░░
          ___░                                                                        j░░░
          _░░░                                                                        j░░░
          __░░                                                                        j░░░
          __░░                                                                        j░░░
          ░_░░                                                                        j░░░
          ░░░░                                                                        ,░░░
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`
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
      },
    ],
  },
    {
    name: ['trina', 'dog', 'doggy', 'good girl'],
    roomId: 'bedroom',
    desc: 'issa dog',
    onTalk(){
      println('khrrr...')
    },
    topics: [
      {
        option: '**PET** her',
        line: 'snortnsoortsnortnosrtnosrt'
      }
    ]
    },
    {
      name: ['driver', 'uber driver', 'guy', 'man'],
      roomId: 'uber',
      desc: `He looks like the most indifferent person you've ever seen.`,
      onTalk(){
        println(`You open your mouth, but can't think of anything to say. He raises an eyebrow at the mirror.
        
        ~~~FIN~~~`);
      }
    }
  ]
  }
);
