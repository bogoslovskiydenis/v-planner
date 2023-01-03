import { Controller, useForm } from "react-hook-form"
import Button from "../../UI/Button"
import Input from "../../UI/Input"
import Select from "react-select"
import { FieldError } from "../../UI/FieldError"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaVendorCompanyInformation } from "../../../validation/schemas"
import f from "../../../validation/fieldName"
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions"
import { useContext } from "react"
import { ThemeContext } from "../../../context/ThemeContext"

const VendorCompanyInformationForm = ({ onCallback, onBack }) => {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorCompanyInformation())
  })

  const theme = useContext(ThemeContext)

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  return (
    <form onSubmit={handleSubmit(onCallback)}>
      <Input
        type="text"
        placeholder="Company Name"
        label="Company Name"
        register={register(f.name)}
        error={getErrorField(f.name)}
        isValid={isValidField(f.name)}
      />
      <label className="input-label">
        Service Type
        <Controller
          control={control}
          name={f.type}
          render={({ field }) => (
            <Select
              placeholder="Service Type"
              options={[
                { value: 'chocolate', label: 'Photography & Videography 1' },
                { value: 'strawberry', label: 'Photography & Videography 2' },
                { value: 'vanilla', label: 'Photography & Videography 3' }
              ]}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.type) && <FieldError text={getErrorField(f.type)} /> }
      </label>
      <Input
        type="text"
        placeholder="Years on Market"
        label="Years on Market"
        register={register(f.amount)}
        error={getErrorField(f.amount)}
        isValid={isValidField(f.amount)}
      />
      <div className="input-row">
        <div>
          <label className="input-label">
            State
            <Controller
              control={control}
              name={f.state}
              render={({ field }) => (
                <Select
                  placeholder="State"
                  options={[
                    { value: 'kiev', label: 'Kiev' },
                    { value: 'new-your', label: 'New York' }
                  ]}
                  isClearable={false}
                  isSearchable={false}
                  {...field}
                  {...customReactSelectOptions(theme.get())}
                />
              )}
            />
            { !isValidField(f.state) && <FieldError text={getErrorField(f.state)} /> }
          </label>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Country"
            label="County"
            register={register(f.country)}
            error={getErrorField(f.country)}
            isValid={isValidField(f.country)}
          />
        </div>
      </div>
      <div className="input-row">
        <div
          className="btn btn-accent btn-circle m-t-24"
          onClick={onBack}
        >
          <i className="icon-arrow-line"></i>
        </div>
        <Button
          className="btn btn-accent w-100 m-t-24"
          style={{ flex: 1 }}
          disabled={!isValid}
        >Next</Button>
      </div>
    </form>
  )
}

export default VendorCompanyInformationForm