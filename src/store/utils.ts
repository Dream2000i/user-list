import { TypeUser, TypeUsers } from "../types/usersList";



export const sortByField = (
  array: TypeUsers,
  field: keyof TypeUser,
  reverse: boolean = false
) => {
  const sortedArray = [...array];
  console.log(reverse);
  
  sortedArray.sort((a, b) => {
    const one = !isNaN(Number(a[field])) ? Number(a[field]) : String(a[field]).toLowerCase() || "";
    const two = !isNaN(Number(b[field])) ? Number(b[field]) : String(b[field]).toLowerCase() || "";
    if (one < two) {
      return -1;
    } else if (one > two) {
      return 1;
    } else {
      return 0;
    }
  });
  
  return !reverse ? sortedArray : sortedArray.reverse();
};
