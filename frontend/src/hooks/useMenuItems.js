import { useMemo } from "react";
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlinePencil,
  HiOutlineUser,
} from "react-icons/hi";
import { MdFactCheck } from "react-icons/md";
import { USER_ROLES } from "../utils/constants";

export const useMenuItems = (userRole) => {
  return useMemo(() => {
    const commonMenus = [
      {
        name: "Dashboard",
        icon: HiOutlineHome,
        path: `/dashboard/${userRole}`,
      },
      {
        name: "Weekly Plan",
        icon: HiOutlineCalendar,
        path: `/dashboard/${userRole}/weekly-plan`,
      },
      {
        name: "Edit Data",
        icon: HiOutlinePencil,
        path: `/dashboard/${userRole}/edit-data`,
      },
    ];

    if (userRole === USER_ROLES.MINING_PLANNER) {
      return [
        commonMenus[0],
        {
          name: "Approvement",
          icon: MdFactCheck,
          path: `/dashboard/${userRole}/approvement`,
        },
        commonMenus[1],
        commonMenus[2],
        {
          name: "Manage User",
          icon: HiOutlineUser,
          path: `/dashboard/${userRole}/manage-user`,
        },
      ];
    }

    if (userRole === USER_ROLES.SHIPPING_PLANNER) {
      return [
        commonMenus[0],
        {
          name: "Route Performance",
          icon: MdFactCheck,
          path: `/dashboard/${userRole}/route-performance`,
        },
        commonMenus[1],
        commonMenus[2],
      ];
    }

    return commonMenus;
  }, [userRole]);
};
