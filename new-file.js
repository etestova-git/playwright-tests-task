function createCounter() {
let counter = 0;
    return function() {
        counter +=1;
        return counter;
    }
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());
