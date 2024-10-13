class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addAtStart(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    traverse(callback) {
        let current = this.head;
        while (current !== null) {
            callback(current.data);
            current = current.next;
        }
    }

    getInvertedWord() {
        let result = '';
        this.traverse(function(char) {
            result += char;
        });
        return result;
    }
}

$(document).ready(function() {
    $('#invertWordBtn').click(function() {
        const word = $('#wordInput').val().trim();
        if (word) {
            const linkedList = new LinkedList();
            
            for (let i = 0; i < word.length; i++) {
                linkedList.addAtStart(word[i]);
            }

            const invertedWord = linkedList.getInvertedWord();
            $('#result').text(invertedWord);
        }
    });
});
