import { atom } from "jotai";

export const layoutConfigAtom = atom({
  leftMenuItems: [
    {
      text: "Thông tin cá nhân",
      name: "UserInfoView",
    },
    {
      text: "Client",
      name: "ClientsView",
    },
  ],
  currentLeftMenuName: "UserInfoView",
});
