import { Typography } from "@mui/material"

export const HelperText = ({error}) => {
    return (
      <div className='helper_text_field' >
        <Typography>{error}</Typography>
      </div >
    )
  }