import osmnx as ox
import pickle as pkl
from pathlib import Path
import os
import requests

import math
import time
import requests
import pandas as pd
import networkx as nx

from osmnx.core import save_to_cache
from osmnx.core import get_from_cache
from osmnx.utils import log

import sys
import osmnx as ox
import networkx as nx
import numpy as np
from heapq import *
from itertools import count

from heapq import *


def get_elevation_gain(G, start, end):
    return G.nodes[start]['elevation'] - G.nodes[end]['elevation']


def get_length(G, start, end):
    return G.edges[start, end, 0]['length']

def get_closest_node_from_gps(G,x,y):

def generate_path(revPath, start, end):
    path = []
    n = end
    path.append(n)
    while n != start:
        n = revPath[n]
        path.append(n)
    return path[::-1]


def get_path_elevation(G, path):
    total_elevation = 0

    for i in range(len(path) - 1):
        curr_elevation = get_elevation_gain(G, path[i], path[i + 1])
        if curr_elevation > 0:
            total_elevation += curr_elevation

    return total_elevation


def get_path_length(G, path):
    total_length = 0

    for i in range(len(path) - 1):
        total_length += get_length(G, path[i], path[i + 1])

    return total_length


def get_shortest_path(G, start, end, option):
    queue = []
    heappush(queue, (0, start))
    revPath = []
    cost = []
    revPath[start] = None
    cost[start] = 0

    while len(queue) > 0:
        (val, current) = heappop(queue)
        if current == end:
            break
        for cur, nxt, data in G.edges(current, data=True):
            new_cost = cost[current]
            if option == 'length':
                curCost = get_length(G, cur, nxt)
            elif option == 'elevation':
                curCost = get_path_elevation(G, cur, nxt)
            if curCost > 0:
                new_cost += curCost
            if new_cost < cost[nxt] or nxt not in cost:
                cost[nxt] = new_cost
                heappush(queue, (new_cost, nxt))
                revPath[nxt] = current

    return generate_path(revPath, start, end)
