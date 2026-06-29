CREATE TABLE IF NOT EXISTS resellers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  company_name VARCHAR(255),
  credit DECIMAL(12,2) DEFAULT 0,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  api_enabled TINYINT(1) DEFAULT 1,
  status ENUM('Active','Suspended') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX(customer_id)
);

CREATE TABLE IF NOT EXISTS reseller_clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reseller_id INT NOT NULL,
  customer_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX(reseller_id),
  INDEX(customer_id)
);

CREATE TABLE IF NOT EXISTS api_keys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  api_key VARCHAR(128) UNIQUE,
  api_secret VARCHAR(128),
  status ENUM('Active','Disabled') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  INDEX(customer_id)
);
