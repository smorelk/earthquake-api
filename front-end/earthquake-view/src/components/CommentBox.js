import {
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material';

const CommentBox = ({ show, inputRef, onButtonClick, onSend}) => {
    if (show) {
        return (
            <Box width='50%' marginLeft={3} marginTop={3}>
                <Typography variant='h4' marginBottom={1} >
                    Leave a comment
                </Typography>
                <Box display='flex'>
                    <TextField inputRef={inputRef} sx={{ width: '100%'}} />
                    <Button variant="contained" color="success" sx={{marginLeft: 1}} onClick={() => {
                        onButtonClick();
                        onSend(true);
                    }}>
                        SEND
                    </Button>           
                </Box>     
            </Box>
        );
    }
    return '';
}

export default CommentBox;