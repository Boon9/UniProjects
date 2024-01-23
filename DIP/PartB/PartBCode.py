import numpy as np
import cv2
from matplotlib import pyplot as pt

# read specified paper
file_import = "001.png"
paper = cv2.imread(file_import, 0)

paper_path = file_import
paragraph_num = 1

# changes to the image are made directly to the variable 'paper'
# variable 'paper_copy()' is used for other computations
# this is to avoid loss in image quality in operations like thresh-holding
paper_copy = paper.copy()
paper_copy[paper_copy < 200] = 1
paper_copy[paper_copy > 200] = 0

## check for tables
## tables have a long horizontal line more than 30px
## find all cols and rows of image which contains black pixels
## for rows, it will contain the y axis coord
## for cols, it will contain the x axis coord
[rows_with_black, cols_with_black] = np.where(paper_copy == 1)
## drop all repeated coords
[elems_of_row, counts] = np.unique(rows_with_black, return_counts=True)

## algo from https:##stackoverflow.com/a/48106843
## if there is multiple set of straight lines in a row of the images, get starting and ending x axis coordinates for all the lines in a row
def getStraightLines(nums):
    nums = sorted(set(nums))
    gaps = [[s, e] for s, e in zip(nums, nums[1:]) if s + 1 < e]
    edges = iter(nums[:1] + sum(gaps, []) + nums[-1:])
    return list(zip(edges, edges))

## array to store coordinates of every horizontal straight lines
straight_lines_coords = []

## for each rows which contains staight black lines, we check how many different black lines are there in this row
## this is to determine if there are one or more tables which might exist in the same y axis coordinates range
for row in elems_of_row:
    straight_lines = getStraightLines(
        np.where(
            paper_copy[
                row,
            ]
            == 1
        )[0]
    )
    ## for every straight black line we found in a row of the image, we push its coordinates to an array
    for line in straight_lines:
        if(line[0] + 30 < line[1]):
            straight_lines_coords += [[line[0], line[1], row]]

# for each staight lines with coordinates, we cover around the straight line with white
for line in straight_lines_coords:
    paper[line[2] - 30 : line[2] + 30, line[0] - 5 : line[1] + 6] = 255
    paper_copy[line[2] - 30 : line[2] + 30, line[0] - 5 : line[1] + 6] = 0

# ==========================================================================================#
# ==https:##stackoverflow.com/questions/68399140/python-cv2-find-contours, from solution==#

# Set kernel (structuring element) size:
kernelSize = (9, 9)

# Set operation iterations:
opIterations = 5

# Get the structuring element:
morphKernel = cv2.getStructuringElement(cv2.MORPH_RECT, kernelSize)

# Perform Dilate:
dilatedImage = cv2.morphologyEx(
    paper_copy,
    cv2.MORPH_DILATE,
    morphKernel,
    None,
    None,
    opIterations,
    cv2.BORDER_REFLECT101,
)

# Find the contours on the binary image:
contours, hierarchy = cv2.findContours(
    dilatedImage, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
)

# Look for the outer bounding boxes (no children):
for _, c in enumerate(contours):

    # file or image name display automation
    file_name = paper_path + "_paragraph_" + str(paragraph_num) + ".png"

    # Get the contours bounding rectangle:
    boundRect = cv2.boundingRect(c)

    # Get the dimensions of the bounding rectangle:
    rectX = boundRect[0]
    rectY = boundRect[1]
    rectWidth = boundRect[2]
    rectHeight = boundRect[3]

    ROI = paper[rectY : rectY + rectHeight, rectX : rectX + rectWidth]
    cv2.imwrite(file_name, ROI)
    cv2.imshow(file_name, ROI)

    # Set bounding rectangle around paragraphs:
    color = 0
    cv2.rectangle(
        paper,
        (int(rectX), int(rectY)),
        (int(rectX + rectWidth), int(rectY + rectHeight)),
        color,
        5,
    )

    paragraph_num += 1

# ==================================================================================#

# can remove section below if you want to maintain the aspect ratio when viewing the image
#######
cv2.namedWindow("finalImg", cv2.WINDOW_NORMAL)
#######
cv2.imshow("finalImg", paper)
cv2.waitKey()
cv2.destroyAllWindows()
