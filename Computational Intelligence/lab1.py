def numberofamoeba(month) :
    if month == 0 :
        return 1 
    elif month == 1 :
        return 1
    else :
        x = 1  #Current Amoeba count
        y = 1  #Amoeba count ( new )
        current = 0

        for i in range(2,month+1):
            current = x + y 
            x,y = y,current

        return current



def  numberofamoebaseq(month) :
    if month == 0 :
        return[1] 
    elif month == 1 :
        return[1,1]
    else :
        sequence = [1,1]
        for i in range(2,month+1):
            current = sequence[i-1] + sequence[i-2]
            sequence.append(current)
        return sequence



month_number = 4
amoeba_count = numberofamoeba(month_number)
print(f"Month {month_number}: {amoeba_count} amoebas")

# amoeba_count = numberofamoebaseq(month_number)
# print(f"Month {month_number}: {amoeba_count} amoebas")