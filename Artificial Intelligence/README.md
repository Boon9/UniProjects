
# CSC3206 Artficial Intelligience Assignment 

## About The Project

*Adapted from the included [report](Report.pdf)*

<p align="justify">
    The task of this project is to find the paths needed to collect all the rubbish within a hexagonal maze and dispose of them in any one of the available disposal rooms placed throughout the maze. However, the rubbish collector is a human, meaning he / she has limits that must not be exceeded or else, the rubbish collector will not be able to move the bin at all. Hence, this project is aimed at solving this difficult predicament of the rubbish collector.
</p>

---

## Overview

*Adapted from the included [report](Report.pdf)*

<p align="justify">
    In this project, the rubbish collector will find the paths through the hexagonal maze in order to collect all the necessary rubbish in the rooms and to reach any of the disposal rooms in the situation where the carry capacity has been reached or is close to reaching. The search algorithm used to find the paths is the A* Search algorithm and the navigation as well as the decision-making is handled by the maze solver file.
</p>

---

## Project Files Description
- **main.py** - Handles the menu display and user input validations
- **search.py** - Contains the A* Search algorithm
- **maze_solver.py** - Handles the navigation and decision-making algorithm of the Bin
- **maze_visualization.py** - Creates the visualization of the hexagonal maze 

---

## Application Features
1. Customizable node locations and details
2. Extract node information from text files
3. Create dynamic hexagonal maze sizes
3. Generate graphical visualization of hexagonal mazes
5. Display A* Search algorithm hexagon maze movements 
6. Provide summarize search algorithm results 
7. Error exception handling

---

## Documentation

For further reading and a better understanding of the project that contains an in-depth write-up, please download and view the included [report](Report.pdf).

---

## How To Run - **Assignment Solution**
**Step 1:** Run the `main.py` file in the command line or any method. 

    python main.py

**Output:** 
```
    Rubbish Collector Solver     
*********************************
1. Enter bin location
2. Enter rubbish locations       
3. Enter disposal locations      
4. Read locations from text file 
5. Display maze visualization    
6. Start maze solver
7. Reset maze locations
8. Quit application
*********************************
Enter your choice (1-8):         
```

<br>

**Step 2:** Select option 4 and load the `assignment.txt` file. 

**Output:**
```
    Rubbish Collector Solver     
*********************************
1. Enter bin location
2. Enter rubbish locations       
3. Enter disposal locations
4. Read locations from text file
5. Display maze visualization
6. Start maze solver
7. Reset maze locations
8. Quit application
*********************************
Enter your choice (1-8): 4
Enter the name of the text file: assignment.txt

Locations have been loaded from the file.
```

<br>

**Step 3: [*Optional*]** Select option 5 in order to confirm the maze layout and its information.

**CLI Output:**
```
    Rubbish Collector Solver             
*********************************        
1. Enter bin location
2. Enter rubbish locations
3. Enter disposal locations
4. Read locations from text file
5. Display maze visualization
6. Start maze solver
7. Reset maze locations
8. Quit application
*********************************        
Enter your choice (1-8): 5

Maze visualization is created.

Maze info:
Bin: (0, 0)
Disposal 1: (5, 0)
Disposal 2: (2, 5)
Disposal 3: (8, 5)
Rubbish 1: (1, 3), Weight: 30, Size: 3
Rubbish 2: (7, 0), Weight: 30, Size: 1
Rubbish 3: (7, 3), Weight: 20, Size: 2
Rubbish 4: (4, 4), Weight: 20, Size: 1
Rubbish 5: (8, 1), Weight: 10, Size: 3
Rubbish 6: (6, 1), Weight: 10, Size: 2
Rubbish 7: (4, 2), Weight: 10, Size: 2
Rubbish 8: (0, 5), Weight: 10, Size: 1
Rubbish 9: (3, 4), Weight: 5, Size: 3 
Rubbish 10: (6, 4), Weight: 5, Size: 2
Rubbish 11: (2, 2), Weight: 5, Size: 1
Rubbish 12: (3, 1), Weight: 5, Size: 1
```

**Graphical Output:**

![image](images\Maze_Visualization.png)

<br>

**Step 4:** Select option 6 to start the A* Search alogirthm and enter the weight and size capacity of the Bin according to the assignment specifications.

    Weight: 40
    Size: 5

**Output:**
```
    Rubbish Collector Solver             
*********************************        
1. Enter bin location
2. Enter rubbish locations
3. Enter disposal locations
4. Read locations from text file
5. Display maze visualization
6. Start maze solver
7. Reset maze locations
8. Quit application
*********************************        
Enter your choice (1-8): 6
Enter the bin's weight capacity: 40
Enter the bin's size capacity: 5 

Fetching Rubbish:
Path: (0, 0) -> (1, 3)
Current Weight: 30 / 40
Current Size: 3 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       DOWN            (0, 0)     (0, 1)     (0, 0) to (0, 1)       
2:       DOWN            (0, 1)     (0, 2)     (0, 1) to (0, 2)       
3:       BOTTOM-RIGHT    (0, 2)     (1, 3)     (0, 2) to (1, 3)       
======================================================================

Fetching Rubbish:
Path: (1, 3) -> (2, 2)
Current Weight: 35 / 40
Current Size: 4 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       TOP-RIGHT       (1, 3)     (2, 2)     (1, 3) to (2, 2)       
======================================================================

Fetching Rubbish:
Path: (2, 2) -> (3, 1)
Current Weight: 40 / 40
Current Size: 5 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       TOP-RIGHT       (2, 2)     (3, 2)     (2, 2) to (3, 2)
2:       UP              (3, 2)     (3, 1)     (3, 2) to (3, 1)
======================================================================

Going to Nearest Disposal:
Path: (3, 1) -> (5, 0)
Current Weight: 0 / 40
Current Size: 0 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       TOP-RIGHT       (3, 1)     (4, 0)     (3, 1) to (4, 0)
2:       TOP-RIGHT       (4, 0)     (5, 0)     (4, 0) to (5, 0)
======================================================================

Fetching Rubbish:
Path: (5, 0) -> (6, 1)
Current Weight: 10 / 40
Current Size: 2 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       BOTTOM-RIGHT    (5, 0)     (6, 0)     (5, 0) to (6, 0)
2:       DOWN            (6, 0)     (6, 1)     (6, 0) to (6, 1)
======================================================================

Fetching Rubbish:
Path: (6, 1) -> (4, 2)
Current Weight: 20 / 40
Current Size: 4 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       BOTTOM-LEFT     (6, 1)     (5, 2)     (6, 1) to (5, 2)
2:       BOTTOM-LEFT     (5, 2)     (4, 2)     (5, 2) to (4, 2)
======================================================================

Fetching Rubbish:
Path: (4, 2) -> (4, 4)
Current Weight: 40 / 40
Current Size: 5 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       DOWN            (4, 2)     (4, 3)     (4, 2) to (4, 3)
2:       DOWN            (4, 3)     (4, 4)     (4, 3) to (4, 4)
======================================================================

Going to Nearest Disposal:
Path: (4, 4) -> (2, 5)
Current Weight: 0 / 40
Current Size: 0 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       BOTTOM-LEFT     (4, 4)     (3, 5)     (4, 4) to (3, 5)
2:       BOTTOM-LEFT     (3, 5)     (2, 5)     (3, 5) to (2, 5)
======================================================================

Fetching Rubbish:
Path: (2, 5) -> (0, 5)
Current Weight: 10 / 40
Current Size: 1 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       TOP-LEFT        (2, 5)     (1, 5)     (2, 5) to (1, 5)
2:       BOTTOM-LEFT     (1, 5)     (0, 5)     (1, 5) to (0, 5)
======================================================================

Fetching Rubbish:
Path: (0, 5) -> (3, 4)
Current Weight: 15 / 40
Current Size: 4 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       TOP-RIGHT       (0, 5)     (1, 5)     (0, 5) to (1, 5)
2:       TOP-RIGHT       (1, 5)     (2, 4)     (1, 5) to (2, 4)
3:       TOP-RIGHT       (2, 4)     (3, 4)     (2, 4) to (3, 4)
======================================================================

Going to Nearest Disposal:
Path: (3, 4) -> (2, 5)
Current Weight: 0 / 40
Current Size: 0 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       BOTTOM-LEFT     (3, 4)     (2, 4)     (3, 4) to (2, 4)
2:       DOWN            (2, 4)     (2, 5)     (2, 4) to (2, 5)
======================================================================

Fetching Rubbish:
Path: (2, 5) -> (6, 4)
Current Weight: 5 / 40
Current Size: 2 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       TOP-RIGHT       (2, 5)     (3, 5)     (2, 5) to (3, 5)
2:       BOTTOM-RIGHT    (3, 5)     (4, 5)     (3, 5) to (4, 5)
3:       TOP-RIGHT       (4, 5)     (5, 5)     (4, 5) to (5, 5)
4:       TOP-RIGHT       (5, 5)     (6, 4)     (5, 5) to (6, 4)
======================================================================

Fetching Rubbish:
Path: (6, 4) -> (7, 3)
Current Weight: 25 / 40
Current Size: 4 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       TOP-RIGHT       (6, 4)     (7, 4)     (6, 4) to (7, 4)
2:       UP              (7, 4)     (7, 3)     (7, 4) to (7, 3)
======================================================================

Going to Nearest Disposal:
Path: (7, 3) -> (8, 5)
Current Weight: 0 / 40
Current Size: 0 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       DOWN            (7, 3)     (7, 4)     (7, 3) to (7, 4)
2:       BOTTOM-RIGHT    (7, 4)     (8, 4)     (7, 4) to (8, 4)
3:       DOWN            (8, 4)     (8, 5)     (8, 4) to (8, 5)
======================================================================

Fetching Rubbish:
Path: (8, 5) -> (8, 1)
Current Weight: 10 / 40
Current Size: 3 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       UP              (8, 5)     (8, 4)     (8, 5) to (8, 4)
2:       UP              (8, 4)     (8, 3)     (8, 4) to (8, 3)
3:       UP              (8, 3)     (8, 2)     (8, 3) to (8, 2)
4:       UP              (8, 2)     (8, 1)     (8, 2) to (8, 1)
======================================================================

Fetching Rubbish:
Path: (8, 1) -> (7, 0)
Current Weight: 40 / 40
Current Size: 4 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       TOP-LEFT        (8, 1)     (7, 1)     (8, 1) to (7, 1)
2:       UP              (7, 1)     (7, 0)     (7, 1) to (7, 0)
======================================================================

Going to Nearest Disposal:
Path: (7, 0) -> (5, 0)
Current Weight: 0 / 40
Current Size: 0 / 5
Direction:
Move       Movement       From        To          Coordinates
======================================================================
1:       BOTTOM-LEFT     (7, 0)     (6, 0)     (7, 0) to (6, 0)
2:       TOP-LEFT        (6, 0)     (5, 0)     (6, 0) to (5, 0)
======================================================================

Final Path:
Path 1: (0, 0) -> (0, 1) -> (0, 2) -> (1, 3)
Path 2: (1, 3) -> (2, 2)
Path 3: (2, 2) -> (3, 2) -> (3, 1)
Path 4: (3, 1) -> (4, 0) -> (5, 0)
Path 5: (5, 0) -> (6, 0) -> (6, 1)
Path 6: (6, 1) -> (5, 2) -> (4, 2)
Path 7: (4, 2) -> (4, 3) -> (4, 4)
Path 8: (4, 4) -> (3, 5) -> (2, 5)
Path 9: (2, 5) -> (1, 5) -> (0, 5)
Path 10: (0, 5) -> (1, 5) -> (2, 4) -> (3, 4)
Path 11: (3, 4) -> (2, 4) -> (2, 5)
Path 12: (2, 5) -> (3, 5) -> (4, 5) -> (5, 5) -> (6, 4)
Path 13: (6, 4) -> (7, 4) -> (7, 3)
Path 14: (7, 3) -> (7, 4) -> (8, 4) -> (8, 5)
Path 15: (8, 5) -> (8, 4) -> (8, 3) -> (8, 2) -> (8, 1)
Path 16: (8, 1) -> (7, 1) -> (7, 0)
Path 17: (7, 0) -> (6, 0) -> (5, 0)

Search Summary:
Total Path Cost: 40
Total Nodes Expanded: 2188
Total Times Disposal Visited: 5
```
