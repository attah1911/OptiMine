import { USER_ROLES } from "./constants";

export const getRoleLabel = (role) => {
  const roleLabels = {
    [USER_ROLES.MINING_PLANNER]: "Mining Planner",
    [USER_ROLES.SHIPPING_PLANNER]: "Shipping Planner",
  };
  return roleLabels[role] || "User";
};
