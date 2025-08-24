'use client';

import { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  CircularProgress,
  Stack,
  Link,
  IconButton,
  Alert,
  Tooltip,
  Button,
} from '@mui/material';
import {
  CheckCircleOutline as CheckCircleIcon,
  ErrorOutline as ErrorIcon,
  OpenInNew as OpenInNewIcon,
  Close as CloseIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  backgroundColor: theme.palette.background.paper,
  borderRadius: (theme.shape.borderRadius as number) * 2,
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  padding: theme.spacing(4),
  outline: 'none',
  textAlign: 'center',
}));

// Error categorization and user-friendly messages
interface ErrorInfo {
  title: string;
  message: string;
  category: 'wallet' | 'network' | 'contract' | 'user' | 'unknown';
  actionable?: boolean;
  helpLink?: string;
}

function categorizeError(errorMessage?: string | null): ErrorInfo {
  if (!errorMessage) {
    return {
      title: 'Transaction Failed',
      message: 'An unexpected error occurred. Please try again.',
      category: 'unknown',
      actionable: true,
    };
  }

  const lowerError = errorMessage.toLowerCase();

  // User rejected transaction
  if (lowerError.includes('user rejected') || lowerError.includes('user denied') || lowerError.includes('user cancelled') || 
      lowerError.includes('meta_mask_user_rejected') || lowerError.includes('user rejected the request') || 
      lowerError.includes('user rejected the transaction') || lowerError.includes('user rejected the operation') ||
      lowerError.includes('rejected') && (lowerError.includes('user') || lowerError.includes('wallet') || lowerError.includes('metamask'))) {
    return {
      title: 'Transaction Cancelled',
      message: 'You cancelled the transaction in your wallet. No fees were charged.',
      category: 'user',
      actionable: false,
    };
  }

  // Insufficient funds
  if (lowerError.includes('insufficient funds') || lowerError.includes('insufficient balance')) {
    return {
      title: 'Insufficient Funds',
      message: 'You don\'t have enough ETH to pay for gas fees. Please add more ETH to your wallet.',
      category: 'wallet',
      actionable: true,
    };
  }

  // Network/RPC errors
  if (lowerError.includes('network') || lowerError.includes('rpc') || lowerError.includes('connection') || lowerError.includes('timeout')) {
    return {
      title: 'Network Error',
      message: 'There was a connection issue with the blockchain network. Please check your internet connection and try again.',
      category: 'network',
      actionable: true,
    };
  }

  // Contract errors
  if (lowerError.includes('execution reverted') || lowerError.includes('revert') || lowerError.includes('contract')) {
    return {
      title: 'Smart Contract Error',
      message: 'The smart contract rejected the transaction. This could be due to invalid parameters or contract restrictions.',
      category: 'contract',
      actionable: true,
    };
  }

  // Wallet connection errors
  if (lowerError.includes('wallet') || lowerError.includes('metamask') || lowerError.includes('provider')) {
    return {
      title: 'Wallet Connection Error',
      message: 'There was an issue connecting to your wallet. Please refresh the page and try connecting again.',
      category: 'wallet',
      actionable: true,
    };
  }

  // Gas estimation errors
  if (lowerError.includes('gas') || lowerError.includes('estimate')) {
    return {
      title: 'Gas Estimation Failed',
      message: 'Unable to estimate gas fees. This usually happens when the transaction would fail. Please check your inputs and try again.',
      category: 'contract',
      actionable: true,
    };
  }

  // Generic fallback
  return {
    title: 'Transaction Failed',
    message: errorMessage.length > 200 ? `${errorMessage.substring(0, 200)}...` : errorMessage,
    category: 'unknown',
    actionable: true,
  };
}

interface TransactionProgressModalProps {
  open: boolean;
  status: 'pending' | 'confirming' | 'success' | 'error' | 'idle';
  transactionHash?: string | null;
  errorMessage?: string | null;
  onClose: () => void;
  networkExplorerUrl?: string;
}

export default function TransactionProgressModal({
  open,
  status,
  transactionHash,
  errorMessage,
  onClose,
  networkExplorerUrl,
}: TransactionProgressModalProps) {
  const [copiedHash, setCopiedHash] = useState(false);
  
  const handleModalClose = (_event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => {
    // Prevent closing while the transaction is in-flight.
    if (status === 'pending' || status === 'confirming') {
      return;
    }
    onClose();
  };

  const handleCopyHash = async () => {
    if (transactionHash) {
      try {
        await navigator.clipboard.writeText(transactionHash);
        setCopiedHash(true);
        setTimeout(() => setCopiedHash(false), 2000);
      } catch (err) {
        console.error('Failed to copy transaction hash:', err);
      }
    }
  };

  const TransactionHashComponent = ({ hash, showFull = false }: { hash: string; showFull?: boolean }) => (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1, 
        mt: 1,
        p: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 1,
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          fontFamily: 'monospace', 
          fontSize: '0.8em',
          wordBreak: 'break-all',
          flexGrow: 1
        }}
      >
        <strong>Transaction:</strong> {showFull ? hash : `${hash.substring(0, 20)}...${hash.substring(Math.max(0, hash.length - 6))}`}
      </Typography>
      <Tooltip title={copiedHash ? 'Copied!' : 'Copy Transaction Hash'}>
        <IconButton
          size="small"
          onClick={handleCopyHash}
          sx={{ color: copiedHash ? '#4caf50' : '#0A1F44' }}
        >
          <CopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {networkExplorerUrl && (
        <Tooltip title="View on Explorer">
          <IconButton
            size="small"
            onClick={() => window.open(`${networkExplorerUrl}/tx/${hash}`, '_blank')}
            sx={{ color: '#0A1F44' }}
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
  
  const renderContent = () => {
    switch (status) {
      case 'pending':
        return (
          <>
            <CircularProgress size={50} sx={{ mb: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              Confirm in Wallet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Please confirm the transaction in your wallet to proceed with minting.
            </Typography>
            {/* <Alert severity="info" sx={{ mt: 2, textAlign: 'left' }}>
              <Typography variant="body2">
                🎯 <strong>What to do next:</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                • Check your wallet for a pending transaction
                <br />
                • Click &quot;Confirm&quot; to approve the transaction
                <br />
                • Click &quot;Reject&quot; if you want to cancel
              </Typography>
            </Alert> */}
            {transactionHash && (
              <TransactionHashComponent hash={transactionHash} />
            )}
          </>
        );
      case 'confirming':
        return (
          <>
            <CircularProgress size={50} sx={{ mb: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              Transaction Processing
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your transaction is being processed on the blockchain. Please wait for confirmation.
            </Typography>
            {transactionHash && (
              <TransactionHashComponent hash={transactionHash} />
            )}
          </>
        );
      case 'success':
        return (
          <>
            <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              NFT Minted Successfully!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your new collectible has been created and is now on the blockchain.
            </Typography>
            {transactionHash && (
              <TransactionHashComponent hash={transactionHash} showFull />
            )}
          </>
        );
      case 'error':
        const errorInfo = categorizeError(errorMessage);
        return (
          <>
            <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" fontWeight={600}>
              {errorInfo.title}
            </Typography>
            <Alert 
              severity={errorInfo.category === 'user' ? 'warning' : 'error'} 
              sx={{ mt: 2, textAlign: 'left' }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                {errorInfo.message}
              </Typography>
              {errorInfo.category !== 'user' && (
                <Typography variant="caption" color="text.secondary">
                  <strong>Error category:</strong> {errorInfo.category.charAt(0).toUpperCase() + errorInfo.category.slice(1)}
                </Typography>
              )}
            </Alert>
            
            {/* Show original error for debugging */}
            {errorMessage && errorInfo.message !== errorMessage && (
              <Box sx={{ mt: 2 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontFamily: 'monospace', 
                    fontSize: '0.8em',
                    color: 'text.secondary',
                    bgcolor: 'rgba(0, 0, 0, 0.05)',
                    p: 1,
                    borderRadius: 1,
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    maxHeight: 100,
                    overflow: 'auto',
                    textAlign: 'left'
                  }}
                >
                  <strong>Technical details:</strong><br />
                  {errorMessage}
                </Typography>
              </Box>
            )}
            
            {transactionHash && (
              <TransactionHashComponent hash={transactionHash} />
            )}
            
            {/* Action buttons for different error types */}
            <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
              {errorInfo.category === 'network' && (
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              )}
              {errorInfo.category === 'wallet' && (
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => {
                    // This would trigger wallet reconnection
                    window.location.reload();
                  }}
                >
                  Reconnect Wallet
                </Button>
              )}
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal open={open && status !== 'idle'} onClose={handleModalClose}>
      <StyledModalBox>
        <IconButton
          aria-label="close"
          onClick={onClose}
          disabled={status === 'pending' || status === 'confirming'}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            opacity: (status === 'pending' || status === 'confirming') ? 0.3 : 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Stack spacing={2} alignItems="center">
          {renderContent()}
        </Stack>
      </StyledModalBox>
    </Modal>
  );
}
