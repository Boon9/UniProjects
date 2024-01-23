import cv2
import numpy as np


#Processing for first video "street.mp4"#

#Insert every video into a variable
vid = cv2.VideoCapture("street.mp4")
vid2 = cv2.VideoCapture("exercise.mp4")
vid3 = cv2.VideoCapture("office.mp4")
overlay_vid = cv2.VideoCapture("talking.mp4")
#video output destination
out = cv2.VideoWriter('processed_video.avi', cv2.VideoWriter_fourcc(*'MJPG'), 30.0, (1280,720))
#height and width of overlay video
height = 175
width = 275
#a and b to determine how far the overlay video should be at from the main video's border
a = 100
b = 100

#Load pre-trained Haar cascade model
face_cascade = cv2.CascadeClassifier("face_detector.xml")
#Read both watermarks
watermark1 = cv2.imread("watermark1.png")
watermark2 = cv2.imread("watermark2.png")

#Obtain total frame count for main video and overlay video
total_no_frames = int(vid.get(cv2.CAP_PROP_FRAME_COUNT))
total_no_frames2 = int(overlay_vid.get(cv2.CAP_PROP_FRAME_COUNT))
#Counter for how many times watermark have changed
i = 1
#amount of frames until the type of watermark changes
watermark_duration = 150

#To loop through all the frames
for frame_count in range(0, total_no_frames):
    #Read a single frame from the video.
    success, frame = vid.read()
    #simple formula to determine if frame_count is incrementing 
    #and measure how many percent of frame was used relative to total number of frames
    print(round(((frame_count/total_no_frames)*100),1))
    
    #Add brightness
    frame = cv2.add(frame,10)
    #Perform face detection.
    faces = face_cascade.detectMultiScale(frame, 1.3, 5)  
    
    #loop through every detected face
    for (x, y, w, h) in faces:
        #Load pre-trained Haar cascade model
        frame[y:y + h, x:x + w] = cv2.GaussianBlur(frame[y:y + h, x:x + w], (23, 23), 30)        
        
    #Determine number of watermarks to be displayed
    watermark_count= int(total_no_frames/watermark_duration)
    

    #First if condition to set a limit on the amount of watermark displayed.
    #Second if condition to make sure it has been 150 frames to change to a new watermark.
    if (i <= watermark_count and frame_count % watermark_duration == 0):
        i += 1   
    
    #if condition to determine which watermark should be added to the current frame
    if( i % 2 == 0):
        frame = cv2.add(frame,watermark1)
    elif( i % 2 == 1):
        frame = cv2.add(frame,watermark2) 
        
    #if condition to add overlay video into main video until overlay video ends, while ensuring main video continue playing
    if frame_count in range(0, total_no_frames2):
        #Read a single frame from the overlay video
        success1,frame1 = overlay_vid.read()
        
        #create border around overlay video
        frame1 = cv2.copyMakeBorder(frame1, 20, 20, 20, 20, cv2.BORDER_CONSTANT)
        #resize the overlay video
        frame1 = cv2.resize(frame1,(width,height))
        #insert overlay video into main video
        frame[b:b+height, a:a+width] = frame1
    
    #show progress frame by frame
    cv2.imshow("img",frame)
    #condition to end frame display
    if cv2.waitKey(1) &  0xFF == ord("q"):
        break

vid.release()
cv2.destroyAllWindows()



#Processing for second video, "exercise.mp4"#

#resize width and height to resize the watermark that is 1080x720 to 1920x1080, 
#since the main video has became 1920x1080
resize_width = 1920
resize_height = 1080
#height and width of overlay video
width = 535
height = 300
#a and b to determine how far the overlay video should be at from the main video's border
a = 150
b = 150
#resize the watermark to have bigger width and height to be able to combine with the video frames
resized_watermark1 = cv2.resize(watermark1, (resize_width, resize_height))
resized_watermark2 = cv2.resize(watermark2, (resize_width, resize_height))

#obtain total frame count for main video only since overlay video frame count is known
total_no_frames = int(vid2.get(cv2.CAP_PROP_FRAME_COUNT))

#Count how many times watermark have changed
i = 1

#To loop through all the frames
for frame_count in range(0, total_no_frames):
    #Read a single frame from the video
    success, frame = vid2.read()
    #simple formula to determine if frame_count is incrementing 
    #and measure how many percent of frame was used relative to total number of frames
    print(round(((frame_count/total_no_frames)*100),1))
    
    #Add brightness
    frame = cv2.add(frame,10)
    #Perform face detection.
    faces = face_cascade.detectMultiScale(frame, 1.3, 5)  
    
    
    #loop through every detected face
    for (x, y, w, h) in faces:
        #Load pre-trained Haar cascade model
        frame[y:y + h, x:x + w] = cv2.GaussianBlur(frame[y:y + h, x:x + w], (23, 23), 30)      
        
    
    #Determine number of watermarks to be displayed
    watermark_count= int(total_no_frames/watermark_duration)
    

    #First if condition to set a limit on the amount of watermark displayed.
    #Second if condition to make sure it has been 150 frames to change to a new watermark.
    if (i <= watermark_count and frame_count % watermark_duration == 0):
        i += 1   
    
    #if condition to determine which watermark should be added to the current frame
    if( i % 2 == 0):
        frame = cv2.add(frame,resized_watermark1)
    elif( i % 2 == 1):
        frame = cv2.add(frame,resized_watermark2) 
        
    #if condition to add overlay video into main video until overlay video ends, while ensuring main video continue playing
    if frame_count in range(0, total_no_frames2):
        #Read a single frame from the overlay video
        success1,frame1 = overlay_vid.read()
        
        #create border around overlay video
        frame1 = cv2.copyMakeBorder(frame1, 20, 20, 20, 20, cv2.BORDER_CONSTANT)
        #resize the overlay video
        frame1 = cv2.resize(frame1,(width,height))
        #insert overlay video into main video
        frame[b:b+height, a:a+width] = frame1
    
    
    cv2.imshow("img",frame)
    if cv2.waitKey(1) &  0xFF == ord("q"):
        break

vid2.release()
cv2.destroyAllWindows()


#Processing for third video Office.mp4#
#Obtain total frame count for main video only since overlay video frame count is known
total_no_frames = int(vid3.get(cv2.CAP_PROP_FRAME_COUNT))
#Count how many times watermark have changed
i = 1

#To loop through all the frames
for frame_count in range(0, total_no_frames):
    #Read a single frame from the video
    success, frame = vid3.read()
    #simple formula to determine if frame_count is incrementing 
    #and measure how many percent of frame was used relative to total number of frames
    print(round(((frame_count/total_no_frames)*100),1))
    
    #Add brightness
    frame = cv2.add(frame,10)
    #Perform face detection.
    faces = face_cascade.detectMultiScale(frame, 1.3, 5)  
    
    #loop through every detected face
    for (x, y, w, h) in faces:
        #Load pre-trained Haar cascade model
        frame[y:y + h, x:x + w] = cv2.GaussianBlur(frame[y:y + h, x:x + w], (23, 23), 30)       
        
    #Determine number of watermarks to be displayed
    watermark_count= int(total_no_frames/watermark_duration)
    

    #First if condition to set a limit on the amount of watermark displayed.
    #Second if condition to make sure it has been 150 frames to change to a new watermark.
    if (i <= watermark_count and frame_count % watermark_duration == 0):
        i += 1   
    
    #if condition to determine which watermark should be added to the current frame
    if( i % 2 == 0):
        frame = cv2.add(frame,resized_watermark1)
    elif( i % 2 == 1):
        frame = cv2.add(frame,resized_watermark2) 
        
    #if condition to add overlay video into main video until overlay video ends, 
    #while ensuring main video continue playing
    if frame_count in range(0, total_no_frames2):
        #Read a single frame from the overlay video
        success1,frame1 = overlay_vid.read()
        
        #create border around overlay video
        frame1 = cv2.copyMakeBorder(frame1, 20, 20, 20, 20, cv2.BORDER_CONSTANT)
        #resize the overlay video
        frame1 = cv2.resize(frame1,(width,height))
        #insert overlay video into main video
        frame[b:b+height, a:a+width] = frame1
    
    
    #show progress frame by frame
    cv2.imshow("img",frame)
    #condition to end frame display
    if cv2.waitKey(1) &  0xFF == ord("q"):
        break

vid3.release()
cv2.destroyAllWindows()
