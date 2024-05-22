require 'ruby2d'

set width: 800, height: 600
GRAVITY = 6
TILE_SCALE = 3
$ground_tiles = []
$pipe_tiles = []
$brick_blocks = []
$background_image = Image.new('level.png', y: -120)
SCROLL_SPEED = 5

set title: 'Mario'

class GroundTile
  def initialize(x, y, tile_width, tile_height)
    @x = x
    @y = y
    @width = x + 16 * TILE_SCALE * tile_width
    @height = y + 16 * TILE_SCALE * tile_height
    @tile_positions = []
    populate_tile_positions
  end

  def tile_positions
    @tile_positions
  end

  def collides_with?(obj_x, obj_y, offset_x)
    (obj_x + offset_x >= @x && obj_x <= @width) && (obj_y >= @y && obj_y <= (@y + 5))
  end

  def touches_side?(obj_x, obj_y, offset_x)
    (obj_x + offset_x >= @x && obj_x <= @width) && (obj_y > (@y + 5) && obj_y <= @height)
  end

  private

  def populate_tile_positions
    j = @y
    while j < @height
      i = @x
      while i < @width
        @tile_positions.push({ x: i, y: j })
        i += 16 * TILE_SCALE
      end
      j += 16 * TILE_SCALE
    end
  end
end

class PipeTile
  def initialize(x, y, pipe_height)
    @left_x = x
    @y = y
    @right_x = x + 16 * TILE_SCALE
    @height = y + 16 * TILE_SCALE * pipe_height
    @top_left_pos = {}
    @top_right_pos = {}
    @bottom_left_pos = []
    @bottom_right_pos = []
    populate_positions
  end

  def top_left_pos
    @top_left_pos
  end

  def top_right_pos
    @top_right_pos
  end

  def bottom_left_pos
    @bottom_left_pos
  end

  def bottom_right_pos
    @bottom_right_pos
  end

  def touches_side?(obj_x, obj_y, offset_x)
    width = @left_x + 32 * TILE_SCALE
    (obj_x + offset_x <= width && obj_x + offset_x >= @left_x && (obj_y > (@y + 9) && obj_y <= @height))
  end

  def touches_surface?(obj_x, obj_y, offset_x)
    in_width_range?(obj_x, offset_x) && (obj_y >= @y) && obj_y <= (@y + 10)
  end

  private

  def in_width_range?(obj_x, offset_x)
    width = @left_x + 32 * TILE_SCALE
    (obj_x + offset_x >= @left_x && obj_x + offset_x <= width)
  end

  def populate_positions
    @top_left_pos = { x: @left_x, y: @y }
    @top_right_pos = { x: @right_x, y: @y }

    j = @y + 16 * TILE_SCALE
    while j <= @height
      @bottom_left_pos.push({ x: @left_x, y: j })
      @bottom_right_pos.push({ x: @right_x, y: j })
      j += 16 * TILE_SCALE
    end
  end
end

class BrickBlock
  def initialize(x, y, width_in_tiles, height_in_tiles)
    @x = x
    @y = y
    @width = x + 16 * TILE_SCALE * width_in_tiles
    @height = y + 16 * TILE_SCALE * height_in_tiles
    @tile_positions = []
    populate_positions
  end

  def tile_positions
    @tile_positions
  end

  def collides_with?(obj_x, obj_y, offset_x)
    (obj_x + offset_x >= @x && obj_x <= @width) && (obj_y >= @y && obj_y <= (@y + 5))
  end

  def touches_side?(obj_x, obj_y, offset_x)
    (obj_x + offset_x >= @x && obj_x <= @width) && (obj_y > (@y + 5) && obj_y <= @height)
  end

  def touches_bottom?(obj_x, obj_y, offset_x)
    (obj_x + offset_x >= @x && obj_x <= @width) && (obj_y >= (@height - 5) && obj_y <= @height)
  end

  def move_tiles
    @x -= $camera_x
    @width -= $camera_x
    @tile_positions.each do |tile_pos|
      tile_pos[:x] -= $camera_x
    end
  end

  private

  def populate_positions
    j = @y
    while j < @height
      i = @x
      while i < @width
        @tile_positions.push({ x: i, y: j })
        i += 16 * TILE_SCALE
      end
      j += 16 * TILE_SCALE
    end
  end
end

class MarioCharacter

  def initialize(x, y)
    @health = 1
    @speed = SCROLL_SPEED
    @jump_force = 14
    @max_jump_height = -100
    @jump_height = 0
    @vertical_velocity = 0
    @reset_to_default = false
    @jumping = false
    @sprite = Sprite.new(
      'mario.png',
      width: 20 * 4,
      height: 16 * 4,
      x: x,
      y: y,
      clip_width: 20,
      time: 100,
      animations: {
        walk: 1..3,
        jump: 4,
        die: 5
      }
    )
  end

  def x
    @sprite.x
  end

  def y
    @sprite.y
  end

  def move_left
    unless touching_blocks_from_left? || touching_left_screen_border?
      @speed = SCROLL_SPEED if $background_image.x == 0
      @sprite.x -= @speed
      $background_image.x += SCROLL_SPEED if $background_image.x < 0 && @speed == 0
    end
    @sprite.play animation: :walk, loop: true, flip: :horizontal
  end

  def move_right
    unless touching_blocks_from_right? || touching_right_screen_border?
      @speed = SCROLL_SPEED if $background_image.x == -2785
      @sprite.x += @speed
      $background_image.x -= SCROLL_SPEED if ($background_image.x - Window.width) > -$background_image.width && @speed == 0
    end
    @sprite.play animation: :walk, loop: true
  end

  def jump
    if touching_ground? || touching_surface?
      @jumping = true
      @vertical_velocity = -@jump_force
    elsif @jumping && @vertical_velocity > @max_jump_height
      @vertical_velocity -= 6
      @jump_height -= 6
      stop_jump if @jump_height <= @max_jump_height
    end
  end

  def stop_jump
    @jumping = false
    @reset_to_default = true
    @jump_height = 0
  end

  def stop_animation
    @sprite.stop
  end

  def update
    if falling?
      @sprite.y += GRAVITY
      @sprite.clip_x = 80
      @reset_to_default = false
      handle_game_over if touching_bottom_border?
    elsif @jumping
      @sprite.y += @vertical_velocity
      @vertical_velocity += GRAVITY
      @sprite.clip_x = 80
      @jumping = false if hit_block?
    end

    if @reset_to_default && !falling?
      @sprite.stop
      @reset_to_default = false
    end

    @speed = 0 if @sprite.x == (Window.width / 2 - 50)
  end

  def falling?
    !(touching_ground? || @jumping || touching_surface?)
  end

  def touching_left_screen_border?
    @sprite.x + 9 <= 0
  end

  def touching_right_screen_border?
    @sprite.x >= 740
  end

  def touching_ground?
    $ground_tiles.any? { |ground| ground.collides_with?(-$background_image.x + @sprite.x + 20, @sprite.y + @sprite.height, 40) }
  end

  def touching_surface?
    $pipe_tiles.any? { |pipe| pipe.touches_surface?(-$background_image.x + @sprite.x + 20, @sprite.y + @sprite.height, 60) } ||
    $brick_blocks.any? { |brick| brick.collides_with?(-$background_image.x + @sprite.x + 20, @sprite.y + @sprite.height, 40) }
  end

  def touching_blocks_from_left?
    $pipe_tiles.any? { |pipe| pipe.touches_side?(-$background_image.x + @sprite.x, @sprite.y + @sprite.height, 60) || pipe.touches_side?(-$background_image.x + @sprite.x, @sprite.y, 60) } ||
    $ground_tiles.any? { |ground| ground.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y + @sprite.height, 20) || ground.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y, 20) } ||
    $brick_blocks.any? { |brick| brick.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y + @sprite.height, 20) || brick.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y, 20) }
  end

  def touching_blocks_from_right?
    $pipe_tiles.any? { |pipe| pipe.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y + @sprite.height, 100) || pipe.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y, 100) } ||
    $ground_tiles.any? { |ground| ground.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y + @sprite.height, 40) || ground.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y, 40) } ||
    $brick_blocks.any? { |brick| brick.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y + @sprite.height, 40) || brick.touches_side?(-$background_image.x + @sprite.x + 20, @sprite.y, 40) }
  end

  def hit_block?
    $brick_blocks.any? { |brick| brick.touches_bottom?(-$background_image.x + @sprite.x + 20, @sprite.y, 40) || brick.touches_bottom?(-$background_image.x + @sprite.x, @sprite.y, 40) }
  end

  def touching_bottom_border?
    (@sprite.y + @sprite.height) >= Window.height
  end

  def handle_game_over
    @health = 0
  end

  def alive?
    @health > 0
  end

  def reset
    @sprite.remove
    @health = 1
    @speed = SCROLL_SPEED
    @jump_force = 14
    @max_jump_height = -100
    @jump_height = 0
    @vertical_velocity = 0
    @reset_to_default = false
    @jumping = false
    @sprite = Sprite.new(
      'mario.png',
      width: 20 * 4,
      height: 16 * 4,
      x: 20,
      y: 400,
      clip_width: 20,
      time: 100,
      animations: {
        walk: 1..3,
        jump: 4,
        die: 5
      }
    )
  end
end

mario = MarioCharacter.new(20, 400)

ground1 = GroundTile.new(0, Window.height - 2 * 48, 46, 2)
$ground_tiles.push(ground1)
ground2 = GroundTile.new(48 * 48, Window.height - 2 * 48, 15, 2)
$ground_tiles.push(ground2)
ground3 = GroundTile.new(48 * 66, Window.height - 2 * 48, 9, 2)
$ground_tiles.push(ground3)

pipe1 = PipeTile.new(48 * 29, Window.height - 2 * 48 - 16 * TILE_SCALE * 2, 1)
$pipe_tiles.push(pipe1)
pipe2 = PipeTile.new(48 * 39, Window.height - 2 * 48 - 16 * TILE_SCALE * 3, 2)
$pipe_tiles.push(pipe2)

brick1 = BrickBlock.new(20 * 48, Window.height - 6 * 48, 5, 1)
$brick_blocks.push(brick1)
brick2 = BrickBlock.new(54 * 48, Window.height - 6 * 48, 3, 1)
$brick_blocks.push(brick2)
brick3 = BrickBlock.new(57 * 48, Window.height - 10 * 48, 8, 1)
$brick_blocks.push(brick3)
brick4 = BrickBlock.new(68 * 48, Window.height - 10 * 48, 3, 1)
$brick_blocks.push(brick4)
brick5 = BrickBlock.new(71 * 48, Window.height - 6 * 48, 1, 1)
$brick_blocks.push(brick5)

retry_button = nil
game_over_background = nil

on :key_held do |event|
  case event.key
  when 'left'
    mario.move_left
  when 'right'
    mario.move_right
  when 'space'
    mario.jump
  end
end

on :key_up do |event|
  case event.key
  when 'left'
    mario.stop_animation
  when 'right'
    mario.stop_animation
  when 'space'
    mario.stop_jump
  end
end

def show_game_over_screen
  game_over_background = Rectangle.new(
    x: 0, y: 0,
    width: Window.width, height: Window.height,
    color: 'black',
    z: 10
  )

  Text.new(
    "Game Over",
    x: Window.width / 2 - 80,
    y: Window.height / 2 - 40,
    size: 40,
    color: 'red',
    z: 11
  )

  retry_button = Rectangle.new(
    x: Window.width / 2 - 60,
    y: Window.height / 2,
    width: 160,
    height: 40,
    color: 'white',
    z: 11
  )

  Text.new(
    "End Game",
    x: Window.width / 2 - 30,
    y: Window.height / 2 + 10,
    size: 20,
    color: 'red',
    z: 12
  )

  on :mouse_down do |event|
    if retry_button.contains?(event.x, event.y)
      retry_button.remove
      game_over_background.remove
      mario.reset
    end
  end
end

update do
  if mario.alive?
    mario.update
    if mario.x >= 740
      Text.new(
        "You win!!!",
        x: Window.width / 2 - 50,
        y: Window.height / 2,
        size: 40,
        color: 'white'
      )
      $background_image.x = 0
      mario.reset
    end
  else
    unless retry_button && game_over_background
      show_game_over_screen
  end
end
end

show
