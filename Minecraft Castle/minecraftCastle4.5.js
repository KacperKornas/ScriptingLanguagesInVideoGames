let number = 0
let high = 0
let yyy = 0
let Radius = 0
let z = 0
let num = 0
let num2 = 0
function inside () {
    Lamp(32, 8, -2)
    Lamp(32, 8, 12)
    Lamp(30, 8, 5)
    Throne()
    room()
}
function Gate () {
    tower(-5, -1, 2, 4, 2)
    tower(-5, -1, 8, 4, 2)
    blocks.fill(
    CHISELED_QUARTZ_BLOCK,
    pos(-3, -1, 2),
    pos(-7, 2, 8),
    FillOperation.Hollow
    )
    agent.setItem(STICKY_PISTON, 1, 1)
    agent.teleport(pos(-5, 0, 6), SOUTH)
    agent.place(FORWARD)
    agent.move(UP, 1)
    agent.place(FORWARD)
    agent.setItem(LEVER, 1, 1)
    agent.teleport(pos(-8, 1, 7), EAST)
    agent.place(FORWARD)
    agent.teleport(pos(-9, 1, 7), EAST)
    agent.interact(FORWARD)
    agent.teleport(pos(-2, 1, 7), WEST)
    agent.place(FORWARD)
    blocks.fill(
    CHISELED_QUARTZ_BLOCK,
    pos(-3, 0, 4),
    pos(-7, 1, 6),
    FillOperation.Replace
    )
    blocks.fill(
    AIR,
    pos(-3, 0, 5),
    pos(-7, 1, 5),
    FillOperation.Replace
    )
    blocks.fill(
    AIR,
    pos(-2, 3, 3),
    pos(-6, 3, 7),
    FillOperation.Replace
    )
    builder.teleportTo(pos(-8, -1, 6))
    for (let index = 0; index < 2; index++) {
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(FORWARD, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(FORWARD, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.shift(1, 1, 0)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(BACK, 1)
        builder.place(END_ROD)
        builder.move(UP, 1)
        builder.place(END_ROD)
        builder.move(UP, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(BACK, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(BACK, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(DOWN, 1)
        builder.place(END_ROD)
        builder.move(DOWN, 1)
        builder.place(END_ROD)
        builder.move(BACK, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.teleportTo(pos(-2, -1, 6))
    }
    blocks.place(CHISELED_QUARTZ_BLOCK, pos(-3, 3, 4))
    blocks.place(CHISELED_QUARTZ_BLOCK, pos(-3, 3, 6))
    blocks.place(CHISELED_QUARTZ_BLOCK, pos(-7, 3, 4))
    blocks.place(CHISELED_QUARTZ_BLOCK, pos(-7, 3, 6))
    blocks.place(CHISELED_QUARTZ_BLOCK, pos(-6, 0, 7))
    blocks.place(CHISELED_QUARTZ_BLOCK, pos(-4, 0, 7))
    blocks.place(REDSTONE_WIRE, pos(-6, 1, 7))
    blocks.place(REDSTONE_WIRE, pos(-4, 1, 7))
    blocks.fill(
    BLOCK_OF_QUARTZ,
    pos(-2, -1, 3),
    pos(-8, -1, 7),
    FillOperation.Replace
    )
}
function wall () {
    player.teleport(pos(-10, 0, 0))
    for (let index = 0; index < 4; index++) {
        shapes.circle(
        CHISELED_QUARTZ_BLOCK,
        pos(40, number, 5),
        35,
        Axis.Y,
        ShapeOperation.Replace
        )
        shapes.circle(
        AIR,
        pos(40, number, 5),
        31,
        Axis.Y,
        ShapeOperation.Replace
        )
        number = number + 1
    }
    shapes.circle(
    AIR,
    pos(40, 3, 5),
    34,
    Axis.Y,
    ShapeOperation.Replace
    )
    player.teleport(pos(10, 0, 0))
}
player.onChat("castle", function () {
    player.say("UWAGA!!! NIE RUSZAJ SIĘ DOPÓKI NIE DAM CI ZNAĆ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    player.say("UWAGA!!! NIE RUSZAJ SIĘ DOPÓKI NIE DAM CI ZNAĆ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    player.say("UWAGA!!! NIE RUSZAJ SIĘ DOPÓKI NIE DAM CI ZNAĆ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    player.say("UWAGA!!! NIE RUSZAJ SIĘ DOPÓKI NIE DAM CI ZNAĆ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    player.say("UWAGA!!! NIE RUSZAJ SIĘ DOPÓKI NIE DAM CI ZNAĆ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    wall()
    moat(0)
    tower(39, -1, 13, 8, 5)
    tower(39, -1, -3, 8, 5)
    mansion()
    barrier()
    Windows()
    inside()
    bridge(7)
    Gate()
    player.teleport(pos(-20, 0, 5))
    player.say("AGENT BĘDZIE STAWIAŁ DACH JESCZE PRZEZ KILKA MINUT, ALE JUŻ MOŻESZ SWOBODNIE EKSPLOROWAĆ :)")
    player.say("UŻYJ DŹWIGNI W BRAMIE")
    roof(31, 13)
})
function decoratez (xx: number, yy: number, zz: number, high: number, repeat: number) {
    builder.teleportTo(pos(xx, yy, zz))
    builder.setOrigin()
    for (let index = 0; index < repeat; index++) {
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.move(LEFT, 1)
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.move(LEFT, 1)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.teleportToOrigin()
        high = high + 1
        builder.move(FORWARD, high)
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.move(LEFT, 1)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.move(LEFT, 1)
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.teleportToOrigin()
        high = high + 1
        builder.move(FORWARD, high)
    }
}
function decoratey (xx: number, yy: number, zz: number, high: number, repeat: number) {
    builder.teleportTo(pos(xx, yy, zz))
    builder.setOrigin()
    for (let index = 0; index < repeat; index++) {
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.move(LEFT, 1)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.move(LEFT, 1)
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.teleportToOrigin()
        high = high + 1
        builder.move(UP, high)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.move(LEFT, 1)
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.move(LEFT, 1)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.teleportToOrigin()
        high = high + 1
        builder.move(UP, high)
    }
}
function Throne () {
    builder.teleportTo(pos(35, 2, 6))
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
    builder.place(OCHRE_FROGLIGHT)
    builder.move(FORWARD, 1)
    builder.place(OCHRE_FROGLIGHT)
    builder.move(FORWARD, 1)
    builder.place(OCHRE_FROGLIGHT)
    builder.move(BACK, 1)
    builder.move(UP, 1)
    builder.place(OCHRE_FROGLIGHT)
    builder.teleportTo(pos(37, 0, 2))
    for (let index = 0; index < 9; index++) {
        builder.place(YELLOW_WOOL)
        builder.move(UP, 1)
    }
    builder.teleportTo(pos(37, 0, 8))
    for (let index = 0; index < 9; index++) {
        builder.place(YELLOW_WOOL)
        builder.move(UP, 1)
    }
    blocks.fill(
    RED_CARPET,
    pos(36, 0, 2),
    pos(31, 0, 3),
    FillOperation.Replace
    )
    blocks.fill(
    RED_CARPET,
    pos(36, 0, 7),
    pos(31, 0, 8),
    FillOperation.Replace
    )
}
function Windows () {
    blocks.fill(
    WHITE_STAINED_GLASS_PANE,
    pos(25, 4, 11),
    pos(25, 8, 9),
    FillOperation.Replace
    )
    blocks.fill(
    WHITE_STAINED_GLASS_PANE,
    pos(25, 4, 6),
    pos(25, 8, 4),
    FillOperation.Replace
    )
    blocks.fill(
    WHITE_STAINED_GLASS_PANE,
    pos(25, 4, 1),
    pos(25, 8, -1),
    FillOperation.Replace
    )
    blocks.fill(
    WHITE_STAINED_GLASS_PANE,
    pos(28, 1, -10),
    pos(30, 7, -10),
    FillOperation.Replace
    )
    blocks.fill(
    WHITE_STAINED_GLASS_PANE,
    pos(33, 1, -10),
    pos(35, 7, -10),
    FillOperation.Replace
    )
    blocks.fill(
    AIR,
    pos(28, 0, -9),
    pos(30, 7, -9),
    FillOperation.Replace
    )
    blocks.fill(
    AIR,
    pos(33, 0, -9),
    pos(35, 7, -9),
    FillOperation.Replace
    )
    blocks.fill(
    WHITE_STAINED_GLASS_PANE,
    pos(28, 1, 20),
    pos(30, 7, 20),
    FillOperation.Replace
    )
    blocks.fill(
    WHITE_STAINED_GLASS_PANE,
    pos(33, 1, 20),
    pos(35, 7, 20),
    FillOperation.Replace
    )
    blocks.fill(
    AIR,
    pos(28, 0, 19),
    pos(30, 7, 19),
    FillOperation.Replace
    )
    blocks.fill(
    AIR,
    pos(33, 0, 19),
    pos(35, 7, 19),
    FillOperation.Replace
    )
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
    pos(25, 3, -3),
    FillOperation.Hollow
    )
    blocks.fill(
    CHISELED_QUARTZ_BLOCK,
    pos(19, 0, 3),
    pos(25, 3, 7),
    FillOperation.Hollow
    )
    blocks.fill(
    WHITE_STAINED_GLASS,
    pos(19, 0, 4),
    pos(19, 2, 6),
    FillOperation.Replace
    )
    blocks.fill(
    BOOKSHELF,
    pos(20, -1, -2),
    pos(24, 2, 2),
    FillOperation.Hollow
    )
    blocks.fill(
    RED_WOOL,
    pos(19, -1, 11),
    pos(24, -1, -3),
    FillOperation.Hollow
    )
    blocks.place(DARK_OAK_DOOR, pos(19, 0, 5))
    blocks.fill(
    AIR,
    pos(24, 0, 4),
    pos(25, 2, 6),
    FillOperation.Hollow
    )
    blocks.fill(
    AIR,
    pos(22, 0, 2),
    pos(22, 1, 7),
    FillOperation.Replace
    )
    blocks.fill(
    AIR,
    pos(21, 2, -1),
    pos(23, 2, 1),
    FillOperation.Hollow
    )
    blocks.fill(
    RED_CARPET,
    pos(20, 0, 4),
    pos(32, 0, 6),
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
player.onChat("jump", function () {
	
})
function tower (xxx: number, yyy: number, zzz: number, highT: number, Radius: number) {
    for (let index = 0; index < highT; index++) {
        yyy = yyy + 1
        shapes.circle(
        CHISELED_QUARTZ_BLOCK,
        pos(xxx, yyy, zzz),
        Radius,
        Axis.Y,
        ShapeOperation.Replace
        )
    }
    Radius = Radius - 1
    shapes.circle(
    AIR,
    pos(xxx, yyy, zzz),
    Radius,
    Axis.Y,
    ShapeOperation.Replace
    )
}
function bridge (z: number) {
    for (let index = 0; index < 2; index++) {
        builder.teleportTo(pos(-1, 0, z))
        builder.place(QUARTZ_SLAB)
        builder.move(RIGHT, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(RIGHT, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(UP, 1)
        builder.place(QUARTZ_SLAB)
        builder.move(RIGHT, 1)
        builder.mark()
        builder.move(RIGHT, 4)
        builder.tracePath(BLOCK_OF_QUARTZ)
        builder.move(RIGHT, 1)
        builder.place(QUARTZ_SLAB)
        builder.move(DOWN, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(RIGHT, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(RIGHT, 1)
        builder.place(QUARTZ_SLAB)
        z = 3
    }
    for (let index = 0; index < 3; index++) {
        z = z + 1
        builder.teleportTo(pos(-1, -1, z))
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(RIGHT, 1)
        builder.move(UP, 1)
        builder.place(QUARTZ_SLAB)
        builder.move(RIGHT, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(UP, 1)
        builder.move(RIGHT, 1)
        builder.mark()
        builder.move(RIGHT, 4)
        builder.tracePath(QUARTZ_SLAB)
        builder.move(RIGHT, 1)
        builder.move(DOWN, 1)
        builder.place(BLOCK_OF_QUARTZ)
        builder.move(RIGHT, 1)
        builder.place(QUARTZ_SLAB)
        builder.move(RIGHT, 1)
        builder.move(DOWN, 1)
        builder.place(BLOCK_OF_QUARTZ)
    }
    blocks.fill(
    BLOCK_OF_QUARTZ,
    pos(18, -1, 4),
    pos(10, -1, 6),
    FillOperation.Replace
    )
}
function decoratex (xx: number, yy: number, zz: number, high: number, repeat: number) {
    builder.teleportTo(pos(xx, yy, zz))
    builder.setOrigin()
    for (let index = 0; index < repeat; index++) {
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.move(BACK, 1)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.move(BACK, 1)
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.move(BACK, 1)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.move(BACK, 1)
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.teleportToOrigin()
        high = high + 1
        builder.move(UP, high)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.move(BACK, 1)
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.move(BACK, 1)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.move(BACK, 1)
        builder.place(RED_GLAZED_TERRACOTTA)
        builder.move(BACK, 1)
        builder.place(YELLOW_GLAZED_TERRACOTTA)
        builder.teleportToOrigin()
        high = high + 1
        builder.move(UP, high)
    }
}
function room () {
    decoratex(37, 0, 3, 0, 5)
    decoratex(24, -1, 8, 0, 2)
    decoratex(20, -1, 8, 0, 2)
    decoratey(23, -1, 12, 0, 2)
    decoratez(23, 2, 11, 0, 2)
    blocks.place(BED, pos(22, 0, 11))
    builder.teleportTo(pos(21, 0, 11))
    for (let index = 0; index < 4; index++) {
        builder.place(END_ROD)
        builder.move(UP, 1)
        builder.place(END_ROD)
        builder.move(DOWN, 1)
        builder.move(LEFT, -2)
        builder.turn(LEFT_TURN)
    }
    blocks.place(ENCHANTMENT_TABLE, pos(22, 0, 0))
    blocks.place(END_ROD, pos(22, 2, 0))
    agent.setItem(DARK_OAK_DOOR, 1, 1)
    agent.teleport(pos(22, 0, 4), NORTH)
    agent.place(FORWARD)
    agent.teleport(pos(22, 0, 6), SOUTH)
    agent.place(FORWARD)
}
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
    agent.teleport(pos(44, 11, 15), EAST)
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
function moat (number: number) {
    for (let index = 0; index < 3; index++) {
        number = number - 1
        shapes.circle(
        AIR,
        pos(30, number, 5),
        30,
        Axis.Y,
        ShapeOperation.Replace
        )
        shapes.circle(
        WATER,
        pos(30, number, 5),
        30,
        Axis.Y,
        ShapeOperation.Replace
        )
        shapes.circle(
        GRASS,
        pos(30, number, 5),
        23,
        Axis.Y,
        ShapeOperation.Replace
        )
    }
    shapes.circle(
    FLOWERING_AZALEA,
    pos(30, 0, 5),
    23,
    Axis.Y,
    ShapeOperation.Replace
    )
    shapes.circle(
    AIR,
    pos(30, 0, 5),
    22,
    Axis.Y,
    ShapeOperation.Replace
    )
}
