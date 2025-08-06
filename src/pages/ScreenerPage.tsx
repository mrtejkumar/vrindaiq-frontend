import { Box, Typography } from '@mui/material';
import { Search } from 'lucide-react';

const ScreenerPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Search style={{ width: 24, height: 24, color: '#4f46e5', marginRight: 8 }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Stock Screener</Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary">
        Stock screening and analysis tools will be implemented here.
      </Typography>
    </Box>
  );
};

export default ScreenerPage;