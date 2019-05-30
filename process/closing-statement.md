# Closing statement

[Rogess](https://github.com/pippinbarr/rogess) (by Jonathan Lessard and Pippin Barr) could be thought of as a kind of "sequel" to [Chogue](https://github.com/pippinbarr/chogue/wiki/Press-Kit). It's more accurate to say, though, that it is a game occupying the same design space as Chogue, representing a second data-point in our exploration of [hybrid game design](https://www.gamasutra.com/blogs/PippinBarr/20180612/319854/Chess__Rogue__Chogue_Some_notes_on_hybrid_game_design.php).





... intro stuff ...

## In the beginning

[Rogess](https://github.com/pippinbarr/rogess) began with a basic tweak to [Chogue](https://github.com/pippinbarr/chogue/wiki/Press-Kit)'s combat mechanic: pieces would "damage" each other on attacking rather than immediately capture, as in [Rogue](https://archive.org/details/msdos_Rogue_1983).

## (7 June 2019)

Jonathan implemented this in the original Chogue code and included a checkbox for turning the feature on and off ([dd7fcb2](https://github.com/pippinbarr/chogue/commit/dd7fcb2f51b464b1e8527a38aa1c167862889f1f)). The damage level was set to a random value between zero and the attacking piece's maximum hit-points (HP). In a pleasing hybridization, we gave chess pieces HP equivalent to their chess value (1 for a pawn, 3 for a knight, 5 for a rook, etc.).

## PGN (11 June 2018)

[a701369](https://github.com/pippinbarr/chogue/commit/a70136982e156f626cd25c747347056fdb2e55b9)

## Discussion of this version, risk of too easy? More complex variants?

[Email](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#chogue)
[Email](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#cherry-chogue)

## Single piece prototype (17 August 2018)

[30e70f6](https://github.com/pippinbarr/chogue/commit/30e70f6f610058d6e242391c65f272ba3059bf11)
[Email announcement](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#jonathan-lessard-glandeurlessardgmailcomfri-aug-17-2018-at-225-pm-to-pippin-barr-pippinbarrgmailcom)
[Issue of avoidance](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#pippin-barr-pippinbarrgmailcomsun-aug-19-2018-at-513-pm-to-jonathan-lessard-glandeurlessardgmailcom)

## Monster pieces (26 August 2018)

[How to make it harder? Rogueish enemies?](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#jonathan-lessard-glandeurlessardgmailcomsun-aug-19-2018-at-844-pm-to-pippin-barr-pippinbarrgmailcom)
[33f203b](https://github.com/pippinbarr/chogue/commit/33f203b97958baddfee8482224eaf601c6407f8a)

## The spiral into complexity...
...

## Reinvention as rogue attacks on a chessboard (22 March 2019)

Initial version [c5c606b](https://github.com/pippinbarr/chogue/commit/c5c606bd8db9d1c315218321e85cd346e49dbdeb)
[Email announcement](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#jonathan-lessard-glandeurlessardgmailcomfri-mar-22-2019-at-230-pm-to-pippin-barr-pippinbarrgmailcom)
[Concern over difficulty and King HP, issue of AI](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#pippin-barr-pippinbarrgmailcomfri-mar-22-2019-at-319-pm-to-jonathan-lessard-glandeurlessardgmailcom)
[Strong king version is pleasing, continuing discussion of AI issues](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#jonathan-lessard-glandeurlessardgmailcomfri-mar-22-2019-at-334-pm-to-pippin-barr-pippinbarrgmailcom)

## AI!!! (23 March 2019)
[Concerns over AI ease](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#chess-ai)
[Including re-suggestion of changing relationship of pieces, white with one piece](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#jonathan-lessard-glandeurlessardgmailcomtue-mar-26-2019-at-1239-pm-to-pippin-barr-pippinbarrgmailcom)
[Implemented](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#rogess-ai)
[Implementation 127bdec](https://github.com/pippinbarr/chogue/commit/127bdeccd98f4cd6f9686b5808de6c0e6c35d5a3)
[Continuing AI concerns, mention of chess.js/engines](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#rogess-message-line)

## Reinvention as JS (6 April 2019)

[Suggested](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#rogess-1)
Initial playable version [aa26516](https://github.com/pippinbarr/rogess/commit/aa26516e362a2d1d2b0ec07ae592335456ca48a3) 12 April
[Announced](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#pippin-barr-pippinbarrgmailcomfri-apr-12-2019-at-545-pm-to-jonathan-lessard-unkelbengmailcom)

## Moderate success? (14 April 2019)

[Basic implementation bef6eb8](https://github.com/pippinbarr/rogess/commit/bef6eb8f151a792cb147dc7308bfcc5f3251a4c6)
[Discussed](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#pippin-barr-pippinbarrgmailcomsun-apr-14-2019-at-531-pm-to-jonathan-lessard-unkelbengmailcom)
[Largely feature complete a69de76](https://github.com/pippinbarr/rogess/commit/a69de7675b52c989709e2fbaaf41ca4fa9dae8b1)

## Extreme simplicity, flirting with level up (16 April 2019)

[Discussed](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#jonathan-lessard-glandeurlessardgmailcomtue-apr-16-2019-at-1035-am-to-pippin-barr-pippinbarrgmailcom)
[More level up](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#pippin-barr-pippinbarrgmailcomthu-apr-18-2019-at-227-pm-to-jonathan-lessard-glandeurlessardgmailcom)

## Depression about HP-aware AI (3-8 May 2019)

[Initial failure 53dd94d](https://github.com/pippinbarr/rogess/commit/53dd94d0227b95bf4d455bb581585f2adeac1c66)
[Discussed](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#rogess-4)
[Continued failure 994982f](https://github.com/pippinbarr/rogess/commit/994982ff70c136a9357fce5fbbd3d9b4f77bc459)
[More failure 29b1df6](https://github.com/pippinbarr/rogess/commit/29b1df6b003940d083f6c81d4e94dd464080cccb)
[Solved commit 4665bcc](https://github.com/pippinbarr/rogess/commit/4665bcc46141296606631359a6f45a3a04588c5a)
[Solved discussed](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#pippin-barr-pippinbarrgmailcomwed-may-8-2019-at-257-pm-to-jonathan-lessard-unkelbengmailcom)

## The stupid king (9-10 May 2019)

[Discussed](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#jonathan-lessard-glandeurlessardgmailcomthu-may-9-2019-at-1248-pm-to-pippin-barr-pippinbarrgmailcom)
[Looking at king value](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#pippin-barr-pippinbarrgmailcomfri-may-10-2019-at-1027-am-to-jonathan-lessard-unkelbengmailcom)
[Solved commit](https://github.com/pippinbarr/rogess/commit/395e2d034d8706e69be6916242e488b6d908cccc)
[Solved](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#pippin-barr-pippinbarrgmailcomfri-may-10-2019-at-228-pm-to-jonathan-lessard-glandeurlessardgmailcom)

## Testing (10-13 May 2019)

[Discussed](https://github.com/pippinbarr/rogess/blob/master/process/correspondence.md#pippin-barr-pippinbarrgmailcomfri-may-10-2019-at-255-pm-to-jonathan-lessard-glandeurlessardgmailcom)

## Release (21 May 2019)

---

How can I write this fucking thing?
- How about: literally a series of (chronological) design and technical moves that led to the final game?
- e.g. We start with the core idea and tech
- And then make a series of significant moves both in theory (email especially) and in implementation, rejecting/keeping things as we go
- Until we reach the final game
- So more like an annotated timeline? Could be an interesting form?


Origin
- Chogue again but with Rogue combat rules, Cherry Chogue
- Literal tweak to Unity
- Exists in the codebase of Chogue

Death and resurrection of simplicity
- Started simple (Rogue combat addition to Chogue world)
  - Issue that in chogue levels with sparse pieces and less frequent combat you can effectively play as a scout (especially since you drag your team with you)
- We complicated things a lot initially to make a more interesting game
- But moved toward the simplest version
- Partly for clarity, partly for balance/design, partly just for work

HP decisions
- King power
- Current HP versus Max HP

AI problems
- Brittle AI (Chogue AI)
- Non-Rogue AI (Chess AI)
- How can you tell if an AI is reasonable? (AlphaZero)
- Two-player for human I

Hybrid game design continues
- Movement to a more "pure" represenation of the idea
- Space and combat
- The need to change the space to respond to the change in combat (semi ironic?)

Process documentation "fail"
- Harder to be systematic with multiple designers
- Social element (not wanting to claim design thinking, issues of agreement)
- Email as a strong medium (or Slack etc.)
- Pre-understanding via Chogue
