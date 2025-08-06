import { Box, Typography } from '@mui/material';
import { Wallet } from 'lucide-react';

const PortfolioPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Wallet style={{ width: 24, height: 24, color: '#4f46e5', marginRight: 8 }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Portfolio</Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary">
        Your investment portfolio and performance tracking will be shown here.
      </Typography>
    </Box>
  );
};

export default PortfolioPage;