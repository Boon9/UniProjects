
import ast
import os
import maze_solver
import maze_visualizer
import matplotlib.pyplot as plt

class Main:
    def __init__(self):
        self.bin = None
        self.rubbish_locations = []
        self.rubbish_weight = []
        self.rubbish_size = []
        self.disposal_locations = []
        self.capacity_weight = 0
        self.capacity_size = 0

    def prompt_integer_input(self, prompt):
        while True:
            try:
                value = int(input(prompt))
                return value
            except ValueError:
                print("\nInvalid input! Please enter a valid integer.")
    
    def add_bin(self, bin_location):
        # Check if the bin location is already a rubbish location
        if bin_location in self.rubbish_locations:
            index = self.rubbish_locations.index(bin_location)
            del self.rubbish_locations[index]
            del self.rubbish_weight[index]
            del self.rubbish_size[index]
            self.bin = tuple(bin_location)
            print("\nThe location has been updated as a bin location.")
        # Check if the bin location is already a disposal location
        elif bin_location in self.disposal_locations:
            index = self.disposal_locations.index(bin_location)
            del self.disposal_locations[index]
            self.bin = tuple(bin_location)
            print("\nThe location has been updated as a bin location.")
        else:
            # Update the bin location
            self.bin = tuple(bin_location)
            print("\nBin has been added into the maze at", self.bin)

    def add_rubbish(self, rubbish_location, weight, size):
        # Check if a rubbish location already exists at the given coordinates
        for i, location in enumerate(self.rubbish_locations):
            if location == rubbish_location:
                self.rubbish_weight[i] = weight  # Update the weight
                self.rubbish_size[i] = size  # Update the size
                self.rubbish_locations[i] = tuple(rubbish_location)  # Update the rubbish location
                print("\nThe rubbish was updated in the maze.")
                return
        
        # Check if the rubbish location is already a disposal location
        if rubbish_location in self.disposal_locations:
            index = self.disposal_locations.index(rubbish_location)
            del self.disposal_locations[index]
            print("\nThe location has been updated as a rubbish location.")
        
        # Check if the rubbish location is the bin
        if rubbish_location == self.bin:
            self.bin = None
            print("\nThe location has been updated as a rubbish location.")

        # If no existing location is found, add a new one
        self.rubbish_locations.append(tuple(rubbish_location))
        self.rubbish_weight.append(weight)
        self.rubbish_size.append(size)
        print("\nThe rubbish was added into the maze.")

    def add_disposal_location(self, disposal_location):
        # Check if a disposal location already exists at the given coordinates
        if disposal_location in self.disposal_locations:
            print("\nThe disposal location already exists in the maze.")
        else:
            # Check if the disposal location is already a rubbish location
            if disposal_location in self.rubbish_locations:
                index = self.rubbish_locations.index(disposal_location)
                del self.rubbish_locations[index]
                del self.rubbish_weight[index]
                del self.rubbish_size[index]
                print("\nThe location has been updated as a disposal location.")
            
            # Check if the disposal location is the bin
            if disposal_location == self.bin:
                self.bin = None
                print("\nThe location has been updated as a disposal location.")

            # If no existing location is found, add a new one
            self.disposal_locations.append(tuple(disposal_location))
            print("\nThe disposal was added into the maze.")

    def prompt_location(self, prompt):
        while True:
            try:
                x_coordinate = self.prompt_integer_input(f"Enter the {prompt} x-coordinate: ")
                y_coordinate = self.prompt_integer_input(f"Enter the {prompt} y-coordinate: ")
                return tuple([x_coordinate, y_coordinate])
            except ValueError:
                print("\nInvalid input! Please enter a valid integer coordinate.")

    def prompt_rubbish_details(self):
        while True:
            try:
                weight = self.prompt_integer_input("Enter the weight of the rubbish: ")
                if weight <= 0:
                    print("\nInvalid weight! Weight must be a positive number greater than zero.")
                    continue
                size = self.prompt_integer_input("Enter the size of the rubbish: ")
                if size <= 0:
                    print("\nInvalid size! Size must be a positive number greater than zero.")
                    continue
                return weight, size
            except ValueError:
                print("\nInvalid input! Please enter valid numeric values.")

    def prompt_capacity(self):
        while True:
            try:
                max_weight = max(self.rubbish_weight) if self.rubbish_weight else 0
                max_size = max(self.rubbish_size) if self.rubbish_size else 0
                capacity_weight = self.prompt_integer_input("Enter the bin's weight capacity: ")
                capacity_size = self.prompt_integer_input("Enter the bin's size capacity: ")
                if capacity_weight < max_weight or capacity_size < max_size:
                    print(f"\nInvalid capacity! Capacity must be greater than or equal to the highest weight and size of the rubbish (Weight: {max_weight}, Size: {max_size}).")
                    continue
                return capacity_weight, capacity_size
            except ValueError:
                print("\nInvalid input! Please enter valid numeric values.")
                
    def prompt_menu_choice(self):
        menu_options = [
            "Enter bin location",
            "Enter rubbish locations",
            "Enter disposal locations",
            "Read locations from text file",
            "Display maze visualization",
            "Start maze solver",
            "Reset maze locations",
            "Quit application",
        ]
        
        print("\n{:^33}".format("Rubbish Collector Solver"))
        print("*" * 33)
        for i, option in enumerate(menu_options):
            print(f"{i+1}. {option}")
        print("*" * 33)

        while True:
            try:
                choice = self.prompt_integer_input("Enter your choice (1-8): ")
                if 1 <= choice <= len(menu_options):
                    return choice
                else:
                    print("\nInvalid choice. Try again.")
            except ValueError:
                print("\nError: Please enter an integer choice.")

    def read_locations_from_file(self):
        file_name = input("Enter the name of the text file: ")
        current_directory = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_directory, file_name)        
        try:
            with open(file_path, 'r') as file:
                data = file.read()
                locations = ast.literal_eval(data)
            return locations
        except FileNotFoundError:
            print("\nFile not found. Please try again.")
        except SyntaxError:
            print("\nInvalid file format. Please make sure the file's location data follow the format.")

    def get_data(self):
        data = {
            "bin": self.bin,
            "rubbish_locations": self.rubbish_locations,
            "rubbish_weight": self.rubbish_weight,
            "rubbish_size": self.rubbish_size,
            "disposal_locations": self.disposal_locations,
            "capacity_weight": self.capacity_weight,
            "capacity_size": self.capacity_size,
        }

        return data

    def run(self):
        while True:
            # Update the data dictionary with the latest values
            data = self.get_data()
            
            choice = self.prompt_menu_choice()

            if choice == 1:
                bin_location = self.prompt_location("bin")
                self.add_bin(bin_location)

            elif choice == 2:
                while True:
                    try:
                        num_rubbish = self.prompt_integer_input("Enter the number of rubbish: ")
                        if num_rubbish >= 0:
                            break
                        else:
                            print("Number of rubbish cannot be negative. Try again.")
                    except ValueError:
                        print("Error: Please enter a valid integer.")

                for i in range(num_rubbish):
                    print("\nPlease enter the location of the rubbish", i + 1)
                    rubbish_location = self.prompt_location("rubbish")
                    weight, size = self.prompt_rubbish_details()
                    self.add_rubbish(rubbish_location, weight, size)

            elif choice == 3:
                while True:
                    try:
                        num_disposals = self.prompt_integer_input("Enter the number of disposals: ")
                        if num_disposals >= 0:
                            break
                        else:
                            print("Number of disposals cannot be negative. Try again.")
                    except ValueError:
                        print("Error: Please enter a valid integer.")
                
                for i in range(num_disposals):
                    print("\nPlease enter the location of disposal", i+1)
                    disposal_location = self.prompt_location("disposal")
                    self.add_disposal_location(disposal_location)

            elif choice == 4:
                locations = self.read_locations_from_file()
                if locations:
                    self.bin = locations.get("bin")
                    self.rubbish_locations = locations.get("rubbish_locations")
                    self.rubbish_weight = locations.get("rubbish_weight")
                    self.rubbish_size = locations.get("rubbish_size")
                    self.disposal_locations = locations.get("disposal_locations")
                    print("\nLocations have been loaded from the file.")

            elif choice == 5:
                # Generate a visualization of the maze
                maze_visualizer.create_hexagon_maze(data)

                print("\nMaze info:")
                print("Bin:", self.bin)
                if not self.disposal_locations:
                    print("Disposal: None")
                else:
                    for i, disposal_loc in enumerate(self.disposal_locations):
                        print(f"Disposal {i+1}: {disposal_loc}")
                if not self.rubbish_locations:
                    print("Rubbish: None")
                else:
                    for i, rubbish_num in enumerate(self.rubbish_locations):
                        print(f"Rubbish {i+1}: {rubbish_num}, Weight: {self.rubbish_weight[i]}, Size: {self.rubbish_size[i]}")
      
            elif choice == 6:
                # Prompt for capacity input
                self.capacity_weight, self.capacity_size = self.prompt_capacity()
                
                # Check if bin exists and prompt for bin location if not
                if not self.bin:
                    self.bin = tuple(self.prompt_location("bin"))
                    print("Bin has been added into the maze at", self.bin)

                # Check if disposal locations exist and prompt for their locations if not
                if not self.disposal_locations:
                    num_disposals = self.prompt_integer_input("Enter the number of disposals: ")
                    self.disposal_locations = [tuple(self.prompt_location("disposal")) for _ in range(num_disposals)]
                
                # Update the data dictionary with the latest values
                data = self.get_data()
                
                # Run the rubbish collection algorithm
                maze_solver.RubbishCollector(data).run_algorithm()

                # Reset values for the next search
                self.rubbish_weight = []
                self.rubbish_size = []
                self.capacity_weight = 0
                self.capacity_size = 0

            elif choice == 7:
                self.rubbish_locations = []
                self.rubbish_weight = []
                self.rubbish_size = []
                self.bin = None
                self.disposal_locations = []
                print("\nMaze has been reset.")

            elif choice == 8:
                print("\nQuitting...\n")
                break
            else:
                print("\nInvalid choice. Try again.")

if __name__ == "__main__":
    # Enable interactive mode
    plt.ion()
    
    Main().run()
