"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"

import { useEffect, useState } from "react";
import { getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import FormFieldType from "@/types/formFieldTypes"
import { SelectItem } from "../ui/select"
import Image from "next/image";
import { Doctors } from "@/constants"
import { createAppointment } from "@/lib/actions/appointment.actions"

type AppointmentFormProps = {
    userId: string,
    patientId: string,
    type: "create" | "cancel" | "schedule"
}

export default function AppointmentForm({ 
    userId, patientId, type
 }: AppointmentFormProps ) {

  const AppointmentFormValidation = getAppointmentSchema(type);

  const router = useRouter();

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: ""
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {

    setIsLoading(true);

    let status;

    switch (type) {
        case "schedule":
            status = "scheduled";
            break;
        case "cancel":
            status = "cancelled";
            break;
        default:
            status = "pending";
            break;
    }

    try {
       if (type === "create" && patientId) {

        const appointmentData = {
            userId,
            patient: patientId,
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            reason: values.reason!,
            note: values.note,
            status: status as Status
        }
        const appointment = await createAppointment(appointmentData);

        if (appointment) {
            form.reset();
            router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
        }
       } 

    } catch (error) {
        console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  let actionTypeLabel;

  switch (type) {
    case "cancel":
        actionTypeLabel = "Cancel Appointment";
        break;
    case "create":
        actionTypeLabel = "Create Appointment";
        break;
    case "schedule":
        actionTypeLabel = "Schedule Appointment";
        break;
    default:
        break;
  }

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="mb-12 space-y-4">
            <h1 className="text-2xl">{actionTypeLabel}</h1>
        </section>

        {type !== "cancel" && (
            <>
                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="primaryPhysician"
                    label="Doctor"
                    placeholder="Select a doctor"
                    iconSrc=""
                    iconAlt=""
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

                <CustomFormField 
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="schedule"
                    label="Expected appointment date"
                    showTimeSelect
                    dateFormat="MM/dd/yyyy - h:mm aa"
                />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="reason"
                        label="Reason for appointment"
                        placeholder="Enter reason"
                    />

                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="note"
                        label="Notes"
                        placeholder="Enter notes"
                    />
                </div>
            </>
        )}

        {type === "cancel" && (
            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="cancellationReason"
                label="Reason for cancellation"
                placeholder="Enter reason for cancellation"
            />
        )}
        
        <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}>
            {actionTypeLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}
