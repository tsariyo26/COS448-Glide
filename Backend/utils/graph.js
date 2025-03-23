// utils/graph.js

const graph = {
  A: { B: 5, C: 10 },
  B: { A: 5, C: 3, D: 9 },
  C: { A: 10, B: 3, D: 1 },
  D: { B: 9, C: 1 }
};

// Dijkstra-style algorithm
const getShortestPath = (start, end) => {
  const distances = {};
  const visited = {};
  const prev = {};

  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    visited[node] = false;
  });
  distances[start] = 0;

  for (let i = 0; i < Object.keys(graph).length; i++) {
    let closest = null;
    Object.keys(graph).forEach(node => {
      if (!visited[node] && (closest === null || distances[node] < distances[closest])) {
        closest = node;
      }
    });

    visited[closest] = true;
    const neighbors = graph[closest];
    for (let neighbor in neighbors) {
      const newDist = distances[closest] + neighbors[neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        prev[neighbor] = closest;
      }
    }
  }

  const path = [];
  let curr = end;
  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return { path, distance: distances[end] };
};

module.exports = { graph, getShortestPath };
