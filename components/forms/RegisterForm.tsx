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

const RegisterForm = ({ user }: {user: User}) => {

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
            <h1 className="text-2xl">Welcome</h1>
            <p>Let's learn more about you</p>
        </section>

        <section className="space-y-6">
          <div className="mb-12">
            <h1 className="sub-header">
              Personal Information
            </h1>
          </div>
        </section>

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />
        
        <SubmitButton isLoading={isLoading}>
            Get started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
