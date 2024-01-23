import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neural_network import MLPClassifier
import vis

# Load iris data and use two features
iris = datasets.load_iris()
X = [[d[1], d[2]] for d in iris.data]
Y = iris.target

# Data preprocessing: Split and scale data
X_train, X_test, y_train, y_test = train_test_split(X, Y, train_size=0.8)
scaler = StandardScaler()
scaler.fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

# Construct and train the ANN model
mlp = MLPClassifier(hidden_layer_sizes=(2), max_iter=1000)
mlp.fit(X_train, y_train)

# Visualise the classification of the fitted model
fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)
vis.vis2d(ax, mlp, X_train, y_train, X_test, y_test)

# Explore different neural network configurations
activation_functions = ['identity', 'logistic', 'tanh', 'relu']
for actfcn in activation_functions:
    mlp = MLPClassifier(hidden_layer_sizes=(3), activation=actfcn, max_iter=1000)
    mlp.fit(X_train, y_train)
    ax.set_title(actfcn)
    vis.vis2d(ax, mlp, X_train, y_train, X_test, y_test)

# Use all input features
X_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, train_size=0.8)
scaler.fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

mlp = MLPClassifier(hidden_layer_sizes=(3), max_iter=10000)
mlp.fit(X_train, y_train)

# Visualise decision area with more input features
fig = plt.figure()
axes = vis.vis3d(fig, mlp, X_train, y_train, X_test, y_test)
for i, a in enumerate(axes):
    a.set_title(iris.target_names[i])
    a.set_xticklabels([])
    a.get_yaxis().set_visible(False)
axes[-1].set_xticklabels(iris.feature_names)
