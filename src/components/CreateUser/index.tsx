import React, { FC, useState } from 'react'
import ReactModal from 'react-modal'
import { useForm } from 'react-hook-form'
import { IUser } from '../../types/IUser'
import { userSlice } from '../../redux/reducers/UserSlice'
import { useAppDispatch } from '../../hooks/redux'

const CreateUser: FC = () => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const { addUser } = userSlice.actions
	const dispatch = useAppDispatch()

	const [formStep, setFormStep] = useState<number>(1)

	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		trigger,
		reset,
		clearErrors,
	} = useForm<IUser>({
		mode: 'onChange',
	})

	const onSubmit = handleSubmit(data => {
		dispatch(addUser(data))
		setShowModal(false)
		setFormStep(1)
		reset()
	})

	const handleNext = async () => {
		let valid = false

		switch (formStep) {
			case 1:
				valid = await trigger(['company', 'name'])
				break
			case 2:
				valid = await trigger(['iBan', 'bic', 'bankName'])
				break
		}

		if (valid) {
			setFormStep(cur => ++cur)
		}
	}

	const handleCancel = () => {
		setShowModal(false)
		setFormStep(1)
		clearErrors()
	}

	return (
		<>
			<div className='card-header'>
				<button className='btn btn-accent' onClick={() => setShowModal(true)}>
					Add
				</button>
			</div>
			<ReactModal
				isOpen={showModal}
				style={{
					overlay: {
						backgroundColor: 'rgba(229,177,177,.8)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					},
					content: {
						border: 'none',
						position: 'relative',
						inset: 0,
						width: 365,
						height: 320,
						padding: '20px 30px 20px 25px',
						borderRadius: 0,
						boxShadow: '0px 4px 34px rgba(0,0,0,.24)',
					},
				}}
				ariaHideApp={false}
			>
				<span className='btn-close' onClick={handleCancel}>
					<svg
						width='16'
						height='20'
						viewBox='0 0 16 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M15.128 1.89703L8.64012 9.95479L14.9599 17.8038L13.9178 19.0981L7.59803 11.249L1.1438 19.2651L0.168945 18.0543L6.62317 10.0383L0.269792 2.14753L1.31188 0.853279L7.66526 8.74404L14.1531 0.686279L15.128 1.89703Z'
							fill='#71809F'
						/>
					</svg>
				</span>
				<form onSubmit={onSubmit}>
					{formStep === 1 && (
						<section>
							<h3 className='modal-title'>Invoice Address</h3>
							<div className='row'>
								<label>Company *</label>
								<input
									className='form-control'
									{...register('company', {
										required: true,
									})}
								/>
								{errors.company && (
									<span className='error'>Required field</span>
								)}
							</div>
							<div className='row'>
								<label>Name *</label>
								<input
									className='form-control'
									{...register('name', { required: true })}
								/>
								{errors.name && <span className='error'>Required field</span>}
							</div>
							<div className='row'>
								<label>Additional</label>
								<input className='form-control' {...register('additional')} />
							</div>
							<div className='row'>
								<label>Street</label>
								<input className='form-control' {...register('street')} />
							</div>
							<div className='row'>
								<label>Postal Code</label>
								<input className='form-control' {...register('postalCode')} />
							</div>
							<div className='row'>
								<label>Country</label>
								<select className='form-control' {...register('country')}>
									<option></option>
									<option value='Ukraine'>Ukraine</option>
									<option value='England'>England</option>
									<option value='France'>France</option>
								</select>
							</div>
						</section>
					)}

					{formStep === 2 && (
						<section>
							<h3 className='modal-title'>Bank Data</h3>
							<div className='row'>
								<label>IBAN *</label>
								<input
									className='form-control'
									{...register('iBan', {
										required: true,
									})}
								/>
								{errors.iBan && <span className='error'>Required field</span>}
							</div>
							<div className='row'>
								<label>BIC *</label>
								<input
									className='form-control'
									{...register('bic', {
										required: true,
									})}
								/>
								{errors.bic && <span className='error'>Required field</span>}
							</div>
							<div className='row'>
								<label>Bank name *</label>
								<input
									className='form-control'
									{...register('bankName', {
										required: true,
									})}
								/>
								{errors.bankName && (
									<span className='error'>Required field</span>
								)}
							</div>
						</section>
					)}
					{formStep === 3 && (
						<section>
							<h3 className='modal-title'>Contact</h3>
							<div className='row'>
								<label>Fax</label>
								<input className='form-control' {...register('fax')} />
							</div>
							<div className='row'>
								<label>E-mail</label>
								<input
									className='form-control'
									type='email'
									{...register('email', {
										pattern:
											/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									})}
								/>
								{errors.email && (
									<span className='error'>invalid email format</span>
								)}
							</div>
							<div className='row'>
								<label>Birthday</label>
								<input
									className='form-control'
									type='date'
									{...register('birthday')}
								/>
							</div>
							<div className='row'>
								<label>Homepage</label>
								<input className='form-control' {...register('homepage')} />
							</div>
						</section>
					)}
					<div className='btn-group'>
						<button className='btn btn-outline' onClick={handleCancel}>
							Cancel
						</button>
						{formStep !== 1 && (
							<button
								className='btn btn-outline'
								type='button'
								onClick={() => setFormStep(cur => --cur)}
							>
								Previous
							</button>
						)}
						{formStep !== 3 && (
							<button
								className='btn btn-accent'
								type='button'
								onClick={handleNext}
							>
								Next
							</button>
						)}
						{formStep === 3 && (
							<button className='btn btn-accent' disabled={!isValid}>
								Save
							</button>
						)}
					</div>
				</form>
			</ReactModal>
		</>
	)
}

export default CreateUser
