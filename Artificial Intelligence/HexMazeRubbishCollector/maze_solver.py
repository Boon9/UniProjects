
import search

class RubbishCollector:
    def __init__(self, data):
        self.bin = data["bin"]
        self.rubbish_locations = data["rubbish_locations"]
        self.disposal_locations = data["disposal_locations"]
        self.capacity_weight = data["capacity_weight"]
        self.capacity_size = data["capacity_size"]
        self.rubbish_size = {pos: data["rubbish_size"][i] for i, pos in enumerate(self.rubbish_locations)}
        self.rubbish_weight = {pos: data["rubbish_weight"][i] for i, pos in enumerate(self.rubbish_locations)}
        self.current_weight = 0
        self.current_size = 0
        self.total_nodes_expanded = 0
        self.total_disposal_visits = 0
        self.final_path = []

        # Determine the size of the maze based on user inputs
        self.maze_size = self.determine_maze_size(data)
        self.maze = self.create_empty_maze(self.maze_size)

    def determine_maze_size(self, data):
        # Determine the maximum x and y coordinates based on the disposal locations
        max_x = max([location[0] for location in self.disposal_locations + self.rubbish_locations])
        max_y = max([location[1] for location in self.disposal_locations + self.rubbish_locations])

        # Add some buffer space to accommodate the bin's movement
        max_x += 2
        max_y += 2

        return (max_x, max_y)

    def create_empty_maze(self, size):
        return [[0] * size[1] for _ in range(size[0])]

    def get_rubbish(self, avoid_locations):
        rubbish_paths = []

        for v in self.rubbish_locations:
            x = v[0]
            y = v[1]
            start = (self.bin[0], self.bin[1])
            end = (x, y)
            [path, nodes_visited] = search.astar(self.maze, start, end, avoid_locations=avoid_locations+self.disposal_locations)
            self.total_nodes_expanded += nodes_visited  # Update the total nodes expanded

            rubbish_loc = {"pos": (x, y), "path": path}
            rubbish_paths.append(rubbish_loc)

        rubbish_paths.sort(key=lambda x: (len(x["path"]), x["pos"]))

        for rubbish in rubbish_paths:
            if (self.current_size + self.rubbish_size[rubbish["pos"]] <= self.capacity_size and self.current_weight + self.rubbish_weight[rubbish["pos"]] <= self.capacity_weight):
                self.final_path.append(rubbish["path"])
                self.bin = [rubbish["pos"][0], rubbish["pos"][1]]
                self.rubbish_locations.remove(rubbish["pos"])
                self.current_size += self.rubbish_size[rubbish["pos"]]
                self.current_weight += self.rubbish_weight[rubbish["pos"]]

                # Print current weight and size of the bin
                print(f"\nFetching Rubbish:")
                print(f"Path: {start} -> {rubbish['pos']}")
                print(f"Current Weight: {self.current_weight} / {self.capacity_weight}")
                print(f"Current Size: {self.current_size} / {self.capacity_size}")
                self.print_directions(rubbish["path"])  # Print the directions
                
                return None
            
        self.get_disposal()

    def get_disposal(self):
        shortest_path = []
        shortest_distance = float('inf')

        # Update total disposal visits
        self.total_disposal_visits += 1

        for disposal in self.disposal_locations:
            start = (self.bin[0], self.bin[1])
            end = (disposal[0], disposal[1])
            [path, nodes_visited] = search.astar(self.maze, start, end)
            self.total_nodes_expanded += nodes_visited  # Update the total nodes expanded

            if len(path) < shortest_distance:
                shortest_path = path
                shortest_distance = len(path)

        if shortest_path[-1] != tuple(self.bin):
            self.final_path.append(shortest_path)

        self.bin = [shortest_path[-1][0], shortest_path[-1][1]]
        self.current_size = 0
        self.current_weight = 0

        # Print current weight and size of the bin
        print("\nGoing to Nearest Disposal:")
        print(f"Path: {start} -> {shortest_path[-1]}")
        print(f"Current Weight: {self.current_weight} / {self.capacity_weight}")
        print(f"Current Size: {self.current_size} / {self.capacity_size}")
        self.print_directions(shortest_path) # Print the directions

    def avoid_location(self):
        avoid_locations = []

        for pos in self.rubbish_locations:
            x, y = pos
            if (
                self.current_size + self.rubbish_size[pos] > self.capacity_size
                or self.current_weight + self.rubbish_weight[pos] > self.capacity_weight
            ):
                avoid_locations.append((x, y))

        return avoid_locations
    
    def print_directions(self, path):
        print("Direction:")
        print("{:<10} {:<14} {:<11} {:<11} {:<10}".format("Move", "Movement", "From", "To", "Coordinates"))
        
        print("=" * 70)
        
        for i in range(1, len(path)):
            curr_x, curr_y = path[i - 1]
            next_x, next_y = path[i]

            dx = next_x - curr_x
            dy = next_y - curr_y

            if curr_x % 2 == 0:
                if dx == 0 and dy == -1:
                    movement = "UP"
                elif dx == 0 and dy == 1:
                    movement = "DOWN"
                elif dx == -1 and dy == 0:
                    movement = "TOP-LEFT"
                elif dx == -1 and dy == 1:
                    movement = "BOTTOM-LEFT"
                elif dx == 1 and dy == 0:
                    movement = "TOP-RIGHT"
                elif dx == 1 and dy == 1:
                    movement = "BOTTOM-RIGHT"
                else:
                    movement = "UNKNOWN"
            else:
                if dx == 0 and dy == -1:
                    movement = "UP"
                elif dx == 0 and dy == 1:
                    movement = "DOWN"
                elif dx == -1 and dy == -1:
                    movement = "TOP-LEFT"
                elif dx == -1 and dy == 0:
                    movement = "BOTTOM-LEFT"
                elif dx == 1 and dy == -1:
                    movement = "TOP-RIGHT"
                elif dx == 1 and dy == 0:
                    movement = "BOTTOM-RIGHT"
                else:
                    movement = "UNKNOWN"

            move = str(i) + ":"
            from_coord = f"({curr_x}, {curr_y})"
            to_coord = f"({next_x}, {next_y})"
            
            print("{:<8} {:<15} {:<10} {:<10} {:<10}".format(move, movement, from_coord, to_coord, f"{from_coord} to {to_coord}"))

        print("=" * 70)

    def run_algorithm(self):
        # Until all rubbish has been picked up, continue searching for new ones
        while len(self.rubbish_locations) > 0:
            # If the bin's current load is at max capacity, go to disposal to unload
            if ((self.current_size == self.capacity_size) or (self.current_weight == self.capacity_weight)):
                self.get_disposal()
            else:
                # If not at full capacity, go fetch the next rubbish
                avoid_locations = self.avoid_location()
                self.get_rubbish(avoid_locations)
               
        # After picking up all rubbish, find the shortest path to one of the disposal locations
        self.get_disposal()
        
        # Calculate the total nodes expanded during A* search
        total_cost = sum(len(path) - 1 for path in self.final_path)

        print("\nFinal Path:")
        for i, path in enumerate(self.final_path):
            print(f"Path {i + 1}:", ' -> '.join(str(coord) for coord in path))
        
        print("\nSearch Summary:")
        print(f"Total Path Cost: {total_cost}")
        print(f"Total Nodes Expanded: {self.total_nodes_expanded}")
        print(f"Total Times Disposal Visited: {self.total_disposal_visits}")
