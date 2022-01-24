/**
 * a closure that controlls change of index, cyclicly;
 * @param n number, (exclusive) upperbound of index; 
 * @returns a set of functions includes following:
 * - addBy: increment the index by a positive/ negative integer.
 * - assign: assign index by a positive integer.
 * - getIndex: get current index.
 */
export default function indexController(n: number){
  let i = 0;
  const addBy = (j: number) => {
    i += j;
    if (i < 0){
      i = n - 1;
    }
    else if (i >= n){
      i = 0;
    }
  }
  const assign = (j: number) => {
    i = j;
  }
  const getIndex = () => i;
  return {addBy, assign, getIndex};
}