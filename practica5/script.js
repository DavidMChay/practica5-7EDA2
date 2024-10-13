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

    add(data) {
        const newNode = new Node(data);

        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            let previous = null;

            while (current && data.localeCompare(current.data, 'es', { sensitivity: 'base' }) > 0) {
                previous = current;
                current = current.next;
            }

            if (!previous) {
                newNode.next = this.head;
                this.head = newNode;
            } else {
                previous.next = newNode;
                newNode.next = current;
            }
        }
    }

    traverse(callback) {
        let current = this.head;
        while (current !== null) {
            callback(current.data);
            current = current.next;
        }
    }

    count() {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            count++;
            current = current.next;
        }
        return count;
    }
}

class WordClassifier {
    constructor() {
        this.lists = {};
        this.allWords = new LinkedList();
    }

    addWord(word) {
        const firstLetter = word[0].toUpperCase();
        if (!this.lists[firstLetter]) {
            this.lists[firstLetter] = new LinkedList();
        }
        this.lists[firstLetter].add(word);
        this.allWords.add(word);
    }

    getClassifiedWords() {
        return this.lists;
    }

    getAllWords() {
        return this.allWords;
    }
}

const classifier = new WordClassifier();

$(document).ready(function() {
    $('#addWordBtn').click(function() {
        const word = $('#wordInput').val().trim();
        if (word) {
            classifier.addWord(word);
            $('#wordInput').val('');
            renderLists();
        }
    });

    function renderLists() {
        const lists = classifier.getClassifiedWords();
        const allWordsList = classifier.getAllWords();
        $('#wordListsContainer').empty();

        let allWordsHtml = `<div class="word-list"><h4>Todas las palabras</h4><ul>`;
        allWordsList.traverse(function(word) {
            allWordsHtml += `<li>${word}</li>`;
        });
        allWordsHtml += '</ul></div>';
        $('#wordListsContainer').append(allWordsHtml);

        Object.keys(lists).sort().forEach(letter => {
            const wordList = lists[letter];
            let listHtml = `<div class="word-list"><h4>Letra ${letter}</h4><ul>`;

            wordList.traverse(function(word) {
                listHtml += `<li>${word}</li>`;
            });

            listHtml += '</ul></div>';
            $('#wordListsContainer').append(listHtml);
        });
    }
});
