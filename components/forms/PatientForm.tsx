"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"

import { useState } from "react";
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import FormFieldType from "@/types/formFieldTypes"
import Link  from "next/link"

const PatientForm = () => {

  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    },
  })

  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
        const userData = {
            name,
            email,
            phone
        }

        const user = await createUser(userData)

        if (user) {
            console.log(user);
            router.push(`/patients/${user.$id}/register`)
        }
    } catch (error) {
        console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="mb-12 space-y-4">
            <h1 className="text-2xl">Hello</h1>
            <p>Let's get you started</p>
        </section>

        <div>
            <Link href="https://github.com/vcubez19/healthcure#screenshots">
              <button className="bg-purple-500 w-full p-4 rounded font-bold">
                Recruiters click here to see screenshots and avoid forms
              </button>
            </Link>
        </div>

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="johndoe@example.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
        />

        <CustomFormField 
            fieldType={FormFieldType.PHONE}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="(555) 123-4567"
        />
        
        <SubmitButton isLoading={isLoading}>
            Get started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
