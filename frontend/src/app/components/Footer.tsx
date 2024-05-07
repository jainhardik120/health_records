export const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer text-white flex flex-col">
        <div className="block w-full">
          <div className="flex flex-row justify-evenly w-full">
            <div className="col-md-4 justify-start text-justify">
              <h5 className="mb-4 text-violet-600">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="https://github.com/jainhardik120/health_records">View on GitHub</a></li>
                <li><a href="https://etherscan.io/address/your-contract-address">View on Etherscan</a></li>
                <li><a href="https://yourwebsite.com/smart-contract-code">View Smart Contract Code</a></li>
              </ul>
            </div>
            {/* <div className="col-md-4 justify-start text-justify">
              <h5 className="mb-4 text-violet-600">Legal</h5>
              <ul className="list-unstyled">
                <li><a href="/privacy-policy">Privacy Policy</a></li>
                <li><a href="/terms-of-service">Terms of Service</a></li>
              </ul>
            </div> */}
          </div>
        </div>
        <p className="text-white block mt-4">&copy; 2024 HealthChain. All rights reserved.</p>
      </footer>
    </>
  );
};
