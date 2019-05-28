# [Chogue]

## Pippin Barr <pippin.barr@gmail.com>	Sat, Jun 23, 2018 at 5:13 PM To: Jonathan Lessard <glandeurlessard@gmail.com>

[...]

(Occurs to me we could consider level 26 for the king in Cherry Chogue if it turns out to be too easy. Or just more pieces, as there's a huge satisfaction to the more complex rooms in terms of it being like a chess puzzle. Maybe the latter... 26 levels might be overkill... though maybe not, it's pretty fun to play and I wasn't bored even once during this run.)



## Jonathan Lessard <glandeurlessard@gmail.com>	Sat, Jun 23, 2018 at 10:29 PM To: Pippin Barr <pippin.barr@gmail.com>

[...]

cherry chogue:

I've been thinking about it... wouldn't be nice to try even more variations while we're doing a second one instead of everything the same but one thing? Perhaps we could revive the single avatar idea--and xp would allow you to level up and have more HP than 9, for example...

[...]

best,

Jo

## Pippin Barr <pippin.barr@gmail.com>	Sun, Jun 24, 2018 at 9:34 AM To: Jonathan Lessard <glandeurlessard@gmail.com>

[...]

Cherry: yeah it's a good question as to whether we ought to do more. I think my counter-proposal might be to release Cherry as is as a really clear depiction of design space that we actually put into the wild. But then, yeah, I'd be up for making further weird variations of this thing as we think of them - the single avatar thing is pretty hilarious, and now that we have the framework a lot of this wouldn't be nearly as hard. Solo Chogue. Chogue For One.

[...]

---

# Cherry Chogue...

##Pippin Barr <pippin.barr@gmail.com>	Thu, Aug 16, 2018 at 4:43 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
Does feel easy... hmmm. I mean, I didn't beat it, but it really felt like I would do so inevitably...

---

# Cherry Chogue branch

## Jonathan Lessard <glandeurlessard@gmail.com>	Fri, Aug 17, 2018 at 2:25 PM To: Pippin Barr <pippin.barr@gmail.com>
Hey,

Went out and tried a few things in the new CherryChogue branch:

- new colors (not all consistent, but borrowing from CGA again)

- Begin (and remain) with a single piece

- Powerups give you more hp (relatively to their type for now)

- HP carries over to next level, which I realized didn't happen in the current context.

Definetely changes things... you are really focused on your avatar, not having to look back at the "nest". Things coming out of the dark are still scary but not as fatal, with every hit I immediately look at my HP counter to see how bad it was. Finding powerups are nice...

So not sure but I wanted to try!

best,

Jo

## Pippin Barr <pippin.barr@gmail.com>	Sun, Aug 19, 2018 at 5:13 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
New colours are pleasing.

HP thing works really well as an initial approach to balance.

The opening board is still pretty funny with the single pawn chasing the king.

Actual gameplay... well, I made it to level 6. Felt very much like the best strategy is still avoiding absolutely everything, which is a pain. Our combat system is now at odds with the overriding goal of descending levels basically. With combat not being "mandatory" any more it just doesn't serve much of a purpose. I guess this is semi-true even in Rogue in the sense that if you could avoid all the enemies it would be way easier, but the issue in Rogue of course is that you encounter ever stronger enemies to a point where you'll get instantly killed, so you have to fight to... be ready to fight.

We could revisit the idea of a little party of four, given that's a classic RPG approach. But that immediately blows our ideas about truth to Rogue/Chess out the window, so probably not any good.

If the piece's levelling up was slower it could be interesting? Not a queen but rather a knight at the start (because pawns truly are useless) and you only upgrade to stronger pieces over time? Or just your HP goes up over time and your damage goes up? I mean, if we take on Rogue's approach you want the player to always be more or less stronger than _one_ enemy at any given moment, but to have to navigate the problem of there being more than one enemy around... it seems like we need to be able to increase HP and damage to accomplish that? And similarly have more challenging enemies?

Feels less 'pure' though.

How annoying that this game doesn't work as well as we thought! Shit.

I guess the other route is to return to think about the original Cherry with the full team but to somehow emphatically reward combat over avoidance. One obvious option (which sadly is unrelated to Rogue or Chess) would be to lock the stairs until you've defeated the enemies on the level, or to find a key dropped by one or something. That would reward combat positively...

Hmmm.

## Jonathan Lessard <glandeurlessard@gmail.com>	Sun, Aug 19, 2018 at 8:44 PM To: Pippin Barr <pippin.barr@gmail.com>

We could do like Rogue and tie leveling up to beating enemies with XP instead of the pickable powerups. This would incencitize battle when you reach later levels and feel too weak. This requires leveling up of monsters though...

Currently your strength is tied to your level since your damage is random(0, maxHP). On a good run, I reached level 17 and had 60 HP which meant that I could usually obliterate any queen in my way... which felt like I needed opponents stronger than a queen... what could be stronger than a Queen??? (and I quit because I had only caught the cowardly King at level 17, meaning that I would have to do 17 other levels!)

Could the enemies be both chess and Rogue? meaning that you could meet a Kestral Knight (moving like a knight but with the hp and dmg of Kestral) but also later a Goblin Knight? Sounds convoluted...

I have to say the single character mode did refresh my interest and had me play but it is annoying that it's all about avoiding.

Perhaps a cheap thing to test is crank up the number of enemis so that you need to be extra careful in avoiding?

Yeah... frustrating that it's not as easy as planned to do Cherry!

jo


## Pippin Barr <pippin.barr@gmail.com>	Mon, Aug 20, 2018 at 9:23 AM To: Jonathan Lessard <glandeurlessard@gmail.com>
Hmmm, levelling up monsters. The more powerful queen. I guess we could try indicating something like that by changing the colour of the pieces? The piece type "only" indicates the way it moves, while the colour helps us realise it's a different kind of thing? I like the idea of a "Kestral Queen" or similar... I'm sure there's a big-ass list of monsters from Rogue we can look at to figure this out... I think that could be the way to go right?

Then we just need some official "level up!" thing that increases your max HP with a message, and then keep the gold pieces as HP potions... I think this is well worth implementing as it "should" work given that Rogue does?

This is frustrating, it's true, but also it's so "design" right? Great in terms of being honest about the core values of the project and trying to design within them...

## Jonathan Lessard <glandeurlessard@gmail.com>	Mon, Aug 20, 2018 at 8:39 PM To: Pippin Barr <pippin.barr@gmail.com>
answers in text...

> Hmmm, levelling up monsters. The more powerful queen. I guess we could try indicating something like that by changing the colour of the pieces? The piece type "only" indicates the way it moves, while the colour helps us realise it's a different kind of thing? I like the idea of a "Kestral Queen" or similar... I'm sure there's a big-ass list of monsters from Rogue we can look at to figure this out... I think that could be the way to go right?

I do like the  sound of the Kestral Queen. Maybe a representation like this? (The Kestral Pawn)

And here's the list of monsters, conveniently:

https://strategywiki.org/wiki/Rogue/Monsters

We'd need to produce some kind of probability table for these monsters over the levels...

> Then we just need some official "level up!" thing that increases your max HP with a message, and then keep the gold pieces as HP potions... I think this is well worth implementing as it "should" work given that Rogue does?

Yup. Or keep the gold for loot (because of the ridicule "good price for the loot message") and convert the powerup pieces to a potion icon of sorts.  No need for a message I think, we can just reuse the actual Rogue status line which shows the current XP / Next level HP. (on startup next level is at 0 strangely)

> And... we'd need some progression table for the levels.

We can maybe extract the level and monster probabilty values from the actual source:
http://www.rots.net/rogue/source/source.htm

I took a look but couldn't find it quickly. Will look again!

However if we use the actual numbers, I suppose they all kinda balance with the armor, scrolls, potions, weapons and other things which I'm not sure we want to include...

> This is frustrating, it's true, but also it's so "design" right? Great in terms of being honest about the core values of the project and trying to design within them...

Indeed, making two very different variants is actually good proof of our general approach.

## Jonathan Lessard <glandeurlessard@gmail.com>	Mon, Aug 20, 2018 at 9:10 PM To: Pippin Barr <pippin.barr@gmail.com>
Ok, actually I found the levels table (and also I didn't read the status line well, which is actually: CurrentLevel / Current XP) (does anyone really reach 8M XP?!)

```
int e_levels[] = {
        10L,
    20L,
    40L,
    80L,
       160L,
       320L,
       640L,
      1300L,
      2600L,
      5200L,
     13000L,
     26000L,
     50000L,
    100000L,
    200000L,
    400000L,
    800000L,
   2000000L,
   4000000L,
   8000000L,
```

## Jonathan Lessard <glandeurlessard@gmail.com>	Mon, Aug 20, 2018 at 9:15 PM To: Pippin Barr <pippin.barr@gmail.com>
while we're at it, here's the random pick of monster that is dependent on current level:

```
static char lvl_mons[] =  {
    'K', 'E', 'B', 'S', 'H', 'I', 'R', 'O', 'Z', 'L', 'C', 'Q', 'A',
    'N', 'Y', 'F', 'T', 'W', 'P', 'X', 'U', 'M', 'V', 'G', 'J', 'D'
};

//here we determine which monsters in the previous table based on level and random...
    d = level + (rnd(10) - 6);
    if (d < 0)
        d = rnd(5);
    if (d > 25)
        d = rnd(5) + 21;
    } while (mons[d] == 0);
    return mons[d];
```

## Pippin Barr <pippin.barr@gmail.com>	Wed, Aug 22, 2018 at 11:05 AM To: Jonathan Lessard <glandeurlessard@gmail.com>
Nice research work there! Very reassuring to have the real numbers. To some extent we can defend the authenticity angle even if the gameplay isn't great, so long as it isn't boring?

Agree on potions.

Status line approach makes total sense.

I guess attaching a monster-letter to each piece works... it starts almost feeling too Rogue-y? But maybe that's okay? I don't know... there just isn't a corresponding idea in chess to leverage, so we pretty well have to use the Rogue approach.

Hmm ok. So what's the next step? Does this sound like a lot of dev?

## Jonathan Lessard <glandeurlessard@gmail.com>	Sun, Aug 26, 2018 at 4:35 PM To: Pippin Barr <pippin.barr@gmail.com>
Some work but not too much i think.

As you get swamped with the semester and I'm in over my head with parenting, I suppose the first of us who finds the time and motivation to get to it notifies the other!

best,

jo


## Pippin Barr <pippin.barr@gmail.com>	Mon, Aug 27, 2018 at 8:25 AM To: Jonathan Lessard <glandeurlessard@gmail.com>
Sounds good. It might suit my semester to some extent as I often struggle with new design work but can do implementation...

---

__Life ensued until we eventually met for coffee to establish a new orientation to Rogess that revolved more around a basic chessboard with Rogue combat rules__

---

# ROGESS

## Jonathan Lessard <glandeurlessard@gmail.com>	Fri, Mar 22, 2019 at 2:30 PM To: Pippin Barr <pippin.barr@gmail.com>

Hey,

You can check out the ROGESS branch and play the basic thing: chess world, chess moves with rogue-like attacks.

If I play like Chess, I lose, because I can't properly cover my king!

If I play like Rogess, I win in 3 turns ;)

Is that trajectory between surprise at the hitpoint attacks and adapting the chess play to it good enough? maybe!

Jo


## Pippin Barr <pippin.barr@gmail.com>	Fri, Mar 22, 2019 at 3:19 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
Hah! Played ROGESS some. Yeah the fool's mate basically works here. I think it's pretty disappointing though. There's some satisfaction to playing proper chess, but the computer AI is so dumb it really makes no effort to protect its king and the results and kind of bad?

Question: we currently value the king at 1HP, but there's no reason it couldn't be at 10HP say, as the most important piece? This would give it a chance to get away from attacks?

Beyond this, it's pretty clear the AI would need a bit of extra push to protect the king above all else? Including interposing pieces etc. I'm worried the AI implications might be too forbidding though...

The thing is, when I played regular chess against it, it was genuinely interesting with the addition of uncertain captures - it really does change the dynamics a lot and makes you think different about your moves. It's just that it's still too easy to just hunt the king right away with a queen and win effortlessly. ROGESS against a human opponent would be genuinely fun I think? And the question would just be whether we can get the AI up to a level that would be adequate for a quick game? (Are there any simple-ish chess AIs out there? I think a standard AI would be sufficient here?)

Also we'd need castling...

## Jonathan Lessard <glandeurlessard@gmail.com>	Fri, Mar 22, 2019 at 3:26 PM To: Pippin Barr <pippin.barr@gmail.com>
yup yup...

I was thinking of boosting the black king as well... that would make a huge difference, you would neet to mount a proper attack. Could be the costliest thing to try. Select the black king's piece script and set it to... 10? 20? Mighty King of Yendor. Perhaps we should visually show he's special though.

I agree this might be fun to try against an actual opponent... not sure if we could ever get there. The existing libraries will probably be unusable with such a big change to ghe game... We could try a live version with dice throw...

Jo

## Jonathan Lessard <glandeurlessard@gmail.com>	Fri, Mar 22, 2019 at 3:34 PM To: Pippin Barr <pippin.barr@gmail.com>
oh! 10 HP black king is already a very different game... not sure how to play it!



## Pippin Barr <pippin.barr@gmail.com>	Sat, Mar 23, 2019 at 4:16 PM To: Jonathan Lessard <glandeurlessard@gmail.com>

Yeah much more interesting! I won a couple of games just now, but I think with a slightly more sophisticated AI it would have been significantly harder... thoughts on that:

- notably self-preservation for the pieces instead of mindless attacking,
- perhaps avoiding moving the same piece multiple times,
- perhaps prioritising developing pieces rather than moving pawns,
- Avoiding moving into attacks (though they're normally pretty good about this
- Perhaps understanding the idea of a protected position (that they shouldn't attack a piece that's protected and that they can move to positions that are under attack if they're protected)

Starting to get kind of hardcore though? Starting to wonder if we can just "obtain" an AI? Not Stockfish or AlphaZero, but just something kind of simple and rule based?

---

# Chess AI

## Pippin Barr <pippin.barr@gmail.com>	Sat, Mar 23, 2019 at 4:22 PM To: Jonathan Lessard <unkelben@gmail.com>
Nice "simple" AI
https://medium.freecodecamp.org/simple-chess-ai-step-by-step-1d55a9266977

More hardcore
https://www.chessprogramming.org/Getting_Started

Looks interesting. Not sure how well this would interface with our current representation of the board though, and it's pretty specific to an 8x8 board (which is okay for ROGESS at least).

## Jonathan Lessard <glandeurlessard@gmail.com>	Tue, Mar 26, 2019 at 12:39 PM To: Pippin Barr <pippin.barr@gmail.com>
Good article, the first one. Good general framework for a discrete game AI. Our problem with Chogue is the physics-based interaction between pieces. The AI could only know about the value of future positions by actually moving the pieces and registering collisions to see if a piece captured another piece... which would be both absurdly slow and ridiculous. A hack would be to maintain a parallel "traditional" representation of the board and pieces for the purpose of AI, while keeping what we have to manage interactions.

It would be simpler to add in a few more heuristics for the AI, as you were suggesting like not eating a covered piece if the exchange is not as good... Not sure it would be enough.

An alternative approach (just thinking) could be to dramatically change the odds? Maybe you start as lone queen against a full Chess party but... you can level up. So if you are careful and capture easy preys, you'll build capacity for the larger fish? Maybe the AI would be a problem again...

Jo

## Pippin Barr <pippin.barr@gmail.com>	Tue, Mar 26, 2019 at 5:15 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
Yeah I guess the extra rules for the AI is going to be the least damaging to the integrity of the overall game - does seem rather a lot to write a completely separate chess representation in C# just to implement AI.

The level-up version could work, though then I guess we're roaming pretty far from the idea of the inversion of Chogue being chess with Rogue attacks? It's tantalisingly close to working, I think, with a stronger AI. It's possible I could take a look at this in the Summer (or even implement the behind-the-scenes AI to drive the opponent. though it makes me shudder a bit :)

Pippin

## Jonathan Lessard <glandeurlessard@gmail.com>	Wed, Mar 27, 2019 at 4:05 PM To: Pippin Barr <pippin.barr@gmail.com>
I think it's worth trying ramping up the AI and see if it's enough. It could also benefit original chogue and possible Mobile Chogue.

So...

1. Not engage in a bad trade
1. Do not uncover a piece (unless you eat a better piece?)
1. In the event of no interesting move, priorize advancing higher-level pieces than pawns?

## Pippin Barr <pippin.barr@gmail.com>	Thu, Mar 28, 2019 at 8:23 AM To: Jonathan Lessard <glandeurlessard@gmail.com>
Hmm yeah I think those are pretty strong. I think the concept of being “protected” would be nice too? So fundamental to chess that you don’t worry about a threatened piece if it’s defended (unless it’s attacked by a lower value piece). Seems like the current system should be able to build a list of attacks and defences for each piece and work from that? And maintaining it shouldn’t be too awful?

## Jonathan Lessard <glandeurlessard@gmail.com>	Fri, Mar 29, 2019 at 12:20 PM To: Pippin Barr <pippin.barr@gmail.com>
yep, that's good.

---

# ROGESS AI

## Jonathan Lessard <unkelben@gmail.com>	Thu, Apr 4, 2019 at 2:40 PM To: Pippin Barr <pippin.barr@gmail.com>
Hey!

ROGESS AI is updated... theoretically:

- The AI will not capture a guarded piece of lower value (will not do bad trade)
- The AI will not move a piece that is protecting a higher value piece

It's already much better... at least the fool's mate is not as easy!

Jo

---

# rogess message line

## Jonathan Lessard <glandeurlessard@gmail.com>	Thu, Apr 4, 2019 at 2:10 PM To: Pippin Barr <pippin.barr@gmail.com>
Hi,

I brought back the status and message lines in Rogess. It would be sad to miss the excellent "swing and miss" messages, as for the status, it's nice to see the HP of your piece.

Of course now the screen is a bit busy.

best,

Jo

## Pippin Barr <pippin.barr@gmail.com>	Fri, Apr 5, 2019 at 9:53 AM To: Jonathan Lessard <glandeurlessard@gmail.com>
Pulled and played. Definitely  better as you say! (Though definitely still see the AI make some poor decisions like ignoring a threat to its king in order to capture somewhere else, and a couple of poor trades.) It now feels like you actually have to pay attention to play, even if it is a bit of an idiot at times. It's a shame we can't get hold of a proper chess engine to run in the background to represent things for the AI - I implemented that AI tutorial I sent the other day and it's genuinely not terrible to play against and tends never to do anything idiotic at the very least.

Love the status line. A bit busy perhaps, but a lot of fun!

## Jonathan Lessard <glandeurlessard@gmail.com>	Fri, Apr 5, 2019 at 11:15 AM To: Pippin Barr <pippin.barr@gmail.com>
The chess AI code you are referring too is actually very general and doesn't actually require a chess engine, but it requires a class that encapsulates all the rules of Chogue so that we can duplicate game states and do the recursive move evaluations. That's what I had done for Rogue Solitaire. But that would mean recoding the whole thing because Chogue'S reliance on collision detection means we can't simulate future moves without actually moving things around.

Actually... not recode the whole thing, only the Findavailablemoves() functions, which would have to do some manual searches in the tilespace to see where the different pieces can actually go.

So Chogue as it is can never do better than see one move ahead, but I do believe we can probably tweak it so that it doesn't do immediate mistakes like the ones you're describing. I think we have all we need, we simply need to tune the evaluation of move rankings.

Pieces know:

- Whether they are threatened
- Whether they are "guarding" a friendly piece (meaning they could recapture)
- Whether they are "guarded" by a friendly piece
- The value of the piece they are protecting (meaning if they move, that piece could be captured)

That should be enough to avoid bad trades and not do something stupid like uncover a king to chase a pawn ;)

I suggest you enter issues with precise behaviors you've observed (the pieces concerned etc.) and I'll fix things. We'll soon see if that's enough or not.

An alternative would be to restart from chess.js (the whole point of our own code was to allow arbitrary boards) and simply adjust the capturing functions to be probability based.
best,

Jonathan

## Pippin Barr <pippin.barr@gmail.com>	Fri, Apr 5, 2019 at 5:18 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
Right, true, I mostly meant the relief of having an engine like chess.js that has a complete representation of the board and possible moves and outcomes etc. For any depth I guess the AI requires something that can spit out all legal moves from a position. But also true we could implement similar concepts by iterating pieces and evaluating their possible moves, too.

I'll try to bamboozle the AI and find useful cases!

---

# Rogess

## Pippin Barr Sat, Apr 6, 4:00 PM
Hey your comment about possibly just using chess.js... actually I think that might work pretty well? I've been working with chess.js and chessboard.js for my newest thing and I suspect that implement Rogess in it would be quite straightforward! Maybe I should have a go at that? (And we style the chessboard etc. to look like our proper graphics...)

## Jonathan Lessard <glandeurlessard@gmail.com> Mon, Apr 8, 11:08 AM to me

Sure!

[...]

Jo

## Pippin Barr <pippin.barr@gmail.com> Mon, Apr 8, 5:03 PM to Jonathan

Cool! I'll do some prodding at Rogess on Wednesday then, I can picture most of how it would work with those libraries in my head I think.

---

# ROGESS

## Pippin Barr <pippin.barr@gmail.com>	Fri, Apr 12, 2019 at 5:45 PM To: Jonathan Lessard <unkelben@gmail.com>
Extremely basic version up. 1HP per attack. Doesn't understand castling or en passant (in terms of maintaining the data about HP).

Even playing this makes it clear it would be sort of nice to consider improving the AI to account for the idea of HP? Or maybe not? Gives me a bit of a headache just thinking about it. It feels like pieces just always attack.

Also feels like the strategy of blitzing in with a queen is pretty OP... or really just leveraging "sacrifices" to chip away the king... which I don't think the AI could understand... kind of interesting though.

(I gave the king 11HP)

https://pippinbarr.github.io/rogess/

---

# ROGESS

## Pippin Barr <pippin.barr@gmail.com>	Sun, Apr 14, 2019 at 5:31 PM To: Jonathan Lessard <unkelben@gmail.com>
Updated to have the same damage model as Chogue (random damage from 0 to attacking piece's current HP), now correctly updates HP model of the board for castling and promotion. Only promotion to Q allowed.

Changed square colours.

https://pippinbarr.github.io/rogess/

It now plays kind of well? It crashed when I checkmated the black king, so I need to look into telling the game engine underneath not to care about checkmate and to just play on.

I feel like I've lost perspective a bit on whether this is fun, but it's definitely not just a push-over anymore? I don't think? I guess I haven't tried my aggressive queen attack mode, but I think with a great chance of damage from other pieces it would be harder. (Notably the king now deals HEAPS of damage technically since it starts on 11hp, which is funny. Dunno if we want to keep it.)

Anyway let me know what you think sometime. I can keep prodding at it and can at some point consider rewriting parts of the AI if we want.

Pippin


## Pippin Barr <pippin.barr@gmail.com>	Sun, Apr 14, 2019 at 5:34 PM To: Jonathan Lessard <unkelben@gmail.com>
Heh, just played my queen aggression mode...

1. e3 Nf6
2. Qf3 Ng8
3. Qxf7+ K*f7
4. Q*f7 Kxf7

Bye bye queen. Heh.

## Pippin Barr <pippin.barr@gmail.com>	Mon, Apr 15, 2019 at 6:57 PM To: Jonathan Lessard <unkelben@gmail.com>
Latest update has visual styling and basic move notation. Status line faked in and looks preeetty awkward under the title :/ could go under the move notation instead?

Next up is ai simulating attacks (not just captures) to see if it improves its play.

## Jonathan Lessard <glandeurlessard@gmail.com>	Tue, Apr 16, 2019 at 10:35 AM To: Pippin Barr <pippin.barr@gmail.com>
new Rogess is definitely more challenging than old Rogess. I don't know if the AI simulating probabilistic attack would make a significant difference.

As for the "joke" of it... I think it will be definitely be an interesting surprise when the first non-immediate-capture attack happens. I think it would be good to give more feedback on what's happening. I suppose importing the funny rogue-like messages would do the trick ("hit and miss" etc). After the initial suprise... does it significantly change a player's strategy? I haven't played chess for a while so my mind is not so attuned as it was last year to the subtle changes.

Also, as for it being a Rogue-Chess hybrid... it seems the only thing left of Rogue after all is the notion of hitpoints... it's interesting in a sense to show that a little change can a amount to a lot... but does it? Perhaps adding a leveling up feature? To make it obvious, a piece might acquire new hitpoints with each capture? then I suppose the AI would definitely need take this into consideration in its decision making...

As for layout, we can maybe simplify. Do we need the status bar?

best!

jonathan

## Pippin Barr <pippin.barr@gmail.com>	Tue, Apr 16, 2019 at 1:08 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
Some more updates:
- Notation now has flavour stuff and notation style from Chogue
- Minor CSS improvements
- Status line now replaces the title when you start playing so you can kind of have the best of both worlds (I think it looks nice enough to keep now)

Very good point about how stark it is as an experience at this point. Interesting as to whether it ends up being TOO stark, yeah. A trade-off between simplicity and it being more entertaining. And also whether it gets freaky trying to make the AI understand our additions (and whether that in turn makes the AI take so long to select moves it becomes unusable).

The level up thing you're thinking would "just" be something like gaining 1HP per capture or something? (Plus perhaps returning to full health as a result?) That would be easy to implement (perhaps with a little "LEVEL UP!" that floats up out of the piece to show something happened?). As you say, it might make the AI too stupid? (Though it doesn't shy away from captures already, so it might be that it wouldn't affect it too much.)

I am a little concerned that it's still possible to win some percentage of the time by just mobilising your queen right away, capturing at f7 and then chopping away at the king. Some amount of the time the king kills you, but some amount you win. And further even if you lose your queen in that scenario you've probably done significant damage to the king :/ Still, maybe if the AI simulates HP scenarios it would alleviate.

Pippin

## Jonathan Lessard <glandeurlessard@gmail.com>	Tue, Apr 16, 2019 at 2:24 PM To: Pippin Barr <pippin.barr@gmail.com>
I'll look at this soon!


## Pippin Barr <pippin.barr@gmail.com>	Thu, Apr 18, 2019 at 2:27 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
Looking into an XP system for Rogess now and realising it could be a huge (or small) endeavour. To the extent we want to mimic Rogue (which I guess we do) I can't seem to find any specific specs for how they do it. Playing it a bit myself it's clear you only get XP for killing something, so that's a thing to adhere to I suppose. A basic model

- Captures give XP
- The XP gained should be relative to the enemy captured (at a first approximation I suppose you could use their piece value, so 1 for a pawn, 3 for a knight)
- At set XP levels you level up
- Levelling up gives you more HP (how much? I guess just a set amount per level?) and resets your HP back to max
- Levelling up could also give you a new title, like Dire Pawn and so on, in a further nod to Rogue's monsters (and presumably higher level pieces are worth more XP when you defeat them)
- Black needs to run these same calculations in order to level up its own pieces
- This suggests it would be nice to be able to see Black's status line too, but perhaps it's better that you just catch a hint of it in the PGN? (The black Dire Pawn attacks your Elite Knight...)

Is this over complicated? What do we actually want Rogess to "do" for us in terms of putting it out there? How deep down this hole of Rogue on a chess board do we want to actually go? I can go there, but feels like we should be conceptually strong before doing the work!

I foresee scary stuff like just marauding with a queen, and levelling her up to be kind of unstoppable? A bunch of this stuff could massively bust the AI side of things... which is a definite concern unless we want to just make it human 2P?

I guess the simplest version would just be captures giving HP (like you "ate" the piece), but even that may be very hard for the AI to comprehend? Or for me to make the AI comprehend? :) I guess it would need to have some rules around when it's worth attacking a piece or not based on its own HP (and maybe the other piece's HP) and then the question of what would happen if it captured the piece and was thus exposed to further attacks from pieces closer in? Yikes...?

Pippin

---

# ROGESS

## Pippin Barr <pippin.barr@gmail.com> Fri, May 3, 4:48 PM to Jonathan

Well, I managed to implement the little HP indicator which looks fairly nice

https://pippinbarr.github.io/rogess/

Spent a couple of hours trying to add HP calculations to the AI but didn't get it working. I'll try again when my mind clears enough to tackle it. Not really sure what's up since it's not THAT complex conceptually.

Beyond that I need to get ignoring checkmate to work properly. And then it's most of the way there?


## Pippin Barr <pippin.barr@gmail.com> Fri, May 3, 4:52 PM to Jonathan

Actually, getting it to ignore checks is kind of borderline impossible :/ The key function that gives you a list of possible moves from a position only allows legal moves, so disallows any move that puts you in check. Allowing check would basically mean rewriting their entire move generation script just for that one idea. Or... yeah it's messy. It would be significantly easier to keep the concept of check, basically.


## Jonathan Lessard Mon, May 6, 11:59 AM to me, Jonathan

I can't see the hp visuals? Also for some reason sometimes I get to play black?

Impossible to go in check.... sucks that it's complicated. It seems it's one of the interesting implications of ROGESS that the notion of checkmate is no longer relevant.


## Pippin Barr <pippin.barr@gmail.com> Mon, May 6, 4:24 PM to Jonathan

Ughhhhhh. Rogess being soooo painful. May have destroyed the online build at this point... anyway the visuals should work. Right now it continues to be the HP stuff in the AI which is so difficult... basically because it involves "non moves" in the engine when you attack but don't capture. Surprisingly hard to fix this and has me editing the engine library myself which is never a smooth process. I'll keep on trying, feels totally necessary. (I did fix the moving in check stuff fairly easily, but then broke so much else I just reset all the day's work and will try again.)


## Jonathan Lessard Tue, May 7, 1:20 PM to me

Ooohh. right, I see how this is going against the spirit of the original library!

I liked the little "miss" message that I could see, but now I can't reattack the knight!

## Pippin Barr <pippin.barr@gmail.com> Tue, May 7, 5:48 PM to Jonathan

Heh,  yes it's very broken right now.

Man. I've been fighting it for DAYS now without quite nailing it. There are weird edge cases that are totally perplexing where the chess engine will randomly put a new pawn on the board for reasons totally opaque to me.

Feel so close to getting it... and so far away. Bit worried I'll never quite nail it. Bit worried that even if I get the bugs out it won't actually make the AI better. Yikes.

Will keep fighting for a day or two more at least. But it's pretty exhausting frankly!

---

# Rogess


## Pippin Barr <pippin.barr@gmail.com>	Wed, May 8, 2019 at 2:57 PM To: Jonathan Lessard <unkelben@gmail.com>

Okay I think I fixed that horrible bug (it was to do with the internal square representations of the engine, rookie stuff on my end).

I've added a bunch of niceties including a menu system, links to our websites (I linked to jonathanlessard.net - would you prefer lablablab?), two player version, etc.

Could use some stress testing now. Black makes some really inexplicably stupid moves from my perspective which worries me. I think that having turned off check/checkmate as a thing, it no longer gives a shit about its king, so I might need to think of a more subtle way to think about that. Want to strike a balance though to avoid having to write a Rogess-specific AI! I guess it needs to know about check and "not like it" but also not care about it relative to legal moves. Anyway I'll poke more at it tomorrow.

Came a long way, I think it's close?

https://pippinbarr.github.io/rogess/

Pippin

---

# [Rogess] "done"

## Pippin Barr <pippin.barr@gmail.com>	Thu, May 9, 2019 at 11:30 AM To: Jonathan Lessard <unkelben@gmail.com>
Hey so I think I've made tweaks that put this in the "time to test" space...

- UI tweaks and improvements (turn indication, AI thinking indication)
- AI cares about check and HP (I have zero clue whether the AI is any good but it doesn't seem like a pushover?)

I just realised I need to fix the move messages for 2P to avoid "you".

But yeah... maybe it's "there"?


## Jonathan Lessard <glandeurlessard@gmail.com>	Thu, May 9, 2019 at 12:48 PM To: Pippin Barr <pippin.barr@gmail.com>
Rogess looks great! Good polish! Good work refactoring the engine!
The AI is not a pushover but somewhat erratic. For example, it revealed its king to my queen by moving a pawn forward, also, it had my king in check with a knight and chose to move a pawn forward...

Anyways, it might very well be good enough!

BTW, my friend Noë loved the "chess edition" punishment game. We have a long history of reinterpreting greek myths together. [...]

Best,

Jonathan


## Pippin Barr <pippin.barr@gmail.com>	Thu, May 9, 2019 at 2:01 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
[...]

Re: the AI. Yeah, I don't quite know what to make of it. I suspect it needs to be just good enough to let you understand the game and not much better? We could keep trying to tweak it a bit I guess, but I'm pretty hazy on the impact of various decisions. (And wonder whether it's better just as the original AI without even HP!)

Do we try a bit harder with it or... just release? :)


## Jonathan Lessard <glandeurlessard@gmail.com>	Thu, May 9, 2019 at 5:08 PM To: Pippin Barr <pippin.barr@gmail.com>
ha ha

there is a bigger problem... I think the AI will simply not attack the king. it will be hard for him to win eh?

Jo

## Pippin Barr <pippin.barr@gmail.com>	Fri, May 10, 2019 at 8:38 AM To: Jonathan Lessard <glandeurlessard@gmail.com>
Oh boy, yeah. I think I may have to look at it at least a bit more, it sure is reluctant to capture the king. It will at certain points, but not for any reason I understand. It is similarly unconcerned about its own king being attacked. I wonder if it's worth just turning off HP in the AI, might be too much to balance. (Basically right now it just adds the HP of each piece to its evaluation.)

## Jonathan Lessard <glandeurlessard@gmail.com>	Fri, May 10, 2019 at 10:13 AM To: Pippin Barr <pippin.barr@gmail.com>
Would it be hard to tell the AI the kings are worth 100 points? Then it would care a lot about attacking ouors and protecting theirs.

## Pippin Barr <pippin.barr@gmail.com>	Fri, May 10, 2019 at 10:19 AM To: Jonathan Lessard <glandeurlessard@gmail.com>
Yeah maybe something like that. It has kind of positional values, so maybe the king is worth a ton on any square of the board...

---

# Oh wait

## Pippin Barr <pippin.barr@gmail.com>	Fri, May 10, 2019 at 10:27 AM To: Jonathan Lessard <unkelben@gmail.com>
The king _is_ worth heaps...

```
function getAbsoluteValue (piece, isWhite, x ,y) {
  if (piece.type === 'p') {
    return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
  } else if (piece.type === 'r') {
    return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
  } else if (piece.type === 'n') {
    return 30 + knightEval[y][x];
  } else if (piece.type === 'b') {
    return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
  } else if (piece.type === 'q') {
    return 90 + evalQueen[y][x];
  } else if (piece.type === 'k') {
    return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
  }
  throw "Unknown piece type: " + piece.type;
}
```


## Jonathan Lessard <glandeurlessard@gmail.com>	Fri, May 10, 2019 at 12:03 PM To: Pippin Barr <pippin.barr@gmail.com>
oh... then I really wonder why it does't priorize attack! what if you crank it up to 100000?

## Pippin Barr <pippin.barr@gmail.com>	Fri, May 10, 2019 at 2:28 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
Hm.

Okay, so I moved the HP multiplier idea to modify the base value (e.g. the 900 for the king) instead of the positional value (the table value) and I *think* it's better? It now strenuously avoids pieces targeting its king, and will attack the white king with similar priority. Miiiight be good enough, but if you want to take a look at break it, I'll try again :)


## Jonathan Lessard <glandeurlessard@gmail.com>	Fri, May 10, 2019 at 2:42 PM To: Pippin Barr <pippin.barr@gmail.com>
seems perfect!

## Pippin Barr <pippin.barr@gmail.com>	Fri, May 10, 2019 at 2:55 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
Great!

Huh. Good. Okay then...

- Do we send out to anyone else to test?
- Shall we release it... week after next? I can throw together a presskit early next week and run it by you and then we send out there?

Process documentation has been kind of weak unfortunately - a lot of this one was verbal discussions we've had over time, there really wasn't a lot of "design" to be done by the time I sat in front of the code... I wrote a bit about it, but it's a bit thin.

## Jonathan Lessard <glandeurlessard@gmail.com>	Mon, May 13, 2019 at 11:00 AM To: Pippin Barr <pippin.barr@gmail.com>
I'll try to get a few friends to test but I think the strong chessiness might be a bit off-putting for most.

Yes for the press kit! As for documentation... eh! I suppose it can be summarized as our desire to try the combat mechanic of Rogue in Chess, and that eventually we found the basic chess board was the most efficient way to put the focus on that single disruption in Chess' design.


## Pippin Barr <pippin.barr@gmail.com>	Mon, May 13, 2019 at 12:20 PM To: Jonathan Lessard <glandeurlessard@gmail.com>
First draft press kit:
https://github.com/pippinbarr/rogess/blob/master/press/README.md

Yeah the process thing is probably most just that it was "too simple" for document extensively, which is fine and kind of a worthwhile learning.


## Jonathan Lessard <glandeurlessard@gmail.com>	Mon, May 13, 2019 at 12:52 PM To: Pippin Barr <pippin.barr@gmail.com>
Some terse tester feedback:

"C'est lol. Le curseur ne devient pas une main quand on peut cliquer sur les options genre "1 player" ou "resign". Sinon si on ne gagne pas après une partie d'essai c'est qu'on a raté sa vie."

So "c'est lol" is a good sign from someone who is just a very casual chess player, but I suppose the second part of the comment suggests the AI is kind of easy: "if you don't win after one test attempt, then you've failed at life". As for the cursor thing... I don't think that's a big thing.

I think we probably knew that: one game to "get it" a second one to confirm you can do it ;) I think that's ok.

On the press kit, small typo : "Bothh"

Otherwise it's perfect and I  particularly like the features section.

best,

Jonathan


## Pippin Barr <pippin.barr@gmail.com>	Mon, May 13, 2019 at 4:11 PM To: Jonathan Lessard <glandeurlessard@gmail.com>

C'est lol is high praise indeed!

I'll fix the cursor thing, it's a nice point and would make things feel smoother. As for the AI... yeah, I think per Alika, so long as it doesn't play like a total moron the key is that it lets you get the joke and then if you're desperate to play competitively you play a human?

Bothh fixed (my keyboard sucks and doubles up h's with some frequency).

Next week Tuesday work for a release?

## Jonathan Lessard <glandeurlessard@gmail.com>	Tue, May 14, 2019 at 2:32 PM To: Pippin Barr <pippin.barr@gmail.com>
exciting!
