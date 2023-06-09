class Node {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  } // fim classe Node
//------------------------------------------------------------  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length=0;
    }
//------------------------------------------------------------  
    addLast(data) {
      const newNode = new Node(data);
      if(newNode===null)
        return false;

      if (this.head === null) 
        // Se a lista estiver vazia, o novo nó se torna a cabeça e a cauda
        this.head = newNode;
        else {
        // Caso contrário, adiciona o novo nó à cauda e atualiza a cauda
        newNode.prev = this.tail;
        this.tail.next = newNode;
      }
      this.tail = newNode;
      this.length++;
      return true;
    }
//------------------------------------------------------------  
    addFirst(data) {
      const newNode = new Node(data);
      if(newNode===null)
        return false;
      if (this.tail === null) 
        // Se a lista estiver vazia, o novo nó se torna a cabeça e a cauda
        this.tail = newNode;
       else {
        // Caso contrário, adiciona o novo nó à cabeça e atualiza a cabeça
        newNode.next = this.head;
        this.head.prev = newNode;
      }
      this.head = newNode;
      this.length++;
      return true;
    }
//------------------------------------------------------------
    addAtIndex(index, data) {
        if(index <= 0)  
          return this.addFirst(data);
        if(index >= this.length)
          return this.addLast(data);
        
        const newNode = new Node(data);
        let noAtual = this.head;
        let posAtual = 0;
        while(posAtual < index-1){
          noAtual = noAtual.next;
          posAtual++;
        }

        newNode.prev = noAtual;
        newNode.next = noAtual.next;
        noAtual.next = newNode;
        newNode.next.prev = newNode;
        this.length++;
        return true;
      }
//------------------------------------------------------------  
deleteFirst() {
      const removedData = this.head.data; // Salva o valor do elemento removido
      this.head = this.head.next;
      if (this.head !== null) {
        this.head.prev = null;
      }
      else
        this.tail = null;
      this.length--;  
      return removedData; // Retorna o valor do elemento removido
  }
//------------------------------------------------------------
deleteAtIndex(index){
  let indexAtual = 0, noAtual = this.head;
  if(this.isEmpty())
    return null;

  while(indexAtual < index){
    noAtual = noAtual.next;
    indexAtual++;
  }

  if(noAtual.prev == null)
    this.head = noAtual.next;
  else
    noAtual.prev.next = noAtual.next;
  
  if(noAtual.next == null)
    this.tail = noAtual.prev;
  else
    noAtual.next.prev = noAtual.prev;
  
  this.length--;
  return noAtual.data;
}
//------------------------------------------------------------
    isEmpty() {
        return this.head === null; 
      }
//------------------------------------------------------------
first(){
  if(!this.isEmpty())
    return this.head.data;
}
//------------------------------------------------------------
last(){
  if(!this.isEmpty())
    return this.tail.data;
}
//------------------------------------------------------------
    forEach(callback) {
        let currentNode = this.head;
    
        while (currentNode !== null) {
          callback(currentNode.data);
          currentNode = currentNode.next;
        }
      }

  }// fim classe LinkedList
  
  