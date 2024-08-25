class HuffmanNode {
    constructor(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

function buildHuffmanTree(text) {
    const frequencyMap = {};
    for (let char of text) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }

    const priorityQueue = Object.keys(frequencyMap).map(
        char => new HuffmanNode(char, frequencyMap[char])
    ).sort((a, b) => a.freq - b.freq);

    while (priorityQueue.length > 1) {
        const left = priorityQueue.shift();
        const right = priorityQueue.shift();
        const newNode = new HuffmanNode(null, left.freq + right.freq);
        newNode.left = left;
        newNode.right = right;
        priorityQueue.push(newNode);
        priorityQueue.sort((a, b) => a.freq - b.freq);
    }

    return priorityQueue[0];
}

function generateHuffmanCodes(root, currentCode, codes) {
    if (!root) return;
    if (root.char !== null) {
        codes[root.char] = currentCode;
    }
    generateHuffmanCodes(root.left, currentCode + "0", codes);
    generateHuffmanCodes(root.right, currentCode + "1", codes);
}

function compressText() {
    const inputText = document.getElementById('inputText').value;
    if (!inputText) return;

    const huffmanTree = buildHuffmanTree(inputText);
    const huffmanCodes = {};
    generateHuffmanCodes(huffmanTree, "", huffmanCodes);

    let compressedText = "";
    for (let char of inputText) {
        compressedText += huffmanCodes[char];
    }

    document.getElementById('compressedText').value = compressedText;
    document.getElementById('decompressedText').value = "";
    window.huffmanTree = huffmanTree; // Save tree for decompression
}

function decompressText() {
    const compressedText = document.getElementById('compressedText').value;
    if (!compressedText || !window.huffmanTree) return;

    let decompressedText = "";
    let currentNode = window.huffmanTree;

    for (let bit of compressedText) {
        currentNode = bit === "0" ? currentNode.left : currentNode.right;
        if (currentNode.char !== null) {
            decompressedText += currentNode.char;
            currentNode = window.huffmanTree;
        }
    }

    document.getElementById('decompressedText').value = decompressedText;
}
