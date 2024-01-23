import numpy as np
from skfuzzy import control as ctrl
from skfuzzy import membership as mf
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Input Variables
inside_temperature = ctrl.Antecedent(np.arange(15, 40, 0.1), 'inside_temperature')
size_of_room = ctrl.Antecedent(np.arange(5, 200, 1), 'size_of_room')

# Output Variables
AC_temperature = ctrl.Consequent(np.arange(16, 31, 0.1), 'AC_temperature')
AC_fan_speed = ctrl.Consequent(np.arange(0, 100, 1), 'AC_fan_speed')

# Membership functions for Inside Temperature
inside_temperature['cold'] = mf.trimf(inside_temperature.universe, [15, 18, 23])
inside_temperature['moderate'] = mf.trimf(inside_temperature.universe, [20, 25, 30])
inside_temperature['hot'] = mf.trimf(inside_temperature.universe, [28, 32, 40])

# Membership functions for Size of Room
size_of_room['small'] = mf.trimf(size_of_room.universe, [5, 10, 30])
size_of_room['medium'] = mf.trimf(size_of_room.universe, [20, 50, 100])
size_of_room['large'] = mf.trimf(size_of_room.universe, [80, 120, 200])

# Membership functions for AC Temperature
AC_temperature['low'] = mf.trimf(AC_temperature.universe, [16, 18, 21])
AC_temperature['medium'] = mf.trimf(AC_temperature.universe, [20, 24, 28])
AC_temperature['high'] = mf.trimf(AC_temperature.universe, [26, 29, 31])

# Membership functions for AC Fan Speed
AC_fan_speed['low'] = mf.trimf(AC_fan_speed.universe, [0, 20, 45])
AC_fan_speed['medium'] = mf.trimf(AC_fan_speed.universe, [30, 55, 75])
AC_fan_speed['high'] = mf.trimf(AC_fan_speed.universe, [65, 85, 100])

# Rule definition
rules = [
    ctrl.Rule(inside_temperature['cold'] & size_of_room['small'], [AC_temperature['high'], AC_fan_speed['low']]),
    ctrl.Rule(inside_temperature['moderate'] & size_of_room['small'], [AC_temperature['medium'], AC_fan_speed['low']]),
    ctrl.Rule(inside_temperature['hot'] & size_of_room['small'], [AC_temperature['low'], AC_fan_speed['low']]),
    ctrl.Rule(inside_temperature['cold'] & size_of_room['medium'], [AC_temperature['high'], AC_fan_speed['medium']]),
    ctrl.Rule(inside_temperature['moderate'] & size_of_room['medium'], [AC_temperature['medium'], AC_fan_speed['medium']]),
    ctrl.Rule(inside_temperature['hot'] & size_of_room['medium'], [AC_temperature['low'], AC_fan_speed['medium']]),
    ctrl.Rule(inside_temperature['cold'] & size_of_room['large'], [AC_temperature['high'], AC_fan_speed['high']]),
    ctrl.Rule(inside_temperature['moderate'] & size_of_room['large'], [AC_temperature['medium'], AC_fan_speed['high']]),
    ctrl.Rule(inside_temperature['hot'] & size_of_room['large'], [AC_temperature['low'], AC_fan_speed['high']])
]

# Fuzzy inference system and simulation
AC_ctrl = ctrl.ControlSystem(rules=rules)
AC = ctrl.ControlSystemSimulation(control_system=AC_ctrl)

# Meshgrid for inputs
x, y = np.meshgrid(np.linspace(inside_temperature.universe.min(), inside_temperature.universe.max(), 100),
                   np.linspace(size_of_room.universe.min(), size_of_room.universe.max(), 100))
z_AC_temp = np.zeros_like(x, dtype=float)
z_AC_fan_speed = np.zeros_like(x, dtype=float)

# Calculate outputs for each grid point
for i, r in enumerate(x):
    for j, c in enumerate(r):
        AC.input['inside_temperature'] = x[i, j]
        AC.input['size_of_room'] = y[i, j]
        try:
            AC.compute()
            z_AC_temp[i, j] = AC.output['AC_temperature']
            z_AC_fan_speed[i, j] = AC.output['AC_fan_speed']
        except:
            z_AC_temp[i, j] = float('inf')
            z_AC_fan_speed[i, j] = float('inf')

# Plotting function
def plot3d(x, y, z, label):
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.plot_surface(x, y, z, rstride=1, cstride=1, cmap='viridis', linewidth=0.4, antialiased=True)
    ax.contourf(x, y, z, zdir='z', offset=z.min()-5, cmap='viridis', alpha=0.5)
    ax.contourf(x, y, z, zdir='x', offset=x.max()*1.1, cmap='viridis', alpha=0.5)
    ax.contourf(x, y, z, zdir='y', offset=y.max()*1.1, cmap='viridis', alpha=0.5)
    ax.set_xlabel('Inside Temperature')
    ax.set_ylabel('Size of Room')
    ax.set_zlabel(label)
    ax.view_init(30, 200)
    plt.show()

plot3d(x, y, z_AC_temp, 'AC Temperature')
plot3d(x, y, z_AC_fan_speed, 'AC Fan Speed')
