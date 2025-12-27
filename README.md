# Personal Finance Risk Dashboard

## 📌 Project Overview
**Personal Finance Risk Dashboard** is a full-stack **fintech application** designed to help users analyze common investment options based on **risk level, volatility, time horizon, and projected returns**.

This project is built following **enterprise-level standards**, with a strong focus on **security, performance, scalability, and user experience**.  
It was developed during the workshop **“Building Personal IT Projects to International Standards”**, aiming to upgrade personal and graduate projects into **job-ready portfolio assets**.

---

## 🎯 Key Features
- 📊 Interactive dashboards for financial risk analysis  
- 🔄 **Real-time updates** of projected returns when inputs change  
- 🎚️ Time Horizon Slider (1–30 years) with instant recalculation (no page reload)  
- 🔐 Secure backend with **JWT Authentication**  
- 🌙 Modern **fintech-style UI**, fully responsive with **dark mode**  
- ♿ Accessibility (a11y) compliant UI components  

---

## 🧭 Investment Categories
- **Savings**
- **Bonds**
- **Index Funds**
- **Cryptocurrency**

Each category provides:
- Risk Level & Volatility visualization  
- Dynamically calculated Projected Returns  
- Adjustable Time Horizon input  

---

## 🧱 System Architecture

### Frontend
- **Next.js 14 (App Router)**
- **TypeScript (Strict Mode)**
- **Tailwind CSS**
- **shadcn/ui**
- Modular, functional component architecture
- Client-side state updates without page reload

### Backend
- **.NET 8 – ASP.NET Core Web API**
- **C#**
- **Entity Framework Core**
- **ASP.NET Core Identity**
- **JWT Authentication**
- **SignalR** for real-time communication
- Database: PostgreSQL / SQL Server (SQLite for local development)

---

## 🔐 Security
- JWT-based authentication  
- Role-based authorization (USER / ADMIN)  
- Input validation and sanitization  
- Rate limiting  
- Secure HTTP headers (CORS, CSP, HSTS)  
- Audit logging for sensitive operations  

---

## 🔄 Real-Time Processing
- Implemented using **SignalR**
- Backend pushes updated projections when:
  - The investment time horizon changes  
  - Risk-related parameters are updated  

---

## 🧪 Testing

### Backend
- Unit Testing: **xUnit + Moq**
- Integration testing for RESTful APIs

### Frontend
- Unit tests for calculation logic using **Jest**

---

## ⚡ Performance & Quality Targets
- Lighthouse score target: **> 90**
- Core Web Vitals within recommended thresholds
- API response time < **300ms**
- Scalable architecture ready for production environments

---

## ♿ Accessibility (a11y)
- Full keyboard navigation support  
- ARIA labels for interactive components  
- Proper color contrast ratios  
- Screen-reader friendly design  

---

## 📁 Project Structure (High-Level)
```txt
PersonalFinanceDashboard
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   └── tests
└── backend
    ├── Controllers
    ├── Services
    ├── Domain
    ├── Infrastructure
    └── Tests
