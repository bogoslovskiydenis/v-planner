import { useContext, useState } from "react"
import DatePicker from "react-datepicker"
import { Controller, useForm } from "react-hook-form"
import Button from "../../UI/Button"
import Input from "../../UI/Input"
import "react-datepicker/dist/react-datepicker.css"
import { FieldError } from "../../UI/FieldError"
import Select from "react-select"
import { ModalContext } from "../../../context/ModalContext"
import { AuthContext } from "../../../context/AuthContext"
import { ThemeContext } from "../../../context/ThemeContext"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaUserSignUp } from "../../../validation/schemas"
import f from "../../../validation/fieldName"
import { allowerImageType } from "../../../utils/allowedFileTypes"
import { customReactSelectOptions } from "../../../utils/customReactSelectOptions"


const optionsState = [
  { value: 'kiev', label: 'Kiev' },
  { value: 'new-yourk', label: 'New York' }
]

const UserSignUpForm = () => {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    watch
  } = useForm({
    mode: "all",
    resolver: yupResolver(schemaUserSignUp())
  })
  
  const auth = useContext(AuthContext)
  const modal = useContext(ModalContext)
  const theme = useContext(ThemeContext)

  const [src, setSrc] = useState(null)
  const [isCustomBudget, setIsCustomBudget] = useState(false)

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

  const isFormValid = () => isCustomBudget ? (watch(f.customBudget) && isValid) : (watch(f.budget) && isValid)

  const onSubmit = data => {
    auth.login(data.email, data.password, process.env.REACT_APP_ROLE_USER)
    modal.destroy()
  }

  const isValidField = field => !errors[field]
  const getErrorField = field => errors[field]?.message

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="photo-add">
        <label className="photo-add__label">
          <div className="photo-add__header">
            {
              src ? <img className="photo-add__photo" src={src} alt="" /> : <i className="icon-camera"></i>
            }
          </div>
          <div className="photo-add__title">Add Photo</div>
          <Input
            type="file"
            className="photo-add__input"
            accept={allowerImageType}
            register={register(f.avatar)}
            onInput={addPhoto}
          />
        </label>
      </div>
      { !isValidField(f.avatar) &&  <FieldError text={getErrorField(f.avatar)} /> }
      <div className="input-row">
        <div>
          <Input
            type="text"
            placeholder="*First Name"
            register={register(f.firstName)}
            error={getErrorField(f.firstName)}
            isValid={isValidField(f.firstName)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="*Last Name"
            register={register(f.lastName)}
            error={getErrorField(f.lastName)}
            isValid={isValidField(f.lastName)}
          />
        </div>
      </div>
      <Input
        type="email"
        placeholder="*Email"
        register={register(f.email)}
        error={getErrorField(f.email)}
        isValid={isValidField(f.email)}
      />
      <Input
        type="text"
        placeholder="Nick Name"
        register={register(f.nickname)}
        error={getErrorField(f.nickname)}
        isValid={isValidField(f.nickname)}
      />
      <Input
        type="text"
        placeholder="*Partners First Name"
        register={register(f.partners.firstName)}
        error={getErrorField(f.partners.firstName)}
        isValid={isValidField(f.partners.firstName)}
      />
      <Input
        type="text"
        placeholder="*Partners Last Name"
        register={register(f.partners.lastName)}
        error={getErrorField(f.partners.lastName)}
        isValid={isValidField(f.partners.lastName)}
      />
      <h4 className="middle-modal__title m-t-24">Wedding Information</h4>
      <div className="input-row">
        <label className="input-label">
          <Controller
            control={control}
            name={f.date.engagement}
            defaultValue=""
            render={({ field }) => (
              <DatePicker
                dateFormat="d MMMM yy"
                selected={field.value}
                ref={field.ref}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholderText="*Engagement Date"
                className="input-control"
              />
            )}
          />
          { !isValidField(f.date.engagement) &&  <FieldError text={getErrorField(f.date.engagement)} /> }
        </label>
        <label className="input-label">
          <Controller
            control={control}
            name={f.date.wedding}
            defaultValue=""
            render={({ field }) => (
              <DatePicker
                dateFormat="d MMMM yy"
                selected={field.value}
                ref={field.ref}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholderText="*Wedding Date"
                className="input-control"
              />
            )}
          />
          { !isValidField(f.date.wedding) &&  <FieldError text={getErrorField(f.date.wedding)} /> }
        </label>
      </div>
      <label className="input-label">
        <Controller
          control={control}
          name={f.location.default}
          render={({ field }) => (
            <Select
              placeholder="*Wedding Location"
              options={optionsState}
              isClearable={false}
              isSearchable={false}
              {...field}
              {...customReactSelectOptions(theme.get())}
            />
          )}
        />
        { !isValidField(f.location.default) && <FieldError text={getErrorField(f.location.default)} /> }
      </label>
      <Input
        type="text"
        placeholder="*Guests Number"
        register={register(f.count.guest)}
        error={getErrorField(f.count.guest)}
        isValid={isValidField(f.count.guest)}
      />
      <label className="input-label">
        {
          isCustomBudget
            ? <Input
                type="text"
                placeholder="Budget, $"
                register={register(f.customBudget)}
                error={getErrorField(f.customBudget)}
                isValid={isValidField(f.customBudget)}
              />
            : <Controller
                control={control}
                name={f.budget}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    placeholder="Budget, $"
                    options={[
                      { value: "Budget", label: "Budget"},
                      { value: "Max Budget", label: "Max Budget"},
                      { value: "custom", label: "Your variant"}
                    ]}
                    isClearable={false}
                    isSearchable={false}
                    {...field}
                    onChange={e => {
                      if(e.value === "custom"){
                        setIsCustomBudget(true)
                        return
                      }
                      field.onChange(e)
                    }}
                    {...customReactSelectOptions(theme.get())}
                  />
                )}
              />
        }
        { !isValidField(f.budget) &&  <FieldError text={getErrorField(f.budget)} /> }
      </label>
      <h4 className="middle-modal__title m-t-24">Create Password</h4>
      <Input
        type="password"
        placeholder="Password"
        register={register(f.password)}
        error={getErrorField(f.password)}
        isValid={isValidField(f.password)}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        register={register(f.confirmPassword)}
        error={getErrorField(f.confirmPassword)}
        isValid={isValidField(f.confirmPassword)}
      />
      <Button
        className="btn btn-accent w-100 m-t-8"
        disabled={!isFormValid()}
      >Lest Go!</Button>
    </form>
  )
}

export default UserSignUpForm