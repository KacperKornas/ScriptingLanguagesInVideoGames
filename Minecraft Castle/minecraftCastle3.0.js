let num2 = 0
let num = 0
player.onChat("castle", function () {
    mansion()
    barrier()
    Lamp(32, 8, 0)
    Lamp(32, 8, 10)
    Throne()
    roof(31, 13)
})
function Throne () {
    builder.teleportTo(pos(36, 2, 6))
    builder.place(QUARTZ_SLAB)
    builder.move(FORWARD, 1)
    builder.place(RED_WOOL)
    builder.move(FORWARD, 1)
    builder.place(QUARTZ_SLAB)
    builder.move(DOWN, 1)
    builder.place(BLOCK_OF_QUARTZ)
    builder.move(BACK, 1)
    builder.place(RED_WOOL)
    builder.move(BACK, 1)
    builder.place(BLOCK_OF_QUARTZ)
    builder.move(DOWN, 1)
    builder.place(BLOCK_OF_QUARTZ)
    builder.move(FORWARD, 1)
    builder.place(RED_WOOL)
    builder.move(FORWARD, 1)
    builder.place(BLOCK_OF_QUARTZ)
    builder.move(LEFT, 1)
    builder.place(BLOCK_OF_QUARTZ)
    builder.move(BACK, 1)
    builder.place(RED_WOOL)
    builder.move(BACK, 1)
    builder.place(BLOCK_OF_QUARTZ)
    builder.move(UP, 1)
    builder.place(QUARTZ_SLAB)
    builder.move(FORWARD, 1)
    builder.place(RED_CARPET)
    builder.move(FORWARD, 1)
    builder.place(QUARTZ_SLAB)
    builder.move(LEFT, 1)
    builder.move(DOWN, 1)
    builder.place(QUARTZ_SLAB)
    builder.move(BACK, 1)
    builder.place(RED_CARPET)
    builder.move(BACK, 1)
    builder.place(QUARTZ_SLAB)
    builder.move(RIGHT, 3)
    builder.move(FORWARD, 1)
    builder.place(OCHRE_FROGLIGHT)
}
function mansion () {
    blocks.fill(
    CHISELED_QUARTZ_BLOCK,
    pos(25, -1, 20),
    pos(38, 10, -10),
    FillOperation.Hollow
    )
    blocks.fill(
    PILLAR_QUARTZ_BLOCK,
    pos(25, -1, 19),
    pos(38, 9, -9),
    FillOperation.Hollow
    )
    blocks.fill(
    CHISELED_QUARTZ_BLOCK,
    pos(19, -1, 13),
    pos(24, 3, -3),
    FillOperation.Hollow
    )
    blocks.place(RED_WOOL, pos(19, -1, 5))
    blocks.place(DARK_OAK_DOOR, pos(19, 0, 5))
    blocks.fill(
    AIR,
    pos(24, 0, 4),
    pos(25, 2, 6),
    FillOperation.Hollow
    )
    blocks.fill(
    RED_CARPET,
    pos(20, 0, 4),
    pos(33, 0, 6),
    FillOperation.Replace
    )
}
function Lamp (num: number, num2: number, num3: number) {
    builder.teleportTo(pos(num, num2, num3))
    builder.place(CHAIN)
    builder.move(DOWN, 1)
    builder.place(CHAIN)
    builder.move(DOWN, 1)
    builder.move(BACK, 1)
    builder.move(LEFT, 1)
    builder.mark()
    builder.move(BACK, -2)
    builder.move(RIGHT, 1)
    builder.move(FORWARD, -2)
    builder.move(RIGHT, 1)
    builder.move(BACK, -2)
    builder.tracePath(WHITE_STAINED_GLASS_PANE)
    builder.move(DOWN, 1)
    builder.move(BACK, 2)
    builder.move(RIGHT, -2)
    builder.mark()
    builder.move(BACK, -2)
    builder.move(RIGHT, 1)
    builder.move(FORWARD, -2)
    builder.move(RIGHT, 1)
    builder.move(BACK, -2)
    builder.tracePath(END_ROD)
    builder.move(DOWN, 1)
    builder.move(FORWARD, -1)
    builder.move(LEFT, 1)
    builder.place(END_ROD)
}
player.onChat("Throne", function () {
	
})
function barrier () {
    builder.teleportTo(pos(19, 4, 13))
    for (let index = 0; index < 9; index++) {
        builder.place(CHISELED_QUARTZ_BLOCK)
        builder.move(FORWARD, 2)
    }
    builder.teleportTo(pos(21, 4, -3))
    for (let index = 0; index < 2; index++) {
        builder.place(CHISELED_QUARTZ_BLOCK)
        builder.move(RIGHT, 2)
    }
    builder.teleportTo(pos(21, 4, 13))
    for (let index = 0; index < 2; index++) {
        builder.place(CHISELED_QUARTZ_BLOCK)
        builder.move(RIGHT, 2)
    }
}
function roof (num: number, num2: number) {
    agent.teleport(pos(24, 11, 20), EAST)
    while (num2 > 0) {
        agent.setItem(BRICK_STAIRS, 64, 1)
        for (let index = 0; index < num; index++) {
            agent.place(FORWARD)
            agent.move(LEFT, 1)
        }
        num = num - 1
        agent.turn(RIGHT_TURN)
        agent.move(LEFT, 2)
        for (let index = 0; index < num2; index++) {
            agent.place(FORWARD)
            agent.move(LEFT, 1)
        }
        num2 = num2 - 1
        agent.turn(RIGHT_TURN)
        agent.move(LEFT, 2)
        for (let index = 0; index < num; index++) {
            agent.place(FORWARD)
            agent.move(LEFT, 1)
        }
        num = num - 1
        agent.turn(RIGHT_TURN)
        agent.move(LEFT, 2)
        for (let index = 0; index < num2; index++) {
            agent.place(FORWARD)
            agent.move(LEFT, 1)
        }
        num2 = num2 - 1
        agent.turn(RIGHT_TURN)
        agent.move(LEFT, 2)
    }
}
