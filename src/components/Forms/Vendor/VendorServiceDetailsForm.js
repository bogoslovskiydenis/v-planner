import { useContext } from "react"
import { Controller, useForm } from "react-hook-form"
import Button from "../../UI/Button"
import { FieldError } from "../../UI/FieldError"
import Select from "react-select"
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions"
import f from "../../../validation/fieldName"
import { ThemeContext } from "../../../context/ThemeContext"

const VendorServiceDetailsForm = ({ onCallback, onBack }) => {

  const {
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm({
    mode: "all"
  })

  const theme = useContext(ThemeContext)

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  return (
    <form onSubmit={handleSubmit(onCallback)}>
      <label className="input-label">
        Service
        <Controller
          control={control}
          name={f.photo.types}
          render={({ field }) => (
            <Select
              closeMenuOnSelect={false}
              placeholder="Service"
              options={[
                { value: 'Day After Session', label: 'Day After Session' },
                { value: 'Engagement', label: 'Engagement' }
              ]}
              isClearable={false}
              isMulti
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.photo.types) && <FieldError text={getErrorField(f.photo.types)} />}
      </label>

      <label className="input-label">
        Type of services
        <Controller
          control={control}
          name={f.photo.types_1}
          render={({ field }) => (
            <Select
              closeMenuOnSelect={false}
              placeholder="Type of services"
              options={[
                { value: 'Day After Session', label: 'Day After Session' },
                { value: 'Engagement', label: 'Engagement' }
              ]}
              isClearable={false}
              isMulti
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.photo.types_1) && <FieldError text={getErrorField(f.photo.types_1)} />}
      </label>

      <label className="input-label">
        Photo & Video Styles
        <Controller
          control={control}
          name={f.photo.types_3}
          render={({ field }) => (
            <Select
              placeholder="Photo & Video Styles"
              options={[
                { value: "Artistic", label: "Artistic"},
                { value: "Classic", label: "Classic"},
              ]}
              isClearable={false}
              isMulti
              closeMenuOnSelect={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.photo.types_3) && <FieldError text={getErrorField(f.photo.types_3)} />}
      </label>

      <label className="input-label">
        Starting Price Range
        <Controller
          control={control}
          name={f.priceRange}
          render={({ field }) => (
            <Select
              placeholder="Starting Price Range"
              options={[
                {value: "$0-$999", label: "$0-$999"},
                {value: "$1,000-$1,999", label: "$1,000-$1,999"},
                {value: "$2,000-$2,999", label: "$2,000-$2,999"},
                {value: "$3,000-$4,999", label: "$3,000-$4,999"},
                {value: "$5,000+", label: "$5,000+"}
              ]}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.priceRange) && <FieldError text={getErrorField(f.priceRange)} />}
      </label>


      <label className="input-label">
        Wedding Activities
        <Controller
          control={control}
          name={f.activities}
          render={({ field }) => (
            <Select
              placeholder="Wedding Activities"
              options={[
                {value: "Getting Engaged", label: "Getting Engaged"}
              ]}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.activities) && <FieldError text={getErrorField(f.activities)} />}
      </label>
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

export default VendorServiceDetailsForm