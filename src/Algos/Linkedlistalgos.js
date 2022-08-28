import { Node } from "../pages/LinkedList";

export function getAddatHeadAnimations(its, val){
    const animations = [];
    if(its.head === null) return animations;
    animations.push([0, 'color']);
    animations.push([0, 'add']);
    animations.push([0, 'back']);
    let temp = new Node(val);
    temp.next = its.head;
    its.head = temp;
    return animations;
}

export function getAddatTailAnimations(its, val){
    const animations = [];
    if(its.head === null) return animations;
    let curr = its.head, i = 0;
    while(curr.next !== null){
        animations.push([i, 'color']);
        animations.push([i, 'back']);
        curr = curr.next;
        i++;
    }
    animations.push([i, 'color']);
    animations.push([0, 'add']);
    animations.push([i, 'back']);
    let temp = new Node(val);
    curr.next = temp;
    return animations;
}

export function getAddAtAnimations(its, val, idx, size){
    const animations = [];
    let i = 0;
    if(idx > size) return animations;
    if(idx === '0'){
        animations.push([i, 'color']);
        animations.push([i, 'add']);
        animations.push([i, 'back']);
        let temp = new Node(val);
        temp.next = its.head;
        its.head = temp;
        return animations;
    }
    let curr = its.head;
    while(i < idx - 1){
        animations.push([i, 'color']);
        animations.push([i, 'back']);
        curr = curr.next;
        i++;
    }
    let temp = curr.next;
    animations.push([i, 'color']);
    animations.push([i, 'add']);
    animations.push([i, 'back']);
    curr.next = new Node(val);
    curr.next.next = temp;
    return animations;
}

export function getDeleteAtAnimations(its, idx, size){
    const animations = [];
    let i = 0;
    if(idx >= size || idx < 0) return animations;
    if(idx === '0'){
        its.head = its.head.next;
        animations.push([i, 'color']);
        animations.push([i, 'add']);
        animations.push([i, 'back']);
        return animations;
    }
    let curr = its.head;
    while(i < idx - 1){
        animations.push([i, 'color']);
        animations.push([i, 'back']);
        curr = curr.next;
        i++;
    }
    let temp = curr.next;
    animations.push([i, 'color']);
    animations.push([i, 'add']);
    animations.push([i, 'back']);
    curr.next = temp.next;
    temp.next = null;
    return animations;
}

export function getReverseLinkedListAnimations(its){
    const animations = [];
    let i = 0;
    let prev = null, curr = its.head;
    while(curr){
        animations.push([i, 'color']);
        animations.push([i, 'swap']);
        animations.push([i, 'back']);
        const nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
        i++;
    }
    its.head = prev;
    animations.push([i, 'reset']);
    for(let j = 0; j < i; j++){
        animations.push([j, 'swap2']);
    }
    return animations;
}