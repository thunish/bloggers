import { atom } from "recoil";

const getUserName=(): string | null=>{
    const username = localStorage.getItem("username");
    return username;
}

export const userName=atom({
    key:"userName",
    default:getUserName(),
    effects: [
        ({ onSet }) => {
          onSet((newUsername: any) => {
            localStorage.setItem('username', newUsername); // save to localStorage on update
          });
        },
      ],
      
});