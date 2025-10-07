timer = 40
import math

def convert_timer():
    hr = timer/3600
    min = float(f"0.{str(hr).split(".")[1]}") * 60
    sec = float(f"0.{str(min).split(".")[1]}") * 60
        
    return f"{int(hr)} hr : {int(min)} min : {int(sec)} sec "
    
        
        

print(convert_timer())