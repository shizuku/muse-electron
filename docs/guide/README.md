# Get Start

## Download

Please head to [Release](https://github.com/shizuku/muse-electron) for downloading package for your OS. Two example file attached.

## UI

The first step is the Welcome:

The next step is the File:

## Select

There are some levels of items in notaion:

<img :src="$withBase('/select.png')" alt="select">

The subnote can be select by mouse press, press `Esc` to jump to upper level, press `Enter` to jump to lower level.

Press `Arrow` to jump through items in same level.

## Operation

|             |       subnote       |        note         |         bar         |        track        |        line         |        page         |     notation      |
| :---------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :-----------------: | :---------------: |
|   `Space`   |          /          |  new child at tail  |  new child at tail  |  new child at tail  |  new child at tail  |  new child at tail  | new child at tail |
|     `z`     | new element at head | new element at head | new element at head | new element at head | new element at head | new element at head |         /         |
|     `x`     | new element at last | new element at last | new element at last | new element at last | new element at last | new element at last |         /         |
|     `c`     | new element at next | new element at next | new element at next | new element at next | new element at next | new element at next |         /         |
|     `v`     | new element at tail | new element at tail | new element at tail | new element at tail | new element at tail | new element at tail |         /         |
|    `Esc`    |      to parent      |      to parent      |      to parent      |      to parent      |      to parent      |      to parent      |         /         |
|   `Enter`   |          /          |   to first child    |   to first child    |   to first child    |   to first child    |   to first child    |  to first child   |
|   `Arrow`   |  to other element   |  to other element   |  to other element   |  to other element   |  to other element   |  to other element   |         /         |
| `Backspace` |     del element     |     del element     |     del element     |     del element     |     del element     |     del element     |         /         |
|  `Number`   |        voice        |          /          |          /          |          /          |          /          |          /          |         /         |
|     `q`     |         x2          |         x2          |          /          |          /          |          /          |          /          |         /         |
|     `a`     |         /2          |         /2          |          /          |          /          |          /          |          /          |         /         |
|     `s`     |        -1/2         |        -1/2         |          /          |          /          |          /          |          /          |         /         |
|     `d`     |        +1/2         |        +1/2         |          /          |          /          |          /          |          /          |         /         |
|     `r`     |         +7          |          /          |          /          |          /          |          /          |          /          |         /         |
|     `f`     |         -7          |          /          |          /          |          /          |          /          |          /          |         /         |
