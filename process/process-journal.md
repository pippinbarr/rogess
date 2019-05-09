# Thursday, 9 May 2019, 11:01AM

So it turns out I have literally never written a process journal entry about this project, which is... sad. Because the game is all but finished, all the way down to bits and pieces of polish even.

## Design summary

At this point we have a version of chess on a normal board, with a simple AI, and a two-player version, where you play chess normally except that the pieces have HP according to their piece value, they do damage according to their current HP (why is this, this may not make sense), the king gives zero shits about check and checkmate and is the most powerful piece on the board.

Thoughts ensue...

## The power of the king

Just because I just wrote that. This is an odd happenstance decision that I think we've ended up quite liking? Basically there's the initial "obvious" decision to give each piece HP according to its standard chess value. But then you run into the fact the king as "no value" in this context, mostly because it's the only piece you _have to have_ and therefore you can't think about its absence. In the case of Rogess, though, the king needs to take a hit. It could either be so fragile that any piece would kill it (like in regular chess I suppose where it's vulnerable to checkmate from any piece), or you could make it the strongest piece because it's the king and the most important, which is the way we went here. So it has 10 HP. This is doubly funny  because it means you have to "chip away" at the king, you can't rely on just capturing it in a single move; and it also means the king is the most powerful attacking piece since attacks are premised on HP, so it's actually quite a scary opponent, except of course for its movement limitations.

So 10HP for the King is "arbitrary", but does emerge from the rules of chess in a sense, and is perhaps most of all great for comedy value, as well as for giving the king a new kind of role in the game - no longer a pathetic weakling, though still highly vulnerable since its capture means end of game.

## Attack power

Right now a piece attacks for a random amount of damage between 0 and its current HP. That means that more powerful pieces (like the queen) have more potential to do more damage (e.g. on average the queen does 4.5 damage per strike). However this also means a piece's attack power can be depleted when it takes damage (e.g. a queen with 1HP has the attack power of a pawn, though still an advantage in movement). I'm not sure whether I like this or the version where a piece also attacks based on its _potential_ HP (e.g. the max value), which would make a limping queen still highly dangerous, for instance. Or even more so it would make a dying king still super scary...

Both approaches have merits and particular kinds of dramatic accents to them?

## AI

This game is our first with a "proper" AI using a search to depth 3 right now (e.g. black moves, and then imagines white's response and its response to the response). This has meant a "reasonable" looking style of black play which is good, but has also mean it needed some tweaks according to the new rules of Rogess. Notably the AI and the engine needed to be modified to allow moves that ignore check as well as board evaluations that take the current HP of a piece into account.

This is mostly interesting to me right now because having made this adjustments it's so apparent I can't really tell if the AI works because _I don't know what good Rogess play looks like_! Really I should just play a number of complete games against the AI and see if I continuously win? One good thing seems to be that just attacking brutally with the queen doesn't seem to guarantee victory any more? But really I might just be scared to try too hard in case the AI sucks.

## 2P

One good thing about the potentially weak as a kitten AI is that we do have two-player this time, which means humans can match wits over the new rule set, so you will always potentially be able to play someone intelligently playing the specific game you're playing (rather than an AI that may lean too heavily on chess best practice).

## Process???

So what happened to process documentation on this one? Well, there's a to do list that was kept relatively up to date and the key parts were put together, but clearly there was no other process writing.

I suspect this is in no small part because the idea itself is so simple and doesn't really have so much "design" behind it? It's more of a corollary of Chogue and as such doesn't require heaps of thought beyond its basic execution (and a couple of decisions like the value/HP of a king).

Further to that, Jonathan and I have had a number of conversations about the game ironing out our understanding of how it should play and, perhaps unfortunately, those verbal conversations tend to take the place, psychologically, of any actual documenting. This seems like a major "problem" with documenting team-design-based projects - you get your design satisfaction from conversations, but those conversations are ephemeral and vanish into the either. Perhaps especially a problem for quite small-scale, "easy design" projects like this one?

## And so?

Like Chogue, I think there's some chance this is an actually good game that is entertaining to play for a while and that one could even get quite into, which is neat.
