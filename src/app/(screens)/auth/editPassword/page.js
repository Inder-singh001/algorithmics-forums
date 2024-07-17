'use client'
import '../../../../../public/sass/pages/profileEdit.scss'
import { HelperText } from '@/app/components/helpertext'
import { InputLabel, Input } from '@mui/material'

const editPassword = () => {
    return (
        <div className='editSection_editPassword'>
            <div className='header_editPassword'>
                Change Password
            </div>
            <form>
                <div className='body_section_editPassword'>
                    <div className="text_section">
                        <InputLabel htmlFor="old_password">Old Password</InputLabel>
                        <Input
                            id="old_password"
                            placeholder="Enter Old Password"
                            name="old_password"
                        />
                        <HelperText error={errors.old_password ? errors.old_password : ""} />
                    </div>
                    <div className="text_section">
                        <InputLabel htmlFor="new_password">New Password</InputLabel>
                        <Input
                            id="new_password"
                            placeholder="Enter New Password"
                            name="new_password"
                        />
                        <HelperText error={errors.new_password ? errors.new_password : ""} />
                    </div>
                    <div className="text_section">
                        <InputLabel htmlFor="confirm_password">Confirm Password</InputLabel>
                        <Input
                            id="confirm_password"
                            placeholder="Connfirm Password"
                            name="confirm_password"
                        />
                        <HelperText error={errors.confirm_password ? errors.confirm_password : ""} />
                    </div>
                </div>
            </form>
        </div>
    )
}
export default editPassword