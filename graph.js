class Node {
    constructor(value, adjacent = new Set()) {
        this.value = value;
        this.adjacent = adjacent;
    }
}

class Graph {
    constructor() {
        this.nodes = new Set();
    }

    // This function accepts a Node instance and adds it to the nodes property on the graph
    addVertex(vertex) {
        this.nodes.add(vertex);
    }

    // This function accepts an array of Node instances and adds them to the nodes property on the graph
    addVertices(vertexArray) {
        vertexArray.forEach((vertex) => this.nodes.add(vertex));
    }

    // This function accepts two vertices and updates their adjacent values to include the other vertex
    addEdge(v1, v2) {
        v1.adjacent.add(v2);
        v2.adjacent.add(v1);
    }

    // This function accepts two vertices and updates their adjacent values to remove the other vertex
    removeEdge(v1, v2) {
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1);
    }

    // This function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
    removeVertex(vertex) {
        for (let adj of vertex.adjacent) {
            adj.adjacent.delete(vertex);
        }
        this.nodes.delete(vertex);
    }

    // This function returns an array of Node values using DFS
    depthFirstSearch(start) {
        const stack = [start];
        const result = [];
        const visited = new Set();
        visited.add(start);

        while (stack.length) {
            let current = stack.pop();
            result.push(current.value);

            current.adjacent.forEach((neighbor) => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    stack.push(neighbor);
                }
            });
        }

        return result;
    }

    // This function returns an array of Node values using BFS
    breadthFirstSearch(start) {
        const queue = [start];
        const result = [];
        const visited = new Set();
        visited.add(start);

        while (queue.length) {
            let current = queue.shift();
            result.push(current.value);

            current.adjacent.forEach((neighbor) => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            });
        }

        return result;
    }
}

module.exports = { Graph, Node };
