class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    isPalindrome() {
        let reversed = new LinkedList();
        let current = this.head;
        while (current !== null) {
            let newNode = new Node(current.data);
            newNode.next = reversed.head;
            reversed.head = newNode;
            current = current.next;
        }

        let originalCurrent = this.head;
        let reversedCurrent = reversed.head;
        while (originalCurrent !== null) {
            if (originalCurrent.data !== reversedCurrent.data) {
                return false;
            }
            originalCurrent = originalCurrent.next;
            reversedCurrent = reversedCurrent.next;
        }
        return true;
    }
}

$(document).ready(function() {
    $('#checkPalindromeBtn').click(function() {
        const word = $('#wordInput').val().trim().toLowerCase();
        if (word) {
            const linkedList = new LinkedList();
            
            for (let i = 0; i < word.length; i++) {
                linkedList.add(word[i]);
            }

            const isPalindrome = linkedList.isPalindrome();
            if (isPalindrome) {
                $('#result').text(`"${word}" es un palíndromo.`);
            } else {
                $('#result').text(`"${word}" no es un palíndromo.`);
            }
        } else {
            $('#result').text('Por favor, introduce una palabra.');
        }
    });
});
