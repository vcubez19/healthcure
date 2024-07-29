"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"

import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { registerPatient } from "@/lib/actions/patient.actions"
import FormFieldType from "@/types/formFieldTypes"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "@/components/ui/select";
import Image from "next/image"
import FileUploader from "../FileUploader"

const RegisterForm = ({ user }: {user: User}) => {

  const router = useRouter();

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  })

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;

    if (values.identificationDocument && values.identificationDocument.length > 0) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type
      })

      formData = new FormData();
      formData.append("blobfile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name)
    }

    try {
        const patientData = {
          ...values,
          userId: user.$id,
          birthDate: new Date(values.birthDate),
          identificationDocument: formData
        }

        // @ts-ignore
        const patient = await registerPatient(patientData);

        if (patient) {
          router.push(`/patients/${user.$id}/new-appointment`)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
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
              label="Full name *"
              value={user.name}
              placeholder="John Doe"
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
        />

        <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
          <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email *"
              value={user.email}
              placeholder="johndoe@example.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
              classNames="flex-grow-1"
          />

          <CustomFormField 
              fieldType={FormFieldType.PHONE}
              control={form.control}
              name="phone"
              label="Phone number *"
              value={user.phone}
              placeholder="(555) 123-4567"
          />
        </div>

        <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
          <CustomFormField 
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of birth *"
              placeholder="d/mm/yy"
          />

          <CustomFormField 
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender *"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                  className="flex h-10 gap-7 xl: justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  >

                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem 
                        value={option}
                        id={option}
                      />

                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}

                  </RadioGroup>
                </FormControl>
              )}
          />
        </div>

        <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">

        <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address *"
              placeholder="14th street, New York"
          />

        <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation *"
              placeholder="Receptionist"
        />

        </div>

        <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
          <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contact Name *"
              placeholder="Contact name"
          />

          <CustomFormField 
              fieldType={FormFieldType.PHONE}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency Contact Number *"
              placeholder="(555) 123-4567"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-12">
            <h1 className="sub-header">
              Medical Information
            </h1>
          </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary care physician *"
            placeholder="Select a physician"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

        <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
          <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider *"
              placeholder="Blue Cross Blue Shield"
          />

          <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number *"
              placeholder="12345"
          />
        </div>

        <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
          <CustomFormField 
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="Peanuts, Gluten, Soy"
          />

          <CustomFormField 
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current Medication (if any)"
              placeholder="Prozac, Alprazolam"
          />
        </div>

        <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
          <CustomFormField 
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="Mother had brain cancer"
          />

          <CustomFormField 
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past Medical History"
              placeholder="I had a brain tumor"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-12">
            <h1 className="sub-header">
              Identification and Verification
            </h1>
          </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type *"
            placeholder="Select Identification Type"
          >
            {IdentificationTypes.map((type, i) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="identificationNumber"
              label="Identification Number"
              placeholder="123456789"
          />

          <CustomFormField 
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="identificationDocument"
              label="Scanned copy of identification document *"
              renderSkeleton={(field) => (
                <FormControl>
                  <FileUploader files={field.value} onChange={field.onChange}/>
                </FormControl>
              )}
          />

        <section className="space-y-6">
          <div className="mb-12">
            <h1 className="sub-header">
              Consent and Privacy
            </h1>
          </div>
        </section>

        <div className="flex flex-col">
          <CustomFormField 
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="treatmentConsent"
              label="I consent to treatment *"
          />

          <CustomFormField 
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="disclosureConsent"
              label="I consent to the discolsure of my information *"
          />

          <CustomFormField 
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name="privacyConsent"
              label="I acknowledge and agree to the privacy policy *"
          />
        </div>

        <SubmitButton isLoading={isLoading}>
            Get started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
