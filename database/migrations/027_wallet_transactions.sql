CREATE TABLE IF NOT EXISTS reseller_wallet_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reseller_id INT NOT NULL,
  type ENUM('credit','debit') NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  balance_after DECIMAL(12,2) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX(reseller_id),
  INDEX(created_at)
);
