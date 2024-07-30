import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

export default async function NewAppointment({ params : {userId}}: SearchParamProps) {

  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container m-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
            <div className="w-1/3 mb-10">
              <Image
                src="/assets/icons/logo-full.svg"
                height={1000}
                width={1000}
                alt="HealthCure logo"
                layout="responsive"
              />
            </div>


          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />


          <p className="copyright py-10">
              © 2024 HealthCure
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[25%]"
      />
    </div>
  );
}
