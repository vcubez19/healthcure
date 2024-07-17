"use client";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form";
import FormFieldType from "@/types/formFieldTypes";
import Image from "next/image";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldType,
  name: string,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dateFormat?: string,
  showTimeSelect?: boolean,
  classNames?: string,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {

  const { fieldType, iconSrc, iconAlt, placeholder, classNames, showTimeSelect, dateFormat } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {
            iconSrc && (
              <Image 
                src={iconSrc}
                alt={iconAlt || "icon"}
                height={24}
                width={24}
                className="ml-2"
              />
            )
          }

          <FormControl>
            <Input 
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )

      case FormFieldType.PHONE:
        return (
          <FormControl>
            <PhoneInput
              defaultCountry="US"
              placeholder={placeholder}
              international
              withCountryCallingCode
              value={field.value}
              onChange={field.onChange}
              className="input-phone"
            />
          </FormControl>
        )

      case FormFieldType.DATE_PICKER:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            <Image 
              src="/assets/icons/calendar.svg"
              alt="calendar"
              width={25}
              height={25}
              className="ml-2"
            />

            <FormControl>
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat={dateFormat ?? "MM/dd/yyyy"}
                showTimeSelect={showTimeSelect ?? false}
                timeInputLabel="Time:"
                wrapperClassName="date-picker"
               />
            </FormControl>
          </div>
        )

    default:
      break;
  }
}

const CustomFormField = (props: CustomProps) => {

  const { control, fieldType, name, label } = props;

  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              {fieldType !== FormFieldType.CHECKBOX && label && (
                <FormLabel>{label}</FormLabel>
              )}

              <RenderField field={field} props={props}/>

              <FormMessage className="shad-error"/>
            </FormItem>
          )}
        />
  )
}

export default CustomFormField
