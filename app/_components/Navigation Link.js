"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavigationLink({ navLinks, session }) {
    const pathName = usePathname()
    return (
        <>
            {navLinks.map(link => (
                <li key={link.name}>
                    <Link href={link.href} className={`${pathName.includes(link.href) == true ? "text-accent-400" : ""} hover:text-accent-400 transition-colors`}>
                        {link.name}
                    </Link>
                </li>)
            )}

            {session?.user?.image ? (
                <li>
                    <Link
                        href="/account"
                        className={`${pathName.includes("/account") == true ? "text-accent-400" : ""} hover:text-accent-400 transition-colors flex items-center gap-4`}
                    >
                        <img
                            src={session.user.image}
                            alt={session.user.name}
                            className="h-8 rounded-full"
                            referrerPolicy="no-referrer"
                        />
                        <span> Guest area</span>
                    </Link>
                </li>
            )
                : (
                    <li>
                        <Link href="/account" className={`${pathName.includes("/account") == true ? "text-accent-400" : ""} hover:text-accent-400 transition-colors`}>
                            Guest area
                        </Link>
                    </li>
                )
            }
        </>
    )
} 
