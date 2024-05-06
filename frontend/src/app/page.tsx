"use client"

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1 id="heading">Welcome to Hospital Records Management System</h1>
        <p id="head-para">Efficiently manage patient records, and more.</p>
      </div>
      <div className="image-container">
        <img src="https://www.virginiawomenscenter.com/wp-content/uploads/2018/09/AdobeStock_136041571.jpeg"/>
      </div>
      <br/>
      <div className="main">
        <section>
          <h2 id="feature-head">Features</h2>
          <hr/>
          <ol id="lists">
            <li>Securely store and manage patient records</li>
            <li>Upload patient records using patient ID</li>
            <li>Request patient records</li>
            <li>Track medical history and treatments</li>
            <li>Approve or decline record requests from patients</li>
            <li>Send records to approved requests</li>
            <li>Access control for different users (doctors, patients)</li>
            <li>Search and retrieve patient records efficiently</li>
          </ol>
        </section>
        <section id="get-started">
          <h2 id="get-started-head">Get Started</h2>
          <br/>
          <p id="get-started-para">Ready to streamline your hospital &apos s operations? Get started now!</p>
        </section>
      </div>

    </div>
  )
}
