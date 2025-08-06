import { Box, Typography } from '@mui/material';
import { TrendingUp } from 'lucide-react';

const HeatmapPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <TrendingUp style={{ width: 24, height: 24, color: '#4f46e5', marginRight: 8 }} />
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Market Heatmap</Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary">
        Market sector performance heatmap will be implemented here.
      </Typography>
    </Box>
  );
};

export default HeatmapPage;