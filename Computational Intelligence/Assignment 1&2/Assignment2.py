import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt
import numpy as np

# Load data
data = pd.read_csv('bronze.csv')

# Convert 'time' to datetime if it's not in datetime format
data['time'] = pd.to_datetime(data['time'])

# Handle missing values and infinite values
data.replace([np.inf, -np.inf], np.nan, inplace=True)
data.dropna(subset=['latitude', 'longitude', 'depth', 'mag'], inplace=True)

# Preprocessing: Selecting relevant features and target variable
X = data[['latitude', 'longitude', 'depth']] 
y = data['mag']

# Make sure there is enough data after cleaning
if len(X) == 0:
    raise ValueError("No data left after cleaning.")

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.8)

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train the MLPRegressor
mlp = MLPRegressor(hidden_layer_sizes=(10), max_iter=500)
mlp.fit(X_train_scaled, y_train)

# Predictions
predictions = mlp.predict(X_test_scaled)

# Evaluation
mse = mean_squared_error(y_test, predictions)
print(f'Mean Squared Error: {mse}')


# Visualisation function (visualization for regression model structures can be limited)
def visualise(mlp, ax=None):
    n_neurons = [mlp.coefs_[0].shape[0]] + [layer.shape[1] for layer in mlp.coefs_]
    y_range = [0, max(n_neurons)]
    loc_neurons = [[[l, (n+1)*(y_range[1]/(layer+1))] for n in range(layer)] for l, layer in enumerate(n_neurons)]
    x_neurons = [x for layer in loc_neurons for x, y in layer]
    y_neurons = [y for layer in loc_neurons for x, y in layer]

    weight_range = [min([weight for layer in mlp.coefs_ for weight in layer.flatten()]), 
                    max([weight for layer in mlp.coefs_ for weight in layer.flatten()])]

    if ax is None:
        fig, ax = plt.subplots()

    ax.cla()
    ax.scatter(x_neurons, y_neurons, s=100, zorder=5)
    for l, (layer_weights, layer_neurons) in enumerate(zip(mlp.coefs_, loc_neurons[:-1])):
        next_layer_neurons = loc_neurons[l + 1]
        for i, (neuron_weights, neuron_loc) in enumerate(zip(layer_weights, layer_neurons)):
            for j, weight in enumerate(neuron_weights):
                line_width = ((weight - weight_range[0]) / (weight_range[1] - weight_range[0]) * 5 + 0.2)
                ax.plot([neuron_loc[0], next_layer_neurons[j][0]], [neuron_loc[1], next_layer_neurons[j][1]], 
                        'grey', linewidth=line_width)
                
                
# Visualise the trained network (note: visualizing regressors is not typical)
fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)
visualise(mlp, ax)

plt.show()