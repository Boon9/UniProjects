
import matplotlib.pyplot as plt
import numpy as np

def draw_hexagon(ax, center, size, color, text, rubbish_size=None, rubbish_weight=None, font_size=10):
    angles = np.linspace(0, 2 * np.pi, 7)
    x = center[0] + size * np.cos(angles)
    y = center[1] + size * np.sin(angles)
    ax.fill(x, y, color=color, edgecolor='black')
    ax.text(center[0], center[1], text, ha='center', va='center', color='black', fontsize=font_size)

    if rubbish_size is not None and rubbish_weight is not None:
        ax.text(center[0], center[1] - size * 0.7, f"Size: {rubbish_size}", ha='center', va='center', color='black', fontsize=font_size - 2)
        ax.text(center[0], center[1] - size * 0.5, f"Weight: {rubbish_weight}", ha='center', va='center', color='black', fontsize=font_size - 2)

def create_hexagon_maze(data):
    disposal_locations = data["disposal_locations"]
    rubbish_locations = data["rubbish_locations"]
    bin_location = data["bin"]
    rubbish_weight = data["rubbish_weight"]
    rubbish_size = data["rubbish_size"]

    if bin_location is None:
        print("\nError: Please add the bin into the maze.")
        return
    else:
        print("\nMaze visualization is created.")

    max_x = max([location[0] for location in disposal_locations + rubbish_locations + [bin_location]])
    max_y = max([location[1] for location in disposal_locations + rubbish_locations + [bin_location]])

    fig, ax = plt.subplots(figsize=(10, 8))
    ax.set_aspect('equal')
    ax.axis('off')

    hex_size = 1.0  # Size of each hexagon

    for y in range(max_y, -1, -1):
        for x in range(max_x, -1, -1):
            if x % 2 == 0:
                center = (x * hex_size * 1.5, (max_y - y) * hex_size * np.sqrt(3))
            else:
                center = (x * hex_size * 1.5, (max_y - y + 0.5) * hex_size * np.sqrt(3))

            if (x, y) == bin_location:
                color = 'yellow'
                text = f'Bin\n({x}, {y})'
            elif (x, y) in disposal_locations:
                color = 'orange'
                text = f'Disposal\n({x}, {y})'
            elif (x, y) in rubbish_locations:
                color = 'plum'
                text = f'Rubbish\n({x}, {y})'
            else:
                color = 'white'
                text = f'({x}, {y})'

            if (x, y) in rubbish_locations:
                index = rubbish_locations.index((x, y))
                rubbish_size_value = rubbish_size[index]
                rubbish_weight_value = rubbish_weight[index]
                draw_hexagon(ax, center, hex_size, color, text, rubbish_size_value, rubbish_weight_value)
            else:
                draw_hexagon(ax, center, hex_size, color, text)
    
    # Set the window name to "Maze"
    manager = plt.get_current_fig_manager()
    manager.set_window_title('Maze Visualization')

    # Show the plot window without blocking the code execution
    plt.subplots_adjust(0, 0, 1, 1)
    plt.show(block=False)
    