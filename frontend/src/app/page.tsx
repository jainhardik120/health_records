"use client"

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>Welcome to Hospital Records Management System</h1>
        <p>Efficiently manage patient records, appointments, and more.</p>
      </div>
      <div className="main">
        <section>
          <h2>Features</h2>
          <ul>
            <li>Securely store and manage patient records</li>
            <li>Schedule and manage appointments</li>
            <li>Track medical history and treatments</li>
            <li>Generate reports and analytics</li>
          </ul>
        </section>
        <section>
          <h2>Get Started</h2>
          <p>Ready to streamline your hospital's operations? Get started now!</p>
        </section>
      </div>
    </div>
  )
}
