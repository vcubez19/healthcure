import Link from 'next/link'
import React from 'react'
import Image from "next/image";

const Admin = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header">
            <Link href="/" className="cursor-pointer">
                <Image 
                    src="/assets/icons/logo-full.svg"
                    height={32}
                    width={150}
                    alt="logo"
                    className="h-8 w-fit"
                />
            </Link>

            <p className="text-16-semibold">Admin dashboard</p>
        </header>

        <main className="admin-main">
            <section className="w-full space-y-4">
                <h1 className="header">Welcome</h1>
                <p className="text-dark-700">Manage new appointments</p>
            </section>

            <section>
                
            </section>
        </main>
    </div>
  )
}

export default Admin
