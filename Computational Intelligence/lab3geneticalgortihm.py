import random
import numpy
import math


def value2gray(value):
    # Convert decimal value to Gray code
    gray = value ^ (value >> 1)
    return bin(gray)[2:]

def gray2value(gray):
    # Convert Gray code (as a string) to decimal value
    gray = int(gray, 2)
    value = gray
    while gray > 0:
        gray >>= 1
        value ^= gray
    return value





def generatePopulation(pop_size, chromosome_min, chromosome_max):
    population = []

    for _ in range(pop_size):
        chromosome = float(random.randint(chromosome_min, chromosome_max))
        population.append(chromosome)

    return population




def calculateFitness(value):
    # Define your fitness calculation based on the value
    # For example, you can maximize the number of squares and their area
    fitness = (value / (value * value)) if value > 0 else 0
    return fitness


def selectParents(chromosomes, pop_size):
    parent_pairs = []
    total_fitness = sum([calculateFitness(chromosome) for chromosome in chromosomes])

    while len(parent_pairs) < pop_size // 2:
        # Select two parents based on roulette wheel selection
        parent1 = random.choices(chromosomes, [calculateFitness(chromosome) / total_fitness for chromosome in chromosomes])[0]
        parent2 = random.choices(chromosomes, [calculateFitness(chromosome) / total_fitness for chromosome in chromosomes])[0]
        parent_pairs.append([parent1, parent2])

    return parent_pairs



def crossover(parents):
    # Perform one-point crossover to produce a pair of offspring
    point = random.randint(1, len(bin(parents[0])) - 2)
    mask = (1 << point) - 1
    offspring1 = (parents[0] & mask) | (parents[1] & ~mask)
    offspring2 = (parents[1] & mask) | (parents[0] & ~mask)
    return [offspring1, offspring2]

def mutate(chromosome, p_mutation):
    # Mutate each gene of a chromosome with the given mutation probability
    if random.random() < p_mutation:
        # Flip a random bit in the chromosome
        position = random.randint(0, len(bin(chromosome)) - 3)
        chromosome ^= (1 << position)
    return chromosome



def findOverallDistance(chromosomes):
    # Calculate the overall distance among fitnesses of all chromosomes
    if not chromosomes:
        return 0  # Handle the case of an empty population

    # Calculate the mean fitness of the population
    mean_fitness = sum([calculateFitness(chromosome) for chromosome in chromosomes]) / len(chromosomes)

    # Calculate the squared differences between each chromosome's fitness and the mean fitness
    squared_differences = [(calculateFitness(chromosome) - mean_fitness) ** 2 for chromosome in chromosomes]

    # Calculate the overall distance as the square root of the average squared difference
    overall_distance = (sum(squared_differences) / len(chromosomes)) ** 0.5

    return overall_distance


if __name__ == "__main__":
  # main function
  ## parameter definition
  pop_size = 10
  pop_min = 1 #1cm
  pop_max = 10 #10cm
  curr_iter = 0
  max_iter = 100
  min_overalldistance = 0.5
  p_mutation = 0.05
  ## initialise population
  population = []
  population.append(generatePopulation(pop_size, pop_min, pop_max))
  while (curr_iter < max_iter and findOverallDistance(population[-1]) > min_overalldistance):
    curr_iter += 1
    ## select parent pairs
    parents = selectParents(population[-1], len(population[-1]))
    ## perform crossover
    offsprings = []
    for p in parents:
      new_offsprings = crossover(p)
      for o in new_offsprings:
        offsprings.append(o)
    ## perform mutation
    mutated = [mutate(offspring, p_mutation) for offspring in offsprings]
    ## update current population
    population.append(mutated)
