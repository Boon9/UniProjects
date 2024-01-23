
class Node:
    def __init__(self, parent=None, position=None):
        self.parent = parent
        self.position = position
        self.g = 0
        self.h = 0
        self.f = 0

    def __eq__(self, other):
        return self.position == other.position

    def __lt__(self, other):
        if self.f == other.f:
            return self.g > other.g  # Apply tie-breaking based on g-values
        return self.f < other.f

    def __hash__(self):
        return hash(self.position)

def return_path(current_node):
    path = []
    current = current_node
    while current is not None:
        path.append(current.position)
        current = current.parent
    return path[::-1]  # Return reversed path

def distance(position1, position2):
    x1, y1 = position1
    x2, y2 = position2
    distance = max(abs(x2 - x1), abs(y2 - y1))
    return distance

def astar(maze, start, end, avoid_locations=None):
    # Create start and end node
    start_node = Node(None, start)
    start_node.g = start_node.h = start_node.f = 0
    end_node = Node(None, end)
    end_node.g = end_node.h = end_node.f = 0
    nodes_visited = 0

    # Initialize the open and closed lists
    open_list = {}
    closed_list = set()

    # Define the offsets for even and odd rows
    even_row_offsets = [(-1, 0), (1, 0), (0, -1), (0, 1), (1, 1), (-1, 1)]
    odd_row_offsets = [(-1, 0), (1, 0), (0, -1), (0, 1), (1, -1), (-1, -1)]
                       
    # Add the start node to the open list
    open_list[start_node] = start_node.f

    # Loop until you find the end or there are no more nodes to explore
    while open_list:
        # Get the node with the lowest f-value
        current_node = min(open_list, key=open_list.get)

        # Remove the current node from the open list
        del open_list[current_node]

        # Add the current node to the closed list
        closed_list.add(current_node)
        # heapq.heappush(open_list, start_node)

        # Increment total nodes expanded
        nodes_visited += 1

        # Found the goal
        if current_node == end_node:
            return return_path(current_node), nodes_visited

        # Determine the offsets based on row parity
        if current_node.position[0] % 2 == 0:
            offsets = even_row_offsets
        else:
            offsets = odd_row_offsets

        # Generate children
        children = []
        for offset in offsets:
            # Get node position
            node_position = (
                current_node.position[0] + offset[0],
                current_node.position[1] + offset[1],
            )

            # Make sure within range
            if (
                node_position[0] >= len(maze)
                or node_position[0] < 0
                or node_position[1] >= len(maze[0])
                or node_position[1] < 0
            ):
                continue

            # Make sure walkable terrain
            if maze[node_position[0]][node_position[1]] != 0:
                continue

            # Skip node if it's in the list of locations to avoid
            if avoid_locations and node_position in avoid_locations:
                continue

            # Create new node
            new_node = Node(current_node, node_position)

            # Append
            children.append(new_node)

        # Loop through children
        for child in children:
            # Skip child if it's in the closed list
            if child in closed_list:
                continue

            # Calculate the g, h, and f values
            child.g = current_node.g + 1
            child.h = distance(child.position, end_node.position)
            child.f = child.g + child.h

            # Check if the child is already in the open list and has a higher g-value (lower cost)
            if child in open_list and child.g >= open_list[child]:
                continue

            # Add/update the child in the open list
            open_list[child] = child.f

    # No path found
    return [], nodes_visited
