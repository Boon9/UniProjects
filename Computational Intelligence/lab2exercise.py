import numpy as np
from skfuzzy import control as ctrl
from skfuzzy import membership as mf

# Define the antecedents and consequent
service = ctrl.Antecedent(np.arange(0, 10, 1), 'service')
food = ctrl.Antecedent(np.arange(0, 10, 1), 'food')
tips = ctrl.Consequent(np.arange(0, 30, 1), 'tips')

# Membership functions for service
service['poor'] = mf.trimf(service.universe, [0, 0, 3])
service['average'] = mf.trimf(service.universe, [2, 5, 8])
service['good'] = mf.trimf(service.universe, [6, 10, 10])

# Membership functions for food
food['poor'] = mf.trimf(food.universe, [0, 0, 5])
food['average'] = mf.trimf(food.universe, [0, 5, 10])
food['good'] = mf.trimf(food.universe, [5, 10, 10])

# Membership functions for tips
tips['low'] = mf.trimf(tips.universe, [0, 0, 15])
tips['medium'] = mf.trimf(tips.universe, [0, 15, 30])
tips['high'] = mf.trimf(tips.universe, [15, 30, 30])

# Viewing the membership functions (optional)
# service.view()

# Rule definition
rule1 = ctrl.Rule(service['poor'] & food['poor'], tips['low'])
rule2 = ctrl.Rule(service['poor'] & food['average'], tips['low'])
rule3 = ctrl.Rule(service['poor'] & food['good'], tips['medium'])
rule4 = ctrl.Rule(service['average'] & food['poor'], tips['low'])
rule5 = ctrl.Rule(service['average'] & food['average'], tips['medium'])
rule6 = ctrl.Rule(service['average'] & food['good'], tips['high'])
rule7 = ctrl.Rule(service['good'] & food['poor'], tips['medium'])
rule8 = ctrl.Rule(service['good'] & food['average'], tips['high'])
rule9 = ctrl.Rule(service['good'] & food['good'], tips['high'])

# Rule aggregation
rules = [rule1, rule2, rule3, rule4, rule5, rule6, rule7, rule8, rule9]

# Create the fuzzy inference system and simulate
tipping_ctrl =ctrl.ControlSystem(rules=rules)
tipping = ctrl.ControlSystemSimulation(control_system=tipping_ctrl)

x, y = np.meshgrid(np.linspace(service.universe.min(), service.universe.max(), 10),
                   np.linspace(food.universe.min(), food.universe.max(), 10))
z_tips = np.zeros_like(x, dtype=float)


for i,r in enumerate(x):
  for j,c in enumerate(r):
    tipping.input['service'] = x[i,j]
    tipping.input['food'] = y[i,j]
    try:
      tipping.compute()
      z_tips[i,j] = tipping.output['tips']
    except:
      z_tips[i,j] = float('inf')

import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
    
def plot3d(x, y, z):
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')

    ax.plot_surface(x, y, z, rstride=1, cstride=1, cmap='viridis', linewidth=0.4, antialiased=True)

    ax.contourf(x, y, z, zdir='z', offset=0.0, cmap='viridis', alpha=0.5)
    ax.contourf(x, y, z, zdir='x', offset=x.max()*1.5, cmap='viridis', alpha=0.5)
    ax.contourf(x, y, z, zdir='y', offset=y.max()*1.5, cmap='viridis', alpha=0.5)

    ax.view_init(30, 200)

plot3d(x, y, z_tips)
plt.show()