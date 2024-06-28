const { Grid, Container, Avatar } = require("@mui/material")
import '../../../../public/sass/pages/MakeApost.scss'
import * as React from 'react';


const addPost = ()=>{
    return (
        <div className="Maincontainer">
            <Container>
                <Grid container>
                    <Grid item>
                        <div className="inner_parent">
                            <div className='navbar'>
                                <h2 className='h3'>Add question</h2>
                            </div>
                            <div className='main_area'>
                                <div className='username'>
                                    <Avatar alt='Hi!' src='/images/avatar.png'/>Pete Da Vinton 
                                    
                                </div>
                                <form>
                                    <div className=''></div>
                                </form>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}



export default addPost;