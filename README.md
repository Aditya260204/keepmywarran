Title: KeepMyWarran-(Spanning across warranty lifecycles securely)

Introduction/Problem Statement:
As technology and consumer goods advance, users struggle with tracking warranty periods and related
details for their products. Traditional methods rely on paper invoices or manual logs, leading to
misplaced documents, missed expiration dates, and difficulties in claiming warranties. This project
aims to solve these inefficiencies through an AI-powered automated warranty tracking system that
enables users to register products, receive expiration reminders, and store invoices digitally. The
system will leverage OCR, AI-based reminders, cloud synchronization, and an intuitive dashboard
to streamline warranty management effectively.
Objective:
1. To develop a centralized warranty management system for registering and tracking product
warranties.
2. To implement OCR-based invoice scanning for automatic data extraction.
3. To provide automated reminders via email/SMS/app notifications for warranty expiry.
4. To ensure cloud-based synchronization for multi-device access.
5. To develop a user-friendly dashboard with graphical analytics for warranty insights.
6. To implement role-based access control (RBAC), AES encryption, and OAuth
authentication for data security.

System Architecture:
The proposed system consists of the following components:
1. Product Registration & Data Entry: Users enter product details manually or scan invoices for
auto-entry.
2. OCR & Data Extraction Module: AI-powered OCR (Google Vision API/Tesseract) extracts
product details from invoices.

3. Warranty Tracking & Reminder Engine: AI-driven alert system that schedules notifications
for upcoming warranty expirations.
4. User Dashboard & Analytics: Graphical representation of registered products, active
warranties, and expiration trends.
5. Secure Cloud Storage & Sync: Database management using NoSQL (MongoDB) or SQL
(PostgreSQL) for real-time synchronization.
6. 6.API Integration & Security Module: Secure OAuth 2.0 authentication, AES-256
encryption, and API-based integration with ERP systems.

Methodology/Implementation Details/Software Specifications:
 Frontend Technologies: React.js, Next.js (for UI/UX design and interactivity).
 Backend Technologies: Node.js, Express, or FastAPI for handling data operations.
 Database: MongoDB (NoSQL) / PostgreSQL (SQL) for structured warranty records.
 OCR & AI Engine: Google Vision API / Tesseract.js for text recognition.
 Notifications & Alerts: Twilio (SMS), Firebase Cloud Messaging (Push), SMTP for email
reminders.
 Security Features: AES encryption, OAuth 2.0 authentication, and JWT tokenization.
 Deployment: Cloud-based hosting (AWS / Firebase / Vercel) with containerization via Docker.

Features and Results:
 Product Registration: Add product details manually or via invoice scan.
 Automated Expiry Alerts: Email/SMS notifications before warranty expiration.
 Secure Invoice Storage: Upload and manage receipts in an encrypted cloud database.
 Analytics Dashboard: Track warranty trends, expiration history, and upcoming renewals.
 ERP & Service Center Integration: Connect with manufacturer portals for claims.
 Multi-Device Accessibility: Web and future mobile app sync.
 Data Security & Compliance: GDPR, ISO/IEC 27001 compliance.

Project Workflow:
1. User Registration & Authentication: Secure login and user profile setup.
2. Product Entry & Invoice Upload: Manual entry or AI-based OCR extraction.
3. Warranty Tracking & Alerts: System schedules automated reminders.
4. Dashboard Monitoring: Users view active warranties and upcoming expirations.
5. Cloud Sync & Security Implementation: Ensuring data privacy and accessibility.

Conclusion:
This project introduces an AI-driven Smart Warranty Management System, offering a user-friendly,
automated, and secure approach to handling product warranties. The system integrates OCR for
invoice processing, AI-based expiry reminders, and cloud-based tracking, ensuring seamless user
experience and compliance with industry standards. Future enhancements will include mobile app
expansion, AI-driven smart suggestions, and blockchain-based warranty authentication.

Future Scope:
1. Mobile App Development for Android & iOS with offline sync.
2. Voice & AI-Based Product Registration for hands-free data entry.
3. Blockchain-Based Warranty Authentication for tamper-proof records.
4. Automated Repair & Service Booking System integrated with manufacturer databases.
5. Graph Neural Networks (GNN) for Smart Warranty Predictions based on product usage
patterns.
