import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Plus, X, BarChart3, Eye, Bell, Activity, Trash2, PlaySquare } from 'lucide-react';

// Mock chart data generator
const generateChartData = (indexName) => {
  const basePrice = Math.floor(Math.random() * 50000) + 10000;
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    price: Math.floor(basePrice + (Math.random() - 0.5) * 2000),
    volume: Math.floor(Math.random() * 1000000),
  }));
};

export default function EnhancedDashboard() {
  // State management
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Index data and management
  const allIndexes = [
    "NIFTY 50", "SENSEX", "BANKNIFTY", "NIFTY NEXT 50", 
    "BSE 100", "NIFTY 500", "GIFT NIFTY", "NASDAQ"
  ];

  const [indexes, setIndexes] = useState([
    { name: "NIFTY 50", price: 19450, sentiment: "Bullish", change: 2.5, changePercent: 1.2 },
    { name: "SENSEX", price: 65200, sentiment: "Bearish", change: -150, changePercent: -0.8 },
    { name: "BANKNIFTY", price: 44200, sentiment: "Bullish", change: 300, changePercent: 2.1 },
    { name: "NIFTY NEXT 50", price: 44150, sentiment: "Bearish", change: -200, changePercent: -1.5 },
    { name: "BSE 100", price: 19700, sentiment: "Bullish", change: 180, changePercent: 0.9 }
  ]);
  const [newIndex, setNewIndex] = useState("");

  // Chart management
  const [selectedCharts, setSelectedCharts] = useState(["NIFTY 50", "SENSEX"]);
  const [chartData, setChartData] = useState({});

  // Wishlist management
  const [wishlists, setWishlists] = useState([
    {
      id: 1,
      name: "Tech Stocks",
      stocks: [
        { symbol: "TCS", price: 3550, change: 2.1 },
        { symbol: "INFY", price: 1580, change: -1.2 },
      ],
    },
    {
      id: 2,
      name: "Banking",
      stocks: [
        { symbol: "HDFCBANK", price: 1650, change: 1.8 },
        { symbol: "ICICIBANK", price: 950, change: -0.5 },
      ],
    },
  ]);
  const [newStock, setNewStock] = useState("");
  const [newWishlistName, setNewWishlistName] = useState("");

  // News and top picks
  const [topPicks] = useState([
    { symbol: "TCS", buyPrice: 3500, sellPrice: 3700, target: 3800, period: "2 Weeks", confidence: 85 },
    { symbol: "RELIANCE", buyPrice: 2800, sellPrice: 3000, target: 3100, period: "1 Month", confidence: 92 },
  ]);

  const [news] = useState([
    { headline: "Markets rally as foreign inflows surge", sentiment: "Bullish", time: "2 hours ago" },
    { headline: "Tech sector faces slowdown fears", sentiment: "Bearish", time: "4 hours ago" },
    { headline: "Banking stocks show strong momentum", sentiment: "Bullish", time: "6 hours ago" },
  ]);

  // Initialize chart data
  useEffect(() => {
    const data = {};
    indexes.forEach(index => {
      data[index.name] = generateChartData(index.name);
    });
    setChartData(data);
    
    // Simulate loading
    setTimeout(() => setLoading(false), 1500);
  }, [indexes]);

  // Notification system
  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  // Handlers
  const handleAddIndex = () => {
    if (!newIndex) return;
    if (indexes.length >= 8) {
      showNotification('Maximum 8 indexes allowed', 'warning');
      return;
    }
    
    const newIndexData = {
      name: newIndex,
      price: Math.floor(Math.random() * 50000) + 10000,
      sentiment: Math.random() > 0.5 ? "Bullish" : "Bearish",
      change: (Math.random() - 0.5) * 1000,
      changePercent: (Math.random() - 0.5) * 5,
    };
    
    setIndexes([...indexes, newIndexData]);
    setNewIndex("");
    showNotification(`${newIndex} added successfully!`);
  };

  const handleRemoveIndex = (name) => {
    setIndexes(indexes.filter((i) => i.name !== name));
    setSelectedCharts(selectedCharts.filter(chart => chart !== name));
    showNotification(`${name} removed from dashboard`, 'info');
  };

  const handleAddWishlist = () => {
    if (!newWishlistName.trim()) return;
    const newWishlist = {
      id: Date.now(),
      name: newWishlistName,
      stocks: [],
    };
    setWishlists([...wishlists, newWishlist]);
    setNewWishlistName("");
    showNotification('New watchlist created!');
  };

  const handleRemoveWishlist = (id) => {
    setWishlists(wishlists.filter(w => w.id !== id));
    showNotification('Watchlist removed', 'info');
  };

  const handleAddStock = (wishlistIndex) => {
    if (!newStock.trim()) return;
    const updated = [...wishlists];
    const stock = {
      symbol: newStock.toUpperCase(),
      price: Math.floor(Math.random() * 5000) + 100,
      change: (Math.random() - 0.5) * 10,
    };
    updated[wishlistIndex].stocks.push(stock);
    setWishlists(updated);
    setNewStock("");
    showNotification(`${stock.symbol} added to watchlist!`);
  };

  const handleRemoveStock = (wishlistIndex, stockIndex) => {
    const updated = [...wishlists];
    const removedStock = updated[wishlistIndex].stocks[stockIndex];
    updated[wishlistIndex].stocks.splice(stockIndex, 1);
    setWishlists(updated);
    showNotification(`${removedStock.symbol} removed from watchlist`, 'info');
  };

  const handleChartChange = (index, newValue) => {
    const updated = [...selectedCharts];
    updated[index] = newValue;
    setSelectedCharts(updated);
  };

  if (loading) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #4f46e5, #7e22ce, #1e40af)'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Activity style={{ width: 64, height: 64, color: 'white', marginBottom: 16, animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 300, mb: 3 }}>Loading Dashboard...</Typography>
          <Box sx={{ width: 320, height: 8, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 4, overflow: 'hidden' }}>
            <Box sx={{
              height: '100%',
              bgcolor: 'white',
              borderRadius: 4,
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f8fafc, #e0f2fe)',
      pb: 4
    }}>


      <Box sx={{ maxWidth: '7xl', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 4 }}>
        {/* Market Overview Header */}
        <Paper
          elevation={3}
          sx={{
            background: 'linear-gradient(to right, #4f46e5, #9333ea)',
            borderRadius: 4,
            p: 3,
            mb: 4,
            color: 'white'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Market Overview</Typography>
          <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Real-time market data and analytics
          </Typography>
        </Paper>

        {/* Market Indexes Section */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <BarChart3 style={{ width: 24, height: 24, color: '#4f46e5', marginRight: 8 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>Market Indexes</Typography>
          </Box>
          
          <Grid container spacing={2}>
            {indexes.map((index, i) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index.name}>
                <Card
                  sx={{
                    position: 'relative',
                    background: index.sentiment === 'Bullish'
                      ? 'linear-gradient(to bottom right, #22c55e, #059669)'
                      : 'linear-gradient(to bottom right, #ef4444, #db2777)',
                    color: 'white',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    },
                    animation: `fadeIn ${i * 100}ms ease-out`
                  }}
                >
                  <CardContent>
                    <Box sx={{ position: 'relative' }}>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveIndex(index.name)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                        }}
                      >
                        <X size={16} />
                      </IconButton>
                      
                      <Typography variant="subtitle2" sx={{ mb: 1, pr: 4, fontWeight: 600 }}>
                        {index.name}
                      </Typography>
                      <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                        ₹{index.price.toLocaleString()}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {index.sentiment === 'Bullish' ? 
                          <TrendingUp size={16} /> : 
                          <TrendingDown size={16} />
                        }
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {index.changePercent > 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            
            {/* Add Index Card */}
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <Card
                sx={{
                  height: '100%',
                  minHeight: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 2,
                  bgcolor: 'rgba(79, 70, 229, 0.1)',
                  border: '2px dashed',
                  borderColor: 'primary.main'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Select
                    value={newIndex}
                    onChange={(e) => setNewIndex(e.target.value)}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="">Select Index</MenuItem>
                    {allIndexes
                      .filter((i) => !indexes.some((idx) => idx.name === i))
                      .map((idx) => (
                        <MenuItem key={idx} value={idx}>{idx}</MenuItem>
                      ))}
                  </Select>
                  <Button
                    variant="contained"
                    onClick={handleAddIndex}
                    disabled={!newIndex}
                    fullWidth
                    sx={{
                      background: 'linear-gradient(to right, #4f46e5, #9333ea)',
                    '&:hover': {
                      background: 'linear-gradient(to right, #4338ca, #7e22ce)'
                    }
                  }}
                  startIcon={<Plus size={16} />}
                >
                  Add Index
                </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Charts Section */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <BarChart3 style={{ width: 24, height: 24, color: '#4f46e5', marginRight: 8 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>Market Charts</Typography>
          </Box>
          
          <Grid container spacing={3}>
            {selectedCharts.map((chart, index) => (
              <Grid item xs={12} lg={6} key={chart + index}>
                <Card sx={{ p: 3, borderRadius: 4, height: '100%' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{chart} Performance</Typography>
                    <Select
                      value={chart}
                      onChange={(e) => handleChartChange(index, e.target.value)}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      {indexes.map((idx) => (
                        <MenuItem key={idx.name} value={idx.name}>{idx.name}</MenuItem>
                      ))}
                    </Select>
                  </Box>
                  
                  <Box sx={{ height: 256 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData[chart] || []}>
                      <defs>
                        <linearGradient id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="rgba(0,0,0,0.6)" axisLine={false} />
                      <YAxis tick={{ fontSize: 12 }} stroke="rgba(0,0,0,0.6)" axisLine={false} />
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#6366f1" 
                        strokeWidth={3}
                        fill={`url(#colorGradient${index})`}
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Watchlists Section */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Eye style={{ width: 24, height: 24, color: '#4f46e5', marginRight: 8 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>My Watchlists</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                type="text"
                placeholder="New watchlist name"
                value={newWishlistName}
                onChange={(e) => setNewWishlistName(e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleAddWishlist}
                disabled={!newWishlistName.trim()}
                sx={{
                  background: 'linear-gradient(to right, #6366f1, #9333ea)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(to right, #4f46e5, #7e22ce)',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5,
                    background: 'linear-gradient(to right, #6366f1, #9333ea)',
                  },
                }}
              >
                <Plus size={20} />
              </IconButton>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            {wishlists.map((wishlist, wIndex) => (
              <Grid item xs={12} md={6} lg={4} key={wishlist.id}>
                <Card
                  sx={{
                    background: 'linear-gradient(to bottom right, #4f46e5, #7e22ce)',
                    p: 3,
                    borderRadius: 4,
                    color: 'white',
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{wishlist.name}</Typography>
                    <IconButton
                      onClick={() => handleRemoveWishlist(wishlist.id)}
                      sx={{
                        color: 'white',
                        p: 1,
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
                      }}
                    >
                      <PlaySquare size={20} />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, minHeight: 60 }}>
                    {wishlist.stocks.map((stock, sIndex) => (
                      <Box
                        key={stock.symbol}
                        sx={{
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: 2,
                          px: 1.5,
                          py: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          '&:hover button': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Box sx={{ fontSize: '0.875rem' }}>
                          <Box component="span" sx={{ fontWeight: 500 }}>{stock.symbol}</Box>
                          <Box component="span" sx={{ ml: 0.5 }}>₹{stock.price}</Box>
                          <Box
                            component="span"
                            sx={{
                              ml: 0.5,
                              fontSize: '0.75rem',
                              color: stock.change >= 0 ? '#86efac' : '#fca5a5',
                            }}
                          >
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(1)}%
                          </Box>
                        </Box>
                        <IconButton
                          onClick={() => handleRemoveStock(wIndex, sIndex)}
                          sx={{
                            p: 0.5,
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            color: 'white',
                          }}
                        >
                          <X size={12} />
                        </IconButton>
                      </Box>
                  ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      placeholder="Add Stock Symbol"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      size="small"
                      sx={{
                        flex: 1,
                        '& .MuiInputBase-root': {
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                          color: 'text.primary',
                          '&:hover': {
                            bgcolor: 'white'
                          },
                          '&.Mui-focused': {
                            bgcolor: 'white'
                          }
                        }
                      }}
                    />
                    <IconButton
                      onClick={() => handleAddStock(wIndex)}
                      disabled={!newStock.trim()}
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.3)'
                        },
                        '&.Mui-disabled': {
                          opacity: 0.5,
                          color: 'white'
                        }
                      }}
                    >
                      <Plus size={20} />
                    </IconButton>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Top Picks & News Row */}
        <Grid container spacing={4}>
          {/* Top Picks */}
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>🎯 Top Picks</Typography>
            <Stack spacing={2}>
              {topPicks.map((pick) => (
                <Card
                  key={pick.symbol}
                  sx={{
                    background: 'linear-gradient(to right, #fb923c, #ec4899)',
                    p: 3,
                    borderRadius: 4,
                    color: 'white',
                    boxShadow: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>{pick.symbol}</Typography>
                      <Typography sx={{ color: 'rgba(255,237,213,0.9)', mb: 1.5 }}>Period: {pick.period}</Typography>
                      <Box sx={{ display: 'flex', gap: 2, fontSize: '0.875rem' }}>
                        <Typography>Buy: <Box component="strong">₹{pick.buyPrice}</Box></Typography>
                        <Typography>Target: <Box component="strong" sx={{ color: '#bbf7d0' }}>₹{pick.target}</Box></Typography>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700 }}>{pick.confidence}%</Typography>
                      <Typography sx={{ color: 'rgba(255,237,213,0.8)', fontSize: '0.875rem' }}>Confidence</Typography>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* News */}
          <Grid item xs={12} lg={6}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>📰 Market News</Typography>
            <Stack spacing={2}>
              {news.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}>{item.headline}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.time}</Typography>
                    </Box>
                    <Box
                      sx={{
                        ml: 1.5,
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 'full',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        ...(item.sentiment === 'Bullish'
                          ? { bgcolor: 'success.light', color: 'success.dark' }
                          : { bgcolor: 'error.light', color: 'error.dark' })
                      }}
                    >
                      {item.sentiment}
                    </Box>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Notification System */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          zIndex: 'tooltip'
        }}
      >
        {notifications.map((notification) => (
          <Alert
            key={notification.id}
            severity={notification.type}
            variant="filled"
            sx={{
              boxShadow: 3,
              animation: 'slideInRight 0.5s ease-out',
              '@keyframes slideInRight': {
                from: {
                  transform: 'translateX(100%)',
                  opacity: 0
                },
                to: {
                  transform: 'translateX(0)',
                  opacity: 1
                }
              }
            }}
          >
            {notification.message}
          </Alert>
        ))}
      </Box>
    </Box>
  );
}