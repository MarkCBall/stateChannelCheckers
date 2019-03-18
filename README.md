# stateChannelCheckers

## The board is state is represented by a singles bytes32 or uint. The first 8 bytes represent information about the previous move and the remaining bytes represent the boardgame pieces.


### Bytes 1-8 represent the most recent move used to get to the current board state.
-The first byte represents the pieceNum of the piece that was moved
-The second byte represents the row and column of where the moved piece was moved to
-The third, fourth and fifth byte represents pieceNum any piece that was jumped(killed). One byte per pieceNum.
-The last three bytes represent the turn number or nonce of the game.

#### PieceNum as bytes
The first piece is represented in the piece stored at the 9th byte of the data structure. The second piece is in the 10th byte. There are 24 total pieces. See below on how to decode the byte into piece data.

The last three bits of the 9th byte represent the column number of the 1st piece.


#### Bytes representing rows and columns
-  The first four bits is row and second four bits is column
00010010 is row 1 colum 2
01110000 is row 7 colum 0

### Decoding the board (Bytes 9-32)
```
x is red o is black
RED          RED           RED
x |   | x |   | x |   | x |    r0 (row 0)
  | x |   | x |   | x |   | x  r1
x |   | x |   | x |   | x |    r2
--|-- |-- |-- |-- |-- |-- |--  r3
--|-- |-- |-- |-- |-- |-- |--  r4
  | o |   | o |   | o |   | o  r5
o |   | o |   | o |   | o |    r6
  | o |   | o |   | o |   | o  r7 (row 7)
BLACK        BLACK        BLACK
c0 c1  c2  c3  c4  c5  c6  c7 
(column 0)             (colum 7)
```
#### Bytes 9-20 are red and 21-32 are black pieces


- The first bit represents the status of the piece, if it has been killed yet. The next bit represents if the piece has reached the end of the board yet and become a queen. The next three bits represents the row number followed by column number as follows:
- [1] 0 for a dead piece, 1 if it is in play
- [1] 0 for a regular piece 1 for a queen
- [3] row#
- [3] column#

Decoded byte examples
- 0xxxxxxx is a dead piece, it is not in play
- 10xxxxxx is a regular piece, it can only move forwards
- 11xxxxxx is a queen, it has reached the end of the board and go go forward or backwards
- 1x000111 is in row 0, column 7
- 1x010101 is in row 2, column 5
- ect





