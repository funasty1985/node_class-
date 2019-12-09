// const square = function (x) {
//     return x *x 
// }

// const square = (x) => {
//     return x*x 
// }

// const square = (x) => x*x

// console.log(square(3))

// We cannot use arrow function in defining a method in a object as 
// arrow function cannot detect this which represent the object itself. 
// We have to use normal function in this case 

// const event = {
//     name: "Birthday Party",
//     printGuestList : function(){
//         console.log('Guest list for' + this.name)
//     }
// }

// ES6 has a shorter method definition 

// const event = {
//     name: "Birthday Party",
//     guestList:['Andrew','Jen','Mike'],
//     printGuestList() {
//         console.log('Guest list for' + this.name);
//     }
// }

// this-binding problem in child function , see below

// const event = {
//     name: "Birthday Party",
//     guestList: ['Andrew', 'Jen', 'Mike'],
//     printGuestList(){
//         console.log('Guest list for' + this.name);

//         this.guestList.forEach(function(guest){
//             console.log(guest + ' is attending ' + this.name)
//         })
//     }
// }

// solution to the problem by arrow function 
// arrow functions don't bind their own 'this' value but access the this value in the context in which they're create 
// which in this case is right inside of print guest list  

const event = {
    name: "Birthday Party",
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList(){
        console.log('Guest list for' + this.name);

        this.guestList.forEach((guest)=>{
            console.log(guest + ' is attending ' + this.name)
        })
    }
}

// event.printGuestList()

// arrow functions don't bind their own this value that makes them poor candidates for methods and it makes them great 
// candidates for pretty much everything else. 