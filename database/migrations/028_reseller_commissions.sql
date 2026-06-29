CREATE TABLE IF NOT EXISTS reseller_commissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reseller_id INT NOT NULL,
  customer_id INT NOT NULL,
  invoice_id INT NOT NULL,
  order_id INT DEFAULT NULL,
  invoice_total DECIMAL(12,2) NOT NULL,
  commission_percent DECIMAL(5,2) NOT NULL,
  commission_amount DECIMAL(12,2) NOT NULL,
  status ENUM('pending','approved','paid') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX(reseller_id),
  INDEX(invoice_id),
  INDEX(customer_id),
  INDEX(status)
);
