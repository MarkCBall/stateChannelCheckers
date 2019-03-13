# stateChannelCheckers



## Decoding the board uint:

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

### The board is orientated by game pieces, each piece is represented by 1 byte (8 bits)
- The first 3 bits represents the pieces's row#
- The next 3 bits represents the piece's column#
- The next bit is 1 if the piece is a queen (double and can go backwards) - feature not enabled yet
- The next is 1 if the piece exists - 0 if it has been killed

The first 16 peices are red and the remaining are black



