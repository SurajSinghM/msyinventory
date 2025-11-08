import torch
import torch.nn as nn

class LSTMForecaster(nn.Module):
    """LSTM-based demand forecasting model"""
    
    def __init__(self, input_size, hidden_size=128, num_layers=2, out_len=30):
        super(LSTMForecaster, self).__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.out_len = out_len
        
        # LSTM layer
        self.lstm = nn.LSTM(
            input_size,
            hidden_size,
            num_layers,
            batch_first=True,
            dropout=0.2 if num_layers > 1 else 0
        )
        
        # Fully connected layers
        self.fc = nn.Sequential(
            nn.Linear(hidden_size, hidden_size // 2),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_size // 2, hidden_size // 4),
            nn.ReLU(),
            nn.Linear(hidden_size // 4, out_len)
        )
    
    def forward(self, x):
        """Forward pass"""
        # x shape: (batch_size, seq_len, input_size)
        # LSTM output
        lstm_out, (h_n, c_n) = self.lstm(x)
        
        # Use the last hidden state
        # h_n shape: (num_layers, batch_size, hidden_size)
        last_hidden = h_n[-1]  # Take last layer's hidden state
        
        # Pass through fully connected layers
        output = self.fc(last_hidden)
        
        # Ensure non-negative predictions (demand can't be negative)
        output = torch.relu(output)
        
        return output

