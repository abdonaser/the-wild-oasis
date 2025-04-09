

import { auth } from "../_lib/auth";
import NavigationLink from "./Navigation Link";



const navLinks = [
  {
    name: 'Cabins',
    href: '/cabins',
  },
  {
    name: 'About',
    href: '/about',
  }
];
/**
 * 
 *  {
    name: 'Guest area',
    href: '/account',
  } 
 */

export default async function Navigation() {
  /**
   * {
    user: {
      name: 'Abdelrahman Naser',
      email: 'abdonaser3110@gmail.com',
      image: 'https://lh3.googleusercontent.com/a/ACg8ocJ2RUtwmdrUpwFKrwdZMZPZ9d_A6fqdeL9PnoMI4wEsQBrUrA=s96-c'
    },
    expires: '2025-05-07T22:32:40.408Z'
  }
  
   * 
   */
  const session = await auth()


  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <NavigationLink navLinks={navLinks} session={session} />
      </ul>
    </nav >
  );
}
