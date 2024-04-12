import {
    Box, 
    Typography, 
    List, 
    ListItem,
    ListItemText,
    ListItemIcon,
    Badge,
    Chip,
    Divider
} from '@mui/material';
import ShortTextIcon from '@mui/icons-material/ShortText';

const CommentsList = ({ comments }) => {

    if (comments.length === 0) 
        return  (
        <Divider>
            <Chip label="No Comments" size="small" />
        </Divider>
    );

    const cList = comments.map(c => (
        <ListItem>
            <ListItemIcon>
                <ShortTextIcon></ShortTextIcon>
            </ListItemIcon>
            <ListItemText>
                {c['body']}
            </ListItemText>
        </ListItem>
    ));
    
    return <List>{cList}</List>
}

const CommentSection = ({ show, comments }) => {
    if (show) {
      return (
          <Box sx={{ width: '50%', marginLeft: 3, marginTop: 3 }}>
            <Badge badgeContent={comments.length} color="primary">
                <Typography variant='h4' >
                Comments
                </Typography>
            </Badge>
            <CommentsList comments={comments} />
        </Box>
      );
    }
  
    return '';
}

export default CommentSection;