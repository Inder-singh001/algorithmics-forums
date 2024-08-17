import { postApi } from "./General"
import Image from "next/image";

let uploadImage = async (file, folderName, setReturnResponse) => {
    if(file)
    {
        let reader = new FileReader();
        reader.onload = async (e) => {
            let imageData = e.target.result;
            console.log("Request Submited");
    
            let url;
            let formData = {
                "folder_name":folderName,
                "image":imageData,
            };

            let resp = await postApi('/uploadsBase64',formData)
            if(resp && resp.status)
            {   
                setReturnResponse(resp)
            }
            else
            {       
                setReturnResponse(resp)
            }
        };
        return await reader.readAsDataURL(file);
    }
    else
    {
        return false
    }
}

let unlinkImage = async (file) => {
    if(file)
    {
        let resp = await postApi('admin/remove-image',{
            "image":file
        })
        
        return resp;
    }
    else
    {
        return false
    }
}

let showImage = (file, imageRemover = () => {}) => {
    let mediaUrl = process.env.NEXT_MEDIA_URL
    let style = { 
        marginTop:"10px",
        borderRadius:"10px"
    } 

    if(typeof file == 'object')
    {
        file = file && file.original ? file.original : ''
    }

    return (
        <>
            <div className="image_preview">
            {
                file ?
                'X'
                :""
            }
            <Image 
                style={style}
                width={"250px"}
                src={ file ? mediaUrl+file : mediaUrl+'uploads/icons/no_image.jpg'}
                alt="image"
                />        
            </div>
        </>
    )
}

module.exports = {
    uploadImage,
    unlinkImage,
    showImage
}