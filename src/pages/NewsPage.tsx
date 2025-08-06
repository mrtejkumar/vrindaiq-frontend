import { Box, Typography } from '@mui/material';
import { Newspaper } from 'lucide-react';

const NewsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Newspaper style={{ width: 24, height: 24, color: '#4f46e5', marginRight: 8 }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Market News</Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary">
        Latest market news and updates will be displayed here.
      </Typography>
    </Box>
  );
};

export default NewsPage;