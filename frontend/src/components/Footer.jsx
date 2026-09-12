import { useNavigate } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* <p className="footer-copy">© {year} Rasala Nikhil</p> */}
        <button
          className="footer-admin-link"
          onClick={() => navigate("/admin/login")}
        >
          🔐 Verify Portfolio Owner
        </button>
      </div>
    </footer>
  );
};

export default Footer;
