local grid = {}
local gridWidth, gridHeight = 10, 20
local cellSize = 30
local shapes = {
    {shape = {{1, 1, 1, 1}}, color = {0, 1, 1}},
    {shape = {{1, 1, 1}, {0, 1, 0}}, color = {0.5, 0, 0.5}},
    {shape = {{1, 1, 0}, {0, 1, 1}}, color = {0, 1, 0}},
    {shape = {{0, 1, 1}, {1, 1, 0}}, color = {1, 0, 0}},
    {shape = {{1, 1}, {1, 1}}, color = {1, 1, 0}},
    {shape = {{1, 1, 1}, {1, 0, 0}}, color = {1, 0.5, 0}},
    {shape = {{1, 1, 1}, {0, 0, 1}}, color = {0, 0, 1}}
}
local currentShape
local nextShape
local currentX, currentY
local dropTime = 0.5
local dropTimer = 0
local score = 0
local dropSpeedIncreaseThreshold = 100
local speedText = "Drop Speed: %.3f"
local gameOver = false
local gameOverFont = love.graphics.newFont(48)
local scoreFont = love.graphics.newFont(32)
local buttonFont = love.graphics.newFont(24)
local deafultFont = love.graphics.newFont(12)

local buttonX, buttonY, buttonWidth, buttonHeight = 170, 380, 100, 60

function love.load()
    love.window.setMode(450, 600)
    love.window.setTitle("Tetris")
    math.randomseed(os.time())
    for y = 1, gridHeight do
        grid[y] = {}
        for x = 1, gridWidth do
            grid[y][x] = {0, {0, 0, 0}}
        end
    end
    nextShape = generateRandomShape()
    spawnNewShape()
    dropTime = 0.5
    dropTimer = 0
    score = 0
    dropSpeedIncreaseThreshold = 100
    gameOver = false
end

function love.update(dt)
    if not gameOver then
        dropTimer = dropTimer + dt
        if dropTimer >= dropTime then
            dropTimer = 0
            if not moveShape(0, 1) then
                lockShape()
                clearLines()
                spawnNewShape()
            end
        end

        if score >= dropSpeedIncreaseThreshold then
            dropSpeedIncreaseThreshold = dropSpeedIncreaseThreshold + 100
            dropTime = dropTime * 0.9
            speedText = "Drop Speed: %.3f"
        end
    end
end

function love.draw()
    love.graphics.setBackgroundColor(0.04, 0.08, 0.20)
    love.graphics.setColor(0.0, 0.73, 1.26)
    for x = 0, gridWidth do
        love.graphics.line(x * cellSize, 0, x * cellSize, gridHeight * cellSize)
    end
    for y = 0, gridHeight do
        love.graphics.line(0, y * cellSize, gridWidth * cellSize, y * cellSize)
    end

    for y = 1, gridHeight do
        for x = 1, gridWidth do
            if grid[y][x][1] == 1 then
                love.graphics.setColor(grid[y][x][2])
                love.graphics.rectangle("fill", (x-1) * cellSize, (y-1) * cellSize, cellSize, cellSize)
                love.graphics.setColor(0, 0, 0)
                love.graphics.rectangle("line", (x-1) * cellSize, (y-1) * cellSize, cellSize, cellSize)
            end
        end
    end

    for y, row in ipairs(currentShape.shape) do
        for x, cell in ipairs(row) do
            if cell == 1 then
                love.graphics.setColor(currentShape.color)
                love.graphics.rectangle("fill", (currentX + x - 2) * cellSize, (currentY + y - 2) * cellSize, cellSize, cellSize)
                love.graphics.setColor(0, 0, 0)
                love.graphics.rectangle("line", (currentX + x - 2) * cellSize, (currentY + y - 2) * cellSize, cellSize, cellSize)
            end
        end
    end

    love.graphics.setColor(0.0, 0.73, 1.26)
    love.graphics.print("Next:", 320, 10)
    for y, row in ipairs(nextShape.shape) do
        for x, cell in ipairs(row) do
            if cell == 1 then
                love.graphics.setColor(nextShape.color)
                love.graphics.rectangle("fill", 320 + (x-1) * cellSize, 30 + (y-1) * cellSize, cellSize, cellSize)
                love.graphics.setColor(0, 0, 0)
                love.graphics.rectangle("line", 320 + (x-1) * cellSize, 30 + (y-1) * cellSize, cellSize, cellSize)
            end
        end
    end

    love.graphics.setColor(0.0, 0.73, 1.26)
    love.graphics.print(string.format(speedText, dropTime), 320, 100)

    love.graphics.setColor(0.0, 0.73, 1.26)
    love.graphics.print("Score: " .. score, 320, 130)

    love.graphics.setColor(0.0, 0.73, 1.26)
    love.graphics.print("movement: arrows", 320, 550)

    love.graphics.setColor(0.0, 0.73, 1.26)
    love.graphics.print("drop: spacebar", 320, 530)

    if gameOver then
        love.graphics.setColor(0, 0, 0, 0.75)
        love.graphics.rectangle("fill", 0, 0, love.graphics.getWidth(), love.graphics.getHeight())
        
        love.graphics.setColor(0.0, 0.73, 1.26)
        love.graphics.setFont(gameOverFont)
        love.graphics.print("Game Over", 80, 250)

	love.graphics.setFont(scoreFont)
        love.graphics.printf("Score: " .. score, 0, love.graphics.getHeight() / 2 + 20, love.graphics.getWidth(), "center")

        love.graphics.setColor(0.0, 0.73, 1.26)
        love.graphics.setFont(buttonFont)
        love.graphics.rectangle("fill", buttonX, buttonY, buttonWidth, buttonHeight)
        love.graphics.setColor(0, 0, 0)
        love.graphics.printf("Restart", buttonX, buttonY + 15, buttonWidth, "center")
    end
end

function love.mousepressed(x, y, button)
    if button == 1 and gameOver then
        if x >= buttonX and x <= buttonX + buttonWidth and y >= buttonY and y <= buttonY + buttonHeight then
	    love.graphics.setFont(deafultFont)
            love.load()
        end
    end
end

function love.keypressed(key)
    if key == "left" then
        moveShape(-1, 0)
    elseif key == "right" then
        moveShape(1, 0)
    elseif key == "down" then
        moveShape(0, 1)
    elseif key == "up" then
        rotateShape()
    elseif key == "space" then
        dropShape()
    end
end

function dropShape()
    while moveShape(0, 1) do
    end
    lockShape()
    clearLines()
    spawnNewShape()
end

function spawnNewShape()
    currentShape = nextShape
    nextShape = generateRandomShape()
    currentX = math.floor(gridWidth / 2)
    currentY = 1
    if not isValidPosition(currentShape.shape, currentX, currentY) then
        gameOver = true
    end
end

function generateRandomShape()
    local shapeData = shapes[math.random(#shapes)]
    return {shape = shapeData.shape, color = shapeData.color}
end

function moveShape(dx, dy)
    if isValidPosition(currentShape.shape, currentX + dx, currentY + dy) then
        currentX = currentX + dx
        currentY = currentY + dy
        return true
    end
    return false
end

function rotateShape()
    local rotatedShape = {}
    for x = 1, #currentShape.shape[1] do
        rotatedShape[x] = {}
        for y = 1, #currentShape.shape do
            rotatedShape[x][y] = currentShape.shape[#currentShape.shape - y + 1][x]
        end
    end
    if isValidPosition(rotatedShape, currentX, currentY) then
        currentShape.shape = rotatedShape
    end
end

function isValidPosition(shape, x, y)
    for r = 1, #shape do
        for c = 1, #shape[r] do
            if shape[r][c] == 1 then
                local gridX, gridY = x + c - 1, y + r - 1
                if gridX < 1 or gridX > gridWidth or gridY > gridHeight or (gridY > 0 and grid[gridY][gridX][1] == 1) then
                    return false
                end
            end
        end
    end
    return true
end

function lockShape()
    for y, row in ipairs(currentShape.shape) do
        for x, cell in ipairs(row) do
            if cell == 1 then
                grid[currentY + y - 1][currentX + x - 1] = {1, currentShape.color}
            end
        end
    end
end

function clearLines()
    local fullLines = 0
    local y = gridHeight
    while y > 0 do
        local fullLine = true
        for x = 1, gridWidth do
            if grid[y][x][1] == 0 then
                fullLine = false
                break
            end
        end
        if fullLine then
            table.remove(grid, y)
            local newRow = {}
            for x = 1, gridWidth do
                newRow[x] = {0, {0, 0, 0}}
            end
            table.insert(grid, 1, newRow)
            fullLines = fullLines + 1
        else
            y = y - 1
        end
    end
    score = score + (fullLines * 100)
end
