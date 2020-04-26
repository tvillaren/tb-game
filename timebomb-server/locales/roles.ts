import { Role } from "../game-logic/roles";

export const roles: RolesMappingLocale = {
  fr: {
    Terrorist: "Méchant",
    CounterTerrorist: "Gentil",
  },
  en: {
    Terrorist: "Bad guy",
    CounterTerrorist: "Good guy",
  },
};

type RolesMappingLocale = {
  [key: string]: RoleMapping;
};

type RoleMapping = {
  [key in Role]: string;
};

export function getLocalRoleName(role: Role, locale = "fr"): string {
  if (roles[locale]) {
    return roles[locale][role];
  }
}
