import turtle

# Create a Turtle object
pen = turtle.Turtle()

# Set the pen color and fill color
pen.color('yellow', 'red')

# Set the pen size and speed
pen.pensize(3)
pen.speed(1)

# Draw the heart
pen.begin_fill()
pen.left(45)
pen.forward(100)
pen.circle(50, 180)
pen.right(90)
pen.circle(50, 180)
pen.forward(100)
pen.end_fill()

# Move to a new position for the text
pen.penup()
pen.goto(-90, -100)
pen.pendown()

# Write "I love you" using the font and size of your choice
pen.write("I love you", font=("arial", 30, "normal"))

# Hide the turtle when done
pen.hideturtle()

# Keep the window open until manually closed
turtle.done()
