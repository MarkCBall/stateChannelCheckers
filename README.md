# stateChannelCheckers



## Decoding the board (a single uint256 represents the entire board):

```
x is black o is red
BLACK        BLACK         BLACK
x | x | x | x | x | x | x | x  r7 (row 7)
x | x | x | x | x | x | x | x  r6
--|-- |-- |-- |-- |-- |-- |--  r5
--|-- |-- |-- |-- |-- |-- |--  r4
--|-- |-- |-- |-- |-- |-- |--  r3
--|-- |-- |-- |-- |-- |-- |--  r2
o | o | o | o | o | o | o | o  r1
o | o | o | o | o | o | o | o  r0 (row 0)
RED          RED           RED
c0 c1  c2  c3  c4  c5  c6  c7 
(column 0)             (colum 7)
```

### The board is orientated by game pieces, each piece is represented by 1 byte, there are 32 bytes and 32 boardgame pieces.

#### The first 16 peices are red and the remaining are black

- The first bit represents the status of the piece, if it has been killed yet. The next bit represents if the piece has reached the end of the board yet and become a queen. The next three bits represents the row number followed by column number as follows:
- [1] 0 for a dead piece, 1 if it is in play
- [1] 0 for a regular piece 1 for a queen
- [3] row#
- [3] column#

Decoded examples
- 0xxxxxxx is a dead piece, it is not in play
- 10xxxxxx is a regular piece, it can only move forwards
- 11xxxxxx is a queen, it has reached the end of the board and go go forward or backwards
- 1x000111 is in row 0, column 7
- 1x010101 is in row 2, column 5
- ect

Note that the 16 bytes are red and the remaining 16 bytes represent black pieces.





