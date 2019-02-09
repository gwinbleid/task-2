const solution = function(graph, start, finish)  {
    // обьект для отслеживания минимальной 
    // стоимости каждого узла (на конечную сначала Infinity)
    const trackedCosts = Object.assign({finish: Infinity}, graph[start]);

    // Обьект, в котором указываем 
    // родителей пройденного узла
    const trackedParents = {finish: null};

    // на старте всем дочерним узлам start'а указываем
    // родителя - старт
    Object.keys(graph[start]).forEach(item => trackedParents[item] = 'start');

    // Обработанные узлы
    const processedNodes = [];

    // начинаем рекурсивно находить пути
    let node = findLowestCostNode(trackedCosts, processedNodes);

    while (node) {
        // указываем , сколько нам стоило,
        // чтобы до этого узла добраться
        let costToReachNode = trackedCosts[node];

        // указывем дочерние узлы ноды
        let childrenOfNode = graph[node];

        // проверяем вес пути от родителя до детей
        Object.keys(childrenOfNode).forEach(item => {
            let newCost = costToReachNode + childrenOfNode[item];
            if (!trackedCosts[item] || trackedCosts[item] > newCost) {
                trackedCosts[item] = newCost;
                trackedParents[item] = node;
            }
        });
        processedNodes.push(node);

        // аовторяем цикл, пока не дойдем до конечной точки
        // у которой родитель - null
        node = findLowestCostNode(trackedCosts, processedNodes);
    }

    let answerPath = [].concat(finish);
    let parent = trackedParents[finish];
    while (parent) {
        answerPath = [...answerPath, parent];
        parent = trackedParents[parent];
    }
    answerPath.reverse();
    return { distance: trackedCosts[finish], path: answerPath};
};

// ищем в функции найкратчайший путь от родитя к дочернему узлу
function findLowestCostNode(trackedCosts, processedNodes) {
    return Object.keys(trackedCosts).reduce((lowest, node) => {
        if (lowest === null || trackedCosts[node] < trackedCosts[lowest]) {
            if (!processedNodes.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
}