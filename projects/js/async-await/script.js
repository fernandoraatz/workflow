/*
|--------------------------------------------------------------------------
| Async Await
|--------------------------------------------------------------------------
*/ 

// Function Returning Promises

let promise1 = (n) => {
    return new Promise(resolve =>{
        setTimeout(() => resolve(10 + n) , 1000)
    })
}

let promise2 = (n) => {
    return new Promise(resolve =>{
        setTimeout(() => resolve(20 + n) , 1000)
    })
}

let promise3 = (n) => {
    return new Promise(resolve =>{
        setTimeout(() => resolve(30 + n) , 1000)
    })
}

// With Promises

let promiseFunction = () => {

    promise1(0)
    .then(result => promise2(result))
    .then(result2 => promise3(result2))
    .then(result3 => console.log(result3))

}


// With Async Await

let asyncFunction = async () => {

    let result = await promise1(0);
    let result2 = await promise2(result);
    let result3 = await promise3(result2);

    console.log(result3)
}

// Call Functions

// promiseFunction()
asyncFunction()