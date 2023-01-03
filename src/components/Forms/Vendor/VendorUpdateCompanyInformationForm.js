import { Controller, useForm } from "react-hook-form"
import Button from "../../UI/Button"
import Input from "../../UI/Input"
import Select from "react-select"
import { FieldError } from "../../UI/FieldError"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaVendorUpdateCompanyInformation } from "../../../validation/schemas"
import f from "../../../validation/fieldName"
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions"
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { allowerImageType } from "../../../utils/allowedFileTypes"
import { ThemeContext } from "../../../context/ThemeContext"

const optionsType = [
  { value: 'chocolate', label: 'Photography & Videography 1' },
  { value: 'strawberry', label: 'Photography & Videography 2' },
  { value: 'vanilla', label: 'Photography & Videography 3' }
]

const optionsState = [
  { value: 'kiev', label: 'Kiev' },
  { value: 'new-your', label: 'New York' }
]

const VendorUpdateCompanyInformationForm = () => {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaVendorUpdateCompanyInformation())
  })

  const auth = useContext(AuthContext)
  const theme = useContext(ThemeContext)

  const [src, setSrc] = useState(null)

  const addPhoto = (e) => {
    if(e.target.files && e.target.files.length){
      var reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result)
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    setSrc(null)
  }

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

  const onSubmit = data => {
    auth.setUser({
      ...auth.user,
      profile: {
        ...auth.user.profile,
        blocks: {
          ...auth.user.profile.blocks,
          company: true
        }
      },
      company: {
        ...auth.user.company,
        ...data,
        type: data.type.value,
        state: data.state.value,
        logo: src || auth.user.company.logo
      }
    })
  }

  
  const removeLogo = () => {
    setSrc(null)
    auth.setUser({
      ...auth.user,
      company: {
        ...auth.user.company,
        logo: null
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-to="company_information">
      <h4>Company Information</h4>
      <div className="photo-upload m-t-24">
        <div className="photo-upload__photo">
          {
            (src || auth.user.company.logo) && <img className="photo-upload__img" src={src || auth.user.company.logo} alt="" />
          }
          {
            (!src && !auth.user.company.logo) && <i className="icon-camera"></i>
          }
        </div>
        <label className="photo-upload__label">
          <Input
            type="file"
            className="photo-upload__input"
            accept={allowerImageType}
            register={register(f.avatar)}
            onInput={addPhoto}
          />
          <div
            className="btn btn-light photo-upload__btn"
            disabled={!isValid}
          >Upload New Photo</div>
        </label>
        <Button
          className="btn btn-photo-delete"
          disabled={!isValid}
          onClick={removeLogo}
        >Delete</Button>
      </div>
      { !isValidField(f.photo.default) &&  <FieldError text={getErrorField(f.photo.default)} /> }
      <Input
        type="text"
        placeholder="Company Name"
        label="Company Name"
        defaultValue={auth.user.company.name}
        register={register(f.name)}
        error={getErrorField(f.name)}
        isValid={isValidField(f.name)}
      />
      <label className="input-label">
        Service Type
        <Controller
          control={control}
          name={f.type}
          defaultValue={optionsType.filter(o => o.value === auth.user.company.type)[0]}
          render={({ field }) => (
            <Select
              placeholder="Service Type"
              options={optionsType}
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
        defaultValue={auth.user.company.amount}
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
              defaultValue={optionsState.filter(o => o.value === auth.user.company.state)[0]}
              render={({ field }) => (
                <Select
                  placeholder="State"
                  options={optionsState}
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
            defaultValue={auth.user.company.country}
            register={register(f.country)}
            error={getErrorField(f.country)}
            isValid={isValidField(f.country)}
          />
        </div>
      </div>
      <Button
        className="btn btn-accent m-t-24"
        disabled={!isValid}
      >Save</Button>
    </form>
  )
}

export default VendorUpdateCompanyInformationForm